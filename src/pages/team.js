import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import authors from '../util/authors';
import { Button, Card, CardBody, CardTitle, Row } from 'reactstrap';
import man from '../images/man.jpg';
import woman from '../images/woman.jpg';
import { slugify } from '../util/utility';


const TeamPage = () => (
  <Layout pageTitle='Our Team'>
    <SEO title="Our Team"/>

    <Row className='mb-4'>
      <div className="col-md-3">
        <img src={man} alt="smiling man" style={{ width: '100%' }}/>
      </div>
      <div className="col-md-8">
        <Card style={{ minWidth: '100%' }}>
          <CardBody>
            <CardTitle>{authors[0].name}</CardTitle>
            <CardTitle>{authors[0].bio}</CardTitle>
            <Button color='primary' className='text-uppercase' href={`/authors/${slugify(authors[0].name)}`}>
              View Posts
            </Button>
          </CardBody>
        </Card>
      </div>
    </Row>

    <Row className='mb-4'>
      <div className="col-md-3">
        <img src={woman} alt="smiling woman" style={{ width: '100%' }}/>
      </div>
      <div className="col-md-8">
        <Card style={{ minWidth: '100%' }}>
          <CardBody>
            <CardTitle>{authors[1].name}</CardTitle>
            <CardTitle>{authors[1].bio}</CardTitle>
            <Button color='primary' className='text-uppercase' href={`/authors/${slugify(authors[1].name)}`}>
              View Posts
            </Button>
          </CardBody>
        </Card>
      </div>
    </Row>

  </Layout>
);

export default TeamPage;
