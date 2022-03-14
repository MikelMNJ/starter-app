import apiRelay from "middleware/api";

export const sampleAPICall = args => {
  const { type, callback } = args;

  apiRelay({
    type,
    path: "/test",
    method: "GET",
    onSuccess: res => callback(res),
  });
};