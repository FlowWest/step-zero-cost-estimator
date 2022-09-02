import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Canvas } from '@react-pdf/renderer';
import { Chart } from 'chart.js';
import Header from './Header';
import WaterSystemDetailsPdf from './WaterSystemDetailsPdf';
import ComponentsTable from './ComponentsTable';
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
  },
  disclaimerText: { color: 'rgba(0,0,0,.4)', fontSize: 9, marginTop: 25, fontStyle: 'italic' }
});

// Create Document Component
const PdfRender = ({ state }: { state: any }): JSX.Element => {
  const consolidationChart = Chart.getChart('consolidation-chart') as any;
  const imageData =
    consolidationChart === undefined
      ? localStorage.getItem('chartSrc')
      : consolidationChart?.toBase64Image();

  console.log('🚀 ~ PdfRender ~ imageData', imageData);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Header title="Consolidation Report" />
        <View style={styles.grid}>
          <WaterSystemDetailsPdf state={state} />
          <Image src={imageData} style={styles.chartImage} />
        </View>
        <View style={styles.grid}>
          <FeesTable state={state} />
        </View>
        <View style={styles.grid}>
          <Text style={styles.disclaimerText}>
            The information provided on this page is for a step zero analysis and is intended for
            exploratory purposes only. The calculations are not a replacement for a full feasibility
            analysis.
          </Text>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <Header title="Capital Improvement Report" />
        <View style={styles.grid}>
          <WaterSystemDetailsPdf state={state} />
        </View>
        <View style={styles.grid}>
          <ComponentsTable state={state} age="new" />
        </View>
      </Page>
    </Document>
  );
};

export default PdfRender;
