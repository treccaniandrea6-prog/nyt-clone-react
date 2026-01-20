import axios from "axios";

const nytClient = axios.create({
  baseURL: "https://api.nytimes.com",
  params: {
    "api-key": import.meta.env.VITE_NYT_API_KEY,
  },
});

export default nytClient;