const fs = require('fs');
const md2json = require('md-2-json');

module.exports.CustomBuild = (o) => {
  console.log(o)
  let jsonout = [];
  o.filemap.forEach(e => {
    console.log(e.mdpath)
    let md = fs.readFileSync(e.mdpath, 'utf-8');
    let mdparsed = md2json.parse(md);
    for(key in mdparsed) {
      let d = {};
      if(key != 'raw') {
        d.text = mdparsed[key].raw;
        d.name = o.config.root +  '/' + e.path;
        d.page_title = e.frontmatter.title;
        d.section_title = key
        jsonout.push(d)

        for(key_ in mdparsed[key]) {
          let di = {};
          if(key_ != 'raw') {
            di.text = mdparsed[key][key_]?.raw;
            di.name = o.config.root +  '/' + e.path;
            di.page_title = e.frontmatter.title;
            di.section_title = key_
            jsonout.push(di)
          }
        }
      }
    }
    // let d = {
    //   text:fs.readFileSync(e.mdpath, 'utf-8'),
    //   name: o.config.root +  '/' + e.path,
    //   page_title: e.frontmatter.title,
    //   section_title: mdparsed
    // }
    // jsonout.push(mdparsed);
  })
  fs.writeFileSync('theme/static/search_data.json', JSON.stringify(jsonout))
}