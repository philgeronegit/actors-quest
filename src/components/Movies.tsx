import { Card, Spinner } from "flowbite-react";
import { useAtom } from "jotai";
import { useState } from "react";
import { loadingActorMoviesAtom } from "../lib/atoms";
import { MovieDetail } from "../types/Movie";
import MovieCard from "./MovieCard";

type MoviesProps = {
  movies?: MovieDetail[];
  movieOnClick: (movie: MovieDetail) => void;
};
const Movies = ({ movies = [], movieOnClick }: MoviesProps) => {
  const [loading] = useAtom(loadingActorMoviesAtom);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null);

  const handleMovieOnClick = (movie: MovieDetail) => {
    setSelectedMovie(movie);
    movieOnClick(movie);
  };

  if (loading) {
    return (
      <Card href="#" className="cursor-default min-h-32">
        Chargement...
        <Spinner aria-label="Chargement" />
      </Card>
    );
  }

  return (
    <Card href="#" className="cursor-default min-h-32 max-h-64 overflow-auto">
      <h3 className="text-lg font-bold">Films</h3>
      {movies.map((movie: MovieDetail) => (
        <MovieCard
          key={movie.id}
          selectedMovie={selectedMovie}
          onClick={handleMovieOnClick}
          movie={movie}
        />
      ))}
    </Card>
  );
};

export default Movies;
