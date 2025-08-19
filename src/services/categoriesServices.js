import http from "./httpServices";

export function getCategoriesApi() {
  return http.get("/category/list").then(({ data }) => data.data);
}

export function getCategoryApi(id) {
  return http.get(`/category/${id}`).then(({ data }) => data.data);
}

export function addCategoryApi(data) {
  return http.post("/admin/category/add", data).then(({ data }) => data.data);
}

export function editCategoryApi({ id, data }) {
  return http
    .patch(`/admin/category/update/${id}`, data)
    .then(({ data }) => data.data);
}

export function deleteCategoryApi(id) {
  return http
    .delete(`/admin/category/remove/${id}`)
    .then(({ data }) => data.data);
}
