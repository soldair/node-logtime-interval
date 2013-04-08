var timeouts = require('../index.js');
var test = require('tap').test;

test("can setTimeout",function(t){
  var handler = timeouts();

  handler.setTimeout(function(){
    t.ok(true,"fired timeout");
    t.equals(handler.currentTime,1000);
    t.equals(handler.timers.length,0,'should have no more timeouts in the array.');
    t.end();
  },1000);

  handler.setTime(1000);  
});

test("can setInterval/ clearInterval",function(t){
  var handler = timeouts();

  var i = 0, intr;
  intr = handler.setInterval(function(){
    ++i;
    if(i === 1){
      t.ok(true,'fired first timeout')
      handler.setTime(2001);
    } else if(i === 2){
      handler.clearInterval(intr);
      handler.setTime(3000);
      process.nextTick(function(){
        t.equals(i,2,'i should equal 2 if clear interval worked');
        t.end();        
      });
    } else {
      t.fail("fired interval a third time");
    }

  },1000);

  handler.setTime(1000);  
});

