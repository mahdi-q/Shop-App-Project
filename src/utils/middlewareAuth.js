export default async function middlewareAuth(req) {
  let strCookie = "";
  req.cookies.getAll().forEach((cookie) => {
    strCookie += `${cookie?.name}=${cookie?.value}; `;
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: strCookie,
    },
  });

  const { data } = await res.json();
  const { user } = data || {};

  return user;
}
