export const deleteFromArray = (id, arr) => {
  let i = arr.findIndex(item => item.id === id);
  arr.splice(i, 1);
}
