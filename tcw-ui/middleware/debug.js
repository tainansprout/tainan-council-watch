export default function ({ route }) {
  console.warn(`route: ${decodeURIComponent(route.fullPath)}`)
}
