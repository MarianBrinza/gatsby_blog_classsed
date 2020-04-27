import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Post from '../components/post';

const TagPost = ({ data, pageContext }) => {
  const { tag } = pageContext;

  const { totalCount } = data.allMarkdownRemark;
  const pageHeader = `Found ${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${tag}"`;
  return (
    <Layout pageTitle={pageHeader}>
      {
        data.allMarkdownRemark.edges.map(({ node }, index) => {
          return (
            <Post key={node.id}
                  slug={node.fields.slug}
                  title={node.frontmatter.title}
                  author={node.frontmatter.author}
                  date={node.frontmatter.date}
                  body={node.excerpt}
                  tags={node.frontmatter.tags}
                  fluid={node.frontmatter.img.childImageSharp.fluid}
            />);
        })
      }

    </Layout>
  );
};

export const tagQuery = graphql`
    query ($tag: String!){
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC},
            filter:{ frontmatter: {tags:{in:[$tag]}}}
        ){
            totalCount
            edges{
                node{
                    id
                    excerpt
                    frontmatter{
                        title
                        date
                        author
                        tags
                        img{
                            childImageSharp{
                                fluid(maxWidth: 650, maxHeight: 371){
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                    fields{
                        slug
                    }
                }
            }
        }
    }
`;

export default TagPost;
