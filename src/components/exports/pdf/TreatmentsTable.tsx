import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from '@react-pdf/renderer';
import { formatToUSD } from '../../../util';

import { sortBy } from 'lodash';

const styles = StyleSheet.create({
  defaultText: { fontSize: 12 },
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  table: { marginTop: 15, width: '100%' },
  tableWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    border: '1px solid #000',
    borderRadius: '5px',
    overflow: 'hidden'
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  headerText: { fontSize: 9, color: 'rgba(0,0,0,.75)' },
  cellText: { fontSize: 9, color: 'rgba(0,0,0)' },
  columnSmall: { width: '12.5%' },
  columnLarge: { width: '37.5%' },
  noColumnData: {
    width: '100%',
    height: '100px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tableCell: { border: '1px solid black', padding: 5 },
  tableHeader: { width: '100%', textAlign: 'center', margin: '10px 0 5px', fontSize: 12 }
});

const TreatmentsTable = ({ state }: { state: any }): JSX.Element => {
  const [totalCosts, setTotalCosts] = useState({
    capitalCost: 0,
    operationalCost: 0
  });
  useEffect(() => {
    const totalCostValues = [...state.selectedTreatments];
    const updatedCostValues = totalCostValues.reduce(
      (previousValue, currentValue) => {
        const newValue = { ...previousValue };

        newValue.capitalCost += currentValue.capitalCost;
        newValue.operationalCost += currentValue.operationalCost;

        return newValue;
      },
      {
        capitalCost: 0,
        operationalCost: 0
      }
    );
    setTotalCosts({ ...updatedCostValues });
  }, [state]);
  return (
    <View style={styles.container} wrap={false}>
      <Text style={styles.tableHeader}>Treatments</Text>

      <View style={styles.tableWrapper}>
        <View style={styles.tableRow}>
          <View style={[styles.columnLarge, styles.tableCell]}>
            <Text style={styles.headerText}>Contaminant</Text>
          </View>
          <View style={[styles.columnLarge, styles.tableCell]}>
            <Text style={styles.headerText}>Treatment</Text>
          </View>
          <View style={[styles.columnLarge, styles.tableCell]}>
            <Text style={styles.headerText}>Capital Cost</Text>
          </View>
          <View style={[styles.columnLarge, styles.tableCell]}>
            <Text style={styles.headerText}>Annual Operational Cost</Text>
          </View>
        </View>
        {state?.selectedTreatments?.length ? (
          <>
            {state?.selectedTreatments?.map(
              (
                {
                  capitalCost,
                  contaminant,
                  operationalCost,
                  treatment
                }: {
                  capitalCost: number;
                  contaminant: string;
                  operationalCost: number;
                  treatment: string;
                },
                idx: number
              ) => {
                return (
                  <View style={styles.tableRow} key={idx}>
                    <View style={[styles.columnLarge, styles.tableCell]}>
                      <Text style={styles.cellText}>{contaminant}</Text>
                    </View>
                    <View style={[styles.columnLarge, styles.tableCell]}>
                      <Text style={styles.cellText}>{treatment}</Text>
                    </View>
                    <View style={[styles.columnLarge, styles.tableCell]}>
                      <Text style={styles.cellText}>{formatToUSD(capitalCost)}</Text>
                    </View>
                    <View style={[styles.columnLarge, styles.tableCell]}>
                      <Text style={styles.cellText}>{formatToUSD(operationalCost)}</Text>
                    </View>
                  </View>
                );
              }
            )}
            <View style={styles.tableRow} key={'total'}>
              <View style={[styles.columnLarge, styles.tableCell]}>
                <Text style={styles.cellText}>Total</Text>
              </View>
              <View style={[styles.columnLarge, styles.tableCell]}>
                <Text style={styles.cellText}>{''}</Text>
              </View>
              <View style={[styles.columnLarge, styles.tableCell]}>
                <Text style={styles.cellText}>{formatToUSD(totalCosts.capitalCost)}</Text>
              </View>
              <View style={[styles.columnLarge, styles.tableCell]}>
                <Text style={styles.cellText}>{formatToUSD(totalCosts.operationalCost)}</Text>
              </View>
            </View>
          </>
        ) : (
          <View style={[styles.noColumnData, styles.tableCell]}>
            <Text style={[styles.cellText, { textAlign: 'center' }]}>No Data</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default TreatmentsTable;
