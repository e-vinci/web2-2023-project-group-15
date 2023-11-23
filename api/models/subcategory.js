/* eslint-disable no-dupe-keys */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-import-module-exports

const path = require('node:path');
const escape = require('escape-html');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/subcategory.json');

const genderSubcategory = {
  Mans: 'Man',
  Womans: 'Woman',
};

const defaultSubcategory = [
  {
    id: 1,
    name: 'Mans',
  },
  {
    id: 2,
    name: 'Womans',
  },
  {
    id: 3,
    name: 'Rolex',
  },
  {
    id: 4,
    name: 'Gucci',
  },
  {
    id: 5,
    name: 'Louis Vuitton',
  },
  {
    id: 6,
    name: 'Prada',
  },
  {
    id: 7,
    name: 'Cartier',
  },
  {
    id: 8,
    name: 'Armani',
  },
];

serialize(jsonDbPath, defaultSubcategory);

function getCategorieRolex() {
  return defaultSubcategory[0].name;
}
function getCategorieGucci() {
  return defaultSubcategory[1].name;
}
function getCategorieLouisVuitton() {
  return defaultSubcategory[2].name;
}
function getCategoriePrada() {
  return defaultSubcategory[3].name;
}
function getCategorieCartier() {
  return defaultSubcategory[4].name;
}
function getCategorieArmani() {
  return defaultSubcategory[5].name;
}
function readAllSubCategories() {
  const categories = parse(jsonDbPath, defaultSubcategory);
  return categories;
}

module.exports = {
  genderSubcategory,
  getCategorieRolex,
  getCategorieGucci,
  getCategorieLouisVuitton,
  getCategoriePrada,
  getCategorieCartier,
  getCategorieArmani,
  readAllSubCategories,
};
