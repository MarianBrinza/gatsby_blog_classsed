/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { slugify } = require('./src/util/utility');
const path = require('path');

// create and attach the fields object with the slug property
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slugFromTitle = slugify(node.frontmatter.title);
    createNodeField({
      node,
      name: 'slug',
      value: slugFromTitle
    });
  }
};

exports.createPages = ({ actions, graphql }) => {

  const { createPage } = actions;
  const singlePageTemplate = path.resolve('src/templates/single-post.js');

  return graphql(`
    {  
      allMarkdownRemark{
        edges{
          node{
            frontmatter{
              author
              tags
            }
            fields{
              slug
            }          
          }
        }
      }    
    }
  `).then((res) => {
    if (res.errors) {
      return Promise.reject(res.errors);
    }
    const posts = res.data.allMarkdownRemark.edges;

    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: singlePageTemplate,
        context: {
          // passing slug for template to  use to get the post
          slug: node.fields.slug
        }
      });
    });
  });

};
