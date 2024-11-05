import { useSessionStorage } from "@uidotdev/usehooks";
import { Actor } from "../types/Actor";

function useHistory() {
  const [history, setHistory] = useSessionStorage<string[]>(
    "actors-history",
    []
  );

  const add = (actor: Actor) => {
    setHistory((prev) => {
      if (prev.includes(actor.name)) {
        return prev;
      }
      if (prev.length >= 3) {
        prev.pop();
      }
      return [actor.name, ...prev];
    });
  };

  return { history, add };
}

export default useHistory;
