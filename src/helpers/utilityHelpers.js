
export const swatchStyle = color => ({ color, fontSize: "0.6rem" });

export const resetPage = (navigate, pathname) => {
  navigate(pathname || '/');
  window.scrollTo(0, 0);
};

export const buildClasses = (classes, defaultClass) => {
  let classList = defaultClass || "";

  classes?.forEach(item => {
    const { condition, name } = item;
    if (condition) classList += ` ${name}`;
  });

  return classList;
};

export const addEvent = (name, func) => {
  window.addEventListener(name, e => func(e));
};

export const removeEvent = (name, func) => {
  window.removeEventListener(name, e => func(e));
};

export const truncate = (num, limit) => {
  num = num === 0 || !num ? "0.00000000" : num.toString();
  const hasFloatVal = num?.includes('.');

  if (hasFloatVal) {
    const split = num.split('.');
    const int = (+(split[0])).toLocaleString('en-US');
    const float = split[1].slice(0, limit ?? 2);
    const truncatedVal = `${int}${limit === 0 ? "" : "."}${float}`;

    return truncatedVal;
  };

  return (+(num)).toLocaleString('en-US');
};

export const trimText = (text, limit, characterTrim) => {
  let trimText = text.substr(0, limit || 115);
  trimText = trimText.substr(0, Math.min(trimText.length, trimText.lastIndexOf(characterTrim ? '' : ' ')));

  return trimText;
};

export const stringToArray = string => {
  const prep = string.replace(/[\\W_,]/g, "");
  const words = prep.split(' ');

  return words;
};

export const lowercaseArray = arr => {
  return arr.map(item => {
    if (typeof item === "string") return item.toLowerCase();
    return item;
  });
};