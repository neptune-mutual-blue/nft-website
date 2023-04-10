export const resourcesVideoData = async () => {
  const response = await fetch('https://cms.neptunedefi.com/api/videos?limit=4', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.CMS_API_AUTH_TOKEN}`
    }
  })
  const data = await response.json()

  return data
}
