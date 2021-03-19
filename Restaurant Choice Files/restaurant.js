var menu = [];
var restaurant = [];
var restaurantResponses = [];
var numChoicesDone = 0;

fetch("http://localhost:8080/restaurantChoices") //NOTE: PROMISES ARE Asyncronous!!
.then(response => response.json()) //returns JSON of response
.then(json => { //JSON is still a string
  json = JSON.parse(json); //turn string into object to access parts
  for(var i = 0;i<5;i++){ //put the eventual API suggestions into the client side variables
    menu[i] = json.menu[i];
    restaurant[i] = json.restaurant[i];
  }
  document.getElementById("restaurantName").innerHTML = restaurant[0];
  document.getElementById("menuOption").innerHTML = menu[0];
})

function swipeYes(){ //2 means a yes
  restaurantResponses[numChoicesDone] = 2;
  numChoicesDone = numChoicesDone + 1;
  if(numChoicesDone == 5){ //NEED TO CHANGE THIS IF WE HAVE MORE THEN 5 OPTIONS
    postRestaurants();
  }

  else {
    document.getElementById("restaurantName").innerHTML = restaurant[numChoicesDone];
    document.getElementById("menuOption").innerHTML = menu[numChoicesDone];
  }
}

function swipeNo(){ //1 means a no
  restaurantResponses[numChoicesDone] = 1;
  numChoicesDone = numChoicesDone + 1;
  if(numChoicesDone == 5){ //NEED TO CHANGE THIS IF WE HAVE MORE THEN 5 OPTIONS
    postRestaurants();
  }

  else {
    document.getElementById("restaurantName").innerHTML = restaurant[numChoicesDone];
    document.getElementById("menuOption").innerHTML = menu[numChoicesDone];
  }
}

function postRestaurants(){
  fetch('http://localhost:8080/responseToDB', {
      method: 'POST',
      body: JSON.stringify(restaurantResponses),
      headers: {
          'Content-type': 'application/json; charset=UTF-8'
      }
  })
  .then(response => {
    window.location = "http://localhost:8080/waitingPage";
  });
}