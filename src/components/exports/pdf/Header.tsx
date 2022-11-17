import React from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import Logo from '../../../images/step-zero-logo3-dark.png';
import Divider from './Divider';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '30px',
    width: '100%'
  },
  columnLeft: { alignItems: 'center' },
  columnRight: { display: 'flex', alignItems: 'center', flexDirection: 'row' },
  logo: { height: '100%' },
  title: {
    fontSize: 18,
    marginLeft: 200,
    flexGrow: 1
  }
});

const Header = ({ title }: { title: string }): JSX.Element => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.columnLeft}>
          <Image style={styles.logo} src={Logo} />
        </View>
        <View style={styles.columnRight}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
      <Divider />
    </>
  );
};

export default Header;
