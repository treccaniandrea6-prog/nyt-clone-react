import nytClient from "./nytClient";

export async function fetchTopStories(section = "home") {
  const response = await nytClient.get(`/topstories/v2/${section}.json`);
  return response.data;
}