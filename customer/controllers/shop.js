var api = new CallApi();
var crt = new Cart();

function getEle(id) {
  return document.getElementById(id);
}
crt.cart = JSON.parse(localStorage.getItem("data")) || [];

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
                onclick="handleAddToCart(${item.id})"
                >Add to cart</a
                >
            </div>
        </div>
  </div>
        `;
  }
  getEle("shopProduct__content").innerHTML = content;
}

function handleAddToCart(id) {
  var search = crt.cart.find((item) => item.id === id);
  if (!search) {
    crt.addCart({ id, quantity: 1 });
  } else {
    search.quantity += 1;
  }
  localStorage.setItem("data", JSON.stringify(crt.cart));
  calcCartQuantity();
  alert("Add To Cart Success");
}

function calcCartQuantity() {
  var domQtyCart = getEle("product-count");
  var totalAmount = crt.cart
    .map((item) => item.quantity)
    .reduce((x, y) => x + y, 0);
  domQtyCart.innerHTML = totalAmount;
}
calcCartQuantity();

function search() {
  var domSearch = getEle("type").selectedIndex;
  if (domSearch === 0) {
    var promise = api.fetchData();
    promise
      .then(function (result) {
        renderShopUI(result.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else if (domSearch === 1) {
    var promise = api.fetchData();
    promise
      .then(function (result) {
        var search = result.data.filter((item) => item.type == "Samsung");
        renderShopUI(search);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else if (domSearch === 2) {
    var promise = api.fetchData();
    promise
      .then(function (result) {
        var search = result.data.filter((item) => item.type == "Iphone");
        renderShopUI(search);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
