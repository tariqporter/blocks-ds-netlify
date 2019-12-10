import React from 'react';
import { Location } from '@reach/router';
import Layout from '../components/layout';
import MainContent from '../components/main';

const IndexPage = (props) => {
  const {
    data
  } = props;
  const navigation = data.allIndexJson.edges.map(edge => ({ ...edge.node, selected: edge.node.subsections[0].name }));

  return (
    <Location>
      {({ location }) => (
        <Layout navigation={navigation} location={location}>
          <div className="blocks-hero">
            <h1>Blocks Design System</h1>
          </div>
          <MainContent />
        </Layout>
      )}
    </Location>
  );
};

export const pageQuery = graphql`
  query {
    allIndexJson {
      edges {
        node {
          id
          name
          subsections {
            href
            name
          }
        }
      }
    }
  }
`;

export default IndexPage;
