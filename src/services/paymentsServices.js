import http from "./httpServices";

export function createPaymentApi() {
  return http.post("/payment/create").then(({ data }) => data.data);
}
