export type Movie = {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

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

// https://api.themoviedb.org/3/person/287?api_key={{API_KEY}}
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

// https://api.themoviedb.org/3/movie/278/credits?api_key={{API_KEY}}
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
