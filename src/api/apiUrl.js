import axios from "axios";

export const apiUrl = axios.create({
  baseURL:
    "https://economysa-motor-back-dev-m6zmiutpfa-ue.a.run.app/api/v1/secured",
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    authorization: "Bearer 84aff245-1cab-4218-8322-6b4ceaf93ba3",
    
  },
});
// e86e6188-ddbe-4bdf-a7c0-00134210b9bf