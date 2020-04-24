import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { graphql, StaticQuery } from 'gatsby';
import Post from '../components/post';

const IndexPage = () => (
  <Layout>
    <SEO title="Home"/>
    <h1>Home page</h1>

    <StaticQuery
      query={indexQuery}
      render={(data) => {
        return (
          <div>
            {
              data.allMarkdownRemark.edges.map(({ node }, index) => {
                const postData = node.frontmatter;
                return (
                  <Post
                    title={postData.title}
                    date={postData.date}
                    author={postData.author}
                    path={postData.path}
                    key={index}
                  />
                );
              })
            }
          </div>
        );
      }}
    />

  </Layout>
);

const indexQuery = graphql`
  query query1 {
    allMarkdownRemark(
      sort: {
      fields: frontmatter___date,
      order: DESC
      }
    ){
      edges {
        node {
          frontmatter {
            title
            author
            date
            path
          }
          id
          excerpt
        }
      }
    }
  }
`;


export default IndexPage;
