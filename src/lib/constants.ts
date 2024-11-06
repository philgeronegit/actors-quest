import { Actor } from "../types/Actor";

export const MOVIE_ACCESS_TOKEN = process.env.REACT_APP_API_ACCESS_TOKEN;
export const MOVIE_URL = "https://api.themoviedb.org/3";

export const ACTORS: Actor[] = [
  {
    id: 500,
    adult: false,
    gender: 2,
    known_for_department: "Acting",
    name: "Tom Cruise",
    original_name: "Tom Cruise",
    popularity: 4.0,
    known_for: []
  },
  {
    id: 501,
    adult: false,
    gender: 2,
    known_for_department: "Acting",
    name: "Brad Pitt",
    original_name: "Brad Pitt",
    popularity: 4.0,
    known_for: []
  },
  {
    id: 502,
    adult: false,
    gender: 2,
    known_for_department: "Acting",
    name: "Will Smith",
    original_name: "Will Smith",
    popularity: 4.0,
    known_for: []
  },
  {
    id: 503,
    adult: false,
    gender: 2,
    known_for_department: "Acting",
    name: "Johnny Depp",
    original_name: "Johnny Depp",
    popularity: 4.0,
    known_for: []
  },
  {
    id: 504,
    adult: false,
    gender: 2,
    known_for_department: "Acting",
    name: "Tom Cruise",
    original_name: "Tom Cruise",
    popularity: 4.0,
    known_for: []
  }
];
