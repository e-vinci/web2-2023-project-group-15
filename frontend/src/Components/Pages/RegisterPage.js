/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import { getRememberMe, setRememberMe } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import UserLibrary from '../../Domain/UserLibrary';
import fond from '../../img/login-register/fond.png';
import degrade from '../../img/login-register/degrade.png';

const RegisterPage = () => {
  clearPage();
  renderPageTitle();
  renderRegisterForm();

};

function renderRegisterForm() {
  /*  student form  */
  const main = document.querySelector('main');
  const container = document.createElement('container');
  const maDiv = document.createElement('div');
  maDiv.className='row justify-content-around';
  maDiv.id = 'maDiv'
  maDiv.style.backgroundImage = `url(${degrade})`;
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
      <div class="card bg-transparent text-white" style="border-radius: 1rem; background: url(${fond}); background-size: cover">
          <div class="card-body px-5 py-2 text-center">

            <div class="mb-md-5 mt-md-4 pb-1">

              <h2 class="fw-bold mb-2 text-uppercase">SIGN UP</h2>
              
              <div class="form-outline form-white mb-2">
              <input type="text" id="firstname" class="form-control form-control-lg" placeholder = "firstname" required = true/>
              <label class="form-label" for="firstname"></label>
              </div>

              <div class="form-outline form-white mb-2">
              <input type="text" id="lastname" class="form-control form-control-lg" placeholder = "lastname" required = true/>
              <label class="form-label" for="lastname"></label>
              </div>

              <div class="form-outline form-white mb-2">
                <input type="email" id="registerUsername" class="form-control form-control-lg" placeholder = "email" required = true/>
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

              <input type="submit" class="btn btn-outline-light btn-lg px-5" value="SIGN UP" />
            
            </div>

          </div>
        </div>
      </div>
      </div>
  </div>
`
  form.addEventListener('submit', UserLibrary.prototype.onRegister);
 
}

// eslint-disable-next-line no-unused-vars
function onCheckboxClicked(e) {
  setRememberMe(e.target.checked);
}



export default RegisterPage;
