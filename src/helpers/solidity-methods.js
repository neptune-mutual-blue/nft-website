import BigNumber from 'bignumber.js'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80
})

const GAS_MARGIN_MULTIPLIER = 1.5

const getErrorMessage = (_error, iface, prefix) => {
  let errorMessage = 'Something went wrong'

  try {
    // console.error(_error)
    const error = _error.error || _error
    if (!error || !error.message) {
      return 'Unexpected Error Occurred'
    }

    if (error?.reason) return error.reason

    if (error?.data?.message) {
      errorMessage = error.data.message.trim().replace('execution reverted: ', '')
    } else if (error?.data?.originalError?.message) {
      errorMessage = error.data.originalError.message
        .trim()
        .replace('execution reverted: ', '')
    }

    errorMessage = error.message.trim().replace('MetaMask Tx Signature: ', '')

    if (error?.data?.data) {
      const parsedError = iface.parseError(error.data.data)
      errorMessage = `
      ${errorMessage}

      Parsed Error:
      Name: ${parsedError.name}
      Signature: ${parsedError.signature}
      Args: ${parsedError.args}
      `
    }
  } catch (error) {
    console.error(error)
  }

  return (prefix + errorMessage).replace(/\s\s+/g, '\n')
}

const calculateGasMargin = (value) => {
  return new BigNumber(value.toString())
    .multipliedBy(GAS_MARGIN_MULTIPLIER)
    .decimalPlaces(0)
    .toString()
}

const encodeData = (encodeInterface, methodName, methodArgs = [], onError = () => {}) => {
  if (!encodeInterface || !methodName) return

  try {
    const encoded = encodeInterface.encodeFunctionData(methodName, methodArgs)
    return encoded
  } catch (error) {
    // console.log(`Error in encoding ${methodName}\n`, { methodArgs, error })
    onError(getErrorMessage(error))
  }
}

const getFunctionSignature = (_function) => {
  const _isTuple = _function.inputs[0]?.type === 'tuple'
  const inputs = _function?.inputs?.[0]?.components || _function?.inputs

  const argsSignature = inputs.map(_inp => { return _inp.type }).join(', ')
  const args = _isTuple ? `(${argsSignature})` : argsSignature
  return `${_function.name}(${args})`
}

export {
  calculateGasMargin,
  encodeData,
  GAS_MARGIN_MULTIPLIER,
  getErrorMessage,
  getFunctionSignature
}
