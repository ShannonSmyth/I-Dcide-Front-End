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

function DollarSigns(number){
  switch(number) {
  case 1:
    return "$";
   case 2:
    return "$$";
   case 3:
   return "$$$";
   case 4:
   return "$$$$";
   case 5:
  return "$$$$$";
  }
  }
  
// Install Plugin To Swiper
Swiper.use(myPlugin);

// Init Swiper
var swiper = new Swiper('.swiper-container', {
  spaceBetween: 30,
  // Enable debugger
  debugger: true,
});

var restaurantResponses = [];
var numChoicesDone = 0;
fetch("http://localhost:8080/restaurantChoices") //NOTE: PROMISES ARE Asyncronous!!
.then(response => response.json()) //returns JSON of response
.then(json => {
  var address = [];
  var name = [];
  var rating = [];
  var image = [];
  var priceLevel = [];
  restaurant = JSON.parse(json);
  for(var i = 0;i<5;i++){ //put the API suggestions into the client side variables
    var temp = restaurant[i]; //get the restaurant array which contains the other info
    name[i] = temp[0];
    rating[i] = temp[1];
    address[i] = temp[2];
    image[i] = temp[3];
    priceLevel[i] = temp[4];

  }
  //console.log(address);
  // console.log(image);
  document.getElementById("image1").src=image[0];
  document.getElementById("image2").src=image[1];
  document.getElementById("image3").src=image[2];
  document.getElementById("image4").src=image[3];
  document.getElementById("image5").src=image[4];
  document.getElementById("option1").innerHTML=name[0];
  document.getElementById("option2").innerHTML=name[1];
  document.getElementById("option3").innerHTML=name[2];
  document.getElementById("option4").innerHTML=name[3];
  document.getElementById("option5").innerHTML=name[4];
  document.getElementById("address1").innerHTML=address[0];
  document.getElementById("address2").innerHTML=address[1];
  document.getElementById("address3").innerHTML=address[2];
  document.getElementById("address4").innerHTML=address[3];
  document.getElementById("address5").innerHTML=address[4];
  document.getElementById("rating1").innerHTML=rating[0];
  document.getElementById("rating2").innerHTML=rating[1];
  document.getElementById("rating3").innerHTML=rating[2];
  document.getElementById("rating4").innerHTML=rating[3];
  document.getElementById("rating5").innerHTML=rating[4];
  document.getElementById("priceLevel1").innerHTML=DollarSigns(priceLevel[0]);
  document.getElementById("priceLevel2").innerHTML=DollarSigns(priceLevel[1]);
  document.getElementById("priceLevel3").innerHTML=DollarSigns(priceLevel[2]);
  document.getElementById("priceLevel").innerHTML=DollarSigns(priceLevel[3]);
  document.getElementById("priceLevel").innerHTML=DollarSigns(priceLevel[4]);
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
function GetCode(){
  fetch("http//localhost:8080/getCode")
  .then(response => response.json())
  .then(json => {
    document.getElementById("codeDisplay").innerHTML = json;
  })
}