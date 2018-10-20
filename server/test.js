const scraper = require('product-scraper');

const url = `https://www.amazon.com/Designo-MX34VQ-Adaptive-Sync-Wireless-Frameless/dp/B01N4UQIGT?pf_rd_m=ATVPDKIKX0DER&pf_rd_p=f4f94535-b0e0-4dd1-b50f-a6ae490416d2&pf_rd_r=1ef4a250-3218-4ad7-97ae-5dbbc20778fe&pd_rd_wg=vmski&pf_rd_s=desktop-mso&pf_rd_t=36701&pd_rd_w=AxRZz&pf_rd_i=desktop&pd_rd_r=1ef4a250-3218-4ad7-97ae-5dbbc20778fe&ref_=pd_gw_unk`

scraper.init(url, function(data) {
  console.log(data);
})

