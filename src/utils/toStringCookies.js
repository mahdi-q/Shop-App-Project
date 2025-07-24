export default function toStringCookies(cookies) {
  let strCookie = "";

  cookies.getAll().forEach((cookie) => {
    strCookie += `${cookie?.name}=${cookie?.value}; `;
  });

  return strCookie.trim();
}
