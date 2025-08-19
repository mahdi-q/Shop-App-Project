import http from "./httpServices";

export function getCouponsApi() {
  return http.get("/admin/coupon/list").then(({ data }) => data.data);
}
