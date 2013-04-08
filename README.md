[![Build Status](https://secure.travis-ci.org/soldair/node-logtime-interval.png)](http://travis-ci.org/soldair/node-logtime-interval)

logtime-interval
=======================

When you would like a timer callback to fire based on the timestamp of the data you are processing - the timestamp of the data stream when you created the timer rather than real time.

When you are processing older time series data may need to do a particular action for every one of a specific timespan of data.

```js

// create new manager starting at timestamp 0
var manager = require('logtime-interval')(0);

// create a timeout that should fire when i set the time to >= 1000
manager.setTimeout(function(){
  console.log(i fired!);
},1000)

// it is now 1000 ms since i started
manager.setTime(1000);

// next tick prints
// i fired !

```

api
---

module.exports is a function it returns a new object to manager timers.
  - manager

manager.setTime
  - sets the current time and triggers execution of any pending timers

manager.setTimeout
  - just like setTimeout
  
manager.setInterval
  - just like setInterval

manager.clearTimeout
  - setTimeout returns an id
  - if you pass that id to clearTimeout and it has not been called it will not be called 

manager.clearInterval
  - setInterval returns an id
  - if you pass that id to setInterval it will not be called again



