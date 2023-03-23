const abbreviateNumber = (input) => {
  const number = parseFloat(input)

  if (isNaN(number)) {
    return { short: input, long: input }
  }

  const sign = number < 0 ? '-' : ''

  let result = number
  let symbol = ''

  if (number > 1e4 && number < 1e5) {
    result = parseFloat(number.toFixed(2))
  }

  if ((number >= 1e3) && number < 1e6) {
    symbol = 'K'
    result = +(number / 1e3).toFixed(2)
  }

  if (number >= 1e6 && number < 1e9) {
    symbol = 'M'
    result = +(number / 1e6).toFixed(2)
  }

  if (number >= 1e9 && number < 1e12) {
    symbol = 'B'
    result = +(number / 1e9).toFixed(2)
  }

  if (number >= 1e12) {
    symbol = 'T'
    result = +(number / 1e12).toFixed(2)
  }

  return {
    short: `${sign}${result}${symbol}`,
    long: number.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
}

export { abbreviateNumber }
