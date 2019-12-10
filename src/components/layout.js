import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import favicon from '../../favicon.png';
import Navigation from './navigation';

const Layout = (props) => {
  const {
    children,
    navigation,
    location
  } = props;

  return (
    <div className="l-root">
      <Helmet
        meta={[
          { name: 'description', content: 'CBRE Build\'s Blocks design system.' }
        ]}
        link={[
          { rel: 'shortcut icon', type: 'image/png', href: `${favicon}` }
        ]}
        title="Blocks by CBRE Build"
      />
      <a href="#mainContent" className="skip-link blx-button">Skip to main content</a>
      <div className="l-flex-horizontal l-page">
        <Navigation navigation={navigation} location={location} />
        <div className="design-page">
          <main id="mainContent" tabIndex="-1" className="design-page-content">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node
}

export default Layout;
