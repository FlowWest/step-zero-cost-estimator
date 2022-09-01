import React from 'react';
import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Canvas
} from '@react-pdf/renderer';
import { Chart } from 'chart.js';
import Header from './Header';
import WaterSystemDetails from './WaterSystemDetails';
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
  const consolidationChart = Chart.getChart('consolidation-chart') as any;
  const imageData = consolidationChart.toBase64Image();
  return (
    <PDFViewer>
      <Document>
        <Page size="A4" style={styles.page}>
          <Header />
          <WaterSystemDetails state={state} />
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFRender;
