var api = new CallApi();
var crt = new Cart();

function getEle(id) {
  return document.getElementById(id);
}

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
                <a onclick="handleAddToCart(${item.id})" href="#" class="add-to-cart-link"><i class="fa fa-shopping-cart"></i> Add to cart</a>
                <a href="./views/single-product.html?id=${item.id}" class="view-details-link"><i class="fa fa-link"></i> See details</a>
            </div>
        </div>

        <h2>${item.name}</h2>

        <div class="product-carousel-price">
            <ins>$${item.price}</ins> <del>$425.00</del>
        </div>
    </div>

    `;
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

// function getInfoProduct(id) {
//   var promise = api.getProductById(id);
//   promise
//     .then(function (result) {
//       var id = result.data.id;
//       var name = result.data.name;
//       var price = result.data.price;
//       var screen = result.data.screen;
//       var backCamera = result.data.backCamera;
//       var frontCamera = result.data.frontCamera;
//       var img = result.data.img;
//       var desc = result.data.desc;
//       var type = result.data.type;
//       var product = new Product(
//         id,
//         name,
//         price,
//         screen,
//         backCamera,
//         frontCamera,
//         img,
//         desc,
//         type
//       );
//       handleAddToCart(product.id);
//       console.log(crt.cart);
//     })

//     .catch(function (error) {
//       console.log(error);
//     });
// }

function handleAddToCart(id) {
  var search = crt.cart.find((item) => item.id === id);
  if (!search) {
    crt.addCart({ id, quantity: 1 });
  } else {
    search.quantity += 1;
  }
  updateProductQuantity(id);
}

function updateProductQuantity(id) {
  var search = crt.cart.find((item) => item.id === id);
  console.log(search);
  calcCartQuantity();
}

function calcCartQuantity() {
  (getEle("product-count").innerHTML = crt.cart
    .map((item) => item.quantity)
    .reduce((x, y) => x + y)),
    0;
}
