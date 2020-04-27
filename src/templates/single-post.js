import React from 'react';
import Layout from '../components/layout';
import { graphql, Link } from 'gatsby';
import SEO from '../components/seo';
import { Badge, Card, CardBody, CardSubtitle } from 'reactstrap/es';
import { slugify } from '../util/utility';
import Img from 'gatsby-image';
import authors from '../util/authors';
import { DiscussionEmbed } from 'disqus-react';


const SinglePost = (props) => {
  const { data, pageContext } = props;
  const post = data.markdownRemark.frontmatter;
    const author = authors.find(author => author.name === post.author);
    const authorImageFluid = data.file.childImageSharp.fluid;
  const baseUrl = 'http://learngatsby.com/';

  const disqusShortName = 'https-learngatsby-com';
  const disqusConfig = {
    identifier: data.markdownRemark.id,
    title: post.title,
    url: baseUrl + pageContext.slug
  };

  return (
    <Layout pageTitle={post.title} postAuthor={author} authorImageFluid={authorImageFluid}>
      <SEO title={post.title}/>

      <Card>
        <Img className='card-img-top' fluid={post.img.childImageSharp.fluid}/>
        <CardBody>
          <CardSubtitle>
            <span className="text-info">{post.date}</span>
            <span> by </span>
            <span className=" text-info">{post.author}</span>
          </CardSubtitle>

          <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}>
          </div>
          <ul className="post-tags">
            {
              post.tags.map((tag, index) => {
                return (
                  <li key={index}>
                    <Link to={`/tags/${slugify(tag)}`}>
                      <Badge color='primary'>{tag}</Badge>
                    </Link>
                  </li>
                );
              })
            }
          </ul>

        </CardBody>
      </Card>

      <h3 className="text-center">Share this post</h3>
      <div className="text-center social-share-links">
        <ul>
          <li>
            <a href={'http://uuudomain.com/share/' + baseUrl + pageContext.share} target='_blank'
               rel='noopener noreferrer'>Facebook</a>
          </li>
          <li>
            <a href={'http://uuudomain.com/share/' + baseUrl + pageContext.share} target='_blank'
               rel='noopener noreferrer'>Twitter</a>
          </li>
          <li>
            <a href={'http://uuudomain.com/share/' + baseUrl + pageContext.share} target='_blank'
               rel='noopener noreferrer'>YouTube</a>
          </li>

        </ul>
      </div>

      <DiscussionEmbed shortname={disqusShortName} config={disqusConfig}/>

    </Layout>
  );
};

export const q = graphql`
    query blogPostBySlug($slug: String!, $imageUrl: String!){
        markdownRemark( fields: { slug: { eq: $slug } } ){
            id
            html
            frontmatter{
                title
                date
                author
                tags
                img {
                    childImageSharp {
                        fluid(maxWidth: 700) {
                            ...GatsbyImageSharpFluid
                        }
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

export default SinglePost;
