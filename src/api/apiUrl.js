import axios from "axios";

export const apiUrl = axios.create({
  baseURL:
    "https://economysa-motor-back-dev-m6zmiutpfa-ue.a.run.app/api/v1/secured",
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    authorization: "Bearer cf6a5082-ad14-47ad-b498-a419e9b4c55b",
    
  },
});
// e86e6188-ddbe-4bdf-a7c0-00134210b9bf