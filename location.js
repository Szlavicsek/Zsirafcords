function initialize() {
  var address = document.getElementById('my-address');
  var autocomplete = new google.maps.places.Autocomplete(address);
  autocomplete.setTypes(['geocode']);
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }
  });
}

function codeAddress() {
  geocoder = new google.maps.Geocoder();
  var address = document.getElementById("my-address").value;
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {

      document.querySelector("#lat").innerText = "Latitude: " + results[0].geometry.location.lat().toFixed(5);
      document.querySelector("#lng").innerText = "Longitude: " + results[0].geometry.location.lng().toFixed(5);

      switchToResult();

      setTimeout(function() {
        result_El.style.opacity = "1";
        backButton.style.opacity = "1"
      }, 1000)

    } else {
      searchbar.style.border = "2px solid red";
      document.querySelector('.error_message').innerText = `${input_field.value} not found`;
      error_container.style.top = "0px";
      input_field.select();
      setTimeout(function() {
        searchbar.style.border = "0";
        error_container.style.top = "-30px"
      }, 3000)
      console.log("Geocode was not successful for the following reason: " + status);
    }
  });
}