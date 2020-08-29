let colors = [
  "#ff4c4c",
  "#0099e5",
  "#34bf49",
  "#f48924",
  "#30c39e",
  "#52565e",
  "#fd5c63",
  "#ff4f81",
  "#8e43e7",
  "#2dde98",
  "#49c0b6",
];

const randomColor = () => {
  let random = Math.floor(Math.random() * colors.length);
  let color = colors[random];
  colors.splice(random, 1);
  return color;
};

export default randomColor;
