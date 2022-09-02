import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import Divider from './Divider';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '40px',
    width: '100%'
  },
  columnLeft: { alignItems: 'center' },
  columnRight: {},
  logoText: {
    fontSize: 14
  },
  title: {
    fontSize: 24,
    marginLeft: 50
  }
});

const Header = ({ title }: { title: string }): JSX.Element => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.columnLeft}>
          <Text style={styles.logoText}>Step Zero</Text>
          <Text style={styles.logoText}>Consolidation Calculator</Text>
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
