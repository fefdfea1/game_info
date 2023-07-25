import { searchGame } from "../../dataFetch/getGameData";
import { searchDataType } from "./Header";
type propsType = (
  event: React.ChangeEvent<HTMLInputElement>,
  searchInput: React.RefObject<HTMLInputElement>,
  setData: React.Dispatch<React.SetStateAction<searchDataType[]>>,
  setBackgroundClickState: React.Dispatch<React.SetStateAction<boolean>>
) => void;
let timeId: any = null;

export const search: propsType = (
  event,
  searchInput,
  setData,
  setBackgroundClickState
) => {
  if (searchInput.current) {
    if (searchInput.current.value !== "") {
      setBackgroundClickState(true);
      const target = event.target as HTMLInputElement;
      const inputValue = target.value;
      const limit = String(15);
      if (timeId !== null) {
        clearTimeout(timeId);
      }
      timeId = setTimeout(async () => {
        timeId = null;
        const data = await searchGame(inputValue, limit);
        setData(data);
      }, 800);
    }
  }
};
