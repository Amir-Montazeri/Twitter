export const convertArrayToObject = array => {
  var target = {};
  array.forEach(item => target[item.id] = item);
  return target;
};