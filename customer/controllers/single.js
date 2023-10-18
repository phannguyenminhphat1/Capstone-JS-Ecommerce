var api = new CallApi();
var crt = new Cart();

const urlParams = new URLSearchParams(window.location.search);
const product = urlParams.get("id");

function getEle(id) {
  return document.getElementById(id);
}

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
            id="numberDisabled"
          />
        </div>
        <button class="add_to_cart_button" onclick="handleAddToCart(${item.id})" type="button">
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
          </div>
        </div>
      </div>
    </div>
    `;
  document.getElementById("product__text").innerHTML = content;
  document.getElementById("numberDisabled").disabled = true;
}

function renderSinglePageImage(item) {
  var content = "";
  content = `
  <div class="product-images">
    <div class="product-main-img">
        <img src="../assets/img/${item.img}" alt="" />
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
