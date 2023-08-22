import useData from "./useData";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

const usePlatforms = (endpoint: string) => useData<Platform>(endpoint);

export default usePlatforms;
