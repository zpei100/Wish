const scraper = require('product-scraper');

const url = `https://www.ebay.com/itm/adidas-Prophere-Shoes-Mens/153207697654?_trkparms=pageci%3A2a3c86d6-d472-11e8-90a6-74dbd18048ce%7Cparentrq%3A91d1e2fb1660a99bd8fce242fff6e772%7Ciid%3A1` 

scraper.init(url, function(data) {
  console.log(data);
})

