const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getListProduk(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM list_produk LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};


  // const temp = `sesuatu(${data})`
  // `CALL temp`
  return {
    data,
    meta
  }
}

async function createListProduk(transact_id, product_id, quantity) {
  const result = await db.query(
    `CALL tambah_list_produk(${transact_id}, ${product_id}, ${quantity})`
  );

  return {
    result
  }
}

async function readListProduk(transact_id) {
  const result = await db.query(
    `CALL read_list_produk(${transact_id})`
  );

  return {
    result
  }
}

module.exports = {
  getListProduk,
  createListProduk,
  readListProduk
}