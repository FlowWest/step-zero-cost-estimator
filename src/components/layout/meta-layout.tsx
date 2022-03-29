import React from 'react';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { Container, Grid } from '@mui/material';
import useSiteMetadata from '../../hooks/useSiteMetadata';
import Header from './header';
import Footer from './footer';
import { FCR } from '../../util';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    position: 'relative',
    minHeight: '100vh'
  },
  main: {
    paddingBlock: '5rem',
    backgroundColor: theme.palette.background.default
  }
}));

type MetaLayoutProps = {
  switchTheme: (darkModeOn: boolean) => void;
};

const MetaLayout: FCR<MetaLayoutProps> = (props) => {
  const styles = useStyles();
  const { title } = useSiteMetadata();
  return (
    <div className={styles.root}>
      <Header switchTheme={props.switchTheme} siteTitle={title} />
      <Container maxWidth="md">
        <main className={styles.main}>{props.children}</main>
      </Container>
      <Footer />
    </div>
  );
};

export default MetaLayout;
