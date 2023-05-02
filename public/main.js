// const { application } = require("express");

let button = document.getElementById('test');
let apiCall = 'http://www.omdbapi.com/?i='
const form = document.getElementById('form');
const credsContainer = form.querySelector('#credentials-container');

const credsCheck = () = {
  if 
}

function stringifyFormData(fd) {
  const data = {};
  for (let key of fd.keys()) {
    data[key] = fd.get(key);
  }
  return JSON.stringify(data, null, 4);
}

// const 

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const stringified = stringifyFormData(data);
  const response = await doLogin(stringified);
  /* `location.href = response.redirectTo;` is redirecting the user to a new page after they have
  successfully logged in. The `response.redirectTo` is the URL of the page that the user should be
  redirected to. By setting `location.href` to this value, the browser will navigate to the new
  page. */
  /* `location.href` is setting the URL of the current page to the value of `response.redirectTo`,
  which is the URL of the page that the user should be redirected to after they have successfully
  logged in. This will cause the browser to navigate to the new page. */
  location.href = response.redirectTo;
  console.log(`The user is logged in: ${response.isAuthenticated}`);
};

const renderForm = () => {
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


renderForm();
form.addEventListener('submit', handleSubmit);
button.addEventListener('click', callApi);