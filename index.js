var binarysearch = require('binarysearch')

module.exports = function(startTime){
  var o = {
    timers:[],
    timerIds:{},
    interval_i:0,
    intervals:{},
    currentTime:startTime||0,
    processing:0,
    setTime:function(t){
      this.currentTime = t;
      this._executeTimers();
    },
    setTimeout:function(fn,time){
      binarysearch.insert(this.timers,{v:this.currentTime+time,fn:fn,i:++this.interval_i});
      this.timerIds[this.interval_i] = this.currentTime+time;
      return this.interval_i;
    },
    setInterval:function(fn,time){
      var z = this;
      var i = ++z.interval_i;
      (function intr(){
        z.setTimeout(function(){
          // check to see if it was cleared.
          if(!z.intervals[i]) return;
          intr();
          fn();
        },time);
      })();

      z.intervals[i] = true;
      return i;
    },
    clearInterval:function(i){
      delete this.intervals[i];
    },
    clearTimeout:function(i){
      if(timerIds[i] === undefined) return false;
      // this range will almost always have one item.
      // this range will contain all of the timeouts scheduled to fire at the exact same ms as the timeout you are trying to remove./
      var range = binarysearch.range(timers,timerIds[i],timerIds[i]);
      var start = range[0];
      while(start <= range[1]){
        if(timers[start].i === i) {
          timers.splice(start,1)
          delete timerIds[i];
          return true;
        }  
        ++start;
      }
    },
    _executeTimers:function(){
      var z = this;
      if(z.processing) {
        z.processing++;
        return;
      }

      z.processing = 1;
      process.nextTick(function(){
        z.processing--;

        while(z.timers[0] && z.timers[0].v <= z.currentTime){
          var o = z.timers.shift();
          delete z.timerIds[o.i];
          o.fn();
        }

        if(z.processing > 0) {
          z.processing = 0;
          z._executeTimers();
        }

      });
    }
  }

  return o;
}
