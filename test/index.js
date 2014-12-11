var assert = require('assert');
var gfitUtils = require('..');
var prorate = gfitUtils.prorate;

describe('prorate', function() {
  it('should handle non-overlap', function() {
    assert.equal(0, prorate(100, new Date(100), new Date(200), new Date(300), new Date(400)));
  });

  it('should handle segment fully within challenge', function() {
    assert.equal(100, prorate(100, new Date(200), new Date(300), new Date(100), new Date(400)));
  });

  it('should handle challenge fully within segment', function() {
    assert.equal(100 / 3, prorate(100, new Date(100), new Date(400), new Date(200), new Date(300)));
  });

  it('should handle segment start within challenge', function() {
    assert.equal(50, prorate(100, new Date(200), new Date(400), new Date(100), new Date(300)));
  });

  it('should handle segment end within challenge', function() {
    assert.equal(50, prorate(100, new Date(100), new Date(300), new Date(200), new Date(400)));
  });

  it('should handle segment within challenge has no duration', function() {
    assert.equal(100, prorate(100, new Date(200), new Date(200), new Date(100), new Date(400)));
  });

  it('should handle segment outside challenge with no duration', function() {
    assert.equal(0, prorate(100, new Date(400), new Date(400), new Date(100), new Date(300)));
  });
});
