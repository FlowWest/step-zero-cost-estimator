import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  divider: { height: '2px', width: '100%', backgroundColor: 'orange', margin: '0 auto' }
});

const Divider = () => {
  return <View style={styles.divider} />;
};

export default Divider;
