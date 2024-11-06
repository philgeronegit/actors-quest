import { Card } from "flowbite-react";
import Tilt from "react-parallax-tilt";
import DefaultImage from "../assets/default_image.png";
import { cn } from "../lib/utils";
import { Actor } from "../types/Actor";

type ActorCardProps = {
  actor: Actor;
  selectedActor: Actor | null;
  onClick: (actor: Actor) => void;
};

const ActorCard = ({ actor, selectedActor, onClick }: ActorCardProps) => {
  return (
    <Tilt
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      scale={1.05}
      transitionSpeed={450}
      className="p-1">
      <Card
        href="#"
        className={cn("max-w-sm", {
          "border-2 border-slate-500": actor.id === selectedActor?.id
        })}
        onClick={() => onClick(actor)}>
        <h3 className="text-center text-xl font-bold">{actor.name}</h3>
        <img
          className="object-scale-down w-full h-24 drop-shadow-md"
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
              : DefaultImage
          }
          alt={actor.name}
        />
      </Card>
    </Tilt>
  );
};

export default ActorCard;
