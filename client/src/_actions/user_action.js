import Axios from "axios";
import { LOGIN_USER, REGISTER_USER } from "./types";

export function loginUser(dataTosubmit) {
  const req = Axios.post("/api/users/login", dataTosubmit).then(
    (response) => response.data
  );
  return {
    type: LOGIN_USER,
    payload: req,
  };
}

export function registerUser(dataTosubmit) {
  const req = Axios.post("/api/users/register", dataTosubmit).then(
    (response) => response.data
  );
  return {
    type: REGISTER_USER,
    payload: req,
  };
}
