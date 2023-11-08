export function convertTime(timestamp) {
  if (timestamp) {
    return new Date(timestamp.seconds * 1000).toDateString()
  }
}
