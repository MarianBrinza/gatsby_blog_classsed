import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Post from '../components/post';
import PaginationLinks from '../components/paginationLinks';

const PostList = (props) => {
  const posts = props.data.allMarkdownRemark.edges;
  const { currentPage, numberOfPages } = props.pageContext;

  return (
    <Layout pageTitle={`Page: ${currentPage}`}>
      {
        posts.map(({ node }) => {
          return (
            <Post key={node.id}
                  slug={node.fields.slug}
                  title={node.frontmatter.title}
                  author={node.frontmatter.author}
                  date={node.frontmatter.date}
                  body={node.excerpt}
                  tags={node.frontmatter.tags}
                  fluid={node.frontmatter.img.childImageSharp.fluid}
            />
          );
        })
      }
      <PaginationLinks currentPage={currentPage} numberOfPages={numberOfPages}/>
    </Layout>
  );
};

export const postListQuery = graphql`
    query postListQuery ($skip: Int!, $limit: Int!){
        allMarkdownRemark(
            sort: {fields: [frontmatter___date], order: DESC}
            limit: $limit
            skip: $skip
        ){
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

export default PostList;
