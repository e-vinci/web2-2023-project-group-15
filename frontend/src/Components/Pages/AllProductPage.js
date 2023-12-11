/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-loop-func */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
//// test 
import ProductLibrary from '../../Domain/ProductLibrary';
import SubCategoryLibrary from '../../Domain/SubCategoryLibrary';
import '../../stylesheets/_allproducts.scss';
import { clearPage } from '../../utils/render';
import { importAll } from '../../utils/utilsImages';
import arrowDown from '../../img/icons/small_arrow_down.png';
import Navigate from '../Router/Navigate';
//import { Dropdown } from 'bootstrap';

const productsImgs = importAll(require.context('../../img/products', true, /\.png$/));

let i = 0;

const AllProductPage = async () => {
  // eslint-disable-next-line no-restricted-globals
  clearPage();

  const main = document.querySelector('main');

  async function getAllproducts(url) {
    const allProducts = await ProductLibrary.getAllProducts(url);
    return allProducts;
  }

  const allSubCategories = await SubCategoryLibrary.getAllSubCategories();

  const subCategoriesMap = {};
  allSubCategories.forEach((subCategory) => {
    subCategoriesMap[subCategory.id] = stringModifier(subCategory.name);
  });

  renderSearchBar();
  renderAllProductsCards();


  const inputSearchBar = document.getElementById('inputSearchbar');
  const submitSearchBar = document.getElementById('submitSearchbar');
  // Show search bar generated by the html search bar function
  function renderSearchBar() {
    const containerSearchBar = document.createElement('div');
    containerSearchBar.className = 'container-searchbar-products';
    containerSearchBar.id = 'container-searchbar-products';
    containerSearchBar.innerHTML = htmlSearchbar();
    main.appendChild(containerSearchBar);
  }

  
  // show the products cards generated by the  addCard Product function
  async function renderAllProductsCards() {
   
    const container = document.createElement('div');
    container.className = 'container-products';
    container.id = 'container-products';
    const filter = document.getElementById('filter-products');
    filter.innerHTML = AddCategories();
    container.innerHTML = await addCardProduct();

    const productLinks = container.querySelectorAll('.link-products');

    productLinks.forEach((link) => {
      link.addEventListener('click', async (e) => {
        e.preventDefault();
        const productId = link.dataset.rui.split('/').pop(); 
        Navigate(`/product?id=${productId}`);
      });
    });

    const categoryItemsDropdown = document.querySelectorAll('.category-item');

    categoryItemsDropdown.forEach((item) => {
      
      item.addEventListener('click', async (e) => {
        let url = '';
        const itemClicked = e.target;
        console.log(` ${itemClicked.value} clicked`);
        if (itemClicked.value === 'Mans' || itemClicked.value === 'Womans') {
          url = `category=${stringModifier(itemClicked.value)}`;
        } else if (itemClicked.value === 'A-Z Names' || itemClicked.value === 'Lowest Price'){
          url = `order=${stringModifier(itemClicked.value)}`;
        }else if(itemClicked.value === 'Z-A Names'){
          url = `order=-name`;
        }else if(itemClicked.value === 'Highest Price'){
          url = `order=-price`;
        }else{
          url = `brand=${stringModifier(itemClicked.value)}`;
        }
        container.innerHTML = await addCardProduct(url);
      });
    });
    submitSearchBar.addEventListener('click', async ()=> {
      const url = `name=${inputSearchBar.value}`
      container.innerHTML = await addCardProduct(url);
    })
    main.appendChild(container);
  }
  // add an categorie to the drop down menu
  function AddCategories() {
    let htmlCategories = '';
    allSubCategories.forEach((subcategory) => {
      htmlCategories += ` 
            <input  class="category-item" data-categoryId="${subcategory.id}" type="button" value="${subcategory.name}">
            `;
    });
    return htmlCategories;
  }

  //create an card for each product
  async function addCardProduct(url) {
    const products = await getAllproducts(url);
    let allCards = '';
    products?.forEach((product) => {
      allCards += `
            <a class="link-products" id="viewProduct" href="#" data-rui="/product/${product.id}">
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
  // generate the html for the search bar
  function htmlSearchbar() {
    let html = '';
    html = `
        <div class="search-bar">
        <input type="text" placeholder="SEARCH BY NAME..." id="inputSearchbar" >
        <button id="submitSearchbar" class="input-search-bar">SEARCH</button >
    </div>
    <div class="product-filter">
        <div class="order-products">
            <div class="dropdown">
                <button class="dropbtn">Order Products by : <img class="product-img" src=${arrowDown} alt="$arrow down "/>  </button>
                <div class="dropdown-content">
                  <input  class="category-item" id="linkOrder" type="button" value="Highest Price">
                  <input  class="category-item" id="linkOrder" type="button" value="Lowest Price">
                  <input class="category-item"  id="linkOrder" type="button" value="A-Z Names">
                  <input class="category-item"  id="linkOrder" type="button" value="Z-A Names">
                </div>
            </div>
        </div>
        <div class="order-products">
            <div class="dropdown">
                <button class="dropbtn">Filter products by :  <img class="product-img" src=${arrowDown} alt="$arrow down "/>  </button>
                <div class="dropdown-content" id="filter-products">
                </div>
            </div>
        </div>
    </div>
    
        `;
    return html;
  }
};
//takes an string and remove spces and Upper letters
function stringModifier(str) {
  return str.replace(/\s+/g, '').toLowerCase();
}

export default AllProductPage;
