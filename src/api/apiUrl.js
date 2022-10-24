import axios from "axios";

export const apiUrl = axios.create({
  baseURL:
    "https://economysa-motor-back-dev-m6zmiutpfa-ue.a.run.app/api/v1/secured",
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    authorization: "Bearer b2654baf-d066-4d60-8d43-d7a797035e37",
    
  },
});
// e86e6188-ddbe-4bdf-a7c0-00134210b9bf