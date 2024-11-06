import { useState } from "react";
import "./App.css";
import ActorDetailCard from "./components/ActorDetail";
import Actors from "./components/Actors";
import Erreur from "./components/Erreur";
import History from "./components/History";
import Movies from "./components/Movies";
import SearchButton from "./components/SearchButton";
import useHistory from "./hooks/useHistory";
import useMovieActors from "./hooks/useMovieActors";
import { MOVIE_URL } from "./lib/constants";
import { fetchApi } from "./lib/utils";
import { Actor, ActorDetail, Movie } from "./types/Actor";

function App() {
  const [movieId, setMovieId] = useState<number | null>(null);
  const { history, add } = useHistory();
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null);
  const [actorDetail, setActorDetail] = useState<ActorDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoading, error, actors } = useMovieActors(movieId);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const handleMovieOnClick = (movie: Movie) => {
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

  const handleNewSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleActorOnClick = (actor: Actor) => {
    console.log("Actor clicked:", actor);
    add(actor);
    setSelectedActor(actor);
    fetchActorDetail(actor.id);
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
          movieOnClick={handleMovieOnClick}
          movies={selectedActor?.known_for}
        />
      </div>
      <div className="favorite">
        {/* <FavoriteActors /> */}
        {isLoading && <p>Recherche acteurs...</p>}
        {error && <p>Erreur: {error.message}</p>}
        {actors && (
          <ul>
            {actors.map((actor) => (
              <li key={actor.id}>{actor.name}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="error">
        {error && <Erreur title="Erreur" text={error.message} />}
        {fetchError && <Erreur title="Erreur" text={fetchError} />}
      </div>
    </main>
  );
}

export default App;
