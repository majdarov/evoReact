function findChildren(parent = null, groups = []) { //return [...children];
  if (!groups.length) return null;
  if (parent.id === 'root') {
    return groups.filter(item => !item.parent_id && !item.pid)
  }
  return groups.filter(item => item.parent_id === parent.id || item.pid === parent.id);
}

function createSubTree(parent = null, groups = []) { //return {...parent, [...children]}
  if (parent === null) return null;
  let children = findChildren(parent, groups);
  if (children?.length) {
    children = children.map(item => {
      return createSubTree(item, groups);
    })
  }
  return { ...parent, children };
}

function createTree(groups = []) {
  let root = {id: 'root', name: 'root', children: []};
  let tRoot = createSubTree(root, groups);
  // console.log(JSON.stringify(tRoot, null, 2));
  return tRoot;
}

export default createTree;
