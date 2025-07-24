import http from "./httpServices";

export function getProductsApi(queries, cookies) {
  return http
    .get(`/product/list?${queries}`, {
      headers: {
        Cookie: cookies,
      },
    })
    .then(({ data }) => data.data);
}
