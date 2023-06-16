const signMessage = async (library, message) => {
  if (!library || !library.getSigner) { return '' }

  const signer = library.getSigner()
  const res = await signer.signMessage(message)

  return res
}

export { signMessage }
