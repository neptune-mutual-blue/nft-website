export const resourcesVideoData = async () => {
  try {
    const response = await fetch('https://neptunemutual.com/cache/videos.json')
    const data = await response.json()

    return data.docs.slice(0, 4)
  } catch (error) {
    console.error(error)
  }
}
