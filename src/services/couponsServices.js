import http from "./httpServices";

export function getCouponsApi() {
  return http.get("/admin/coupon/list").then(({ data }) => data.data);
}

export function getCouponApi(id) {
  return http.get(`/admin/coupon/${id}`).then(({ data }) => data.data);
}

export function addCouponApi(data) {
  return http.post("/admin/coupon/add", data).then(({ data }) => data.data);
}

export function editCouponApi({ id, data }) {
  return http
    .patch(`/admin/coupon/update/${id}`, data)
    .then(({ data }) => data.data);
}
