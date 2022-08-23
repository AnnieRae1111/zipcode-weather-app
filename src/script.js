const openWeatherApiKey = config.API_KEY;

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
