import { useState } from "react";
import { Movie } from "../types/Actor";
import MovieCard from "./MovieCard";

type MoviesProps = {
  movies?: Movie[];
  movieOnClick: (movie: Movie) => void;
};
const Movies = ({ movies = [], movieOnClick }: MoviesProps) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  console.log("Movies:", movies);

  const handleMovieOnClick = (movie: Movie) => {
    setSelectedMovie(movie);
    movieOnClick(movie);
  };

  return (
    <div>
      <h3 className="text-lg font-bold">Films</h3>
      {movies.map((movie: Movie) => (
        <MovieCard
          key={movie.id}
          selectedMovie={selectedMovie}
          onClick={handleMovieOnClick}
          movie={movie}
        />
      ))}
    </div>
  );
};

export default Movies;
