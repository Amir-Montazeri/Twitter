export const isContains = (allArray, ownValue) => {
  var was = false;
  allArray.forEach(item => {
    if (item === ownValue) was = true
  });
  return was;
};