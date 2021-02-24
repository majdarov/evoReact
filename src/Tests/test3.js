/*  Test regexp
let str = ['rgx test', 'rgx  2spase', 'rgx  tab','rgx(testScob)', 'rgx    (testTabScob)','rgx/test/', 'rgx /test/'];

str.forEach(item => {
  console.log(item.replace(/(^rgx\s*[/(])|(^rgx\s*)|\)$|\/$/gs, ''));
})
*/

let groups = [
  { id: '1', name: 'group 1' },
  { id: '2', name: 'group 2' },
  { id: '1-1', name: 'group 1-1', parent_id: '1' },
  { id: '1-2', name: 'group 1-2', parent_id: '1' },
  { id: '2-1-1', name: 'group 2-1-1', parent_id: '2-1' },
  { id: '1-2-1', name: 'group 1-2-1', parent_id: '1-2' },
  { id: '2-1', name: 'group 2-1', parent_id: '2' },
  { id: '2-2', name: 'group 2-2', parent_id: '2' },
];

function findChildren(parent = null, groups = []) { //return [...children];
  if (!groups.length) return null;
  if (parent.id === 'root') {
    return groups.filter(item => !item.parent_id)
  }
  return groups.filter(item => item.parent_id === parent.id);
}

function createSubTree(parent = null, groups = []) { //return {...parent, [...children]}
  if (parent === null) return null;
  let children = findChildren(parent, groups);
  if (children.length) {
    children = children.map(item => {
      return createSubTree(item, groups);
    })
  }
  return { ...parent, children };
}

function createTree(groups = []) {
  let root = {id: 'root', name: 'root', children: []};
  let tRoot = createSubTree(root, groups);
  console.log(JSON.stringify(tRoot, null, 2));
  return tRoot;
}

createTree(groups);
