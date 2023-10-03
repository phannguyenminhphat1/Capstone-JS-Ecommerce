var api = new CallApi();

const urlParams = new URLSearchParams(window.location.search);
const product = urlParams.get("id");

function getSingleProduct(id) {
  var promise = api.getProductById(id);
  promise
    .then(function (result) {
      renderSinglePageText(result.data);
      renderSinglePageImage(result.data);
      renderHeaderMenu(result.data);
      //   getListProductRelated(result.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}
// function getListProductRelated() {
//   var promise = api.fetchData();
//   promise
//     .then(function (result) {
//       var listRelated = result.data.filter((item) => {
//         return console.log(item.type == "Samsung");
//       });
//       renderProductRelated(listRelated);
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
// }
getSingleProduct(product);

function renderSinglePageText(item) {
  var content = "";
  content = `
    <div class="product-inner">
      <h2 class="product-name">${item.name}</h2>
      <div class="product-inner-price">
        <ins>Price: $${item.price}</ins>
      </div>

      <form action="" class="cart">
        <div class="quantity">
          <input
            type="number"
            size="4"
            class="input-text qty text"
            title="Qty"
            value="1"
            name="quantity"
            min="1"
            step="1"
          />
        </div>
        <button class="add_to_cart_button" onClick="console.log(${product})" type="button">
          Add to cart
        </button>
      </form>

      <div class="product-inner-category">
        <p>Type: <a href="">${item.type}</a></p>
      </div>

      <div role="tabpanel">
        <ul class="product-tab" role="tablist">
          <li role="presentation" class="active">
            <a
              href="#home"
              aria-controls="home"
              role="tab"
              data-toggle="tab"
              >Description</a
            >
          </li>
        </ul>
        <div class="tab-content">
          <div
            role="tabpanel"
            class="tab-pane fade in active"
            id="home"
          >
            <h2>Product Description</h2>
            <p>
              ${item.desc}
            </p>

            <p>
              Mauris placerat vitae lorem gravida viverra. Mauris
              in fringilla ex. Nulla facilisi. Etiam scelerisque
              tincidunt quam facilisis lobortis. In malesuada
              pulvinar neque a consectetur. Nunc aliquam gravida
              purus, non malesuada sem accumsan in. Morbi vel
              sodales libero.
            </p>
          </div>
        </div>
      </div>
    </div>
    `;
  document.getElementById("product__text").innerHTML = content;
}

function renderSinglePageImage(item) {
  var content = "";
  content = `
  <div class="product-images">
    <div class="product-main-img">
        <img src="../assets/img/${item.img}" alt="" />
    </div>

    <div class="product-gallery">
        <img src="../assets/img/product-thumb-1.jpg" alt="" />
        <img src="../assets/img/product-thumb-2.jpg" alt="" />
        <img src="../assets/img/product-thumb-3.jpg" alt="" />
    </div>
</div>
  `;
  document.getElementById("product__image").innerHTML = content;
}

function renderHeaderMenu(item) {
  var content = "";
  content = `
    <a href="">Home</a>
    <a href="">Type </a>
    <a href="">${item.type}</a>
  `;
  document.getElementById("product__menu").innerHTML = content;
}

function renderProductRelated(data) {
  var content = "";
  for (let i = 0; i < data.length; i++) {
    var item = data[i];
    content += `<div class="thubmnail-recent">
    <img
      src="../assets/img/${item.img}"
      class="recent-thumb"
      alt=""
    />
    <h2><a href="">${item.name}</a></h2>
    <div class="product-sidebar-price">
      <ins>$${item.price}</ins> <del>$100.00</del>
    </div>
  </div>`;
  }
  document.getElementById("single-sidebar").innerHTML = content;
}
