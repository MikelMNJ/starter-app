export const objectTypeError = (payload, target) => (
  console.error(
    `Unable to add ${typeof payload} type to object:`,
    target,
    "Change payload type to object with valid key/value pair."
));

export const objectKeyError = (isArr, key, target) => {
  if (isArr) {
    return console.warn(`Index ${key} not found.`);
  }

  return console.error(
    `Unable to update! "${key}" does not exist in: `, target
  );
};

export const targetError = mode => (
  console.warn(`Unable to find target to ${mode}.${mode === 'update'
      ? " It has been added to state as a new key."
      : " Please check key name in state."
    }`
  )
);