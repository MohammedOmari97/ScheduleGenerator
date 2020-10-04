let colors = [
  {
    level0: "#FFCAB7",
    level1: "#ff4c4c",
    level2: "#DB3745",
  },
  {
    level0: "#97EEFC",
    level1: "#0099e5",
    level2: "#0076C4",
  },
  {
    level0: "#B9F8B0",
    level1: "#34bf49",
    level2: "#26A444",
  },
  {
    level0: "#FDDEA7",
    level1: "#f48924",
    level2: "#D16A1A",
  },
  {
    level0: "#ADF9D0",
    level1: "#30c39e",
    level2: "#23A793",
  },
  {
    level0: "#E2E8EE",
    level1: "#52565e",
    level2: "#3B4250",
  },
  {
    level0: "#FECCBD",
    level1: "#fd5c63",
    level2: "#D94357",
  },
  {
    level0: "#FFB9B8",
    level1: "#ff4f81",
    level2: "#DB3977",
  },
  {
    level0: "#DFB4FC",
    level1: "#8e43e7",
    level2: "#6E30C6",
  },
  {
    level0: "#ABFBC4",
    level1: "#2dde98",
    level2: "#20BE90",
  },
  {
    level0: "#BBF8E2",
    level1: "#49c0b6",
    level2: "#35A4A5",
  },
];

const randomColor = () => {
  let random = Math.floor(Math.random() * colors.length);
  console.log(random + " <<< random");
  let color = colors[random];
  colors.splice(random, 1);
  console.log(colors);
  return color;
};

export default randomColor;
