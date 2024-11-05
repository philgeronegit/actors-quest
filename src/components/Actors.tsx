import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import { MOVIE_URL } from "../lib/constants";
import { fetchApi } from "../lib/utils";
import { Actor } from "../types/Actor";
import ActorCard from "./ActorCard";

const ITEMS_PER_PAGE = 9;

type responseType = {
  page: number;
  results: Actor[];
  total_pages: number;
  total_results: number;
};

const fetchActors = async (actorName: string = ""): Promise<Actor[]> => {
  const url = `${MOVIE_URL}/search/person?query=/${encodeURIComponent(
    actorName
  )}`;
  const data: responseType = await fetchApi(url);
  console.log("FETCH Actors:", data);
  return actorName ? data.results : Promise.resolve([]);
};

function useActors(actorName: string) {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setActors(ACTORS);
  //     setLoading(false);
  //   }, 500);
  // }, []);

  useEffect(() => {
    const fetchIt = async () => {
      setLoading(true);
      try {
        const actors = await fetchActors(actorName);
        console.log(actors);
        setActors(actors);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchIt();
  }, [actorName]);

  return { actors, loading };
}

type ActorsProps = {
  searchedActorName: string;
  selectedActor: Actor | null;
  onClick: (actor: Actor) => void;
};

const Actors = ({
  searchedActorName = "",
  selectedActor,
  onClick
}: ActorsProps) => {
  const { actors, loading } = useActors(searchedActorName);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentActors = actors.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(actors.length / ITEMS_PER_PAGE);
  const showPagination = totalPages > ITEMS_PER_PAGE;

  const onPageChange = (page: number) => setCurrentPage(page);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-3 overflow-hidden">
        {currentActors.map((actor: Actor) => (
          <ActorCard
            key={actor.id}
            actor={actor}
            selectedActor={selectedActor}
            onClick={onClick}
          />
        ))}
      </div>
      <div className="flex justify-center">
        {showPagination && (
          <Pagination
            currentPage={currentPage}
            previousLabel="Précédent"
            nextLabel="Suivant"
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Actors;
