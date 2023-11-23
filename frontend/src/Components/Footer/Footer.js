import GrandiosoVinciText from '../../img/Footer/GrandiosoVinciWhite.svg';
import ShopInFooter from '../../img/Footer/shopInFooter.svg'
import '../../stylesheets/_footer.scss';

const Footer = () => {
  const footerWrapper = document.querySelector('#footerWrapper');
  const footer = ` 
   <footer class="footer-container">
      <div class="footer-content">
        <img src="${ShopInFooter}" alt="Grandioso Vinci" class="left-text">
        <img src="${GrandiosoVinciText}" alt="Grandioso Vinci" class="centered-image">
        <div class="right-text">
          <span>Legal & Privacy</span>
          <span>Cookies</span>
        </div>
      </div>
   </footer>`;

   footerWrapper.innerHTML = footer;
};

export default Footer;
