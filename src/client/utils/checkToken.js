import decode from "jwt-decode";

export default function checkToken() {
  try {
    const token = localStorage.getItem("token");
    const decoded = decode(JSON.parse(token));
    console.log(token, decoded);
    if (token === null) {
      return false;
    }
    if (decoded.exp < Date.now() / 1000) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}
