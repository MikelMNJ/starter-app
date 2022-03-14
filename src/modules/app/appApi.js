import apiRelay from "middleware/apiMiddleware";

export const sampleAPICall = args => {
  const { type, callback } = args;

  apiRelay({
    type,
    path: "/test",
    method: "GET",
    onSuccess: res => callback(res),
  });
};