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

      // parse coordinates in API request)
      $.ajax({
        method: 'GET',
        url: `https://api.darksky.net/forecast/7785c047482aadebef9226ce3e1340aa/${lat},${lng}?lang=hu&units=si&exclude=minutely,hourly,alerts,flags`,
        dataType: 'jsonp',
        beforeSend: () => {
          pulsing_containers.forEach(pulse => pulse.style.display = "block")
          pulsing_containers.forEach(pulse => pulse.style.opacity = "1")
          pulsing_circles.forEach(circle => circle.classList.add("pulsing-animation-active"))
        },
        success: (res) => {

          if (!carousel.classList.contains("active")) {
            carousel.classList.add("active");
            phase1_hideGiraffeAndMoveSearchbarUp();
            setTimeout(phase2_showCarouselAndPopupGiraffe, 1000);
            paintCarouselItem(res);
          } else {
            paintCarouselItem(res)
            $(".owl-carousel").trigger("to.owl.carousel", [0, 500, true]);
            carousel_inners[0].classList.add("fade-in");
            setTimeout(function() {
              carousel_inners[0].classList.remove("fade-in");
            }, 1000)
          }
          setTimeout(function() {
            pulsing_containers.forEach(pulse => pulse.style.opacity = "0")
            setTimeout(function() {
              pulsing_circles.forEach(circle => circle.classList.remove("pulsing-animation-active"));
              pulsing_containers.forEach(pulse => pulse.style.display = "none")
            }, 1000)
          }, 1000)
        },
        error: ((err) => {
          searchbar.style.border = "2px solid red";
          document.querySelector('.error_message').innerText = `Hiba történt, kérlek próbáld újra.`;
          error_container.style.top = "0px";
          input_field.select();
          setTimeout(function() {
            searchbar.style.border = "0";
            error_container.style.top = "-30px"
          }, 3000)
        })
      })
    } else {
      searchbar.style.border = "2px solid red";
      document.querySelector('.error_message').innerText = `Csodálatos keresés volt, de nem találtam ${input_field.value} nevű helyet.`;
      error_container.style.transform = "translateY(0%)";
      input_field.select();
      setTimeout(function() {
        searchbar.style.border = "0";
        error_container.style.transform = "translateY(-100%)"
      }, 3000)
    }
  });
}

// COMPONENT FUNCTIONS

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

// get iconName

function getIcon(day) {
  let iconSVG;

  if (day.icon === "clear-day" || day.icon === "clear-night") {
    iconSVG = icons.find(icon => icon.iconName === "clear-day").svg
  } else if (day.icon === "rain") {
    if (day.precipIntensityMax >= 5) {
      iconSVG = icons.find(icon => icon.iconName === "rain-heavy").svg
    } else {
      iconSVG = icons.find(icon => icon.iconName === "rain-moderate").svg
    }
  } else if (day.icon === "wind") {
    if (day.cloudCover >= 0.3) {
      iconSVG = icons.find(icon => icon.iconName === "wind-cloud").svg
    } else {
      iconSVG = icons.find(icon => icon.iconName === "wind").svg
    }
  } else if (day.icon === "partly-cloudy-day" || day.icon === "partly-cloudy-night") {
    if (day.windSpeed >= 10) {
      iconSVG = icons.find(icon => icon.iconName === "partly-cloudy-day-with-wind").svg
    } else {
      iconSVG = icons.find(icon => icon.iconName === "partly-cloudy-day").svg
    }
  } else {
    iconSVG = icons.find(icon => icon.iconName === day.icon).svg
  }
  return iconSVG
}

