import http from "./httpServices";

export function getCouponsApi() {
  return http.get("/admin/coupon/list").then(({ data }) => data.data);
}

export function getCouponApi(id) {
  return http.get(`/admin/coupon/${id}`).then(({ data }) => data.data);
}
