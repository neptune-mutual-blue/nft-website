const abbreviateAccount = (input) => {
  if (!input || input.length < 26) {
    return ''
  }

  return input.slice(0, 4) + '...' + input.slice(-6)
}

export { abbreviateAccount }
