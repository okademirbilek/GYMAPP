export function convertTime(timestamp) {
  return new Date(timestamp.seconds * 1000).toDateString()
}
