import toStringCookies from "./toStringCookies";

export default async function middlewareAuth(req) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: toStringCookies(req.cookies),
    },
  });

  const { data } = await res.json();
  const { user } = data || {};

  return user;
}
