// const { application } = require("express");

let button = document.getElementById('test');
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
    <input type="submit" value="Log In">
  `;
  credsContainer.innerHTML = html;
}

const renderSignUp = () => {
  const credsContainer = form.querySelector('#credentials-container');
  const html = `
    <div class="input-field">
        <input type="text" name="username" id="username" placeholder="Enter Username">
    </div>
    <div class="input-field">
        <input type="password" name="password" id="password" placeholder="Enter Password">
    </div>
    <div class="input-field">
        <input type="email" name="email" id="email" placeholder="Enter Email">
    </div>
    <input type="submit" value="Sign Up">
  `;
  credsContainer.innerHTML = html;
}

const loginSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const stringified = stringifyFormData(data);
  const response = await doLogin(stringified);
  location.href = response.redirectTo;
  console.log(`The user is logged in: ${response.isAuthenticated}`);
};

const signUpSubmit = async (e) => {
  console.log('in signupsubmit');
  e.preventDefault();
  const data = new FormData(e.target);
  const stringified = stringifyFormData(data);
  const response = await doSignUp(stringified);
  location.href = response.redirectTo;
  console.log(`The user is logged in: ${response.isAuthenticated}`);
};


const credsCheck = () => {
  if (location.href != 'http://localhost:8080/login') {
    return 
  } else {
    renderForm();
    form.addEventListener('submit', loginSubmit);
  }
}
credsCheck();

const signCheck = () => {
  if (location.href != 'http://localhost:8080/signup') {
    return 
  } else {
    renderSignUp();
    form.addEventListener('submit', signUpSubmit);
  }
}
signCheck();

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

const doSignUp = async (body) => {
  console.log('in dosignup');
  const data = await fetch('/signup', {
    body,
    headers: {
      "Content-Type": "application/json"
    },
    method: 'POST'
  });
  const response = await data.json();
  console.log(response);
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
  console.log(titleCode);
  const response = await fetch(`http://www.omdbapi.com/?i=${titleCode}&plot=full&apikey=e74ffb63`);
  const data = await response.json();
  console.log(data);
}


