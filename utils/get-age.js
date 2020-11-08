module.exports = function getAge(dateString) {
  const today = new Date()
  const birthDate = new Date(dateString)
  const age = today - birthDate

  return Math.floor((age / 31557600000) * 10) / 10
}
