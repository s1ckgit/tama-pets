import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PetPart from "@/components/constructor/parts/pet-part";
import { BabyCatBrowsEnum, BabyCatEarsEnum, BabyCatHeadEnum, BabyCatTailsEnum, BabyCatWhiskersEnum } from "@/lib/assets-info";
import { PetConstructorProp, type ChangeVisionPayload } from "@/lib/types";
import { useAppSelector } from "@/lib/hooks/store-hooks";



const PetPartsPicker = () => {
  const colorPickerState = useAppSelector((state) => state.colorPicker);
  const { color } = colorPickerState;

  function renderPetPart(item: PetConstructorProp) {
    const colorValue = item.color ? color : undefined;
    return <PetPart color={color} data={{ ...item, color: colorValue } as ChangeVisionPayload} key={item.name}/>;
  }

  return (
    <Tabs className="w-auto">
      <TabsList className="flex">
        <TabsTrigger className="basis-full" value="brows">Брови</TabsTrigger>
        <TabsTrigger className="basis-full" value="head">Голова</TabsTrigger>
        <TabsTrigger className="basis-full" value="ears">Уши</TabsTrigger>
        <TabsTrigger className="basis-full" value="tails">Хвосты</TabsTrigger>
        <TabsTrigger className="basis-full" value="whiskers">Усы</TabsTrigger>
      </TabsList>
      <TabsContent className="grid grid-cols-[repeat(3,1fr)] gap-2" value="brows">
        {BabyCatBrowsEnum.map((item) => renderPetPart(item))}
      </TabsContent>
      <TabsContent className="grid grid-cols-[repeat(3,1fr)] gap-2" value="head">
        {BabyCatHeadEnum.map((item) => renderPetPart(item))}
      </TabsContent>
      <TabsContent className="grid grid-cols-[repeat(3,1fr)] gap-2" value="ears">
        {BabyCatEarsEnum.map((item) => renderPetPart(item))}
      </TabsContent>
      <TabsContent className="grid grid-cols-[repeat(3,1fr)] gap-2" value="tails">
        {BabyCatTailsEnum.map((item) => renderPetPart(item))}
      </TabsContent>
      <TabsContent className="grid grid-cols-[repeat(3,1fr)] gap-2" value="whiskers">
        {BabyCatWhiskersEnum.map((item) => renderPetPart(item))}
      </TabsContent>
    </Tabs>
  );
};
export default PetPartsPicker;
