export function clickCell(ev) {
  let elem = ev.target;
  if (elem.tagName !== 'TD') return;
  let row = elem.closest('tr').id;
  let column = elem.getAttribute('name');
  let cell = elem.innerText;
  return { row, column, cell };
}

export function clickTable(ev, callback) {
  let elem = ev.target;
  let result;
  if (elem.tagName === 'TD') {
    result = clickCell(ev);
  }
  if (callback) {
    callback(result.row);
  } else {
    alert(JSON.stringify(result, null, 2));
  }
}
