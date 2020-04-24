import React from 'react';
import { Link } from 'gatsby';
import Card from 'reactstrap/es/Card';
import CardBody from 'reactstrap/es/CardBody';
import CardTitle from 'reactstrap/es/CardTitle';
import CardSubtitle from 'reactstrap/es/CardSubtitle';
import CardText from 'reactstrap/es/CardText';

const Post = ({ title, date, author, body, path }) => {

  return (
    <Card>
      <CardBody>
        <CardTitle>
          <Link to={path}>{title}</Link>
        </CardTitle>
        <CardSubtitle>
          <span className='text-info'>{date}</span>
          <span> by </span>
          <span className='text-info'>{author}</span>
        </CardSubtitle>
        <CardText>{body}</CardText>
        <Link to={path} className='btn btn-outline-primary float-right'>Read mode</Link>
      </CardBody>
    </Card>
  );
};

export default Post;
