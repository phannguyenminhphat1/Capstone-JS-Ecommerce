class CallApi {
  constructor() {
    this.fetchData = function () {
      return axios({
        url: "https://5eea040db13d0a00164e40c2.mockapi.io/api/Product",
        method: "GET",
      });
    };

    this.getProductByID = function (id) {
      return axios({
        url: `https://5eea040db13d0a00164e40c2.mockapi.io/api/Product/${id}`,
        method: "GET",
      });
    };

    this.addProduct = function (product) {
      return axios({
        url: "https://5eea040db13d0a00164e40c2.mockapi.io/api/Product",
        method: "POST",
        data: product,
      });
    };

    this.deleteProduct = function (id) {
      return axios({
        url: `https://5eea040db13d0a00164e40c2.mockapi.io/api/Product/${id}`,
        method: "DELETE",
      });
    };
    this.updateProduct = function (product) {
      return axios({
        url: `https://5eea040db13d0a00164e40c2.mockapi.io/api/Product/${product.id}`,
        method: "PUT",
        data: product,
      });
    };
  }
}
