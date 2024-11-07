import { Movie } from "./Movie";

export type Actor = {
  id: number;
  adult: boolean;
  gender: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string | null;
  known_for: Movie[];
};

export type ActorDetail = {
  id: number;
  name: string;
  adult: boolean;
  biography: string;
  birthday: string;
  deathday?: string;
  gender: number;
  known_for_department: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
  favorite?: boolean;
};

export type MovieActor = {
  id: number;
  gender: number;
  adult: boolean;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};
