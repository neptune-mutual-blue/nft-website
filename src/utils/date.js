function getDateInFormat (timestamp) {
  const isoString = new Date(timestamp || 0).toISOString()
  const [, year, month, date, hour, mins] = isoString.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/)

  const shortYear = `${year.toString()[2]}${year.toString()[3]}`
  return `${month}-${date}-${shortYear}. ${hour}:${mins} UTC`
}

export { getDateInFormat }
