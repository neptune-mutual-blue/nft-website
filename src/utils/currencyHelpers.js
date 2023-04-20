import { AppConstants } from '@/constants/AppConstants'

const weiToToken = (x, decimals = 18) =>
  parseInt(x.toString()) / 10 ** decimals

const formatTokenLong = (x, symbol, token = false, maxFractionDigits = 6) => {
  if (!token) {
    const formatter = new Intl.NumberFormat(AppConstants.PREFERRED_LOCALE, {
      style: 'currency',
      currency: symbol,
      maximumFractionDigits: maxFractionDigits
    })
    return formatter.format(x) + ''
  }

  return (
    Number(x).toLocaleString(AppConstants.PREFERRED_LOCALE, {
      minimumFractionDigits: maxFractionDigits
    }) +
    ' ' +
    symbol
  )
}

const weiAsToken = (
  x,
  symbol,
  decimals = AppConstants.NPM_TOKEN_DECIMALS,
  token = false
) => formatTokenLong(weiToToken(x, decimals), symbol, token)

const abbreviateNumber = (input) => {
  const number = parseFloat(Math.abs(input).toString())

  const sign = input < 0 ? '-' : ''

  let result = number
  let symbol = ''

  if (number > 1e4 && number < 1e5) {
    result = parseFloat(number.toFixed(2))
  }

  if (number >= 1e3 && number < 1e6) {
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
    abbreviation: `${sign}${result}`,
    symbol
  }
}

const formatToken = (
  amount,
  decimals,
  symbol,
  token = false
) => {
  if (!amount || parseFloat(amount) === 0) {
    return { short: 'N/A', long: 'Not available' }
  }

  const long = weiAsToken(amount, symbol, decimals, token)

  const abbr = abbreviateNumber(weiToToken(amount, decimals))

  let short = ''

  if (!token) {
    const formatter = new Intl.NumberFormat(AppConstants.PREFERRED_LOCALE, {
      style: 'currency',
      currency: symbol,
      maximumFractionDigits: 2
    })

    short = `${formatter.format(+abbr.abbreviation)}${abbr.symbol}`
  } else {
    short = abbr.abbreviation + abbr.symbol + ' ' + symbol
  }

  return {
    long,
    short
  }
}

const formatNpmToken = (
  amount,
  decimals = AppConstants.NPM_TOKEN_DECIMALS,
  symbol = AppConstants.NPM_TOKEN_SYMBOL
) => formatToken(amount, decimals, symbol, true)

const formatLiquidityToken = (
  amount,
  decimals = AppConstants.FALLBACK_LIQUIDITY_TOKEN_DECIMALS,
  symbol = AppConstants.FALLBACK_LIQUIDITY_TOKEN_SYMBOL
) => formatToken(amount, decimals, symbol, symbol !== 'USD')

const formatDollar = (
  amount
) => formatTokenLong(amount, 'USD', false, 2)

export { formatDollar, formatLiquidityToken, formatNpmToken, weiToToken }
