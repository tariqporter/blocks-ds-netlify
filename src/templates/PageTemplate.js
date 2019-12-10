import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Location } from '@reach/router';
import { Grid } from '@material-ui/core';
// import Helmet from "react-helmet"
import Navigation from '../components/Navigation';
import { StylesProvider, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

console.log(green);

green.A400 = '#009f6f';

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: green,
  },
});

export default function Template({
  data
}) {
  const { frontmatter, body } = data.mdx;
  const navigation = data.allIndexJson.edges.map(edge => ({ ...edge.node, selected: edge.node.subsections[0].name }));
  console.log('here', navigation);

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Location>
          {({ location }) => (
            <Grid container>
              <Grid item xs={2}>
                <Navigation location={location} navigation={navigation} />
              </Grid>
              <Grid item xs={10}>
                <MDXRenderer>{body}</MDXRenderer>
              </Grid>
            </Grid>
          )}
        </Location>
      </ThemeProvider>
    </StylesProvider>
  )
}

export const pageQuery = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        path
        date(formatString: "MMMM DD, YYYY")
      }
    }
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
