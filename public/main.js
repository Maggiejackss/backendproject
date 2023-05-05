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
/**
 * The function adds a cookie with a given name, value, and maximum age to the document's cookies.
 * @param name - The name of the cookie that you want to set. It is a string value.
 * @param value - The value parameter in the addCookie function is the value that you want to set for
 * the cookie. It can be any string value that you want to store as a cookie.
 * @param maxAge - The `maxAge` parameter is the maximum age of the cookie in seconds. After this time
 * has elapsed, the cookie will be automatically deleted by the browser.
 */
const addCookie = (name, value, maxAge) => {
  const cookie = `${name}=${value}; max-age=${maxAge}`;
  document.cookie = cookie;
};

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
    addCookie('loggedIn', 'true', 1800); 
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