// UI painter
function paintCarouselItem(data) {

  carousel_items.forEach((item, index) => {
    item.innerHTML =
      `
    <div class="dayname">${getDay(data.daily.data[index].time, index)}</div>
    <div class="weather-icon">
    ${getIcon(data.daily.data[index])}
    </div>
    <div class="summary">
      <p>${data.daily.data[index].summary}</p>
    </div>
    <div class="details">
      <div class="celsius">
        <div class="celsius-day"><span>${Math.round(data.daily.data[index].temperatureHigh)}</span>°C</div>
        <p class="celsius-night"> Este:
          <span>${Math.round(data.daily.data[index].temperatureLow)}</span>°C
        </p>
      </div>
      <div class="other-details">
        <div class="detail-icons">
          <svg class="detail-icon" version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.000000 121.000000" preserveAspectRatio="xMidYMid meet">
          <metadata>
          Created by potrace 1.15, written by Peter Selinger 2001-2017
          </metadata>
          <g transform="translate(0.000000,121.000000) scale(0.100000,-0.100000)"
          stroke="none">
          <path d="M276 1155 c-33 -304 -83 -488 -181 -672 -26 -48 -57 -106 -68 -127
          -26 -50 -27 -147 -2 -197 49 -98 152 -159 269 -159 82 0 144 22 202 73 61 54
          84 104 84 188 0 62 -3 71 -51 150 -114 186 -185 404 -220 674 -16 126 -25 145
          -33 70z"/>
          </g>
          </svg>
          <svg class="detail-icon" version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350.000000 145.000000" preserveAspectRatio="xMidYMid meet">
          <metadata>
          Created by potrace 1.15, written by Peter Selinger 2001-2017
          </metadata>
          <g transform="translate(0.000000,145.000000) scale(0.100000,-0.100000)"
          stroke="none">
          <path d="M715 1379 c-23 -103 -30 -245 -15 -307 29 -123 140 -204 256 -186 68
          10 150 74 95 74 -48 0 -151 67 -197 127 -26 36 -25 36 24 -10 52 -47 127 -88
          188 -101 28 -6 32 -4 47 31 25 59 28 90 16 136 -23 86 -79 121 -179 111 -62
          -6 -73 -4 -112 19 -51 29 -88 89 -88 141 0 59 -17 41 -35 -35z"/>
          <path d="M2644 1064 c-54 -19 -112 -78 -120 -120 -19 -100 58 -194 158 -194
          34 0 98 32 98 49 0 15 -76 71 -97 71 -11 0 -28 9 -38 19 -16 19 -16 21 10 45
          66 61 206 30 251 -56 34 -66 10 -169 -49 -212 -27 -19 -39 -21 -170 -17 -337
          11 -457 7 -532 -16 -95 -30 -178 -81 -275 -169 -44 -41 -97 -81 -117 -89 -128
          -54 -342 -31 -593 62 -101 38 -362 154 -357 159 2 2 44 -14 94 -36 140 -60
          230 -81 378 -87 160 -6 246 10 361 66 151 75 210 151 208 273 -1 78 -27 139
          -79 187 -73 67 -178 78 -268 29 -72 -40 -98 -133 -59 -208 30 -56 129 -96 185
          -75 11 5 12 14 4 50 -10 42 -12 45 -44 45 -34 0 -73 28 -73 54 0 34 36 59 91
          64 49 4 59 1 88 -24 63 -53 80 -143 38 -205 -33 -50 -120 -104 -217 -136 -75
          -25 -98 -28 -205 -27 -145 2 -224 21 -405 98 -70 30 -155 62 -190 71 -201 52
          -442 11 -634 -107 -92 -57 -96 -65 -62 -119 l28 -44 111 -2 c214 -3 416 -78
          612 -227 215 -163 409 -223 750 -233 306 -9 402 20 610 182 44 35 97 65 145
          82 69 26 86 28 210 27 147 0 186 -8 430 -84 240 -75 354 -88 435 -51 151 68
          190 327 71 468 -97 115 -296 107 -381 -15 -58 -85 -33 -223 48 -265 44 -23 95
          -17 122 13 10 11 16 22 14 23 -85 64 -99 80 -99 116 0 39 20 66 69 91 51 26
          139 -19 167 -87 34 -81 3 -207 -59 -240 -44 -22 -125 -12 -282 37 -289 90
          -349 102 -505 107 -222 7 -338 -29 -490 -152 -88 -72 -132 -97 -215 -120 -91
          -25 -297 -30 -440 -11 -243 32 -361 78 -525 202 -155 118 -260 176 -395 215
          l-60 18 71 0 c104 1 203 -28 402 -120 450 -207 756 -257 966 -158 27 12 86 57
          132 100 143 133 267 176 468 165 307 -17 383 -18 422 -7 66 18 118 63 150 128
          24 49 29 70 29 138 0 96 -20 142 -91 204 -76 67 -202 90 -300 55z"/>
          </g>
          </svg>
          <span class="detail-icon">UV</span>
        </div>
        <div class="detail-datas">
          <div class="detail precip">${data.daily.data[index].precipIntensity.toFixed(1)*4} mm</div>
          <div class="detail wind">${data.daily.data[index].windSpeed.toFixed(1)} km/h</div>
          <div class="detail uv">${data.daily.data[index].uvIndex}</div>
        </div>
      </div>
    </div>
    `
  })
}