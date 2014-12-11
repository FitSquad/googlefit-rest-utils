function millis(nanoString) {
  return parseInt(nanoString.substr(0, nanoString.length - 6));
}

function bucketByActivityType(distanceSegments, activitySegments) {
  var distanceIdx = 0;
  return activitySegments.reduce(function(results, activitySegment, activityIdx) {
    var proratedDistance, distanceSegment, distanceStart, distanceEnd;
    var activityType = activitySegment.value[0].intVal;
    var activityStart = millis(activitySegment.startTimeNanos);
    var activityEnd = millis(activitySegment.endTimeNanos);
    while (
      (distanceSegment = distanceSegments[distanceIdx]) &&
      (distanceStart = millis(distanceSegment.startTimeNanos)) &&
      (distanceEnd = millis(distanceSegment.endTimeNanos)) &&
      (distanceEnd < activityStart)
    ) {
      distanceIdx++;
    }
    if (distanceEnd <= activityEnd || distanceStart <= activityEnd) {
      while (
        (distanceSegment = distanceSegments[distanceIdx]) &&
        (distanceStart = millis(distanceSegment.startTimeNanos)) &&
        (distanceEnd = millis(distanceSegment.endTimeNanos)) &&
        (distance = distanceSegment.value[0].fpVal) &&
        (proratedDistance = prorate(distance, distanceStart, distanceEnd, activityStart, activityEnd))
      ) {
        results[activityType] = (results[activityType] || 0.0) + proratedDistance;
        distanceIdx++;
      }
      distanceIdx--;
    }
    return results;
  }, {});
}

function prorate(quantity, segmentStart, segmentEnd, from, to) {
  var fromTime = from.getTime ? from.getTime() : from;
  var toTime = to.getTime ? to.getTime() : to;
  var startTime = segmentStart.getTime ? segmentStart.getTime() : segmentStart;
  var endTime = segmentEnd.getTime ? segmentEnd.getTime() : segmentEnd;
  var segmentDuration = endTime - startTime;
  var prorateDuration = Math.min(toTime, endTime) - Math.max(fromTime, startTime);

  if (prorateDuration < 0) {
    return 0;
  }

  if (segmentDuration) {
    return quantity * prorateDuration / segmentDuration;
  } else {
    return quantity;
  }
}

exports.bucketByActivityType = bucketByActivityType;
exports.prorate = prorate;
