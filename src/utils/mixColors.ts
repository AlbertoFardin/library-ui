/**
 * Form a first color, mix into it a percentage of a second color
 *
 * Example usage:
 * mixColors(0, "#ff6600", "#ffffff")      // "#ff6600"
 * mixColors(0.25, "#ff6600", "#ffffff")   // "#ff8c40"
 * mixColors(0.50, "#ff6600", "#ffffff")   // "#ffb380"
 * mixColors(0.75, "#ff6600", "#ffffff")   // "#ffd9bf"
 * mixColors(1, "#ff6600", "#ffffff")      // "#ffffff"
 *
 * If `p` is negative, the mixing is inverted:
 * - `p` is treated as a positive value (abs(p)), but the "from" color becomes the reference color and the "to" color is blended against it.
 * - For example, mixColors(-0.5, "#000", "#fff") would return "#808080", as it mixes 50% of the second color (#fff) into the first color (#000).
 *
 * Valid percentage range: -1 to 1.
 * - A percentage of 0 means no blending, returning the "from" color.
 * - A percentage of 1 means the full "to" color is returned.
 * - Percentages between 0 and 1 result in various blends.
 *
 * @param p {Number} - The percentage of the second color to mix, valid from -1 to 1.
 *                    Negative values invert the mixing direction.
 * @param from {String} - The starting color (can be hex or rgba).
 * @param to {String} - The color to mix with the starting color (can be hex or rgba).
 *
 * @returns {String} - The resulting color, either in hex or rgba format.
 */
const mixColors = (p: number, from: string, to: string): string | null => {
  // Check if the percentage (p) is valid (between -1 and 1)
  if (typeof p !== "number" || p < -1 || p > 1) return null;
  // Validate both the 'from' and 'to' color strings
  if (!isValidColor(from)) return null;
  if (!isValidColor(to)) return null;
  // Check if percentage is negative, which will invert the mix
  // If percentage is negative, invert the mix direction by swapping colors and changing p to positive
  if (p < 0) {
    p = -p; // Convert percentage to positive for calculation
    [from, to] = [to, from]; // Swap the colors
  }
  // Parse both the 'from' and 'to' colors
  const f = stringToRGBA(from);
  const t = stringToRGBA(to);
  if (!f || !t) return null;

  // Calculate the mixed color based on the percentage (p)
  const r = componentMix(p, f.r, t.r);
  const g = componentMix(p, f.g, t.g);
  const b = componentMix(p, f.b, t.b);
  const a =
    f.a === 1 && t.a === 1
      ? 1
      : Math.round(((t.a - f.a) * p + f.a) * 10000) / 10000;
  return rgbaToString({ r, g, b, a });
};

const componentMix = (p: number, f: number, t: number) =>
  Math.round(Math.round((t - f) * p + f));

const hexPattern =
  /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const rgbaPattern =
  /^rgba?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(\d*\.?\d+))?\s*\)$/i;

// Helper function to validate color format (either hex or rgba)
export const isValidColor = (color: string): boolean => {
  if (typeof color !== "string") return false;
  if (hexPattern.test(color)) {
    return true;
  }
  if (rgbaPattern.test(color)) {
    return true;
  }
  return false;
};

interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number; // tra 0 e 1
}

const stringToRGBA = (color: string): RGBA | null => {
  if (!isValidColor(color)) return null;

  const rgba = color.match(rgbaPattern);
  if (rgba) {
    return {
      r: parseInt(rgba[1]),
      g: parseInt(rgba[2]),
      b: parseInt(rgba[3]),
      a: rgba[4] !== undefined ? parseFloat(rgba[4]) : 1,
    };
  }

  const hex = color.match(hexPattern);
  if (hex) {
    let hexVal = hex[1];

    if (hexVal.length === 3 || hexVal.length === 4) {
      hexVal = hexVal
        .split("")
        .map((c) => c + c)
        .join("");
    }
    const r = parseInt(hexVal.slice(0, 2), 16);
    const g = parseInt(hexVal.slice(2, 4), 16);
    const b = parseInt(hexVal.slice(4, 6), 16);
    let a = 1;
    if (hexVal.length === 8) {
      const alpha = parseInt(hexVal.slice(6, 8), 16);
      a = Math.round((alpha / 255) * 10000) / 10000;
    }
    return { r, g, b, a };
  }
  return null;
};

const rgbaToString = (rgba: RGBA): string => {
  const { r, g, b, a } = rgba;
  if (a < 1) {
    return `rgba(${r},${g},${b},${a})`;
  } else {
    const toHex = (n: number) => n.toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
};

export default mixColors;
