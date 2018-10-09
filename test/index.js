"use strict";

var mocha = require("mocha")
var assert = require("assert")
var redact = require("..")

describe("redact(str)", function() {

  it("returns non-URLs untouched", function() {
    assert.equal(redact("not-a-url"), "not-a-url")
  })

  it("returns clean URLs untouched", function() {
    assert.equal(redact("https://github.com/"), "https://github.com/")
  })

  it("replaces auth credentials in URL strings with 'REDACTED'", function() {
    assert.equal(redact("https://zeke:password@github.com/zeke/outlet"), "https://REDACTED@github.com/zeke/outlet")
    assert.equal(redact("https://:123456789@github.com/zeke/outlet"), "https://REDACTED@github.com/zeke/outlet")
  })

  it("accepts an optional replacement arugment", function() {
    assert.equal(redact("https://zeke:password@github.com/zeke/outlet", ""), "https://github.com/zeke/outlet")
    assert.equal(redact("https://zeke:password@github.com/zeke/outlet", "xxx"), "https://xxx@github.com/zeke/outlet")
  })

  it("supports git+http(s) URLs", function() {
    assert.equal(redact("git+https://zeke:password@github.com/zeke/outlet", ""), "git+https://github.com/zeke/outlet")
    assert.equal(redact("git+http://zeke:password@github.com/zeke/outlet", "xxx"), "git+http://xxx@github.com/zeke/outlet")
  })

  it("supports git+ssl URLs", function() {
    assert.equal(redact("git+ssl://zeke:password@github.com/zeke/outlet", ""), "git+ssl://github.com/zeke/outlet")
  })

  it("supports URLs with ports", function() {
    assert.equal(redact("http://zeke:password@github.com:1234/zeke/outlet"), "http://REDACTED@github.com:1234/zeke/outlet")
  });

  it("supports URLs unusual protocols", function() {
    assert.equal(redact("amqp://zeke:password@github.com:1234/zeke/outlet"), "amqp://REDACTED@github.com:1234/zeke/outlet")
  });

  describe("redacts query parameters with secret-sounding names", function() {

    it("token", function() {
      assert.equal(redact("https://api.github.com/repos/lunchbunny/lunchbunny-config/tarball/master?access_token=12345"), "https://api.github.com/repos/lunchbunny/lunchbunny-config/tarball/master?access_token=REDACTED")
    })

    it("secret", function() {
      assert.equal(redact("https://example.com/?secret_word=123"), "https://example.com/?secret_word=REDACTED")
    })

    it("password", function() {
      assert.equal(redact("https://example.com/?password=123"), "https://example.com/?password=REDACTED")
    })

    it("key", function() {
      assert.equal(redact("https://example.com/?a=1&key=2"), "https://example.com/?a=1&key=REDACTED")
    })

  })


})
