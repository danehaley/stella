const adjustFontSize = (string, min = 0.4, max = 1, factor = 0.005) => {
  const fontSize = (fontSize) => {
    return fontSize + "rem";
  };
  const calculatedSize = 1 - string.length * factor;
  if (calculatedSize >= max) {
    return fontSize(max);
  } else if (calculatedSize <= min) {
    return fontSize(min);
  } else if (calculatedSize > min && calculatedSize < max) {
    return fontSize(calculatedSize);
  }
};

export default adjustFontSize;
