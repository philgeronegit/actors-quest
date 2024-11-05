import { Card } from "flowbite-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { PiGenderNonbinary } from "react-icons/pi";
import DefaultImage from "../assets/default_image.png";
import { getKnownForDepartmentText } from "../lib/utils";
import { ActorDetail } from "../types/Actor";

export const getGenderIcon = (gender: number = 0) => {
  switch (gender) {
    case 1:
      return <IoMdFemale />;
    case 2:
      return <IoMdMale />;
    case 3:
      return <PiGenderNonbinary />;
    default:
      return null;
  }
};

type ActorDetailProps = {
  loading: boolean;
  actor: ActorDetail | null;
};

const ActorDetailCard = ({ actor, loading = false }: ActorDetailProps) => {
  const handleFavoriteIconClick = () => {
    console.log("Favorite icon clicked");
  };

  if (loading) {
    return (
      <Card href="#" className="cursor-default">
        <p>Chargement...</p>
      </Card>
    );
  }

  if (!actor) {
    return (
      <Card href="#" className="cursor-default">
        <p>Aucun acteur n'est sélectionné</p>
      </Card>
    );
  }

  return (
    <Card href="#" className="cursor-default">
      <div className="flex gap-2 justify-start items-center">
        <img
          className="object-scale-down w-40 bg-slate-200 drop-shadow-md"
          src={
            actor?.profile_path
              ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
              : DefaultImage
          }
          alt={actor?.name}
        />
        {actor?.favorite ? (
          <FaHeart
            className="cursor-pointer"
            onClick={handleFavoriteIconClick}
            size={48}
          />
        ) : (
          <FaRegHeart
            className="cursor-pointer"
            onClick={handleFavoriteIconClick}
            size={48}
          />
        )}
      </div>
      <div className="flex gap-1 items-center">
        <h3 className="text-xl font-bold">{actor?.name}</h3>
        {getGenderIcon(actor?.gender)}
        <p>
          {getKnownForDepartmentText(
            actor?.known_for_department,
            actor?.gender
          )}
        </p>
      </div>

      <p className="h-60 overflow-auto">{actor?.biography}</p>
    </Card>
  );
};

export default ActorDetailCard;
