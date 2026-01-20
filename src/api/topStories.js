import nytClient from "./nytClient";

export async function topStories(section = "home") {
  const response = await nytClient.get(
    `/svc/topstories/v2/${section}.json`
  );

  return response.data.results;
}