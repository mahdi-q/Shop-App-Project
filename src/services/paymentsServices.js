import http from "./httpServices";

export function createPaymentApi() {
  return http.post("/payment/create").then(({ data }) => data.data);
}

export function getPaymentsApi() {
  return http.get("/admin/payment/list").then(({ data }) => data.data);
}
