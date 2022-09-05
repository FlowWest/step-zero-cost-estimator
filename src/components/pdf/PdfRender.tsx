import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Canvas } from '@react-pdf/renderer';
import { Chart } from 'chart.js';
import Header from './Header';
import WaterSystemDetailsPdf from './WaterSystemDetailsPdf';
import ComponentsTable from './ComponentsTable';
import FeesTable from './FeesTable';
import { getConsolidationCostDetails } from '../../util/costUtil';
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column', //original styles
    backgroundColor: '#fff',
    padding: '15px 25px'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    display: 'flex'
  },
  chartWrapper: {
    //width: '45%' //landscape
    width: '75%', //alt landscape
    transform: 'translateX(15px)'
  },
  chartImage: {
    marginTop: 15
    //width: '45%',//portrait
    //marginRight: 10 //portrait
    //height: '100px' //landscape
    //position: 'absolute'
    //transform: 'translate(45px 35px) scale(2)' //landscape
    //height: '300px' //alt landscape
    //width: '100%' //alt landscape
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%'
  },
  gridInverted: { display: 'flex', flexDirection: 'column' },
  disclaimerText: { color: 'rgba(0,0,0,.4)', fontSize: 9, marginTop: 15, fontStyle: 'italic' },
  totalConsolidationCost: { fontSize: 12 }
});

// Create Document Component
const PdfRender = ({ state }: { state: any }): JSX.Element => {
  const consolidationChart = Chart.getChart('consolidation-chart') as any;
  const imageData =
    consolidationChart === undefined
      ? localStorage.getItem('chartSrc')
      : consolidationChart?.toBase64Image();

  console.log('🚀 ~ PdfRender ~ imageData', imageData);
  const { total: totalConsolidationCost } = getConsolidationCostDetails(state);

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Header title="Consolidation Report" />
        {/* Data Wrapper - For alt layout */}
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          {/* <View style={styles.grid}> Original Styles*/}
          <View style={{ width: '50%', display: 'flex', flexDirection: 'column-reverse' }}>
            <WaterSystemDetailsPdf state={state} />
            <View style={styles.chartWrapper}>
              <Image src={imageData} style={styles.chartImage} />
            </View>
          </View>
          {/* <View style={styles.grid}> Original Styles*/}
          <View style={{ width: '50%' }}>
            <FeesTable state={state} />
          </View>
        </View>
        <View style={[styles.grid, { justifyContent: 'center' }]}>
          <Text style={styles.disclaimerText}>
            The information provided on this page is for a step zero analysis and is intended for
            exploratory purposes only. The calculations are not a replacement for a full feasibility
            analysis.
          </Text>
        </View>
      </Page>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Header title="Capital Improvement Report" />
        <View style={styles.gridInverted}>
          <ComponentsTable state={state} type="total" />
          <ComponentsTable state={state} type="existing" />
          <ComponentsTable state={state} type="new" />
          <Text style={[styles.disclaimerText, { alignSelf: 'center' }]}>
            The information provided on this page is for a step zero analysis and is intended for
            exploratory purposes only. The calculations are not a replacement for a full feasibility
            analysis.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PdfRender;
