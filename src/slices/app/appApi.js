
export const sampleAPICall = args => {
  const { type, callback } = args;

 return {
    type,
    path: "/sample",
    method: "GET",
    onSuccess: res => callback(res),
    onFail: res => callback(res),
  };
};

export const testRateLimit = args => {
  const { type, callback } = args;

 return {
    type,
    path: "/sample/limitTest",
    method: "GET",
    onSuccess: res => callback(res),
    onFail: res => callback(res),
  };
};

export const login = args => {
  const { type, payload, callback } = args;

 return {
    type,
    path: "/auth",
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    onComplete: res => callback(res),
  };
};

export const checkToken = args => {
  const { type, payload } = args;

 return {
    type,
    path: "/user/me",
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
  };
};

export const sendEmail = args => {
  const { type, payload, callback } = args;

 return {
    type,
    path: "/email",
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    onSuccess: res => callback(res),
    onFail: res => callback(res),
  };
};