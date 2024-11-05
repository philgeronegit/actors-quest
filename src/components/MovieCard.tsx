import { cn } from "../lib/utils";
import { Movie } from "../types/Actor";

type MovieProps = {
  movie: Movie;
  selectedMovie: Movie | null;
  onClick: (movie: Movie) => void;
};

const MovieCard = ({ movie, selectedMovie, onClick }: MovieProps) => {
  return (
    <div
      className={cn("p-1 cursor-pointer rounded-lg hover:bg-slate-200", {
        "border-2 border-slate-500": movie.id === selectedMovie?.id
      })}
      onClick={() => onClick(movie)}>
      <div>{movie.title}</div>
    </div>
  );
};

export default MovieCard;
