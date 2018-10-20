const scraper = require('product-scraper');

const url = `https://www.ebay.com/itm/132826935829` 

scraper.init(url, function(data) {
  console.log(data);
})

