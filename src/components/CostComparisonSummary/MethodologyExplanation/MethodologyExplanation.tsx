import React, { useRef } from 'react';
import { Grid, Theme, List, ListItem, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import useHeadsObserver from '../../../hooks/useHeadsObserver';
import { ConsolidationMethodology } from './ConsolidationMethodology';
import { CapitalImprovementMethodology } from './CapitalImprovementMethodology';

const useStyles = makeStyles((theme: Theme) => ({
  nav: {
    alignSelf: 'flex-start',
    position: 'sticky',
    top: 1,
    maxHeight: 'calc(100vh - 70px)',
    overflow: 'auto'
  },
  link: {
    color: 'black'
  }
}));

const LinkComponent = ({ id, text }: { id: string; text: string }) => {
  const classes = useStyles();
  const { activeId } = useHeadsObserver();
  return (
    <Link
      variant="h6"
      style={{
        fontWeight: activeId === id ? 'bold' : 'normal'
      }}
      className={classes.link}
      underline="hover"
      onClick={(e) => {
        e.preventDefault();

        document?.querySelector(`#${id}`)?.scrollIntoView({
          behavior: 'smooth'
        });
      }}
      href={`#${id}`}
    >
      {text}
    </Link>
  );
};

export const MethodologyExplanation = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container>
        <Grid item md={3}>
          <nav className={classes.nav}>
            <List>
              <ListItem>
                <LinkComponent id="consolidation-explanation" text="Consolidation" />
              </ListItem>
              <ListItem>
                <LinkComponent id="capital-improvement-explanation" text="Capital Improvement" />
              </ListItem>
              <ListItem>
                <LinkComponent id="miscellaneous-explanation" text="Miscellaneous" />
              </ListItem>
            </List>
          </nav>
        </Grid>
        <Grid item md={9}>
          <div style={{ marginBottom: '2rem' }} id="consolidation-explanation">
            <ConsolidationMethodology />
          </div>
          <div
            style={{ marginBottom: '2rem', height: '1000px' }}
            id="capital-improvement-explanation"
          >
            <CapitalImprovementMethodology />
          </div>
          <div style={{ marginBottom: '2rem', height: '1000px' }} id="miscellaneous-explanation">
            Miscellaneous
          </div>
        </Grid>
      </Grid>
    </>
  );
};
