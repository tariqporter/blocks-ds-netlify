// const path = require("path");
// const fs = require('fs');
// const yaml = require("js-yaml");
const execSync = require('child_process').execSync;
// const { createFilePath } = require("gatsby-source-filesystem");

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions
//   // you only want to operate on `Mdx` nodes. If you had content from a
//   // remote CMS you could also check to see if the parent node was a
//   // `File` node here
//   if (node.internal.type === "Mdx") {
//     const value = createFilePath({ node, getNode })
//     createNodeField({
//       // Name of the field you are adding
//       name: "slug",
//       // Individual MDX node
//       node,
//       // Generated value based on filepath with "blog" prefix. you
//       // don't need a separating "/" before the value because
//       // createFilePath returns a path with the leading "/".
//       value: `/blog${value}`,
//     })
//   }
// }

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions;
  // const ymlDoc = yaml.safeLoad(fs.readFileSync("./index.yaml", "utf-8"));
  // const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`)
  const result = await graphql(`
    {
        allMdx(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1000
        ) {
          edges {
            node {
              id
              body
              frontmatter {
                title
                section
                path
              }
            }
          }
        }
      }
  `);

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  // console.log(result);
  // Create blog post pages.
  // const posts = result.data.allMdx.edges
  // you'll call `createPage` for each result
  // console.log(ymlDoc);
  result.data.allMdx.edges.forEach(({ node }) => {
    // console.log(node.id);
    createPage({
      path: node.frontmatter.path,
      component: require.resolve("./src/templates/PageTemplate.js"),
      context: { id: node.id }, // additional data can be passed via context
    })
  })
}

// exports.createPages = async ({ actions, graphql, reporter }) => {
//   const { createPage } = actions
//   const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`)
//   const result = await graphql(`
//   {
//     allMdx(
//       sort: { order: DESC, fields: [frontmatter___date] }
//       limit: 1000
//     ) {
//       edges {
//         node {
//           frontmatter {
//             path
//           }
//         }
//       }
//     }
//   }
//   `)
//   // Handle errors
//   if (result.errors) {
//     reporter.panicOnBuild(`Error while running GraphQL query.`)
//     return
//   }
//   console.log('here3', result.data.allMdx.edges)
//   result.data.allMdx.edges.forEach(({ node }) => {
//     createPage({
//       path: node.frontmatter.path,
//       component: blogPostTemplate,
//       context: {}, // additional data can be passed via context
//     })
//   })
// }

// exports.onCreateWebpackConfig = ({ stage, actions, loaders, getConfig }) => {
//   if (stage !== 'develop') return;

//   console.log('blocks-base: building...');
//   const buildBase = execSync('cd ../blocks-base; gulp build', {stdio: 'inherit'});
//   console.log('blocks-base: complete');
//   console.log('blocks-react: building...');
//   const buildReact = execSync('cd ../blocks-react; gulp build', {stdio: 'inherit'});
//   console.log('blocks-react: complete');

//   return;
// }