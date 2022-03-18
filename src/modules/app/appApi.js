
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