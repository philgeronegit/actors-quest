import { useLocalStorage } from "@uidotdev/usehooks";
import { Actor } from "../types/Actor";

function useFavoriteActor() {
  const [favorites, setFavorites] = useLocalStorage<Actor[]>(
    "favorite-actors",
    []
  );

  const add = (actor: Actor) => {
    setFavorites((prev) => {
      if (prev.find((a) => a.id === actor.id)) {
        return prev;
      }
      return [actor, ...prev];
    });
  };
  const remove = (actor: Actor) => {
    setFavorites((prev) => {
      return prev.filter((a) => a.id !== actor.id);
    });
  };

  return { favorites, add, remove };
}

export default useFavoriteActor;
