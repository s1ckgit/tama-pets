import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PetPart from "@/components/pet-part";
import { BabyCatBrowsEnum, BabyCatEarsEnum, BabyCatHeadEnum, BabyCatTailsEnum, BabyCatWhiskersEnum } from "@/lib/assets-info";
import { type ChangeVisionPayload } from "@/lib/types";



const PetPartsPicker = () => {
  return (
    <Tabs className="w-auto">
      <TabsList className="flex">
        <TabsTrigger className="basis-full" value="brows">Брови</TabsTrigger>
        <TabsTrigger className="basis-full" value="head">Голова</TabsTrigger>
        <TabsTrigger className="basis-full" value="ears">Уши</TabsTrigger>
        <TabsTrigger className="basis-full" value="tails">Хвосты</TabsTrigger>
        <TabsTrigger className="basis-full" value="whiskers">Усы</TabsTrigger>
      </TabsList>
      <TabsContent className="flex flex-wrap gap-2" value="brows">
        {BabyCatBrowsEnum.map((item) => <PetPart variant="default" data={item as ChangeVisionPayload} key={item.name}/>)}
      </TabsContent>
      <TabsContent className="flex flex-wrap gap-2" value="head">
        {BabyCatHeadEnum.map((item) => <PetPart variant="default" data={item as ChangeVisionPayload} key={item.name}/>)}
      </TabsContent>
      <TabsContent className="flex flex-wrap gap-2" value="ears">
        {BabyCatEarsEnum.map((item) => <PetPart variant="default" data={item as ChangeVisionPayload} key={item.name}/>)}
      </TabsContent>
      <TabsContent className="flex flex-wrap gap-2" value="tails">
        {BabyCatTailsEnum.map((item) => <PetPart variant="default" data={item as ChangeVisionPayload} key={item.name}/>)}
      </TabsContent>
      <TabsContent className="flex flex-wrap gap-2" value="whiskers">
        {BabyCatWhiskersEnum.map((item) => <PetPart variant="default" data={item as ChangeVisionPayload} key={item.name}/>)}
      </TabsContent>
    </Tabs>
  );
};
export default PetPartsPicker;
