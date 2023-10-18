var api = new CallApi();

function getEle(id) {
  return document.getElementById(id);
}

function getListProducts() {
  var promise = api.fetchData();
  promise
    .then(function (result) {
      renderUI(result.data);
      // return result.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
getListProducts();

function renderUI(data) {
  var content = "";
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    content += `
      <tr>
        <td>${i + 1}</td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.screen}</td>
        <td>${item.backCamera}</td>
        <td>${item.frontCamera}</td>
        <td class="text-center">
          <img width="50" src="../customer/assets/img/${item.img}"/>
        </td>
        <td>${item.desc}</td>
        <td>${item.type}</td>
        <td>
          <button onclick="getProductByID(${
            item.id
          })" data-toggle="modal" data-target="#myModal" class="btn btn-secondary">Cập nhật</button>
          <button onclick="deleteProduct(${
            item.id
          })" class="btn btn-danger mt-2">Xóa</button>
        </td>

      </tr>
    `;
  }
  getEle("tableDanhSach").innerHTML = content;
}
getEle("idSP").disabled = true;

function addProduct() {
  var name = getEle("name").value;
  var price = getEle("price").value;
  var screen = getEle("screen").value;
  var bCamera = getEle("bCamera").value;
  var fCamera = getEle("fCamera").value;
  var img = getEle("img").value;
  var desc = getEle("desc").value;
  var type = getEle("type").value;
  var product = new Product(
    "",
    name,
    price,
    screen,
    bCamera,
    fCamera,
    img,
    desc,
    type
  );
  var isValid = check(product);
  if (!isValid) {
    return null;
  }
  var promise = api.addProduct(product);
  promise
    .then(function (result) {
      alert("Add product Success");
      getListProducts();
      getEle("btnDong").click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function deleteProduct(id) {
  var promise = api.deleteProduct(id);
  promise
    .then(function (result) {
      alert("Delete product Success");
      getListProducts();
    })
    .catch(function (err) {
      console.log(err);
    });
}

function getProductByID(id) {
  disableThem();

  getEle("header-title").innerHTML = "Cập nhật sản phẩm";

  var promise = api.getProductByID(id);
  promise
    .then(function (result) {
      getEle("idSP").value = result.data.id;
      getEle("idSP").disabled = true;
      getEle("name").value = result.data.name;
      getEle("price").value = result.data.price;
      getEle("screen").value = result.data.screen;
      getEle("bCamera").value = result.data.backCamera;
      getEle("fCamera").value = result.data.frontCamera;
      getEle("img").value = result.data.img;
      getEle("desc").value = result.data.desc;
      getEle("type").value = result.data.type;
    })
    .catch(function (err) {
      console.log(err);
    });
}

function updateProduct() {
  var id = getEle("idSP").value;
  var name = getEle("name").value;
  var price = getEle("price").value;
  var screen = getEle("screen").value;
  var bCamera = getEle("bCamera").value;
  var fCamera = getEle("fCamera").value;
  var img = getEle("img").value;
  var desc = getEle("desc").value;
  var type = getEle("type").value;
  var product = new Product(
    id,
    name,
    price,
    screen,
    bCamera,
    fCamera,
    img,
    desc,
    type
  );
  var isValid = check(product);
  if (!isValid) {
    return null;
  }
  var promise = api.updateProduct(product);
  promise
    .then(function (result) {
      alert("update Success");
      getListProducts();
      getEle("btnDong").click();
      resetInputFields();
      resetValidateFields();
    })
    .catch(function (err) {
      console.log(err);
    });
}

getEle("btnThem").onclick = function () {
  getEle("header-title").innerHTML = "Thêm mới sản phẩm";
  disableCapNhat();
};

function resetInputFields() {
  getEle("idSP").value = "";
  getEle("name").value = "";
  getEle("price").value = "";
  getEle("screen").value = "";
  getEle("bCamera").value = "";
  getEle("fCamera").value = "";
  getEle("img").value = "";
  getEle("desc").value = "";
  getEle("type").value = "Type";
}
function resetValidateFields() {
  getEle("tbName").value = "";
  getEle("tbPrice").value = "";
  getEle("tbScreen").value = "";
  getEle("tbBCamera").value = "";
  getEle("tbFCamera").value = "";
  getEle("tbImg").value = "";
  getEle("tbDesc").value = "";
  getEle("tbType").value = "";
}

function disableThem() {
  document.getElementById("btnAddProduct").style.display = "none";
  document.getElementById("btnUpdateProduct").style.display = "block";
}
function disableCapNhat() {
  document.getElementById("btnUpdateProduct").style.display = "none";
  document.getElementById("btnAddProduct").style.display = "block";
  resetInputFields();
}
function check(product) {
  var isValid = true;
  isValid &= kiemTraRong(product.name, "Tên không được rỗng", "tbName");
  isValid &= kiemTraRong(product.price, "Giá không được rỗng", "tbPrice");
  isValid &= kiemTraRong(product.screen, "Screen không được rỗng", "tbScreen");
  isValid &= kiemTraRong(
    product.backCamera,
    "Back camera không được rỗng",
    "tbBCamera"
  );
  isValid &= kiemTraRong(
    product.frontCamera,
    "Front camera không được rỗng",
    "tbFCamera"
  );
  isValid &= kiemTraRong(product.desc, "Mô tả không được rỗng", "tbDesc");
  isValid &= kiemTraSelect("Hãy chọn loại sản phẩm", "tbType", "type");
  isValid &= kiemTraRong(product.img, "Hình ảnh không được rỗng", "tbImg");
  return isValid;
}

getEle("searchName").addEventListener("keyup", function () {
  var domSearch = getEle("searchName").value;
  var list = [];
  var promise = api.fetchData();
  promise
    .then(function (result) {
      for (let i = 0; i < result.data.length; i++) {
        let item = result.data[i];
        var keywordLowercase = domSearch.toLowerCase();
        var pdtLowerCase = item.type.toLowerCase();
        if (pdtLowerCase.indexOf(keywordLowercase) !== -1) {
          list.push(item);
        } else {
          console.log("no");
        }
      }
      renderUI(list);
    })
    .catch(function (error) {
      console.log(error);
    });
});
