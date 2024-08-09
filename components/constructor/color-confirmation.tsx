import { CANCEL_ICON, CONFIRM_ICON } from "@/lib/icons";
import { Button } from "@/components/ui/button";


const ColorConfirmation = ({ confirmFunc, cancelFunc }: { confirmFunc: () => void, cancelFunc: () => void }) => {
  return (
    <div className="w-full flex flex-col items-center gap-2">
      <h3>Приенить этот цвет?</h3>
      <div className="flex gap-2">
        <Button
          className="hover:bg-transparent"
          variant='ghost' 
          onClick={confirmFunc} 
          size='icon'>
          <CONFIRM_ICON />
        </Button>
        <Button
          className="hover:bg-transparent"
          variant='ghost' 
          onClick={cancelFunc} 
          size='icon'
        >
          <CANCEL_ICON />
        </Button>
      </div>
    </div>
  );
};
export default ColorConfirmation;
