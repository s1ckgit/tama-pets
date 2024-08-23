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
    <>
      <StylingSVGByName color={color} />
      <Tabs defaultValue={(earsPatterns && 'ears') || (tailPatterns && 'tails') || (bodyPatterns && 'body')}>
        <TabsList>
          {earsPatterns && <TabsTrigger value='ears'>Уши</TabsTrigger>}
          {tailPatterns && <TabsTrigger value='tails'>Хвосты</TabsTrigger>}
          {bodyPatterns && <TabsTrigger value='body'>Тело</TabsTrigger>}
        </TabsList>

        {earsPatterns && (
          <TabsContent className="grid gap-2 grid-cols-3" value='ears'>
            {earsPatterns.map((item) => <Pattern data={{ pattern: item }} key={item.id} />)}
          </TabsContent>
        )}
        {tailPatterns && (
          <TabsContent className="grid gap-2 grid-cols-3" value='tails'>
            {tailPatterns.map((item) => <Pattern data={{ pattern: item }} key={item.id} />)}
          </TabsContent>
        )}
        {bodyPatterns && (
          <TabsContent className="grid gap-2 grid-cols-3" value='body'>
            {bodyPatterns.map((item) => <Pattern data={{ pattern: item }} key={item.id} />)}
          </TabsContent>
        )}
      </Tabs>
    </>

  );
};
export default PatternsSelection;
