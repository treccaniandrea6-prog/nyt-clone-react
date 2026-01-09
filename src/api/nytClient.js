import axios from "axios";

const nytClient = axios.create({
  baseURL: "https://api.nytimes.com/svc",
  params: {
    "api-key": import.meta.env.VITE_NYT_API_KEY,
  },
});

export default nytClient;