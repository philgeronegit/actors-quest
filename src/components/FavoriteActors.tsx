import { FaTrash } from "react-icons/fa";
import useFavoriteActor from "../hooks/useFavoriteActors";

type FavoriteActorsProps = {
  actors: { id: number; name: string }[];
};

const FavoriteActors = ({ actors }: FavoriteActorsProps) => {
  const { favorites, add, remove } = useFavoriteActor();
  return (
    <div>
      <h3 className="text-xl font-bold">Acteurs favoris</h3>
      <ul>
        {favorites.map((actor) => (
          <li
            key={actor.id}
            className="p-1 flex gap-1 items-center justify-between">
            {actor.name}
            <FaTrash onClick={() => remove(actor)} className="cursor-pointer" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteActors;
