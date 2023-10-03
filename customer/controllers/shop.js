var api = new CallApi();

function getEle(id) {
  return document.getElementById(id);
}

function getListProducts() {
  var promise = api.fetchData();
  promise
    .then(function (result) {
      renderShopUI(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getListProducts();

function renderShopUI(data) {
  var content = "";
  for (let i = 0; i < data.length; i++) {
    var item = data[i];
    content += `
    <div class="col-md-3 col-sm-6">
        <div class="single-shop-product">
            <div class="product-upper">
                <img src="../assets/img/${item.img}" alt="" />
            </div>
            <h2><a href="./single-product.html?id=${item.id}">${item.name}</a></h2>
            <div class="product-carousel-price">
                <ins>$${item.price}</ins> <del>$999.00</del>
            </div>

            <div class="product-option-shop">
                <a
                class="add_to_cart_button"
                data-quantity="1"
                data-product_sku=""
                data-product_id="70"
                rel="nofollow"
                href="/canvas/shop/?add-to-cart=70"
                >Add to cart</a
                >
            </div>
        </div>
  </div>
        `;
  }
  getEle("shopProduct__content").innerHTML = content;
}
