import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Badge, Button } from 'reactstrap';
import { slugify } from '../util/utility';

const TagsPage = ({ pageContext }) => {
  const { tags, tagPostCounts } = pageContext;
  return (
    <Layout pageTitle='App Tags'>
      <SEO title='All tags' keywords={['tags', 'topics']}/>
      <ul>
        {
          tags.map((tag, index) => {
            return (
              <li key={index}>
                <Button color='primary' href={`/tags/${slugify(tag)}`} style={{marginBottom: '10px'}}>
                  {tag} <Badge color='light'>{tagPostCounts[tag]}</Badge>
                </Button>
              </li>
            );
          })
        }
      </ul>
    </Layout>
  );
};

export default TagsPage;
