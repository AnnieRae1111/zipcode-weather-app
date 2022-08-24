const ApiKey = config.API_KEY;

let lat;
let long;
let zipcode;

//check that zipcode is valid
let regex = /^(\d{5})?$/;
let error = document.querySelector('.error');
let submitButton = document.querySelector('.submit-button');

const getZipCode = () => {
  let zipcode = document.querySelector('input').value;
  console.log(zipcode, 'zipcode');
  console.log(zipcode.length);
  return zipcode;
};

const validateZip = () => {
  let zip = document.getElementById('zipcode').value;
  let alert = document.getElementById('error');
  if (!regex.test(zip)) {
    alert.style.display = 'block';
    alert.innerHTML = 'Zip code must be 5 digits';
  } else {
    alert.style.display = 'none';
  }
};

submitButton.addEventListener('click', () => {
  zipcode = getZipCode();
  console.log(zipcode, 'zipcode');
  validateZip(zipcode);
  getWeather(zipcode);
});

const checkStatusAndAlert = (response) => {
  let notValid = document.getElementById('ziperror');
  if (!response.ok || response.status === 404) {
    notValid.innerHTML = 'Zip code entered is not a valid zip code';
    throw new Error(`Status code error:${response.status}`);
  } else {
    notValid.innerHTML = '';
    return response.json();
  }
};

const checkStatus = (response) => {
  if (!response.ok) {
    throw new Error(`Status code error:${response.status}`);
  } else {
    return response.json();
  }
};

const getWeather = (zipcode) => {
  fetch(
    `https://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},US&appid=${ApiKey}`
  )
    .then(checkStatusAndAlert)
    .then((data) => {
      console.log(data, 'openweather data');
      lat = data.lat;
      long = data.lon;
      console.log('lat', lat);
      console.log('long', long);
      return fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${ApiKey}&units=imperial`
      );
    })
    .then(checkStatus)
    .then((data) => {
      console.log(data, 'weather info');
      showWeather(data);
    });
};

const showWeather = (data) => {
  let { name } = data;
  let { description, icon } = data.weather[0];
  let { temp, humidity } = data.main;
  console.log(name, description, temp, humidity, icon);
  document.querySelector('.city').innerText = `Weather in ${name}:`;
  document.querySelector('.temperature').innerText = `Temperature: ${temp}°`;
  document.querySelector(
    '.description'
  ).innerText = `Today's Forecast: ${description}`;
  document.querySelector('.humidity').innerText = `Humidity: ${humidity}%`;
  document.querySelector(
    '.weather-symbol'
  ).src = `http://openweathermap.org/img/w/${icon}.png`;
};
