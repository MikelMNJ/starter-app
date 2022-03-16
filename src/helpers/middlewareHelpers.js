import { startsWith } from 'lodash';

export const prepPath = path => {
  if (startsWith(path, '/')) {
    return path.substring(1);
  }

  return path;
};