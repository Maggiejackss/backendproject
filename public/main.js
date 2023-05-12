// const { application } = require("express");
let button = document.getElementById('test');
const form = document.getElementById('form');
let body = document.getElementById('body');
let isModal = false;


let posterArray = [];

let position = 0;


const renderLogin = () => {
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

function renderModal(data) {
  const div = document.createElement('div');
  div.className = 'modal y-sticky';
  div.id = 'temp';
  body.append(div);
  modalForm(data);
  body.className = 'no-scroll';
  const cancelBtn = document.createElement('button');
  cancelBtn.innerText = 'cancel'
  div.append(cancelBtn)
  cancelBtn.addEventListener('click', handleCancel);
}

function handleModal(data) {
  isModal = true;
  renderModal(data);
}

function handleCancel() {
  let modal = body.querySelector('#temp');
  modal.remove();
  isModal = false;
  body.className = '';
}


const modalForm = (data) => {
  const modal = document.querySelector('#temp');
  if (modal) {
    const formDiv = document.createElement('div');
    const img = document.createElement('img');
    const titleDiv = document.createElement('div');
    const yearDiv = document.createElement('div');
    yearDiv.innerText = `${data.Year}`;
    titleDiv.innerText = `${data.Title}`;
    console.log(data);
    img.src = `${data.Poster}`;
    img.className = 'poster';
    const modalFormTemplate = `
      <div class="input-field">
          <input type="text" name="Review" id="Review" placeholder="Leave this movie a review!">
      </div>
      <div class="input-field">
          <input type="text" name="stars" id="stars" placeholder="Stars 1-5">
      </div>
      <input type="submit" value="Submit Review">
    `;
    modal.addEventListener('submit', reviewSubmit);
    formDiv.innerHTML = modalFormTemplate;
    modal.append(img);
    modal.append(titleDiv);
    modal.append(yearDiv);
    modal.append(formDiv);
  }
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

const pullRecommended = async () => {
    const response = await fetch('https://s3.amazonaws.com/popular-movies/movies.json');
    const data = await response.json();
    console.log(data);
    return data;
  }
  
  const createPosterCard =  (data) => {
    for (let i = 0; i < data.length; i++) {
      let button = document.createElement('button'); 
      let posterDisplay = document.createElement('img');
      button.type = 'button';
      posterDisplay.src = `${data[i].poster_url}`;
      posterDisplay.className = 'poster';
      posterDisplay.innerHTML = `${data[i].title}`;
      button.append(posterDisplay);
      posterArray.push(button);
      button.addEventListener('click', async () => {
        const _data = await fetch("/search", {
          method: "GET",
          headers: {
            title: `${data[i].title}`,
            imdb_id: `${data[i].imdb_id}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "*"
          }
        }) 
        let _response = await _data.json();
        handleModal(_response);
      });
    
    }
  }
  

const checkMain = async () => {
  let mainPage = document.querySelector('#apiDisplay');
  if (mainPage) {
    let data = await pullRecommended();
    let array = createPosterCard(data);
    createFilmDisplay(posterArray);
    buttonHandler();
  }
}
checkMain();


const createFilmDisplay = (array) => {
  let apiDisplay = document.querySelector('#apiDisplay');
  apiDisplay.innerHTML = '';
  let currentPoster = array[position];
  apiDisplay.append(currentPoster);
}

const buttonUp = () => {
  if (position === 15) {
    position === 0;
    createFilmDisplay(posterArray);
  } else {
    position += 1;
    createFilmDisplay(posterArray);
  }
}

const buttonDown = () => {
  if (position === 0) {
    position === 15;
    createFilmDisplay(posterArray);
  } else {
    position -= 1;
    createFilmDisplay(posterArray);
  }
}

const buttonHandler = async () => {
  let apiDisplay = document.querySelector('#apiDisplay');
  if (apiDisplay) {
    const forward = document.getElementById('forward');
    const backward = document.getElementById('backward');
    forward.addEventListener('click', buttonUp);
    backward.addEventListener('click', buttonDown);
  } else {
    console.log('no display');
  }
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
/**
 * The function adds a cookie with a given name, value, and maximum age to the document's cookies.
 * @param name - The name of the cookie that you want to set. It is a string value.
 * @param value - The value parameter in the addCookie function is the value that you want to set for
 * the cookie. It can be any string value that you want to store as a cookie.
 * @param maxAge - The `maxAge` parameter is the maximum age of the cookie in seconds. After this time
 * has elapsed, the cookie will be automatically deleted by the browser.
 */


const reviewSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const stringified = stringifyFormData(data);
  const response = await doReview(stringified);
  location.href = response.redirectTo;
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
    renderLogin();
    addCookie('loggedIn', 'true', 1800); 
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

/**
 * The function converts form data into a JSON string.
 * @param fd - fd is a FormData object, which is a built-in JavaScript object that allows you to easily
 * construct a set of key/value pairs representing form fields and their values. It is commonly used to
 * send form data to a server via an HTTP request.
 * @returns The function `stringifyFormData` returns a JSON string representation of the data in the
 * provided `FormData` object, with a 4-space indentation.
 */
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

const doReview = async (body) => {
  const data = await fetch('/', {
    body,
    headers: {
      "Content-Type": "application/json"
    },
    method: 'POST'
  });
  const response = await data.json();
  return response;
}
// const randomNumbers = () => {
//   let titleCode = 'tt1';
//   let digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
//   for (let i = 1; i <= 6; i++) {
//     let randomNumber = digits[Math.floor(Math.random() * digits.length)];
//     titleCode += randomNumber;
//   }
//   return titleCode;
// }

const callApi = async () => {
  console.log(title);
  const response = await fetch(`/search/?t=${title}`);
  const data = await response.json();
  console.log(data);
  // if (data.genre != )
}



