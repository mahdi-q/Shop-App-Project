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

export function likeProductApi(id) {
  return http.post(`/product/like/${id}`).then(({ data }) => data.data);
}
