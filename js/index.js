/*Header Transition*/
const nav = document.querySelector('#main');
const topOfNav = nav.offsetTop;

function fixNav() {
        if (window.scrollY >= topOfNav) {
            document.body.style.paddingTop = nav.offsetHeight;
            document.body.classList.add('fixed-nav');
        } else {
            document.body.classList.remove('fixed-nav');
            document.body.style.paddingTop = 0;
        }
    }
window.addEventListener('scroll', fixNav);


//Today's Date
var todayDate = document.querySelector('#date');
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var today = new Date();
var day = today.getDate();
var month = today.getMonth() + 1;
var monthDesc = months[month - 1];
var year = today.getFullYear();
todayDate.innerHTML = monthDesc + " " + day + ", " + year;

//Sections to add data
var eventsToDisplay = document.querySelector('#eventsSection');
var fightersToDisplay = document.querySelector('#fightersSection');
var searchDiv = document.querySelector('#searchSection');
var newsToDisplay = document.querySelector('#newsList');
var girlsToDisplay = document.querySelector('#girlsSection');

//Loaders
const fightersLoad = document.querySelector('.fightersLoad');
const eventsLoad = document.querySelector('.eventsLoad');
const newsLoad = document.querySelector('.newsLoad');

//Helper Functions

function getWeight(name){
	let returnValue;
	switch(name){
		case "Women_Featherweight": 
			returnValue = 145;
			break;
		case "Flyweight": 
			returnValue = 125;
			break;
		case "Bantamweight": 
			returnValue = 135;
			break;
		case "Featherweight": 
			returnValue = 145;
			break;
		case "Lightweight": 
			returnValue = 155;
			break;
		case "Welterweight": 
			returnValue = 170;
			break;
		case "Middleweight": 
			returnValue = 185;
			break;
		case "Light_Heavyweight": 
			returnValue = 205;
			break;
		case "Heavyweight": 
			returnValue = 265;
			break;
		case "Women_Strawweight": 
			returnValue = 115;
			break;
		case "Women_Bantamweight": 
			returnValue = 135;
			break;

	}
	return returnValue;
}

//Using axios for title holders
axios.get('https://crossorigin.me/http://ufc-data-api.ufc.com/api/v3/iphone/fighters/title_holders').then(function (response) {

	

	var length = response.data.length;
	var fighters = response.data;

	//Fix the order
	var temp = fighters.shift();
	fighters.push(temp);

	//Loop
	for (var i = 0; i < length; i++) {

		if (!fighters[i].nickname) {
			fighters[i].nickname = " ";
		}

		var wins = fighters[i].wins;
		var losses = fighters[i].losses;
		var draws = fighters[i].draws;


		


		fightersToDisplay.innerHTML += `<div class="championProfile">
											<div class="profilePic">
												<img src="${fighters[i].profile_image}" alt="${fighters[i].first_name}">
											</div>
											<div class="profileData">
												<div class="weightClass">
													<img class="icon trophyIcon" src="./images/icons/trophy.svg" alt="Trophy Icon">
													<p>&nbsp${fighters[i].weight_class.replace("_", " ")}&nbsp</p>
													
												</div>
												<a href="${fighters[i].link}" target="_blank">${fighters[i].first_name} ${fighters[i].last_name}</a>
												<p>${fighters[i].nickname}</p>
												<p>${getWeight(fighters[i].weight_class)} lbs.</p>
												<p>
													<span class="wins">${fighters[i].wins}</span><span class="losses">-${fighters[i].losses}-</span>
													<span class="draws">${fighters[i].draws}</span>
												</p>
											</div>
										</div>`;
	

}
	fightersLoad.style.display = "none";
}).catch(function (error) {
	console.log(error);
	fightersToDisplay.innerHTML += `There has been an error retrieving data => ${error}`;
});

//Using axios for events
axios.get('https://crossorigin.me/http://ufc-data-api.ufc.com/api/v3/iphone/events').then(function (response2) {

	var lengthEvents = response2.data.length;
	var events = response2.data;
	
	
	//console.log(lengthEvents);

	for (var i = 0; i < lengthEvents ; i++) {

		
		//console.log(events[i].event_date);
		var eventYear = events[i].event_date.slice(0, 4);
		var eventMonth = events[i].event_date.slice(5, 7);
		var eventDay = events[i].event_date.slice(8, 10);

			

			if(eventYear > year || (month <= eventMonth && year <= eventYear) ){
				/*if(month == eventMonth && year == eventYear && day <= eventDay){
   	console.log('coming this month');
   }*/
			if (month == eventMonth && year == eventYear && day > eventDay) {
				//console.log('passed event this month');
			} else {
				//console.log('coming on the next months');

				if (events[i].trailerurl == null) {
					events[i].trailerurl = "#";
				}

				const defaultImage = "http://imagec.ufc.com/http%253A%252F%252Fmedia.ufc.tv%252Ffeatures%252F019907_WEB_EventPlaceholderRebrand_PPV.jpg?-mw500-mh500-tc1";
				if(events[i].feature_image == defaultImage){
					events[i].feature_image = "../images/placeholder_event.jpg";
				}
					
				eventsToDisplay.innerHTML = `<div class="eventProfile">
												<div class="eventPic">
													<img src="${events[i].feature_image}" alt="${events[i].base_title}" />
												</div>
												<div class="eventData">
													<h4>${events[i].base_title}</h4>
													<h5>${events[i].title_tag_line}</h5>
													<p>${events[i].arena}, ${events[i].location}</p>
													<p>${months[eventMonth - 1]} ${eventDay}, ${eventYear}</p>
													<div class="extraInfo">
														<a href="${events[i].ticketurl}"><img class="icon" src="../images/icons/ticket.svg" alt="Ticket Icon"/>&nbsp&nbspTickets</a>
														<a href="${events[i].trailerurl}"><img class="icon" src="../images/icons/video-camera.svg" alt="Video Icon"/>&nbsp&nbspTrailer</a>
													</div>

												</div>
											</div>` + eventsToDisplay.innerHTML;

				}
		} else {
			//console.log('passed event');
			i = lengthEvents;
		}

			
	}

	eventsLoad.style.display = "none";
}).catch(function (error) {
	console.log(error);
	eventsToDisplay.innerHTML += `There has been an error retrieving data => ${error}`;
});


axios.get('https://crossorigin.me/http://ufc-data-api.ufc.com/api/v3/iphone/news').then(function (response3) {

	var lengthNews = response3.data.length;
	var news = response3.data;
	
	
	//console.log(lengthEvents);

	for (var i = 0; i < 12 ; i++) {

		console.log(news[i].title);
		newsToDisplay.innerHTML += `<li class="newsBullet">
										<a href="http://www.ufc.com/news/${news[i].url_name}" target="_blank">
											${news[i].title}
										</a>
										<span>
											&nbsp&nbsp${news[i].author ? news[i].author : "By UFC Staff"}
										</span>
									</li>`;
			
	}
	newsLoad.style.display = "none";
}).catch(function (error) {
	console.log(error);
	eventsToDisplay.innerHTML += `There has been an error retrieving data => ${error}`;
});