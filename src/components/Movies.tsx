import { Card, Spinner } from "flowbite-react";
import { useState } from "react";
import { MovieDetail } from "../types/Movie";
import MovieCard from "./MovieCard";

type MoviesProps = {
  loading: boolean;
  movies?: MovieDetail[];
  movieOnClick: (movie: MovieDetail) => void;
};
const Movies = ({ loading, movies = [], movieOnClick }: MoviesProps) => {
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
