import React from 'react';
import Layout from '../components/layout';
import Sidebar from '../components/sidebar';
import { graphql, Img, Link } from 'gatsby';
import SEO from '../components/seo';
import CardBody from 'reactstrap/es/CardBody';
import CardSubtitle from 'reactstrap/es/CardSubtitle';
import Badge from 'reactstrap/es/Badge';
import slugify from 'slugify';
import Col from 'reactstrap/es/Col';
import Row from 'reactstrap/es/Row';

const SinglePost = (props) => {
  const { data } = props;
  const post = data.markdownremark.frontmatter;

  return (
    <Layout>
      <SEO title={post.title}/>
      <h1>{post.title}</h1>
      <Row>
        <Col md='8'>
          <Card>
            <Img className='card-img-top' fluid={post.img.childImageSharp.fluid}/>
            <CardBody>
              <CardSubtitle>
                <span className="text-info">{post.date}</span>
                <span> by </span>
                <span className=" text-info">{post.author}</span>
              </CardSubtitle>

              <div dangerouslySetInnerHTML={{ __html: data.markdownremark.html }}>
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
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md='4'>
          <Sidebar/>
        </Col>
      </Row>


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
