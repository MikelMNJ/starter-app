
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
    onSuccess: res => callback(res),
  };
};

export const deleteUser = args => {
  const { type, payload, callback } = args;

 return {
    type,
    path: "/users",
    method: "DELETE",
    body: JSON.stringify(payload),
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-auth-token": `${payload.token}`,
    },
    onSuccess: res => callback(res),
  };
};