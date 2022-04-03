export const paramsToObject = params => {
  const decodedParams = decodeURI(params);
  const rawString = decodedParams.split(/[?&]+/);
  const paramsArray = rawString.slice(1, rawString.length);
  const paramsObject = {};

  paramsArray.forEach(param => {
    const rawVal = param.split('=');
    const key = rawVal[0];
    const value = rawVal[1];

    paramsObject[key] = value;
  })

  return paramsObject;
}

export const paramsToString = params => {
  let paramsArray = [];

  for (let key in params) {
    paramsArray.push(`${key}=${params[key]}`);
  }

  paramsArray.forEach((param, index) => {
    if (index === 0) {
      paramsArray[index] = `?${encodeURI(param)}`;
    } else {
      paramsArray[index] = `&${encodeURI(param)}`;
    }
  });

  return paramsArray.join('');
}

export const paramsFromURL = () => {
  const location = window.location.href;
  const paramSplit = location.split('?');
  const params = `?${paramSplit[1]}`;
  const workingParams = paramsToObject(params);

  delete workingParams.undefined;

  return paramsToString(workingParams);
}