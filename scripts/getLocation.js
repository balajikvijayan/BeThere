var map;
var infowindow;

function getLocation(){
      if (navigator.geolocation)
      {
          var options = {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0
          };
          navigator.geolocation.getCurrentPosition(initialize,error,options);
      }
      else
      { x.innerHTML= "Geolocation is not supported by this browser."; }
  }

function error(e) {
	console.log("error code:" + e.code + 'message: ' + e.message );
}

function initialize(position) {
	var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var myLocation = new google.maps.LatLng(lat, lng);
    var markers = [];
    
    var mapOptions = {
          center: new google.maps.LatLng(myLocation.lat(),myLocation.lng()),
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
    	};

    map = new google.maps.Map(document.getElementById("map-canvas"),
              mapOptions);

    var request = {
    		    location: myLocation,
    		    radius: 500
    		  };
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
    
    var input = /** @type {HTMLInputElement} */(
    	      document.getElementById('pac-input'));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    var searchBox = new google.maps.places.SearchBox(
    	    /** @type {HTMLInputElement} */(input));
    google.maps.event.addListener(searchBox, 'places_changed', function() {
        var places = searchBox.getPlaces();

        for (var i = 0, marker; marker = markers[i]; i++) {
          marker.setMap(null);
        }

        // For each place, get the icon, place name, and location.
        markers = [];
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {
          var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // Create a marker for each place.
          var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
          });

          markers.push(marker);

          bounds.extend(place.geometry.location);
        }

        map.fitBounds(bounds);
      });
    google.maps.event.addListener(map, 'bounds_changed', function() {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
      });
}

function callback(results, status) {
	  if (status == google.maps.places.PlacesServiceStatus.OK) {
	    for (var i = 0; i < results.length; i++) {
	      createMarker(results[i]);
	    }
	  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function center() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(initialLocation);
        });
    }
}

google.maps.event.addDomListener(window, 'load', getLocation() );