import { AppConstants } from '@/constants/AppConstants'

export const formatNumber = (x, locale = AppConstants.PREFERRED_LOCALE, options = { maximumFractionDigits: 2 }) => {
  if (!x) {
    x = 0
  }

  if (isNaN(x)) {
    x = 0
  }

  if (typeof x === 'string') {
    x = Number(x)
  }

  const result = new Intl.NumberFormat(locale, options).format(x)
  return result
}
