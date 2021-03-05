const path = require('path')
exports.createPages = async ({graphql, actions}) => {
    const {createPage} = actions
    const res = await graphql(`
    query MyQuery{
    prod: allContentfulItems{
        nodes{
          subTitle
        }
      }}
    `)
    res.data.prod.nodes.forEach((product) => {
        console.log('#########');
        console.log(product);
        console.log('#########');
        createPage({
            path: `/prods/${product.subTitle}`,
            component: path.resolve(`src/template/prodTemplate.js`),
            context: {
                subTitle: product.subTitle,
            }
        })
    })
}