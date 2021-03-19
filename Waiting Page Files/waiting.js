var update = setInterval(updateStatus,2000); //create a timer for 2.5 seconds

fetch("http://localhost:8080/username")
.then(response => response.json()) //returns JSON of response
.then(json => { //JSON is still a string
	json = JSON.parse(json); //turn string into object to access parts
	//var users = json[0];
	document.getElementById("user1").innerHTML = json[1] + " is ready!"; //main client is ready
  updateStatus();
})

function updateStatus (){ //check if other members are done
  fetch("http://localhost:8080/username")
  .then(response => response.json()) //returns JSON of response
  .then(json => { //JSON is still a string
  	var users = JSON.parse(json); //turn string into object to access parts
    my_name = users[1]; //client name is in array postion 1
    users = users[0]; //take all the info from the GET request and put into a variable
    for(var i = 0;i<2;i++){
			if(users[i].userName == my_name){
				//don't print it
			}
			else if (users[i].finished == 1) {
        document.getElementById("user2").innerHTML = users[i].userName + " is ready!";
        console.log("user 2 is ready");
        clearInterval(update);
        window.location = "http://localhost:8080/Results";
			}
      else {
        document.getElementById("user2").innerHTML = users[i].userName + " is deciding!";
      }
		}
  })
}