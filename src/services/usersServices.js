import http from "./httpServices";

export function getUsersApi(queries) {
  return http.get(`/admin/user/list?${queries}`).then(({ data }) => data.data);
}

export function getUserApi(id) {
  return http.get(`/admin/user/profile/${id}`).then(({ data }) => data.data);
}
