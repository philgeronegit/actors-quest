import { useQuery } from "@tanstack/react-query";
import { MOVIE_ACCESS_TOKEN, MOVIE_URL } from "../lib/constants";
import { Actor } from "../types/Actor";

const fetchActors = async (movieId: number | null): Promise<Actor[]> => {
  const url = `${MOVIE_URL}/movie/${movieId}/credits`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${MOVIE_ACCESS_TOKEN}`
    }
  };
  const response = await fetch(url, options);
  const data = await response.json();
  const actors = data.cast;
  return movieId ? actors : Promise.resolve([]);
};

function useMovieActors(movieId: number | null) {
  const {
    isLoading,
    error,
    data: actors
  } = useQuery<Actor[], Error>({
    queryKey: ["actors", movieId],
    queryFn: () => fetchActors(movieId),
    enabled: !!movieId // Only fetch when movieId is truthy
  });

  return [isLoading, error, actors] as const;
}

export default useMovieActors;
