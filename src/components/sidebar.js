import React from 'react';
import { Card, CardBody, CardTitle, Form, FormGroup, Input } from 'reactstrap/es';
import { graphql, Link, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import CardText from 'reactstrap/es/CardText';

const Sidebar = ({ author, authorFluid }) => {

  return (
    <div>
      {author && (
        <Card>
          <Img className='card-img-top' fluid={authorFluid}/>
          <CardBody>
            <CardTitle className='text-center text-uppercase mb-3'>
              {author.name}
            </CardTitle>
            <CardText>{author.bio}</CardText>
            <div className='author-social-link text-center'>
              <ul>
                <li><a href={author.facebook} target='_blank' rel='noopener noreferrer'>facebook</a></li>
                <li><a href={author.facebook} target='_blank' rel='noopener noreferrer'>twitter</a></li>
                <li><a href={author.facebook} target='_blank' rel='noopener noreferrer'>google</a></li>
              </ul>
            </div>
          </CardBody>
        </Card>
      )}
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
