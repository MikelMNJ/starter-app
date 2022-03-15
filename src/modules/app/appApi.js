
export const sampleAPICall = args => {
  const { type, callback } = args;

 return {
    type,
    path: "/test",
    method: "GET",
    onSuccess: res => callback(res),
  };
};