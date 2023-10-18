var api = new CallApi();
var crt = new Cart();

function getEle(id) {
  return document.getElementById(id);
}
crt.cart = JSON.parse(localStorage.getItem("data")) || [];
console.log(crt.cart);
function calcCartQuantity() {
  var domQtyCart = getEle("product-count");
  domQtyCart.innerHTML = crt.cart
    .map((item) => item.quantity)
    .reduce((x, y) => x + y, 0);
}

function getListProducts() {
  var promise = api.fetchData();
  promise
    .then(function (result) {
      console.log(result.data);
      renderUI(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getListProducts();
calcCartQuantity();

function renderUI(data) {
  var content = "";
  var divClear = "";
  if (crt.cart.length == 0) {
    getEle("single-product-area").innerHTML = `
    <div class="text-center">
      <h2>Cart is empty</h2>
      <a href="../index.html" class="btn btn-primary">
        Go back to Home
      </a>
    </div>
    `;
  } else {
    content += crt.cart
      .map((item) => {
        let { id, quantity } = item;
        let search = data.find((x) => parseInt(x.id) === id) || [];
        return `
        <tr class="cart_item">
            <td class="product-remove">
              <a title="Remove this item" class="remove" onclick="removeItem(${id})"
                >×</a
              >
            </td>
    
            <td class="product-thumbnail">
              <a href="single-product.html"
                ><img
                  width="145"
                  height="145"
                  alt="poster_1_up"
                  class="shop_thumbnail"
                  src="../assets/img/${search.img}"
              /></a>
            </td>
    
            <td class="product-name">
              <a href="single-product.html">${search.name}</a>
            </td>
    
            <td class="product-price">
              <span class="amount">£ ${search.price}</span>
            </td>
    
            <td class="product-quantity">
              <div class="quantity buttons_added">
                <input
                  onclick="handleMinus(${id})"
                  type="button"
                  class="minus"
                  value="-"
                />
                <input
                  id=${id}
                  type="number"
                  size="4"
                  class="input-text qty text"
                  title="Qty"
                  value="${quantity}"
                  min="0"
                  step="1"
                />
                <input
                  onclick="handlePlus(${id})"
                  type="button"
                  class="plus"
                  value="+"
                />
              </div>
            </td>
    
            <td class="product-subtotal">
              <span class="amount">${formatCurrency(
                search.price * quantity,
                "£ "
              )}</span>
            </td>
        </tr>
        `;
      })
      .join("");
    divClear = `<tr>
    <td colspan="6">
       <input
         value="CLEAR CART"
         onclick="clearCart()"
         class="mr-5 btn btn-danger"/>
        <input
         value="CHECK OUT"
         onclick="checkOut()"
         class="btn btn-success"/>
     </td>
    
</tr>`;
    getEle("tbody").innerHTML = content + divClear;
  }
  calcTotalBill(data);
}
function formatCurrency(n, currency) {
  return (
    currency +
    n.toFixed(2).replace(/./g, function (c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    })
  );
}

function handleMinus(id) {
  let search = crt.cart.find((item) => item.id === id);
  if (search.quantity === 0) {
    return;
  } else {
    search.quantity -= 1;
  }
  updateQuantity(search.id);
  crt.cart = crt.cart.filter((item) => item.quantity !== 0);
  getListProducts();
  localStorage.setItem("data", JSON.stringify(crt.cart));
}
function handlePlus(id) {
  let search = crt.cart.find((item) => item.id === id);
  if (!search) {
    return;
  } else {
    search.quantity += 1;
  }
  updateQuantity(search.id);
  crt.cart = crt.cart.filter((item) => item.quantity !== 0);
  getListProducts();
  localStorage.setItem("data", JSON.stringify(crt.cart));
}

function updateQuantity(id) {
  let search = crt.cart.find((item) => item.id === id);
  getEle(id).value = search.quantity;
  calcCartQuantity();
}

function removeItem(id) {
  crt.cart = crt.cart.filter((item) => item.id !== id);
  getListProducts();
  localStorage.setItem("data", JSON.stringify(crt.cart));
  calcCartQuantity();
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
    getEle("order-total-1").innerHTML = `${formatCurrency(total, "£ ")}`;
    getEle("order-total-2").innerHTML = `${formatCurrency(total, "£ ")}`;
    getEle("cart-totalPrice").innerHTML = `${formatCurrency(total, "£ ")}`;
  }
}
function clearCart() {
  crt.cart = [];
  getListProducts();
  localStorage.setItem("data", JSON.stringify(crt.cart)) || [];
  calcCartQuantity();
}

function checkOut() {
  crt.cart = [];
  getListProducts();
  localStorage.setItem("data", JSON.stringify(crt.cart)) || [];
  calcCartQuantity();
  alert("CHECK OUT SUCCESSFULLY");
}
