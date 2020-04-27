import React from 'react';
import Layout from '../components/layout';
import Post from '../components/post';
import { graphql } from 'gatsby';
import authors from '../util/authors';


const AuthorPosts = ({ data, pageContext }) => {

  const { totalCount } = data.allMarkdownRemark;
  const author = authors.find(author => author.name === pageContext.authorName);
  const pageHeader = `${totalCount} posts by: ${pageContext.authorName}`;


  return (
    <Layout pageTitle={pageHeader}
            postAuthor={author}
            authorImageFluid={data.file.childImageSharp.fluid}>
      {
        data.allMarkdownRemark.edges.map(({ node }) => {
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
    </Layout>
  );
};

export const authorQuery = graphql`
    query($authorName: String!, $imageUrl: String!) {
        allMarkdownRemark(
            sort: {fields: [frontmatter___date], order: DESC}
            filter: { frontmatter: { author: {eq: $authorName}}}
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
                        img {
                            childImageSharp {
                                fluid(maxWidth: 650) {
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
        file(relativePath: {eq: $imageUrl}){
            childImageSharp {
                fluid(maxWidth: 300) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`;

export default AuthorPosts;
