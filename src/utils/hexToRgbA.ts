/* eslint-disable no-bitwise */
const hexToRgbA = (hex: string, opacity = 1) => {
  try {
    let c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    const c1 = Number(`0x${c.join("")}`);
    // tslint:disable-next-line:no-bitwise
    return `rgba(${[(c1 >> 16) & 255, (c1 >> 8) & 255, c1 & 255].join(
      ",",
    )},${opacity})`;
  } catch (err) {
    console.error("Bad Hex: ", hex, err);
    return hex;
  }
};

export default hexToRgbA;
