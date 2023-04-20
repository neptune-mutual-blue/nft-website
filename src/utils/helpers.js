
/**
 * Function will check the length of text and trim it.
 * @param {string} text - Text to trim
 * @param {number} length - Check the length
 * @returns string
 */
export const trimText = (text, length) => {
  const checkLength = text.length > length

  return checkLength ? `${text.slice(0, length)}...` : text
}

/**
 * Function will convert text to lowercase and join with '-' hyphen
 * @param {string} text - Text to convert
 * @returns string
 */
export const formatText = (text) => {
  return text.toLowerCase().split(' ').join('-')
}
