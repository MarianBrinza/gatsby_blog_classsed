import React from 'react';
import CardBody from 'reactstrap/es/CardBody';
import CardTitle from 'reactstrap/es/CardTitle';
import Card from 'reactstrap/es/Card';
import Form from 'reactstrap/es/Form';
import FormGroup from 'reactstrap/es/FormGroup';
import Input from 'reactstrap/es/Input';
import { graphql, Link, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';

const Sidebar = () => {

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>
            Newsletter
          </CardTitle>

          <Form className='text-center'>
            <FormGroup>
              <Input type='email' name='email' placeholder='Your Email here...'/>
            </FormGroup>
            <button className='btn btn-outline-success text-uppercase'>Subscribe</button>
          </Form>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <CardTitle>
            Advertisement
          </CardTitle>
          <img src='https://via.placeholder.com/320x200' alt='Advertisement' style={{ width: '100%' }}/>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <CardTitle className='text-center text-uppercase mb-3'>
            Recent Posts
          </CardTitle>

          <StaticQuery query={lastTwoPosts} render={
            (data) => {
              return (
                <div>
                  {
                    data.allMarkdownRemark.edges.map((item, index) => {
                      return (
                        <Card key={index}>
                          <Link to={item.node.fields.slug}>
                            <Img className='card-img-top' fluid={item.node.frontmatter.img.childImageSharp.fluid}/>
                          </Link>

                          <CardBody>
                            <CardTitle>
                              <Link to={item.node.fields.slug}>
                                {item.node.frontmatter.title}
                              </Link>
                            </CardTitle>
                          </CardBody>
                        </Card>
                      );
                    })
                  }
                </div>
              );
            }
          }/>

        </CardBody>
      </Card>

    </div>
  );
};

const lastTwoPosts = graphql`
  query query2 {
    allMarkdownRemark(
      sort: {
      fields: frontmatter___date,
      order: DESC
      },
      limit: 2
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

export default Sidebar;
