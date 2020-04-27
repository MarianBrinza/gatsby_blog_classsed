/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { slugify } = require('./src/util/utility');
const path = require('path');
const authors = require('./src/util/authors');
const _ = require('lodash');

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

// dinamicaly create a new page for each post (markdown file)
exports.createPages = ({ actions, graphql }) => {

  const { createPage } = actions;
  const templates = {
    singlePageTemplate: path.resolve('src/templates/single-post.js'),
    tagsPage: path.resolve('src/templates/tags-page.js'),
    tagPost: path.resolve('src/templates/tag-posts.js'),
    postList: path.resolve('src/templates/post-list.js')
  };

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

    // create single blog post pages
    posts.forEach(({ node }) => {

      let authorPic = authors.find(author => author.name === node.frontmatter.author);
      if (authorPic) {
        authorPic = authorPic.imageUrl;
      } else {
        authorPic = 'default.png';
      }

      createPage({
        path: node.fields.slug,
        component: templates.singlePageTemplate,
        context: {
          // passing slug for template to  use to get the post
          slug: node.fields.slug,
          // find author img url from authors and pass it to the single post template
          imageUrl: authorPic
        }
      });
    });

    // logic for the tags page - get all tags
    let tags = [];

    // bad implementation, pure js is better
    /*
      _.each(posts, edge => {
        if (_.get(edge, 'node.frontmatter.tag')) {
          tags = tags.concat(edge.node.frontmatter.tag);
        }
      });
     */

    // my version - pure js
    posts.forEach(post => {
      tags.push(...post.node.frontmatter.tags);
    });


    let tagPostCounts = {};
    tags.forEach(tag => tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1);

    // remove duplicate tags
    tags = _.uniq(tags);

    // create tags page
    createPage({
      path: '/tags',
      component: templates.tagsPage,
      context: {
        tags,
        tagPostCounts
      }
    });

    // create tag post pages
    tags.forEach(tag => {
      createPage({
        path: `/tags/${slugify(tag)}`,
        component: templates.tagPost,
        context: {
          tag
        }
      });
    });

    // paginate posts
    // the posts are in posts array
    const postsPerPage = 3;
    const numberOfPages = Math.ceil(posts.length / postsPerPage);

    Array.from({ length: numberOfPages })
      .forEach((_, index) => {
        const isFirstPage = (index === 0);
        const currentPage = index + 1;

        if (isFirstPage) {
          return;
        }

        createPage({
          path: `/page/${currentPage}`,
          component: templates.postList,
          context: {
            limit: postsPerPage,
            skip: index * postsPerPage,
            currentPage,
            numberOfPages
          }
        });

      });


  });
};
