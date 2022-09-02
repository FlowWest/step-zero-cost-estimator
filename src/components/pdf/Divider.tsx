import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  divider: { height: '1px', width: '100%', backgroundColor: 'rgba(29,73,118)', margin: '0 auto' }
});

const Divider = () => {
  return <View style={styles.divider} />;
};

export default Divider;
