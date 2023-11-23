/* eslint-disable no-plusplus */
/* eslint-disable import/first */
/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable import/no-import-module-exports */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
const path = require('node:path');
const escape = require('escape-html');

const categories = require('./categories.js');

const subcategory = require('./subcategory.js');

const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/products.json');
const jsonDbPathSub = path.join(__dirname, '/../data/subcategory.json');

const { readAllCategories } = require('./categories');

const defaultProducts = [
  {
    id: 1,
    name: 'Rolex Submarine',
    price: 60000,
    description: 'Rolex submarine test test test ',
    categorie: 'Watches',
    imgList: [],
    subcategory: ['Rolex', 'Man'],
    model3D: 'rolexSubmarine',
  },
  {
    id: 2,
    name: 'Ballon Bleu De Cartier',
    price: 9050.99,
    description:
      'La montre Ballon Bleu est née d`une nouvelle vision du rond qui consiste, pour les designers de Cartier, à donner un volume au cercle. Doublement convexe, sa forme réalise l`équilibre entre ligne et volume. Pour éviter toute rupture de lignes, la glace saphir bombée est parfaitement intégrée à la boîte comme le remontoir, avec sa bulle bleue et son protège-couronne intégré sous un arceau de métal à trois heures.',
    categorie: 'Watches',
    imgList: [],
    subcategory: ['Cartier', 'Woman'],
    model3D: 'ballonBleu',
  },
  {
    id: 3,
    name: 'Louis Vuitton Dubai',
    price: 6999.99,
    description: 'test sac louis vuitton femme',
    categorie: 'Bags',
    imgList: [],
    subcategory: ['Louis Vuitton', 'Woman'],
    model3D: 'LVDubai',
  },
  {
    id: 4,
    name: 'Armani Code',
    price: 289.99,
    description: 'Parfum pour homme aux odeurs de male alpha',
    categorie: 'Cosmetic',
    imgList: [],
    subcategory: ['Armani', 'Man'],
    model3D: 'ArmaniCode',
  },
  {
    id: 5,
    name: 'Channel N°5',
    price: 489.99,
    description: 'Sac pour femme',
    categorie: 'Bags',
    imgList: [],
    subcategory: ['Channel', 'Woman'],
    model3D: 'channelN5',
  },
  {
    id: 6,
    name: 'Sac Prada',
    price: 489.99,
    description: 'Sac pour femme',
    categorie: 'Bags',
    imgList: [],
    subcategory: ['Prada', 'Woman'],
    model3D: 'sacprada',
  },
  {
    id: 7,
    name: 'Grand Complications',
    price: 489.99,
    description: 'Montre Philiph pattek',
    categorie: 'Bags',
    imgList: [],
    subcategory: ['Philiph pattek', 'Man'],
    model3D: 'Grand Complications',
  },
];

function sortProductsByName(param) {
  const orderByTitle = param?.includes('name') ? param : undefined;

  let orderedProducts;
  const products = parse(jsonDbPath, defaultProducts);

  orderedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));
  if (orderByTitle === '-name') {
    orderedProducts = orderedProducts.reverse();
  }

  const allProductsPotentiallyOrdered = orderedProducts ?? products;
  return allProductsPotentiallyOrdered;
}

function renderAllProductsByCategory(param) {
  let category;
  let gender;

  if (param?.toLowerCase().includes('woman')) {
    gender = 'woman';
  } else if (param?.toLowerCase().includes('man')) {
    gender = 'man';
  } else {
    // Si la requête ne spécifie pas un genre, vérifier si elle spécifie une catégorie
    // eslint-disable-next-line max-len
    const listOfCategories = readAllCategories();
    const categoriesArray = Object.values(listOfCategories);
    // eslint-disable-next-line max-len
    const requestedCategory = categoriesArray.find((cat) =>
      param?.toLowerCase().includes(cat.name.toLowerCase()),
    );
    if (requestedCategory) {
      category = requestedCategory.name;
    }
  }

  const products = parse(jsonDbPath, defaultProducts);

  let filteredProducts;

  if (gender === 'man') {
    filteredProducts = getAllMenProducts([...products]);
  } else if (gender === 'woman') {
    filteredProducts = getAllWomenProducts([...products]);
  } else if (category) {
    filteredProducts = getAllProductsByCategory([...products], category);
  }

  const allProductsPotentiallyOrdered = filteredProducts ?? products;
  return allProductsPotentiallyOrdered;
}

