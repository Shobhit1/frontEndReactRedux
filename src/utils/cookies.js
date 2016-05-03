const getAccessToken = () => {
  const accessToken = document.cookie.split()[0].trim().split('=')[1]
  return accessToken
}

export const clearCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}
export default getAccessToken
