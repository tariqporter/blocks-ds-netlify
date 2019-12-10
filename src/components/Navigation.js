import React, { useState } from "react";
import { Link } from "gatsby";
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, List, ListItem, ListItemIcon, ListItemText, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandLess } from '@material-ui/icons';
// import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

const useStyles = makeStyles(theme => {
  // console.log(theme)
  return {
    expansion: {
      display: 'flex',
      width: '100%',
      alignItems: 'center'
    },
    expansionDetails: {
      flexDirection: 'column',
      width: '100%'
    },
    list: {
      padding: 0
    },
    link: {
      color: 'inherit',
      fontFamily: 'Graphik Web',
      width: '100%',
      textDecoration: 'none',
      padding: '0 16px 0 48px',
      fontSize: 14,
      fontWeight: 500
    },
    listItem: {
      color: '#7c8c88',
      '&:hover': {
        color: '#008b61'
      }
    },
    listItem_selected: {
      marginLeft: -4,
      borderLeft: `4px solid ${theme.palette.secondary.A400}`
    },
    chevron: {
      transform: 'rotate(90deg)',
      transformOrigin: 'center',
      transition: 'transform .2s ease-in',
      color: theme.palette.secondary.A400
    },
    chevron_down: {
      transform: 'rotate(180deg)'
    },
    indicator: {
      left: 0
    },
    tab: {
      alignItems: 'start'
    }
  };
});

const Navigation = (props) => {
  const {
    location,
    navigation
  } = props;
  const c = useStyles();

  const [nav, setNav] = useState(navigation);

  const [expanded, setExpanded] = useState(p => {
    const section = nav.find(section => section.subsections.find(x => location.pathname.startsWith(x.href)));
    return !section ? null : section.name;
  });

  const toggleSection = (event, isExpanded, sectionId) => {
    setExpanded(p => isExpanded ? sectionId : null);
  };

  const toggleSelected = (event, newValue, sectionId) => {
    setNav(p => {
      const newNav = [...p];
      const sectionIndex = newNav.findIndex(x => x.name === sectionId);
      newNav[sectionIndex] = { ...newNav[sectionIndex], selected: newValue };
      return newNav;
    });
  };

  return (
    <div>
      {
        nav.map((section) => {
          return (
            <ExpansionPanel key={section.name} expanded={section.name === expanded} onChange={(...args) => toggleSection(...args, section.name)}>
              <ExpansionPanelSummary>
                <div className={c.expansion}>
                  <ExpandLess className={clsx(c.chevron, section.name === expanded && c.chevron_down)} />
                  <Typography variant="subtitle1">{section.name}</Typography>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={section.selected}
                  onChange={(...args) => toggleSelected(...args, section.name)}
                  classes={{ indicator: c.indicator }}
                >
                  {
                    section.subsections.map(({ name, href }) => (
                      <Tab key={name} value={name} classes={{ wrapper: c.tab }} label={<Link to={href}>
                        {name}
                      </Link>} />
                    ))
                  }
                </Tabs>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        })
      }
    </div>
  );
};

export default Navigation;

{/* <List key={name} component="nav" className={c.list}>
                        <ListItem button className={clsx(c.listItem, location.pathname.startsWith(href) && c.listItem_selected)}>
                          <Link to={href} className={c.link}>
                            {name}
                          </Link>
                        </ListItem>
                      </List> */}