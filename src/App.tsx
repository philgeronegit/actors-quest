import { useState } from "react";
import "./App.css";
import ActorDetailCard from "./components/ActorDetail";
import Actors from "./components/Actors";
import Erreur from "./components/Erreur";
import FavoriteActors from "./components/FavoriteActors";
import History from "./components/History";
import Movies from "./components/Movies";
import SearchButton from "./components/SearchButton";
import useHistory from "./hooks/useHistory";
import useMovieActors from "./hooks/useMovieActors";
import { MOVIE_URL } from "./lib/constants";
import { fetchApi } from "./lib/utils";
import { Actor, ActorDetail } from "./types/Actor";
import { MovieDetail } from "./types/Movie";

function App() {
  const [movieId, setMovieId] = useState<number | null>(null);
  const [history, add] = useHistory();
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null);
  const [actorDetail, setActorDetail] = useState<ActorDetail | null>(null);
  const [actorMovies, setActorMovies] = useState<MovieDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, error, actors] = useMovieActors(movieId);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const handleMovieOnClick = (movie: MovieDetail) => {
    console.log("Movie clicked:", movie);
    // setMovieId(movie.id);
  };

  const fetchActorDetail = async (id: number) => {
    setLoading(true);
    const url = `${MOVIE_URL}/person/${id}`;
    try {
      const details = await fetchApi<ActorDetail>(url);
      setActorDetail(details);
    } catch (error: any) {
      setFetchError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchActorMovies = async (id: number) => {
    setLoading(true);
    const url = `${MOVIE_URL}/person/${id}/movie_credits`;
    try {
      const response = await fetchApi<MovieDetail[]>(url, "cast");
      setActorMovies(response);
    } catch (error: any) {
      setFetchError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleActorOnClick = (actor: Actor) => {
    console.log("Actor clicked:", actor);
    add(actor);
    setSelectedActor(actor);
    fetchActorDetail(actor.id);
    fetchActorMovies(actor.id);
  };

  return (
    <main className="m-3 grid-container">
      <div className="search">
        <SearchButton onChange={handleNewSearch} />
      </div>
      <div className="results">
        <Actors
          searchedActorName={searchTerm}
          onClick={handleActorOnClick}
          selectedActor={selectedActor}
        />
      </div>
      <div className="details">
        <ActorDetailCard loading={loading} actor={actorDetail} />
      </div>
      <div className="history">
        <History history={history} />
      </div>
      <div className="films">
        <Movies
          loading={loading}
          movieOnClick={handleMovieOnClick}
          movies={actorMovies}
        />
      </div>
      <div className="favorite">
        <FavoriteActors />
      </div>
      <div className="error">
        {error && <Erreur title="Erreur" text={error.message} />}
        {fetchError && <Erreur title="Erreur" text={fetchError} />}
      </div>
    </main>
  );
}

export default App;
