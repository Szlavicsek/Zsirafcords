// main google places stuff
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

//get coordinates and display painted carousel

function codeAddress() {
  // geocoding
  geocoder = new google.maps.Geocoder();
  var address = document.getElementById("my-address").value;
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {

      // the coordinates
      let lat = results[0].geometry.location.lat().toFixed(5)
      let lng = results[0].geometry.location.lng().toFixed(5)

      // parse coordinates in darksky api get request
      // getWeather(lat, lng)
      //   .then(res => {
      //     phase1_hideGiraffeAndMoveSearchbarUp();
      //     setTimeout(phase2_showCarouselAndPopupGiraffe, 1000)
      //     paint(res)
      //     console.log(res)
      //   })
      //   .catch(err => console.log(err))
      $.ajax({
        method: 'GET',
        url: `http://cors.io/?https://api.darksky.net/forecast/7785c047482aadebef9226ce3e1340aa/${lat},${lng}?lang=hu&units=si&extend=hourly&exclude=minutely,alerts,flags`,
        dataType: 'jsonp', //change the datatype to 'jsonp' works in most cases
        success: (res) => {
          phase1_hideGiraffeAndMoveSearchbarUp();
          setTimeout(phase2_showCarouselAndPopupGiraffe, 1000)
          paint(res)
          console.log(res);
        },
        error: ((err) => {
          console.log(err);
        })
      })

      // setTimeout(function() {
      //   switchToResult()
      // }, 1000)

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

// component functions

// request for darksky weather data
// async function getWeather(lat, lng) {
//   const response = await fetch(`http://cors.io/?https://api.darksky.net/forecast/7785c047482aadebef9226ce3e1340aa/${lat},${lng}?lang=hu&units=si&extend=hourly&exclude=minutely,alerts,flags`)
//   const responseData = await response.json();
//   return responseData;
// }

// day converter
function getDay(stamp, index) {
  let day;
  if (index === 0) {
    day = "MA"
  } else if (index === 1) {
    day = "HOLNAP"
  } else {
    switch (new Date(stamp * 1000).getDay()) {
      case 0:
        day = "VASÁRNAP";
        break;
      case 1:
        day = "HÉTFŐ";
        break;
      case 2:
        day = "KEDD";
        break;
      case 3:
        day = "SZERDA";
        break;
      case 4:
        day = "CSÜTÖRTÖK";
        break;
      case 5:
        day = "PÉNTEK";
        break;
      case 6:
        day = "SZOMBAT";
    }
  }
  return day
}

// UI painter
function paint(data) {
  const carousel_items = Array.from(document.getElementsByClassName('item'))
  carousel_items.forEach((item, index) => {
    item.innerHTML =
      `<div class="single-day-container">
      <div class="info-container info-napkozben">
        <div class="day-data">
          <div class="dayname">
            <span class="day">${getDay(data.daily.data[index].time, index)}</span>
            <span class="napszak">napközben</span>
          </div>
          <div class="celsius-container">
            <span class="celsius-degree">${Math.round(data.daily.data[index].temperatureHigh)}</span>
            <span class="c">°C</span>
          </div>
          <div class="other-details-container">
            <div class="precipitation">

              <div class="detail-data">
                <span class="precipitation-data">${Math.round(data.daily.data[index].precipIntensityMax*100)}</span>
                <span class="precipitation-tag">mm</span>
              </div>
            </div>
            <div class="wind">
              <div class="detail-data">
                <span class="wind-data">${data.daily.data[index].windSpeed.toFixed(1)}</span>
                <span class="wind-tag">kmph</span>
              </div>
            </div>
          </div>
        </div>
        <div class="weather-icon">
        </div>
      </div>

      <div class="info-container info-este">
        <div class="day-data">
          <div class="dayname">
            <span class="day">${getDay(data.daily.data[index].time, index)}</span><span class="napszak">este</span>
          </div>
          <div class="celsius-container">
            <span class="celsius-degree">${Math.round(data.daily.data[index].temperatureLow)}</span>
            <span class="c">°C</span>
          </div>
          <div class="other-details-container">
            <div class="precipitation">
              <div class="symbol precipitation-symbol">
              </div>
              <div class="detail-data">
                <span class="precipitation-data">${Math.round(data.daily.data[index].precipIntensityMax*100)}</span>
                <span class="precipitation-tag">mm</span>
              </div>
            </div>
            <div class="wind">
              <div class="detail-data">
                <span class="wind-data">${data.daily.data[index].precipIntensityMax.toFixed(1)}</span>
                <span class="wind-tag">kmph</span>
              </div>
            </div>
          </div>
        </div>
        <div class="weather-icon">
        </div>
      </div>
    </div>
    `
  })
}