module.exports = function () {
  const today = new Date()
  if (today.getMonth() + 1 < 9) {
    return today.getFullYear() - 1
  }

  return today.getFullYear()
}
