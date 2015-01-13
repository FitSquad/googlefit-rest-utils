function millis(nanoString) {
  return parseInt(nanoString.substr(0, nanoString.length - 6));
}

function bucketByActivityType(dataPoints, activitySegments) {
  var dataIdx = 0;
  return activitySegments.reduce(function(results, activitySegment, activityIdx) {
    var proratedValue, dataPoint, dataStart, dataEnd;
    var activityType = activitySegment.value[0].intVal;
    var activityStart = millis(activitySegment.startTimeNanos);
    var activityEnd = millis(activitySegment.endTimeNanos);
    var allocated = false;

    while (
      (dataPoint = dataPoints[dataIdx]) &&
      (dataStart = millis(dataPoint.startTimeNanos)) &&
      (dataEnd = millis(dataPoint.endTimeNanos)) &&
      (dataEnd < activityStart)
    ) {
      dataIdx++;
    }

    while (
      (dataPoint = dataPoints[dataIdx]) &&
      (dataStart = millis(dataPoint.startTimeNanos)) &&
      (dataEnd = millis(dataPoint.endTimeNanos)) &&
      (value = dataPoint.value[0].fpVal || dataPoint.value[0].intVal) &&
      (proratedValue = prorate(value, dataStart, dataEnd, activityStart, activityEnd))
    ) {
      results[activityType] = (results[activityType] || 0.0) + proratedValue;
      allocated = true;
      dataIdx++;
    }

    if (allocated) {
      dataIdx--;
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
