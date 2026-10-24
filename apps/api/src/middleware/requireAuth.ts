function getTokenFromHeader(header: string | undefined): string | null {
  if (header === undefined) {
    return null
  }

  const parts = header.split(" ")

  if (parts.length !== 2) {
    return null
  }

  if (parts[0].toLowerCase() !== "bearer" || parts[1] === "") {
    return null
  }

  return parts[1]
}
