import { isEqual } from 'lodash';

export const changedKeys = (changed, workingState, modifiedState) => {
  return Object.keys(workingState).map(key => {
    const prev = workingState[key];
    const current = modifiedState[key];
    const bothPresent = prev && current;
    const hasChange = !isEqual(prev, current);

    if (bothPresent && hasChange) changed.push({ [key]: current });
    return null;
  });
};

export const addedKeys = (added, workingState, modifiedState) => {
  Object.keys(modifiedState).map(key => {
    const prev = workingState[key];
    const current = modifiedState[key];
    if (!prev && current) added.push({ [key]: current });
    return null;
  });
};

export const removedKeys = (removed, added, workingState, modifiedState) => {
  Object.keys(workingState).map(key => {
    const justAdded = added.includes(key);
    if (!justAdded && !modifiedState[key]) removed.push(key);
    return null;
  });
};

export const mergeArray = (original, nextVal, newVal) => {
  const sameLength = nextVal?.length === newVal.length;
  const shorter = nextVal?.length < newVal.length;

  // console.log(nextVal || original, newVal);

  // Same length? Replace with updated array.
  if (sameLength && !isEqual(original, newVal)) {
    return nextVal = newVal;
  }

  // Less indices than newVal? Find newly added index values.
  if (shorter) {
    const additions = newVal.map((item, index) => {
      if (index > nextVal?.length - 1) return item;
      return null;
    }).filter(item => item);

    return nextVal = [ ...nextVal || [], ...additions ];
  }

  // More indices than newVal? Find removed indices.
  if (nextVal && !shorter) {
    const removed = original.map((item, index) => {
      const location = newVal.indexOf(item);
      if (location === -1) return item;
      return null;
    }).filter(item => item);

    const withRemovedVals = nextVal.filter?.(item => {
      if (!removed.includes(item)) return item;
      return null;
    }).filter(item => item);

    return withRemovedVals;
  }

  // Initial nextVal undefined.
  return nextVal = [ ...nextVal || [], ...newVal ];
};