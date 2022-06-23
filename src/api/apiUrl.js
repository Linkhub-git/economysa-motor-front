import axios from "axios";

export const apiUrl = axios.create({
  baseURL:
    "https://economysa-motor-back-dev-m6zmiutpfa-ue.a.run.app/api/v1/secured",
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    authorization: "Bearer e86e6188-ddbe-4bdf-a7c0-00134210b9bf",
    
  },
});
// e86e6188-ddbe-4bdf-a7c0-00134210b9bf