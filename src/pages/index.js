import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { graphql, StaticQuery } from 'gatsby';
import Post from '../components/post';

const IndexPage = () => (
  <Layout pageTitle='Home page'>
    <SEO title="Home"/>

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
