import axios from "axios";

// 02756080/json/

const Api = axios.create({
  baseURL: "https://viacep.com.br/ws/",
});

export default Api;
