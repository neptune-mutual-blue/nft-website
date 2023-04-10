export const resourcesVideoData = async () => {
  const response = await fetch('https://neptunemutual.com/cache/videos.json')
  const data = await response.json()

  return data
}
