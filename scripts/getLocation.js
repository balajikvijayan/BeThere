var map, infowindow, GeoMarker;
<<<<<<< HEAD
var markersArray = [];
=======
>>>>>>> ae7854f2e00d95ed8a7311aa0b8f2c2930b337d1

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
    GeoMarker = new GeolocationMarker(map);
    GeoMarker.setCircleOptions({fillColor: '#808080'});

<<<<<<< HEAD
    google.maps.event.addListenerOnce(GeoMarker, 'position_changed', function() {
      map.setCenter(myLocation);  
    });

    google.maps.event.addListener(GeoMarker, 'geolocation_error', function(e) {
      alert('There was an error obtaining your position. Message: ' + e.message);
    });

    GeoMarker.setMap(map);
=======
    GeoMarker = new GeolocationMarker();
    GeoMarker.setCircleOptions({fillColor: '#808080'});

    google.maps.event.addListenerOnce(GeoMarker, 'position_changed', function() {
        map.setCenter(this.getPosition());
      });

    google.maps.event.addListener(GeoMarker, 'geolocation_error', function(e) {
        alert('There was an error obtaining your position. Message: ' + e.message);
      });

    GeoMarker.setMap(map);
      
    var request = {
    		    location: myLocation,
    		    radius: 500
    		  };
>>>>>>> ae7854f2e00d95ed8a7311aa0b8f2c2930b337d1
    infowindow = new google.maps.InfoWindow();
    
    var input = /** @type {HTMLInputElement} */(
    	      document.getElementById('pac-input'));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    var searchBox = new google.maps.places.SearchBox(
    	    /** @type {HTMLInputElement} */(input));
    google.maps.event.addListener(searchBox, 'places_changed', function() {
        var places = searchBox.getPlaces();
        clearOverlays();

        markers = [];
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {
        	var marker = new google.maps.Marker({
        	    map: map,
        	    position: place.geometry.location
        	  });
        	  markersArray.push(marker);
              bounds.extend(place.geometry.location);
              var placeName = place.name.toString();
        	  google.maps.event.addListener(marker, 'click', (function(placeName) {
        		return function() {
        			infowindow.setContent(placeName);
        			infowindow.open(map, this);
        		}
        	  })(placeName));
        }
        map.fitBounds(bounds);
      });
    google.maps.event.addListener(map, 'bounds_changed', function() {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
      });
}

function clearOverlays() {
	  for (var i = 0; i < markersArray.length; i++ ) {
	    markersArray[i].setMap(null);
	  }
	  markersArray.length = 0;
}

google.maps.event.addDomListener(window, 'load', getLocation() );