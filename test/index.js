var mocha = require("mocha")
var assert = require("assert")
var redact = require("..")

describe("redact(str)", function() {

  it("replaces auth credentials in URL strings with 'REDACTED'", function() {
    assert.equal(redact("https://zeke:password@github.com/zeke/outlet"), "https://REDACTED@github.com/zeke/outlet")
    assert.equal(redact("https://:123456789@github.com/zeke/outlet"), "https://REDACTED@github.com/zeke/outlet")
  })

  it("returns unauthenticated URLs untouched", function() {
    assert.equal(redact("https://github.com/"), "https://github.com/")
  })

  it("returns non-URLs untouched", function() {
    assert.equal(redact("not-a-url"), "not-a-url")
  })

  it("accepts an optional replacement arugment", function() {
    assert.equal(redact("https://zeke:password@github.com/zeke/outlet", ""), "https://github.com/zeke/outlet")
    assert.equal(redact("https://zeke:password@github.com/zeke/outlet", "xxx"), "https://xxx@github.com/zeke/outlet")
  })

})
