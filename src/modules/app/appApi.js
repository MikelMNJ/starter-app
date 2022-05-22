
export const sampleAPICall = args => {
  const { type, callback } = args;

 return {
    type,
    path: "/sample",
    method: "GET",
    onSuccess: res => callback && callback(res),
    onFail: res => callback && callback(res),
  };
};

export const sendEmail = args => {
  const { type, payload, callback } = args;

 return {
    type,
    path: "/emails",
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    onSuccess: res => callback && callback(res),
    onFail: res => callback && callback(res),
  };
};

// Remove: example only...
export const testRateLimit = args => {
  const { type, callback } = args;

  return {
    type,
    path: "/sample/limitTest",
    method: "GET",
    onSuccess: res => callback && callback(res),
    onFail: res => callback && callback(res),
  };
};