// Ajouter une nouvelle fonction pour filtrer par catégorie
function getAllProductsByCategory(products, category) {
  // eslint-disable-next-line max-len
  return products.filter((product) =>
    product.categorie.toLowerCase().includes(category.toLowerCase()),
  );
}

function searchProductsByName(param) {
  const products = parse(jsonDbPath, defaultProducts);
  const filteredProducts = products.filter(
    (product) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      product.name.toLowerCase().includes(param.toLowerCase()),
    // eslint-disable-next-line function-paren-newline
  );
  return filteredProducts;
}

function searchProductsByBrand(param) {
  const products = parse(jsonDbPath, defaultProducts);
  const filteredProducts = [];

  const brandParamLowerCase = param.toLowerCase();

  products.forEach((product) => {
    const brandProduct = removeSpacesAndMajFromString(product.subcategory[0]);
    if (brandProduct === brandParamLowerCase) {
      filteredProducts.push(product);
    }
  });
  return filteredProducts;
}

function removeSpacesAndMajFromString(param) {
  return param ? param.toLowerCase().replace(/\s/g, '') : '';
}

function readOneProduct(id) {
  const idNumber = parseInt(id, 10);
  const products = parse(jsonDbPath, defaultProducts);
  const indexOfProdcutsFound = products.findIndex((product) => product.id === idNumber);
  if (indexOfProdcutsFound < 0) return undefined;

  return products[indexOfProdcutsFound];
}

// eslint-disable-next-line max-len
function createOneProduct(name, price, description, categorieParam, imgs, subcategories, modele) {
  const products = parse(jsonDbPath, defaultProducts);

  const categoriesBd = categories.readAllCategories();
  let categorieproduct;
  categoriesBd.forEach((categorie) => {
    if (categorie.name === categorieParam) {
      categorieproduct = categorie.name;
    }
  });
  const parsedPrice = parseFloat(price);

  const createdProduct = {
    id: products.length + 1,
    name: escape(name),
    price: parsedPrice,
    description: escape(description),
    categorie: escape(categorieproduct),
    imgList: imgs,
    subcategory: subcategories,
    model3D: modele,
  };

  products.push(createdProduct);

  serialize(jsonDbPath, products);

  return createdProduct;
}

function deleteOneProduct(id) {
  const idNumber = parseInt(id, 10);
  const products = parse(jsonDbPath, defaultProducts);
  const foundIndex = products.findIndex((product) => product.id === idNumber);
  if (foundIndex < 0) return undefined;
  const deletedProducts = products.splice(foundIndex, 1);
  const deletedProduct = deletedProducts[0];
  serialize(jsonDbPath, products);

  return deletedProduct;
}

function updateOneProduct(id, propertiesToUpdate) {
  const idNumber = parseInt(id, 10);
  const products = parse(jsonDbPath, defaultProducts);
  const foundIndex = products.findIndex((product) => product.id === idNumber);
  if (foundIndex < 0) return undefined;

  const updatedProduct = { ...products[foundIndex], ...propertiesToUpdate };

  products[foundIndex] = updatedProduct;

  serialize(jsonDbPath, products);

  return updatedProduct;
}

function getAllMenProducts() {
  const products = parse(jsonDbPath, defaultProducts);
  const menItems = [];
  products.forEach((item) => {
    if (item.subcategory.includes(subcategory.genderSubcategory.Mans)) {
      menItems.push(item);
    }
  });
  return menItems.length > 0 ? menItems : null;
}

function getAllWomenProducts() {
  const products = parse(jsonDbPath, defaultProducts);
  const womenItems = [];
  products.forEach((item) => {
    if (item.subcategory.includes(subcategory.genderSubcategory.Womans)) {
      womenItems.push(item);
    }
  });
  return womenItems.length > 0 ? womenItems : null;
}

module.exports = {
  sortProductsByName,
  searchProductsByName,
  renderAllProductsByCategory,
  readOneProduct,
  createOneProduct,
  deleteOneProduct,
  updateOneProduct,
  getAllMenProducts,
  getAllWomenProducts,
  searchProductsByBrand,
  defaultProducts,
};
