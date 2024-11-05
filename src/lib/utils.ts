import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { MOVIE_ACCESS_TOKEN } from "./constants";

/**
 * This function is a wrapper around clsx and tailwind-merge
 * to merge classes together
 * @param inputs - The classes to merge
 * @returns The merged classes
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Fetch data from an API
 * @param url the url to fetch data from
 * @returns a promise that resolves to the fetched data
 */
export async function fetchApi<T>(url: string): Promise<T> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${MOVIE_ACCESS_TOKEN}`
    }
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

export function getKnownForDepartmentText(
  department: string = "",
  gender: number = 0
): string {
  switch (department) {
    case "Acting":
      return gender === 2 ? "Acteur" : "Actrice";
    case "Directing":
      return gender === 2 ? "Réalisateur" : "Réalisatrice";
    default:
      return "Non spécifié";
  }
}
