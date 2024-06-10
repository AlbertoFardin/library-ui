/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-sequences */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-template */
/* eslint-disable no-unused-expressions */
/**
 * form a first color, mix into it a percentage of a second color
 *
 * es:
 * mixColors(0,"#ff6600", "#ffffff")      // "#ff6600"
 * mixColors(0.25,"#ff6600", "#ffffff")   // "#ff8c40"
 * mixColors(0.50,"#ff6600", "#ffffff")   // "#ffb380"
 * mixColors(0.75,"#ff6600", "#ffffff")   // "#ffd9bf"
 * mixColors(1,"#ff6600", "#ffffff")      // "#ffffff"
 *
 * https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)
 * https://jsfiddle.net/PimpTrizkit/wj8rkjej/
 * https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
 *
 * @param p {Number} percentage of second color to add, its value is a range  between 0 to 1
 * @param from {String} start color of the mix, it can be rgba or hex
 * @param to {String} added color of the mix, it can be rgba or hex
 * @returns {String} final color
 */
const mixColors = function (p, from, to) {
  if (
    typeof p !== "number" ||
    p < -1 ||
    p > 1 ||
    typeof from !== "string" ||
    (from[0] !== "r" && from[0] !== "#") ||
    (to && typeof to !== "string")
  )
    return null; // ErrorCheck
  let sbcRip;

  if (!sbcRip) {
    sbcRip = (d) => {
      const l = d.length;
      const RGB = {};
      if (l > 9) {
        d = d.split(",");
        if (d.length < 3 || d.length > 4) return null; // ErrorCheck
        (RGB[0] = i(d[0].split("(")[1])),
          (RGB[1] = i(d[1])),
          (RGB[2] = i(d[2]));
        RGB[3] = d[3] ? parseFloat(d[3]) : -1;
      } else {
        if (l === 8 || l === 6 || l < 4) return null; // ErrorCheck
        if (l < 6) {
          d =
            "#" +
            d[1] +
            d[1] +
            d[2] +
            d[2] +
            d[3] +
            d[3] +
            (l > 4 ? d[4] + "" + d[4] : "");
        } // 3 or 4 digit
        (d = i(d.slice(1), 16)),
          // tslint:disable-next-line:no-bitwise
          (RGB[0] = (d >> 16) & 255),
          (RGB[1] = (d >> 8) & 255),
          (RGB[2] = d & 255),
          (RGB[3] = -1);
        // tslint:disable-next-line:max-line-length
        // tslint:disable-next-line:no-bitwise
        // tslint:disable-next-line:max-line-length
        if (l === 9 || l === 5) {
          // tslint:disable-next-line:no-bitwise
          (RGB[3] = r((RGB[2] / 255) * 10000) / 10000),
            (RGB[2] = RGB[1]),
            (RGB[1] = RGB[0]),
            (RGB[0] = (d >> 24) & 255);
        }
      }
      return RGB;
    };
  }
  const i = parseInt;
  const r = Math.round;
  let h = from.length > 9;
  h =
    typeof to === "string"
      ? to.length > 9
        ? true
        : to === "c"
          ? !h
          : false
      : h;
  const b = p < 0;
  p = b ? p * -1 : p;
  to = to && to !== "c" ? to : b ? "#000000" : "#FFFFFF";
  const f = sbcRip(from);
  const t = sbcRip(to);
  if (!f || !t) return null; // ErrorCheck
  if (h) {
    return (
      "rgb" +
      (f[3] > -1 || t[3] > -1 ? "a(" : "(") +
      r((t[0] - f[0]) * p + f[0]) +
      "," +
      r((t[1] - f[1]) * p + f[1]) +
      "," +
      r((t[2] - f[2]) * p + f[2]) +
      (f[3] < 0 && t[3] < 0
        ? ")"
        : "," +
          (f[3] > -1 && t[3] > -1
            ? r(((t[3] - f[3]) * p + f[3]) * 10000) / 10000
            : t[3] < 0
              ? f[3]
              : t[3]) +
          ")")
    );
  }

  return (
    "#" +
    (
      0x100000000 +
      r((t[0] - f[0]) * p + f[0]) * 0x1000000 +
      r((t[1] - f[1]) * p + f[1]) * 0x10000 +
      r((t[2] - f[2]) * p + f[2]) * 0x100 +
      (f[3] > -1 && t[3] > -1
        ? r(((t[3] - f[3]) * p + f[3]) * 255)
        : t[3] > -1
          ? r(t[3] * 255)
          : f[3] > -1
            ? r(f[3] * 255)
            : 255)
    )
      .toString(16)
      .slice(1, f[3] > -1 || t[3] > -1 ? undefined : -2)
  );
};

export default mixColors;
