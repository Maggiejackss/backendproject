// const { application } = require("express");

let button = document.getElementById('test');
let apiCall = 'http://www.omdbapi.com/?i='
const form = document.getElementById('form');

const renderForm = () => {
  const credsContainer = form.querySelector('#credentials-container');
  const html = `
    <div class="input-field">
        <input type="text" name="username" id="username" placeholder="Enter Username">
    </div>
    <div class="input-field">
        <input type="password" name="password" id="password" placeholder="Enter Password">
    </div>
    <input type="submit" value="LogIn">
  `;
  credsContainer.innerHTML = html;
}


const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const stringified = stringifyFormData(data);
  const response = await doLogin(stringified);
  location.href = response.redirectTo;
  console.log(`The user is logged in: ${response.isAuthenticated}`);
};


const credsCheck = () => {
  if (location.href != 'http://localhost:8080/login') {
    return 
  } else {
    renderForm();
    form.addEventListener('submit', handleSubmit);
  }
}
credsCheck();
function stringifyFormData(fd) {
  const data = {};
  for (let key of fd.keys()) {
    data[key] = fd.get(key);
  }
  return JSON.stringify(data, null, 4);
}

// const 


const doLogin = async (body) => {
  const data = await fetch('/login', {
    body,
    headers: {
      "Content-Type": "application/json"
    },
    method: 'POST'
  });
  const response = await data.json();
  return response;
}

const randomNumbers = () => {
  let titleCode = 'tt1';
  let digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 1; i <= 6; i++) {
    let randomNumber = digits[Math.floor(Math.random() * digits.length)];
    titleCode += randomNumber;
  }
  return titleCode;
}

const callApi = async () => {
  const titleCode = randomNumbers();
  const response = await fetch(`http://www.omdbapi.com/?i=${titleCode}&plot=full&apikey=e74ffb63`);
  const data = await response.JSON;
  console.log(data);
}



button.addEventListener('click', callApi);

const addCookie = (name, value, maxAge) => {
  const cookie = `${name}=${value}; max-age=${maxAge}`;
  document.cookie = cookie;
};
const handleLogin = async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const stringified = stringifyFormData(data);
  const response = await doLogin(stringified);
  addCookie('loggedIn', 'true', 900); // set a cookie with the name 'loggedIn', value 'true', and max age of 900 seconds (15 minutes)
  location.href = response.redirectTo;
  console.log(`The user is logged in: ${response.isAuthenticated}`);
};
