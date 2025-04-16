/*
 * generates random colors from  https://ant.design/docs/spec/colors. <color-4> used.
 */
export const getRandomColorFromString = (text: string) => {
  const colors = [
    "#fa7b3c",
    "#ff7875",
    "#bb894a",
    "#968e1a",
    "#ceb414",
    "#689a45",
    "#5cdbd3",
    "#69c0ff",
    "#85a5ff",
    "#b37feb",
    "#ff85c0",
  ];

  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  hash = ((hash % colors.length) + colors.length) % colors.length;

  return colors[hash];
};
