import http from "./httpServices";

export function addToCartApi(id) {
  return http.post("/cart/add", id).then(({ data }) => data.data);
}

export function removeFromCartApi(id) {
  return http.post("/cart/remove", id).then(({ data }) => data.data);
}

export function deleteProductFromCartApi(id) {
  return http
    .delete("/cart/product", {
      data: id,
    })
    .then(({ data }) => data.data);
}

export function addCouponToCartApi(code) {
  return http.post("/cart/coupon", code).then(({ data }) => data.data);
}

export function removeCouponFromCartApi() {
  return http.delete("/cart/coupon").then(({ data }) => data.data);
}