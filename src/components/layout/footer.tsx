import React from 'react';
import { Container, Typography, Link } from '@mui/material';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { StaticImage } from 'gatsby-plugin-image';

import { FC } from '../../util';

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    position: 'static',
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  footerText: {
    textAlign: 'center',
    color: '#fff'
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
        <Typography variant="body1" className={styles.footerText}>
          © {new Date().getFullYear()}, Built and maintained by
          {` `}
          <Link href="https://flowwest.com/" target="_blank" color="inherit" underline="none">
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
