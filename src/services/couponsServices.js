import http from "./httpServices";

export function getCouponsApi(queries) {
  return http
    .get(`/admin/coupon/list?${queries}`)
    .then(({ data }) => data.data);
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

export function deleteCouponApi(id) {
  return http
    .delete(`/admin/coupon/remove/${id}`)
    .then(({ data }) => data.data);
}
