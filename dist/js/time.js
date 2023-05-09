console.clear();

function CountdownTracker(label, value) {
  var el = document.createElement("span");

  el.className = "flip-clock__piece";
  el.innerHTML =
    '<b class="flip-clock__card card"><b class="card__top"></b><b class="card__bottom"></b><b class="card__back"><b class="card__bottom"></b></b></b>' +
    '<span class="flip-clock__slot">' +
    label +
    "</span>";

  this.el = el;

  var top = el.querySelector(".card__top"),
    bottom = el.querySelector(".card__bottom"),
    back = el.querySelector(".card__back"),
    backBottom = el.querySelector(".card__back .card__bottom");

  this.update = function (val) {
    val = ("0" + val).slice(-2);
    if (val !== this.currentValue) {
      if (this.currentValue >= 0) {
        back.setAttribute("data-value", this.currentValue);
        bottom.setAttribute("data-value", this.currentValue);
      }
      this.currentValue = val;
      top.innerText = this.currentValue;
      backBottom.setAttribute("data-value", this.currentValue);

      this.el.classList.remove("flip");
      void this.el.offsetWidth;
      this.el.classList.add("flip");
    }
  };

  this.update(value);
}

// Calculation adapted from https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  return {
    Total: t,
    'N G À Y': Math.floor(t / (1000 * 60 * 60 * 24)),
    'G I Ờ': Math.floor((t / (1000 * 60 * 60)) % 24),
  };
}

function getTime() {
  var t = new Date();
  return {
    Total: t,
    'P H Ú T': Math.floor((t / 1000 / 60) % 60),
    'G I Â Y': Math.floor((t / 1000) % 60),
  };
}

function Clock(countdown, callback) {
  countdown = countdown ? new Date(Date.parse(countdown)) : false;
  callback = callback || function () {};
  var updateFn = countdown ? getTimeRemaining : '';

  this.el = document.createElement("div");
  this.el.className = "flip-clock";

  var trackers = {},
    t = updateFn(countdown),
    key,
    timeinterval;

  for (key in t) {
    if (key === "Total") {
      continue;
    }
    trackers[key] = new CountdownTracker(key, t[key]);
    this.el.appendChild(trackers[key].el);
  }

  var i = 0;
  function updateClock() {
    timeinterval = requestAnimationFrame(updateClock);

    // throttle so it's not constantly updating the time.
    if (i++ % 10) {
      return;
    }

    var t = updateFn(countdown);
    if (t.Total < 0) {
      cancelAnimationFrame(timeinterval);
      for (key in trackers) {
        trackers[key].update(0);
      }
      callback();
      return;
    }

    for (key in trackers) {
      trackers[key].update(t[key]);
    }
  }

  setTimeout(updateClock, 500);
}
var timeday = new Date().getTime()
var timeend = new Date('2021-01-29T16:30:00').getTime()
var timecount = timeend - timeday
var deadline = new Date(Date.parse(new Date()) + timecount);
var c = new Clock(deadline, function () {
});
document.getElementById("timeDay").appendChild(c.el);

