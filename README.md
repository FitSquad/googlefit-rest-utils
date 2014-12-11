googlefit-rest-utils
====================

Utilities for Google Fit REST API

Install
-------
```
npm i --save googlefit-rest-utils
```

Usage
-----
Given
```javascript
var activityData = {
 "dataSourceId": "derived:com.google.distance.delta:com.google.android.gms:pruned_distance",
 "point": [
 ...
 ]
};

var distanceData = {
 "dataSourceId": "derived:com.google.activity.segment:com.google.android.gms:merge_activity_segments",
 "point": [
 ...
 ]
};
```
When
```javascript
  var gFitUtils = require('googlefit-rest-utils');
  var distanceByBucket = gFitUtils.bucketByActivityType(distanceData.point, activityData.point);
```
Then
```
   {
      '0': 345.123,
      '7': 123.35,
      ....
   }
```

About us
--------
http://www.fitsquadapp.com
  
