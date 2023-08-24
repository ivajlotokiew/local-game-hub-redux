import { GameQuery } from "../App";
import useData from "./useData";
import { Game } from "../common/types";

const useGames = (endpoint: string, gameQuery: GameQuery | null) =>
  useData<Game>(
    endpoint,
    {
      params: {
        genres: gameQuery?.genre?.id,
        platforms: gameQuery?.platform?.id,
        ordering: gameQuery?.sortOrder,
        search: gameQuery?.searchText,
      },
    },
    [gameQuery, endpoint]
  );

export default useGames;
