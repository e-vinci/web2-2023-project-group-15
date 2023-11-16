/* eslint-disable spaced-comment */
const express = require('express');
const {
  renderAllProductsByCategory,
  readOneProduct,
  sortProductsByName,
} = require('../models/products');
//const { authorize, isAdmin } = require('../utils/auths');

const router = express.Router();

/* Read all the products from the menu
   GET /product?order=name : ascending order by name
   GET /product?order=-name : descending order by name
*/
router.get('/', (req, res) => {
  let allProductsPotentiallyOrdered;
  if (req?.query?.order) allProductsPotentiallyOrdered = sortProductsByName(req.query.order);
  // eslint-disable-next-line max-len
  if (req?.query?.category) allProductsPotentiallyOrdered = renderAllProductsByCategory(req.query.category);
  return res.json(allProductsPotentiallyOrdered);
});

// Read the product identified by an id in the menu
router.get('/:id', (req, res) => {
  const foundProduct = readOneProduct(req.params.id);

  if (!foundProduct) return res.sendStatus(404);

  return res.json(foundProduct);
});

module.exports = router;
