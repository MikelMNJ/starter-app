
export const checkToken = args => {
  const { type, payload } = args;

  return {
    type,
    path: "/users/me",
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
  };
};

export const createUser = args => {
  const { type, payload, callback } = args;

 return {
    type,
    path: "/users",
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    onComplete: res => callback && callback(res),
  };
};

export const updateUser = args => {
  const { type, payload, callback } = args;
  const { token, ...withoutToken } = payload;

 return {
    type,
    path: "/users",
    method: "PUT",
    body: JSON.stringify(withoutToken),
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-auth-token": `${token}`,
    },
    onSuccess: res => callback && callback(res),
  };
};

export const deleteUser = args => {
  const { type, payload, callback } = args;
  const { token, ...withoutToken } = payload;

 return {
    type,
    path: "/users",
    method: "DELETE",
    body: JSON.stringify(withoutToken),
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-auth-token": `${token}`,
    },
    onComplete: res => callback && callback(res),
  };
};

export const sendResetEmail = args => {
  const { type, payload, callback } = args;

 return {
    type,
    path: "/emails/pw-reset",
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    onComplete: res => callback && callback(res),
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
    onComplete: res => callback && callback(res),
  };
};