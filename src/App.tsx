import { useAtom } from "jotai";
import { useCallback, useState } from "react";
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
import { loadingActorDetailsAtom, loadingActorMoviesAtom } from "./lib/atoms";
import { MOVIE_URL } from "./lib/constants";
import { fetchApi } from "./lib/utils";
import { Actor, ActorDetail } from "./types/Actor";
import { MovieDetail } from "./types/Movie";

function App() {
  const [, setLoadingActorDetails] = useAtom(loadingActorDetailsAtom);
  const [, setLoadingActorMovies] = useAtom(loadingActorMoviesAtom);
  const [movieId, setMovieId] = useState<number | null>(null);
  const [history, add] = useHistory();
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null);
  const [actorDetail, setActorDetail] = useState<ActorDetail | null>(null);
  const [actorMovies, setActorMovies] = useState<MovieDetail[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, error, actors] = useMovieActors(movieId);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const handleMovieOnClick = (movie: MovieDetail) => {
    setMovieId(movie.id);
  };

  const fetchActorDetail = async (id: number) => {
    setLoadingActorDetails(true);
    const url = `${MOVIE_URL}/person/${id}`;
    try {
      const details = await fetchApi<ActorDetail>(url);
      setActorDetail(details);
    } catch (error: any) {
      setFetchError(error.message);
    } finally {
      setLoadingActorDetails(false);
    }
  };

  const fetchActorMovies = async (id: number) => {
    setLoadingActorMovies(true);
    const url = `${MOVIE_URL}/person/${id}/movie_credits`;
    try {
      const response = await fetchApi<MovieDetail[]>(url, "cast");
      setActorMovies(response);
    } catch (error: any) {
      setFetchError(error.message);
    } finally {
      setLoadingActorMovies(false);
    }
  };

  const handleNewSearch = useCallback((searchTerm: string) => {
    setSearchTerm(searchTerm);
    setMovieId(null);
  }, []);

  const handleActorOnClick = (actor: Actor) => {
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
          actorsList={actors}
          isLoading={isLoading}
          searchedActorName={searchTerm}
          selectedActor={selectedActor}
          onClick={handleActorOnClick}
        />
      </div>
      <div className="details">
        <ActorDetailCard actor={actorDetail} />
      </div>
      <div className="history">
        <History history={history} />
      </div>
      <div className="films">
        <Movies movieOnClick={handleMovieOnClick} movies={actorMovies} />
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
