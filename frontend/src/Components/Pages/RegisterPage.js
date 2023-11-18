/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import { getRememberMe, setAuthenticatedUser, setRememberMe } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const RegisterPage = () => {
  clearPage();
  renderPageTitle();
  renderRegisterForm();
  renderLoginForm();
};

function renderRegisterForm() {
  /*  student form  */
  const main = document.querySelector('main');
  const container = document.createElement('container');
  const maDiv = document.createElement('div');
  maDiv.className='row justify-content-around';
  maDiv.id = 'maDiv'
  const maDiv2 = document.createElement('div');
  maDiv2.className= 'col-5';
  const form = document.createElement('form');
  form.className='registerForm'
  const rememberme = document.createElement('input');
  const remembered = getRememberMe();
  rememberme.checked = remembered;
  rememberme.addEventListener('click', onCheckboxClicked);
  maDiv2.appendChild(form);
  maDiv.appendChild(maDiv2);
  container.appendChild(maDiv);
  main.appendChild(container);

  form.innerHTML=
  ` 
  <div class="container-fluid py-3 h-100">
    <div class="row d-flex  align-items-center h-100">
      <div class="col-12 ">
        <div class="card bg-dark text-white" style="border-radius: 1rem;">
          <div class="card-body px-5 py-2 text-center">

            <div class="mb-md-5 mt-md-4 pb-1">

              <h2 class="fw-bold mb-2 text-uppercase">Register</h2>
              <p class="text-white-50 mb-5">Enter your username and your password!</p>

              <div class="form-outline form-white mb-2">
                <input type="text" id="registerUsername" class="form-control form-control-lg" placeholder = "username" required = true/>
                <label class="form-label" for="registerUsername"></label>
              </div>

              <div class="form-outline form-white mb-2">
                <input type="password" id="registerPassword" class="form-control form-control-lg" placeholder = "password" required = true/>
                <label class="form-label" for="registerPassword"></label>
              </div>

            <div class="form-outline form-white mb-2">
              <input type="password" id="registerConfPassword" class="form-control form-control-lg" placeholder = "confirm your password" required = true/>
              <label class="form-label" for="registerConfPassword"></label>
            </div>

             
           
              <div class="mb-3 form-check">
                 <input type="checkbox" id="rememberme" class="form-check-input" checked="${getRememberMe()}"/>
              <label class="form-check-label" for="rememberme">Remember me</label>
              </div>

              <input type="submit" class="btn btn-outline-light btn-lg px-5" value="Register" />
            
            </div>

          </div>
        </div>
      </div>
      </div>
  </div>
`
 form.addEventListener('submit', onRegister);

}

// eslint-disable-next-line no-unused-vars
function onCheckboxClicked(e) {
  setRememberMe(e.target.checked);
}

async function onRegister(e) {
  e.preventDefault();

  const mail = document.querySelector('#registerUsername').value;
  const registerPassword = document.querySelector('#registerPassword').value;
  const registerConfPassword = document.querySelector('#registerConfPassword').value;

  if(registerPassword !== registerConfPassword) {
    throw new Error(`The password is not the same`);
  }

  const options = {
    method: 'POST',
    body: JSON.stringify({
      "username": mail,
      "password": registerPassword,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${process.env.API_BASE_URL}/auths/register`, options);
  const authenticatedUser = await response.json();

  try{
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    setAuthenticatedUser(authenticatedUser);
    Navbar();
    Navigate('/');
  }catch(error){
    alert(authenticatedUser);
  }
  
}


function renderLoginForm() {
  const maDiv = document.getElementById('maDiv');
  const maDiv2 = document.createElement('div');
  maDiv2.className= 'col-5';
  const loginForm = document.createElement('form');
  loginForm.className='loginform';
  maDiv2.appendChild(loginForm);
  maDiv.appendChild(maDiv2);
  loginForm.addEventListener('submit', onLogin);

  loginForm.innerHTML=
  ` 
  <div class="container-fluid py-3 h-100">
    <div class="row d-flex align-items-center h-100">
      <div class="col-12">
        <div class="card bg-dark text-white" style="border-radius: 1rem;">
          <div class="card-body px-5 py-3 text-center">

            <div class="mb-md-5 mt-md-4 pb-1 ">

              <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
              <p class="text-white-50 mb-5">Enter your username and your password !</p>

              <div class="form-outline form-white mb-4">
                <input type="text" id="loginUsername" class="form-control form-control-lg" placeholder = "username" />
                <label class="form-label" for="loginUsername"></label>
              </div>

              <div class="form-outline form-white mb-4">
                <input type="password" id="loginPassword" class="form-control form-control-lg" placeholder = "password" />
                <label class="form-label" for="loginPassword"></label>
              </div>

              <input type="submit" class="btn btn-outline-light btn-lg px-5" value="Login" />

            </div>

          </div>
        </div>
      </div>
    </div>
    </div>
 ` 
}

async function onLogin(e) { 
  e.preventDefault();

  const mail = document.querySelector('#loginUsername').value;
  const password = document.querySelector('#loginPassword').value;

  const options = {
    method: 'POST',
    body: JSON.stringify({
      "username": mail,
      "password": password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/auths/login`, options);

    if (!response.ok) {
      throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const authenticatedUser = await response.json();
      setAuthenticatedUser(authenticatedUser);
      Navbar();     
      Navigate('/');
    } else {
      alert('Login failed: Server response is not in JSON format.');
    }
  } catch (error) {
    
    alert(error.message);
  }
}


export default RegisterPage;