fetch("http://localhost:8080/sendResults")
.then(response => response.json()) //returns JSON of response
.then(json => { //JSON is still a string
	var users = JSON.parse(json); //turn string into object to access parts
  my_name = users[1]; //client name is in array postion 1
  users = users[0]; //take all the info from the GET request and put into a variable
  for(var i = 0;i<2;i++){
		if(users[i].userName == my_name){
			document.getElementById("user1").innerHTML = `${my_name} responds with ${users[i].choice1}, ${users[i].choice2}, ${users[i].choice3}, ${users[i].choice4}, ${users[i].choice5}`;
		}
    else {
    document.getElementById("user2").innerHTML = `${users[i].userName} responds with ${users[i].choice1}, ${users[i].choice2}, ${users[i].choice3}, ${users[i].choice4}, ${users[i].choice5}`;
    }
	}
})
