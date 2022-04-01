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
  modifiedArray.map(item => {
    const exists = original.find(i => isEqual(i, item));
    if (!exists) return added.push(item);
    return null;
  });
};

const changedIndices = (added, changed, removed, modifiedArray, original) => {
  original.map((item, index) => {
    const justAdded = added.includes(item);
    const justRemoved = removed.includes(item);
    const unchanged = modifiedArray.find(i => isEqual(i, item));
    const sameLength = isEqual(original.length, modifiedArray.length);


    if (!unchanged && sameLength && !justAdded && !justRemoved) {
      return changed.push({
        newVal: modifiedArray[index],
        oldVal: original[index],
      });
    }

    return null;
  });
};

const removedIndices = (added, removed, workingArray, modifiedArray, original) => {
  original.map(item => {
    const inNewArray = modifiedArray.findIndex(i => isEqual(item, i));
    const exists = inNewArray !== -1;
    const shorter = modifiedArray.length < workingArray.length;
    const justAdded = added.includes(item);
    if (!exists && shorter && !justAdded) return removed.push(item);
    return null;
  });
};

const mergeArray = (nextVal, original, newVal) => {
  const workingArray = [ ...nextVal || original ];
  const changed = [];
  const added = [];
  const removed = [];

  changedIndices(added, changed, removed, newVal, original);
  addedIndices(added, newVal, original);
  removedIndices(added, removed, workingArray, newVal, original);

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

const mergeObj = (nextVal, original, newVal) => {
  const workingObj = { ...nextVal || original };
  const added = [];
  const changed = [];
  const removed = [];

  addedKeys(added, original, newVal);
  changedKeys(changed, workingObj, newVal);
  removedKeys(removed, added, workingObj, newVal);

  // console.log(workingObj, newVal,  added, changed, removed);

  if (!isEmpty(changed)) {
    let withChanges = { ...workingObj  };
    changed.forEach(changed => withChanges = { ...withChanges, ...changed });
    console.log(workingObj, withChanges)
    return withChanges;
  }

  if (!isEmpty(added)) {
    let withAdditions = { ...workingObj };
    added.forEach(addition => withAdditions = { ...withAdditions, ...addition });
    console.log(workingObj, withAdditions)
    return withAdditions;
  }

  if (!isEmpty(removed)) {
    let withRemoved = { ...workingObj };
    removed.forEach(key => {
      const { [key]: value, ...withoutKey } = withRemoved;
      withRemoved = withoutKey;
    });
    console.log(workingObj, withRemoved)
    return withRemoved;
  }

  return workingObj;
}

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