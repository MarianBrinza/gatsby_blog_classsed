import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { Link } from 'gatsby';

const NotFoundPage = () => (
  <Layout pageTitle='No page here... the sadness ;('>
    <SEO title="404: Not found"/>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <Link to={'/'} className='btn btn-primary text-uppercase'>Go home</Link>
  </Layout>
);

export default NotFoundPage;
