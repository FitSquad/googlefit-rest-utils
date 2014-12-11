var assert = require('assert');
var gfitUtils = require('..');

describe('bucketByActivityType', function() {
  /*
                 1   2   3   4   5   6   7   8   9
        time     |---|---|---|---|---|---|---|---|
        activity |---7---|---1---|       |-7-|-0-|
        steps    |---| |----|     |-|  |----|
        distance |---| |----|    |-|       |----|
  */

  var bucketByActivityType = gfitUtils.bucketByActivityType;
  var activityData = require('./googlefit-activity.json');

  it('should bucket floating point segments by activity type', function() {
    var distanceData = require('./googlefit-distance.json');
    var expected = {
      '0': 64.28571428571429,
      '1': 61.53846153846154,
      '7': 174.17582417582418
    };
    assert.deepEqual(bucketByActivityType(distanceData.point, activityData.point), expected);
  });

  it('should bucket integer segments by activity type', function() {
    var stepData = require('./googlefit-steps.json');
    var expected = {
      '1': 61.53846153846154,
      '7': 200
    };
    assert.deepEqual(bucketByActivityType(stepData.point, activityData.point), expected);
  });
});

describe('prorate', function() {
  var prorate = gfitUtils.prorate;

  it('should handle non-overlap', function() {
    assert.equal(prorate(100, new Date(100), new Date(200), new Date(300), new Date(400)), 0);
  });

  it('should handle segment fully within challenge', function() {
    assert.equal(prorate(100, new Date(200), new Date(300), new Date(100), new Date(400)), 100);
  });

  it('should handle challenge fully within segment', function() {
    assert.equal(prorate(100, new Date(100), new Date(400), new Date(200), new Date(300)), 100/3);
  });

  it('should handle segment start within challenge', function() {
    assert.equal(prorate(100, new Date(200), new Date(400), new Date(100), new Date(300)), 50);
  });

  it('should handle segment end within challenge', function() {
    assert.equal(prorate(100, new Date(100), new Date(300), new Date(200), new Date(400)), 50);
  });

  it('should handle segment within challenge has no duration', function() {
    assert.equal(prorate(100, new Date(200), new Date(200), new Date(100), new Date(400)), 100);
  });

  it('should handle segment outside challenge with no duration', function() {
    assert.equal(prorate(100, new Date(400), new Date(400), new Date(100), new Date(300)), 0);
  });

  it('should handle segment at beginning of challenge with no duration', function() {
    assert.equal(prorate(100, new Date(400), new Date(400), new Date(100), new Date(400)), 100);
  });

  it('should handle segment at end of challenge with no duration', function() {
    assert.equal(prorate(100, new Date(100), new Date(100), new Date(100), new Date(400)), 100);
  });
});
