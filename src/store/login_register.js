const registerPath = "http://localhost:9000/register";
const loginPath = "http://localhost:9000/login";

export const register = async function (obj) {
  const res = await fetch(registerPath, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });
  const token = await res.json();
  return token;
};

export const login = async function (obj) {
  const res = await fetch(loginPath, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });
  const token = res.json();
  return token;
};

export default {
  register,
  login,
};
