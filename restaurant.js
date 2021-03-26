function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

/* ========
Debugger plugin, simple demo plugin to console.log some of callbacks
======== */
var myPlugin = {
  name: 'debugger',
  params: {
    debugger: false,
  },
  on: {
    init: function (swiper) {
      if (!swiper.params.debugger) return;
      console.log('init');
      Right = false;
    },
    touchMove: function (swiper, touchmove){
        if(!swiper.params.debugger) return;
        direction = swiper.touches.diff;
        current_Index = swiper.activeIndex;
        last_Index = swiper.previousIndex;
        if(direction < 0){
        console.log('Left');
        Right = false;
        };
        if(direction > 0){
        console.log('Right');
        Right = true;
        };
    },
    touchEnd: function(swiper, touchEnd){
      console.log(Right);
      if(Right === true){
        swiper.slideNext(100,true);
        }
        Right = false;
  },
    slideChange: function (swiper) {
      if (!swiper.params.debugger) return;
      console.log('slideChange', this.previousIndex, '->', this.activeIndex);
    },
    realIndexChange: function (swiper) {
        if (!swiper.params.debugger) return;
      swiper.removeSlide(swiper.activeIndex-1);
      return;
    },
  },
};

// Install Plugin To Swiper
Swiper.use(myPlugin);

// Init Swiper
var swiper = new Swiper('.swiper-container', {
  // Enable debugger
  debugger: true,
});

var menu = [];
var restaurant = [];
var restaurantResponses = [];
var numChoicesDone = 0;

fetch("http://localhost:8080/restaurantChoices") //NOTE: PROMISES ARE Asyncronous!!
.then(response => response.json()) //returns JSON of response
.then(json => {
  json = JSON.parse(json);
  console.log(json);
  console.log(json[1]);
  // for(var i = 0;i<5;i++){ //put the eventual API suggestions into the client side variables
  //   menu[i] = json.menu[i];
  //   restaurant[i] = json.restaurant[i];
  // }
})

function postRestaurants(){
  fetch('http://localhost:8080/responseToDB', {
      method: 'POST',
      body: JSON.stringify(restaurantResponses),
      headers: {
          'Content-type': 'application/json; charset=UTF-8'
      }
  })
  .then(response => {
    window.location = "http://localhost:8080/";
  });
}
