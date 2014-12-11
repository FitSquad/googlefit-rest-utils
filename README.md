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
```javascript
  var gFitUtils = require('googlefit-rest-utils');
  var distanceByBucket = gFitUtils.bucketByActivityType(distanceData, activityData);
```

this should yield result
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
  
