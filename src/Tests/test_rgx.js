let str = ['rgx test', 'rgx  2spase', 'rgx  tab','rgx(testScob)',
 'rgx    (testTabScob)','rgx/test/', 'rgx /test/', 'rgx \\(\\d+\\w+\\)'];

str.forEach(item => {
  console.log(item.replace(/(^rgx\s*[/(])|(^rgx\s*)|\)$|\/$/gs, ''));
  console.log(item.replace(/rgx\s*/, '').replace(/^[(/](.*)[)/]$/, '$1'))
})
