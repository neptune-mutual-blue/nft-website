// Capitalize first letter of a string
function capitalizeFirstLetter (str) {
  if (!str) { return '' }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Decapitalize first letter of a string
function decapitalizeFirstLetter (str) {
  if (!str) { return '' }
  return str.charAt(0).toLowerCase() + str.slice(1)
}

export { capitalizeFirstLetter, decapitalizeFirstLetter }
