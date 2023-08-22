import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "6646d72535ba4b499a94d7328cf092f4",
  },
});
