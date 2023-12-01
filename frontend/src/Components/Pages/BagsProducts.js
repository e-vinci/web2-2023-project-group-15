/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-loop-func */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */

import ProductLibrary from '../../Domain/ProductLibrary';
import SubCategoryLibrary from '../../Domain/SubCategoryLibrary';
import '../../stylesheets/_allproducts.scss';
import { clearPage } from '../../utils/render';
import { importAll } from '../../utils/utilsImages';

const productsImgs = importAll(require.context('../../img/products', true, /\.png$/));

let i = 0;
let btnAddToCart;
const BagsProducts = async () => {
  clearPage();
  const main = document.querySelector('main');

  async function getAllproducts(url) {
    const allProducts = await ProductLibrary.getAllProducts(url);
    return allProducts;
  }

  renderAllProductsCards();

  // show the products cards generated by the  addCard Product function
  async function renderAllProductsCards() {
    const url = 'category=bags';
    const container = document.createElement('div');
    container.className = 'container-products';
    container.id = 'container-products';
    container.innerHTML = await addCardProduct(url);
    main.appendChild(container);
  }

  //create an card for each product
  async function addCardProduct(url) {
    const products = await getAllproducts(url);
    let allCards = '';
    products?.forEach((product) => {
      allCards += `
            <a class="link-products" href="#" data-rui="/products/${product.id}">
                <div class="product-card" id="product-card">
                    <img class="product-img" src=${productsImgs[product.id - 1]} alt="${
        product.name
      } picture "/>
                    <h1 class="title-product" > ${product.name} </h1>
                    <h2 class="price-product" > ${product.price}€ </h1>
                </div>
            </a>
            `;
      i += 1;
    });
    return allCards;
  }
};

export default BagsProducts;
