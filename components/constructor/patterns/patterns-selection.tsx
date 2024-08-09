import Pattern from "./pattern";
import StylingSVGByName from "../../styling-svg-by-name";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BabyCatPatternsEnum } from "@/lib/assets-info";
import { useAppSelector } from "@/lib/hooks/store-hooks";

type BabyCatPatternsEnumKey = keyof typeof BabyCatPatternsEnum;

const PatternsSelection = () => {
  const petProps = useAppSelector((state) => state.petConstructor);
  const patternColorPickerState = useAppSelector((state) => state.patternColorPicker);
  const { color } = patternColorPickerState;

  const tailValue = petProps.tail.value;
  const tailKey = `tail-${tailValue}` as BabyCatPatternsEnumKey;
  const tailPatterns = BabyCatPatternsEnum[tailKey];

  const earsValue = petProps.ears.value;
  const earsKey = `ears-${earsValue}` as BabyCatPatternsEnumKey;
  const earsPatterns = BabyCatPatternsEnum[earsKey];

  const bodyPatterns = BabyCatPatternsEnum['body-1' as BabyCatPatternsEnumKey];

  return (
    <Tabs>
      <TabsList>
        {earsPatterns && <TabsTrigger value='ears'>Уши</TabsTrigger>}
        {tailPatterns && <TabsTrigger value='tails'>Хвосты</TabsTrigger>}
        {bodyPatterns && <TabsTrigger value='body'>Тело</TabsTrigger>}
      </TabsList>
      {earsPatterns && (
        <TabsContent value='ears'>
          <div className="flex gap-2 flex-wrap">
            <StylingSVGByName color={color} />
            {earsPatterns.map((item) => <Pattern data={{ pattern: item }} key={item.id} />)}
          </div>
        </TabsContent>
      )}
      {tailPatterns && (
        <TabsContent value='tails'>
          <div className="flex gap-2 flex-wrap">
            <StylingSVGByName color={color} />
            {tailPatterns.map((item) => <Pattern data={{ pattern: item }} key={item.id} />)}
          </div>
        </TabsContent>
      )}
      {bodyPatterns && (
        <TabsContent value='body'>
          <div className="flex gap-2 flex-wrap">
            <StylingSVGByName color={color} />
            {bodyPatterns.map((item) => <Pattern data={{ pattern: item }} key={item.id} />)}
          </div>
        </TabsContent>
      )}
      
    </Tabs>
  );
};
export default PatternsSelection;
