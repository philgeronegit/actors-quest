import { Pagination, Spinner } from "flowbite-react";
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

const fetchActors = async (
  actorName: string = "",
  pages: number = 1
): Promise<Actor[]> => {
  let allResults: Actor[] = [];
  for (let page = 1; page <= pages; page++) {
    const url = `${MOVIE_URL}/search/person?page=${page}&query=${encodeURIComponent(
      actorName
    )}`;
    const data: responseType = await fetchApi(url);
    if (page > data.total_pages) {
      break;
    }

    allResults = allResults.concat(
      data.results.filter((actor) => actor.known_for_department === "Acting")
    );
  }
  return actorName ? allResults : Promise.resolve([]);
};

function useActors(actorName: string) {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIt = async () => {
      setLoading(true);
      try {
        const actors = await fetchActors(actorName, 3);
        setActors(actors);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (actorName.length > 0) {
      fetchIt();
    }
  }, [actorName]);

  return [actors, loading] as const;
}

type ActorsProps = {
  actorsList?: Actor[];
  isLoading: boolean;
  searchedActorName: string;
  selectedActor: Actor | null;
  onClick: (actor: Actor) => void;
};

const Actors = ({
  actorsList,
  isLoading,
  searchedActorName = "",
  selectedActor,
  onClick
}: ActorsProps) => {
  const [actors, loading] = useActors(searchedActorName);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const actorsToShow = actorsList || actors;
  const currentActors = actorsToShow.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(actorsToShow.length / ITEMS_PER_PAGE);
  const showPagination = actorsToShow.length > ITEMS_PER_PAGE;

  useEffect(() => {
    setCurrentPage(1);
  }, [loading, isLoading]);

  const onPageChange = (page: number) => setCurrentPage(page);

  if (loading || isLoading) {
    return (
      <div>
        Chargement...
        <Spinner aria-label="Chargement" />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between h-full">
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
