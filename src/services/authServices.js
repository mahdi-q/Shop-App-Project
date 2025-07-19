import http from "./httpServices";

export function getOtpApi(data) {
  return http.post("/user/get-otp", data).then(({ data }) => data.data);
}

export function checkOtpApi(data) {
  return http.post("/user/check-otp", data).then(({ data }) => data.data);
}

export function completeProfileApi(data) {
  return http
    .post("/user/complete-profile", data)
    .then(({ data }) => data.data);
}

export function getUserApi() {
  return http.get("/user/profile").then(({ data }) => data.data);
}

export function logoutApi() {
  return http.post("/user/logout").then(({ data }) => data.data);
}