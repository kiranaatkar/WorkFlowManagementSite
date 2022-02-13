function getCookieObj() {
  const cookies = document.cookie.split('; ')
  if (!cookies) return false
  const cookieObjects = {}
  cookies.forEach((cookie) => {
    const [name, value] = cookie.split('=')
    cookieObjects[name] = value
  })
  return cookieObjects
}

export default getCookieObj

// Convert to class - method for all cookies & for one cookie by name.
