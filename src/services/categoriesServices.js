import http from "./httpServices";

export function getCategoriesApi() {
  return http.get("/category/list").then(({ data }) => data.data);
}
