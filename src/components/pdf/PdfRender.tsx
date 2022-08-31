import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Canvas } from '@react-pdf/renderer';
import { Typography, Theme } from '@mui/material';
import { useTheme } from '@mui/material';
import { display } from '@mui/system';
import Header from './Header';
import WaterSystemDetails from './WaterSystemDetails';
import { WaterSystem } from '../../util/interfaces';
// Create styles

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 25
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    display: 'flex'
  }
});

// Create Document Component
const PDFRender = ({ state }: { state: any }): JSX.Element => {
  console.log('pdf render', state);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Header />
        <WaterSystemDetails state={state} />
      </Page>
    </Document>
  );
};

export default PDFRender;
