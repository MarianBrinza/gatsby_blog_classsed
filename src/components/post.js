import React from 'react';
import { Link } from 'gatsby';
import Card from 'reactstrap/es/Card';
import CardBody from 'reactstrap/es/CardBody';
import CardTitle from 'reactstrap/es/CardTitle';
import CardSubtitle from 'reactstrap/es/CardSubtitle';
import CardText from 'reactstrap/es/CardText';
import Img from 'gatsby-image';
import { slugify } from '../util/utility.js';
import Badge from 'reactstrap/es/Badge';

const Post = ({ title, date, author, body, slug, fluid, tags }) => {

  return (
    <Card>
      <Link to={slug}>
        <Img className='card-img-top' fluid={fluid}/>
      </Link>

      <CardBody>
        <CardTitle>
          <Link to={slug}>{title}</Link>
        </CardTitle>
        <CardSubtitle>
          <span className='text-info'>{date}</span>
          <span> by </span>
          <span className='text-info'>{author}</span>
          <br/>
          <ul className="post-tags">
            {
              tags.map((tag, index) => {
                  return (
                    <li key={index}>
                      <Link to={`/tag/${slugify(tag)}`}>
                        <Badge color='primary' className='text-uppercase'>
                          {tag}
                        </Badge>
                      </Link>
                    </li>
                  );
                }
              )
            }
          </ul>

        </CardSubtitle>
        <CardText>{body}</CardText>
        <Link to={slug} className='btn btn-outline-primary float-right'>Read mode</Link>
      </CardBody>
    </Card>
  );
};

export default Post;
