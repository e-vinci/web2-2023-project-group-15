/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';
import '../../stylesheets/_navbar.scss';
import profileIcon from '../../img/navbar/profileIcon.svg';
import shoppingCart from '../../img/navbar/shoppingCart.svg';
import GrandiosoVinciText from '../../img/navbar/GrandiosoVinci.svg';
import logo from '../../img/navbar/logo.svg';


/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */
const Navbar = () => {
  const navbarWrapper = document.querySelector('#navbarWrapper');
  const navbar = `
  <div class="flex-container">
    <div class="logoDiv">
      <a href="#home  class="logo" "><img src="${logo}" data-uri="/" alt="profile icon"></a>
    </div>
    <div class="logoTextDiv">
      <img src="${GrandiosoVinciText}" data-uri="/" id="shoppingCart" alt="profile icon">
    </div>
    <div class="containerIcons">
      <input type="text" placeholder="Search.." class="icon">
      <a href="#home" class="icon" ><img src="${profileIcon}" data-uri="/login" id="profileIcon" alt="profile icon" class="iconImg"></a>
      <a href="#about" class="icon"><img src="${shoppingCart}"  data-uri="/shoppingCart" id="shoppingCart" alt="profile icon" class="iconImg"></a>
      <a href="#about" class="navMenu">
        <div class="hamburger">
          <div class="hamburger__container">
            <div class="hamburger__inner"></div>
            <div class="hamburger__hidden"></div>
          </div>
         </div>
      </a>
    </div>
  </div>
  `;
  navbarWrapper.innerHTML = navbar;

};


export default Navbar;
