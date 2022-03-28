import React from 'react';
import { Container, Typography, Link } from '@material-ui/core';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { StaticImage } from 'gatsby-plugin-image';

import { FC } from '../../util';

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    position: 'static',
    left: '0',
    bottom: '0',
    right: '0',
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  footerText: {
    textAlign: 'center'
  },
  logo: {
    margin: '0 5px',
    verticalAlign: 'sub'
  }
}));

const Footer: FC = () => {
  const styles = useStyles();

  return (
    <footer className={styles.footer}>
      <Container maxWidth="md">
        <Typography variant="body1" color="textSecondary" className={styles.footerText}>
          © {new Date().getFullYear()}, Built and maintained by
          {` `}
          <Link href="https://flowwest.com/" target="_blank" color="inherit">
            FlowWest
            <StaticImage
              src="../../images/fw-logo-transparent.png"
              alt="FlowWest Logo"
              className={styles.logo}
              placeholder="blurred"
              width={20}
              height={20}
            />
          </Link>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
