import React from 'react';
import Layout from '../components/layout';
import { graphql, Link } from 'gatsby';
import SEO from '../components/seo';
import { Badge, Card, CardBody, CardSubtitle } from 'reactstrap/es';
import { slugify } from '../util/utility';
import Img from 'gatsby-image';

const SinglePost = (props) => {
  const { data } = props;
  const post = data.markdownRemark.frontmatter;

  return (
    <Layout pageTitle={post.title}>
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
                    <Link to={`/tag/${slugify(tag)}`}>
                      <Badge color='primary'>{tag}</Badge>
                    </Link>
                  </li>
                );
              })
            }
          </ul>

        </CardBody>
      </Card>

    </Layout>
  );
};

export const q = graphql`
    query blogPostBySlug($slug: String!){
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
    }
`;

export default SinglePost;
