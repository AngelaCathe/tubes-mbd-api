const express = require('express');
const router = express.Router();
const serviceToko = require('../services/toko');

/* GET ALL list produk(pure sql) */
router.get('/get-all-list-produk', async function(req, res, next) {
  const {list_id} = req.query
  console.log(list_id)
  // const {id} = req.query
  // const {nama,deskrispi} = req.body
  try {
    res.json(await serviceToko.getListProduk(req.query.page));
  } catch (err) {
    console.error(`Error while getting data for List Produk `, err.message);
    next(err);
  }
});

// CREATE list produk
router.post('/create-list-produk', async function(req,res, next){

  try {
    const {transact_id, product_id, quantity} = req.body
    res.json(await serviceToko.createListProduk(transact_id, product_id, quantity));
  } catch (err) {
    console.error(`Error while inputing data in List Produk `, err.message);
    next(err);
  }
});

// READ list produk(filtered by ID)(pake stored procedure)
router.get('/read-list-produk', async function(req,res, next){

  try {
    const {transact_id} = req.query
    console.log(transact_id)
    res.json(await serviceToko.readListProduk(transact_id));
  } catch (err) {
    console.error(`Error while reading data from List Produk `, err.message);
    next(err);
  }
});




module.exports = router;