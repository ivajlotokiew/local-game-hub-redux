import useData from "./useData";
import { Platform } from "../common/types";

const usePlatforms = (endpoint: string) => useData<Platform>(endpoint);

export default usePlatforms;
