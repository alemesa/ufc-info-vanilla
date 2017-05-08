'use strict';

var table_body = document.querySelector('tbody');
var todayDate = document.querySelector('#date');
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var today = new Date();
var day = today.getDate();
var month = today.getMonth() + 1;
var monthDesc = months[month - 1];
var year = today.getFullYear();
todayDate.innerHTML = monthDesc + " " + day + ", " + year;
var eventsToDisplay = document.querySelector('.events');

var nav = document.querySelector('#main');
var topOfNav = nav.offsetTop;
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

//Using axios
axios.get('https://crossorigin.me/http://ufc-data-api.ufc.com/api/v3/iphone/fighters/title_holders').then(function (response) {

	var length = response.data.length;
	var fighters = response.data;

	for (var i = 0; i < length; i++) {

		if (fighters[i].nickname == null) {
			fighters[i].nickname = " ";
		}

		var wins = fighters[i].wins;
		var losses = fighters[i].losses;
		var draws = fighters[i].draws;

		table_body.innerHTML += '<tr><td><img src="' + fighters[i].profile_image + '" alt="" /></td><td>' + fighters[i].weight_class.replace("_", " ") + '<br></td><td>' + '<a href=' + fighters[i].link + ' target="_blank" >' + fighters[i].first_name + ' ' + fighters[i].last_name + '</a>' + '' + '<br>' + fighters[i].nickname + '</td><td>' + '<span class="wins">' + fighters[i].wins + '</span>' + '-' + '<span class="losses">' + fighters[i].losses + '</span>' + '-' + '<span class="draws">' + fighters[i].draws + '</span> (' + Math.floor(wins / (wins + losses + draws) * 100) + '%)';
	}
}).catch(function (error) {
	console.log(error);
});

axios.get('https://crossorigin.me/http://ufc-data-api.ufc.com/api/v3/iphone/events').then(function (response2) {

	var lengthEvents = response2.data.length;
	var events = response2.data;
	console.log(lengthEvents);

	for (i = 0; i < lengthEvents; i++) {

		console.log(events[i].event_date);
		var eventYear = events[i].event_date.slice(0, 4);
		var eventMonth = events[i].event_date.slice(5, 7);
		var eventDay = events[i].event_date.slice(8, 10);

		if (month <= eventMonth && year <= eventYear) {

			/*if(month == eventMonth && year == eventYear && day <= eventDay){
   	console.log('coming this month');
   }*/
			if (month == eventMonth && year == eventYear && day > eventDay) {
				console.log('passed event this month');
			} else {
				console.log('coming on the next months');

				if (events[i].trailerurl == null) {
					events[i].trailerurl = "#";
				}

				eventsToDisplay.innerHTML = '<div class="card"><img src="' + events[i].feature_image + '" alt="" /><div class="details"><h4>' + events[i].base_title + '</h4><h5>' + events[i].title_tag_line + '</h5><h6>' + events[i].arena + '</h6><h6>' + events[i].location + '</h6></div><div class="details"><span>' + months[eventMonth - 1] + ' ' + eventDay + '+,' + eventYear + '</span><a href="' + events[i].ticketurl + '"><i class="fa fa-ticket" aria-hidden="true"></i>Tickets</a><a href="' + events[i].trailerurl + '"><i class="fa fa-video-camera" aria-hidden="true"></i> Trailer</a></div></div>' + eventsToDisplay.innerHTML;
			}
		} else {
			//console.log('passed event');
			i = lengthEvents;
		}
	}

	for (var i = 0; i < lengthEvents; i++) {}
}).catch(function (error) {
	console.log(error);
});