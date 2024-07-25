const StylingSVGByName = ({ color }: { color: string }) => {
  return (
    <style>
      {
        `
          [data-name=color] {
            fill: ${color}
          }
        `
      }
    </style>
  );
};
export default StylingSVGByName;
