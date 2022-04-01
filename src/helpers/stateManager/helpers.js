import { isEmpty, isEqual, isArray, isObject } from 'lodash';

export const addedKeys = (added, workingObj, modifiedObj) => {
  Object.keys(modifiedObj).map(key => {
    const prev = workingObj[key];
    const current = modifiedObj[key];
    if (!prev && current) added.push({ [key]: current });
    return null;
  });
};

export const changedKeys = (changed, workingObj, modifiedObj) => {
  return Object.keys(workingObj).map(key => {
    const prev = workingObj[key];
    const current = modifiedObj[key];
    const bothPresent = prev && current;
    const hasChange = !isEqual(prev, current);

    if (bothPresent && hasChange) changed.push({ [key]: current });
    return null;
  });
};

export const removedKeys = (removed, added, workingObj, modifiedObj) => {
  Object.keys(workingObj).map(key => {
    const justAdded = added.includes(key);
    if (!justAdded && !modifiedObj[key]) removed.push(key);
    return null;
  });
};

const addedIndices = (added, modifiedArray, original) => {
  modifiedArray.forEach(item => {
    const exists = original.find(i => isEqual(i, item));
    if (!exists) return added.push(item);
  });
};

const changedIndices = (changed, modifiedArray, original) => {
  original.forEach((item, index) => {
    const unchanged = modifiedArray.find(i => isEqual(i, item));
    const sameLength = isEqual(original.length, modifiedArray.length);

    if (!unchanged && sameLength) {
      return changed.push({
        newVal: modifiedArray[index],
        oldVal: original[index],
      });
    }
  });
};

const removedIndices = (removed, workingArray, modifiedArray, original) => {
  original.forEach(item => {
    const inNewArray = modifiedArray.findIndex(i => isEqual(item, i));
    const exists = inNewArray !== -1;
    const shorter = modifiedArray.length < workingArray.length;
    if (!exists && shorter) return removed.push(item);
  });
};

const mergeArray = (nextVal, original, newVal) => {
  const workingArray = [ ...nextVal || original ];
  const changed = [];
  const added = [];
  const removed = [];

  changedIndices(changed, newVal, original);
  addedIndices(added, newVal, original);
  removedIndices(removed, workingArray, newVal, original);

  if (!isEmpty(changed)) {
    const withChanges = workingArray.map(item => {
      const updated = changed.find(changed => isEqual(changed.oldVal, item));
      if (updated) return updated.newVal;
      return item;
    });

    return withChanges;
  }

  if (!isEmpty(added)) {
    const withAdditions = [ ...workingArray, ...added ];
    return withAdditions;
  }

  if (!isEmpty(removed)) {
    const withRemoved = workingArray.filter(item => {
      const absent = removed.includes(item);
      if (!absent) return item;
      return null;
    }).filter(item => item);

    return withRemoved;
  }
  return workingArray;
};

const addedTemp = (added, modifiedObj, original) => {
  Object.keys(modifiedObj).forEach(key => {
    const oldVal = original[key];
    const newVal = modifiedObj[key];
    if (!oldVal) added.push({ [key]: newVal });
  });
};

const changedTemp = (changed, modifiedObj, original) => {
  Object.keys(original).forEach(key => {
    const originalVal = original[key];
    const newVal = modifiedObj[key];
    const exists = newVal;
    const hasChange = !isEqual(newVal, originalVal);
    if (exists && hasChange) changed.push({ [key]: newVal });
  });
};

const removedTemp = (removed, newVal, original) => {
  Object.keys(original).forEach(key => {
    const inNewObject = newVal[key];
    if (!inNewObject) removed.push(key);
  });
};

const mergeObj = (nextVal, original, newVal) => {
  const workingObj = { ...nextVal || original };
  const added = [];
  const changed = [];
  const removed = [];

  addedTemp(added, newVal, original);
  changedTemp(changed, newVal, original);
  removedTemp(removed, newVal, original);

  if (!isEmpty(changed)) {
    let withChanges = { ...workingObj  };
    changed.forEach(changed => withChanges = { ...withChanges, ...changed });
    return withChanges;
  }

  if (!isEmpty(added)) {
    let withAdditions = { ...workingObj };
    added.forEach(addition => withAdditions = { ...withAdditions, ...addition });
    return withAdditions;
  }

  if (!isEmpty(removed)) {
    let withRemoved = { ...workingObj };
    removed.forEach(key => {
      const { [key]: value, ...withoutKey } = withRemoved;
      withRemoved = withoutKey;
    });

    return withRemoved;
  }

  return workingObj;
};

export const mergeChanges = (changed, key, workingState, prevVal, workingVal) => {
  const nextVal = workingVal || prevVal;
  const original = workingState[key];
  const newVal = changed[key];
  const isArr = isArray(newVal);
  const isObj = isObject(newVal);

  if (isArr) return mergeArray(nextVal, original, newVal);
  if (isObj) return mergeObj(nextVal, original, newVal);
  return newVal || prevVal;
};