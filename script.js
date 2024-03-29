var scrollTotal = 800;
var scrolled = 0; // A variable to keep track of how far we've scrolled.
var fractionScrolled = scrolled / scrollTotal;


// You can read more about the mosuewheel event at https://developer.mozilla.org/en-US/docs/DOM/DOM_event_reference/mousewheel
if (document.addEventListener) {
	document.addEventListener("mousewheel", MouseWheelHandler, false);
}


var waypoints = document.getElementsByClassName('waypoint');
for (i = 0; i < waypoints.length; i++) {
	// Here we attach a handler to the click event for every waypoint,
	// https://developer.mozilla.org/en-US/docs/Web/Reference/Events/click
	waypoints[i].addEventListener("click", waypointClickHandler, false);
}

function updateWaypoints() {
	fractionScrolled = scrolled / scrollTotal;

	// 0 <= fractionScrolled <= 1, so *10 gives us 10; Math.floor rounds down
	var whichWaypoint = Math.max(0, Math.floor(fractionScrolled * 8) - 1);

	for (i = 0; i < 8; i++) {
		// Notice we constructed our li#id names to make this easy
		var currentWaypoint = document.getElementById('waypoint-' + i);
		
		if ( i == whichWaypoint ) {
			currentWaypoint.classList.add('active-waypoint');
		}
		
		else {
			currentWaypoint.classList.remove('active-waypoint');
		}
	}

	// Seek to the proportional time of the 22s clip of Lucy the dog jumping for joy
	document.getElementById('Lucy').currentTime = fractionScrolled * 22.0;
}

function waypointClickHandler(e) {
	console.log('e');
	for (i = 0; i < waypoints.length; i++) {
		if (waypoints[i] === this) {
			scrolled = (i+1)*100;
			updateWaypoints();
			console.log(scrolled);
		}
	}
}


function MouseWheelHandler(e) {
	// This function is called every time there's a mousewheelevent

	var rawScrolled = Math.max(-1, Math.min(1, e.wheelDelta));
	scrolled = Math.min(Math.max(0, scrolled - rawScrolled), scrollTotal);
	document.getElementsByTagName('header')[0].innerHTML = scrolled;
	updateWaypoints();
}

//Implements down function when next-triangle is clicked
var next = document.getElementById('next-triangle');
next.onclick = function() {
scrolled = (scrolled % 800) + 100;
updateWaypoints();
console.log(scrolled);
    
};
