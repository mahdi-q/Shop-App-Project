import http from "./httpServices";

export function getCategoriesApi() {
  return http.get("/category/list").then(({ data }) => data.data);
}

export function getCategoryApi(id) {
  return http.get(`/category/${id}`).then(({ data }) => data.data);
}
