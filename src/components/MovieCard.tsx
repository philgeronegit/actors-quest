import { Tooltip } from "flowbite-react";
import { cn } from "../lib/utils";
import { MovieDetail } from "../types/Movie";

type MovieProps = {
  movie: MovieDetail;
  selectedMovie: MovieDetail | null;
  onClick: (movie: MovieDetail) => void;
};

const MovieCard = ({ movie, selectedMovie, onClick }: MovieProps) => {
  return (
    <div
      className={cn("p-1 cursor-pointer rounded-lg hover:bg-slate-200", {
        "border-2 border-slate-500": movie.id === selectedMovie?.id
      })}
      onClick={() => onClick(movie)}>
      <Tooltip content={movie.overview}>
        <div>{`${movie.title} (${movie.release_date})`}</div>
      </Tooltip>
    </div>
  );
};

export default MovieCard;
