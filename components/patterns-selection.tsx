import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BabyCatPatternsEnum } from "@/lib/assets-info";
import { useAppSelector } from "@/lib/hooks/store-hooks";
import Pattern from "./pattern";

type BabyCatPatternsEnumKey = keyof typeof BabyCatPatternsEnum;


const PatternsSelection = () => {
  const petProps = useAppSelector((state) => state.petConstructor);

  const tailValue = petProps.tail.value;
  const tailKey = `tail-${tailValue}` as BabyCatPatternsEnumKey;
  const tailPatterns = BabyCatPatternsEnum[tailKey];

  const earsValue = petProps.ears.value;
  const earsKey = `ears-${earsValue}` as BabyCatPatternsEnumKey;
  const earsPatterns = BabyCatPatternsEnum[earsKey];


  return (
    <Tabs>
      <TabsList>
        <TabsTrigger value='ears'>Уши</TabsTrigger>
        {tailPatterns && <TabsTrigger value='tails'>Хвосты</TabsTrigger>}
      </TabsList>
      <TabsContent value='ears'>
        {earsPatterns && (
          <TabsContent value='ears'>
            <div className="flex gap-4 flex-wrap">
              {earsPatterns.map((item) => <Pattern variant="default" data={{ pattern: item }} key={item.id} />)}
            </div>
          </TabsContent>
        )}
      </TabsContent>
      {tailPatterns && (<TabsContent value='tails'>
        <div className="flex gap-4 flex-wrap">
          {tailPatterns.map((item) => <Pattern variant="default" data={{ pattern: item }} key={item.id} />)}
        </div>
      </TabsContent>)}
    </Tabs>
  );
};
export default PatternsSelection;
