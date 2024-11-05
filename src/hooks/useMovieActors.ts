import { useQuery } from "@tanstack/react-query";
import { MOVIE_ACCESS_TOKEN, MOVIE_URL } from "../lib/constants";
import { MovieActor } from "../types/Actor";

const fetchActors = async (movieId: number | null): Promise<MovieActor[]> => {
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
  console.log("FETCH Actors:", data);
  return movieId ? data.cast : Promise.resolve([]);
};

function useMovieActors(movieId: number | null) {
  const {
    isLoading,
    error,
    data: actors
  } = useQuery<MovieActor[], Error>({
    queryKey: ["actors", movieId],
    queryFn: () => fetchActors(movieId),
    enabled: !!movieId // Only fetch when movieId is truthy
  });

  return { isLoading, error, actors };
}

export default useMovieActors;
