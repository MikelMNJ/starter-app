
export const hexValid = val => {
  const isValid = val?.startsWith?.("#") && (
    val?.length === 4
    || val?.length === 7
    || val?.length === 9
  );

  if (isValid) return val;
};

export const iconValid = val => {
  const legacy = false; // Font Awesome version < 6.0.0
  const legacyTypes = [ "fab", "fas", "far", "fal", "fad" ];
  const types = [ "solid", "regular", "light", "thin", "duotone", "brands" ];
  const isValid =  (legacy ? legacyTypes : types).find(type => (
    val?.startsWith?.(legacy ? type : `fa-${type}`)
  ));

  if (isValid) return val;
};

export const btnValid = val => {
  const types = [ "solid", "ghost", "transparent" ];
  const isValid = val && types.find(type => val === type);

  if (isValid) return val;
};

export const urlValid = val => {
  /* eslint-disable-next-line */
  const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;
  const hasProtocol = val?.includes?.("https://");
  const isValid = regex.test(val);

  if (isValid) {
    return hasProtocol ? val : `https://${val}`;
  };

  return val?.includes?.("localhost") ? val : "";
};
