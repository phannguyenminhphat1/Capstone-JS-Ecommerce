class CallApi {
  constructor() {
    this.fetchData = function () {
      return axios({
        url: "https://5eea040db13d0a00164e40c2.mockapi.io/api/Product",
        method: "GET",
      });
    };
    this.getProductById = function (id) {
      return axios({
        url: `https://5eea040db13d0a00164e40c2.mockapi.io/api/Product/${id}`,
        method: "GET",
      });
    };
  }
}
