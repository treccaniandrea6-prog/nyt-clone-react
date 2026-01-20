import axios from "axios";

const nytClient = axios.create({
  baseURL: "/nyt",
  params: {
    "api-key": import.meta.env.VITE_NYT_API_KEY,
  },
});

export default nytClient;