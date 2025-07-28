import http from "./httpServices";

export function addToCartApi(id) {
  return http.post("/cart/add", id).then(({ data }) => data.data);
}
