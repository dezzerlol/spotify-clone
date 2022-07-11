export const getGBColor = (id) => {
  const colors = ['red', 'green', 'blue', 'orange', 'gray', 'purple', 'yellow', 'teal']
  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
}
