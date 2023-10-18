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
      renderUI(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getListProducts();

function renderUI(data) {
  var content = "";
  for (let i = 0; i < data.length; i++) {
    var item = data[i];
    // var singleProduct = document.querySelector(".single-product");
    content += `
    <div class="single-product">
        <div class="product-f-image">
            <img src="./assets/img/${item.img}" alt="" />
            <div class="product-hover">
                <a onclick="handleAddToCart(${item.id})" class="add-to-cart-link"><i class="fa fa-shopping-cart"></i> Add to cart</a>
                <a href="./views/single-product.html?id=${item.id}" class="view-details-link"><i class="fa fa-link"></i> See details</a>
            </div>
        </div>

        <h2>${item.name}</h2>

        <div class="product-carousel-price">
            <ins>$${item.price}</ins> <del>$425.00</del>
        </div>
    </div>

    `;
    calcTotalBill(data);
  }
  document.querySelector("#product-carousel").innerHTML = content;
  $(".product-carousel").owlCarousel({
    loop: true,
    nav: true,
    margin: 20,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  });
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
function formatCurrency(n, currency) {
  return (
    currency +
    n.toFixed(2).replace(/./g, function (c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    })
  );
}
function calcTotalBill(data) {
  if (crt.cart.length == 0) {
    return;
  } else {
    let total = crt.cart
      .map((item) => {
        let { id, quantity } = item;
        let search = data.find((x) => parseInt(x.id) === id) || [];
        return quantity * search.price;
      })
      .reduce((x, y) => x + y, 0);
  }
}

calcCartQuantity();
