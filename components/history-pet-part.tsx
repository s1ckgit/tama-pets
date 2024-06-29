import { useAppSelector } from "@/lib/hooks/store-hooks";
import PetPart from "./pet-part";


const HistoryPetPart = () => {
  const history = useAppSelector((state) => state.history).history;
  console.log(history);
  return (
    <div className="flex gap-x-2 justify-center">
      {history.map((item) => <PetPart variant="history" data={item} key={Math.random() * 999} />)}
    </div>
  );
};
export default HistoryPetPart;
