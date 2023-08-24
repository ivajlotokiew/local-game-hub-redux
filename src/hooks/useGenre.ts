import useData from "./useData";
import { Genre } from "../common/types";

const useGenre = () => useData<Genre>("/genres");

export default useGenre;
