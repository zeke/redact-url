var isURL = require("is-url")
var url = require("url")

var redact = module.exports = function(input, replacement) {

  if (!isURL(input)) return input

  var parsedURL = url.parse(input)

  if (parsedURL.auth) {
    parsedURL.auth = (typeof(replacement) === "string" ? replacement : "REDACTED")
  }

  return url.format(parsedURL)
}
