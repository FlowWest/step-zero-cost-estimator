import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Canvas } from '@react-pdf/renderer';
import { Chart } from 'chart.js';
import Header from './Header';
import WaterSystemDetails from './WaterSystemDetails';
import FeesTable from './FeesTable';
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
  },
  chartImage: {
    width: '45%',
    marginTop: 35,
    marginRight: 10
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  }
});

// Create Document Component
const PdfRender = ({ state }: { state: any }): JSX.Element => {
  const consolidationChart = Chart.getChart('consolidation-chart') as any;
  const imageData = consolidationChart.toBase64Image();
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Header />
        <View style={styles.grid}>
          <WaterSystemDetails state={state} />
          <Image src={imageData} style={styles.chartImage} />
        </View>
        <View style={styles.grid}>
          <FeesTable state={state} />
        </View>
      </Page>
    </Document>
  );
};

export default PdfRender;
