import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { graphql, StaticQuery } from 'gatsby';
import Post from '../components/post';
import {Row, Col} from 'reactstrap';
import Sidebar from '../components/sidebar';

const IndexPage = () => (
  <Layout>
    <SEO title="Home"/>
    <h1>Home page</h1>

    <Row>
      <Col md='8'>
        <StaticQuery
          query={indexQuery}
          render={(data) => {
            return (
              <div>
                {
                  data.allMarkdownRemark.edges.map(({ node }, index) => {
                    const postData = node.frontmatter;
                    const slug = node.fields.slug;

                    return (
                      <Post
                        title={postData.title}
                        date={postData.date}
                        author={postData.author}
                        slug={slug}
                        tags={postData.tags}
                        fluid={postData.img.childImageSharp.fluid}
                        key={index}
                      />
                    );
                  })
                }
              </div>
            );
          }}
        />
      </Col>

      <Col md='4'>
        <Sidebar/>
      </Col>
    </Row>


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
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            author
            date
            tags
            img {
              childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }          
        }
      }
    }
  }
`;


export default IndexPage;
