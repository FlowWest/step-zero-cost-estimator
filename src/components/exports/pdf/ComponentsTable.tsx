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

const ComponentsTable = ({
  state,
  type
}: {
  state: any;
  type: 'new' | 'existing' | 'total';
}): JSX.Element => {
  const tableTitles = {
    new: 'New Components',
    existing: 'Existing Components',
    total: 'Total Existing and New Project Capital Improvement Costs'
  };

  const [allComponents, setAllComponents] = useState({ annualReserve: 0, installedCost: 0 });

  useEffect(() => {
    const totalCostValues = [...state.existingComponents, ...state.newComponents];
    const updatedCostValues = totalCostValues.reduce(
      (previousValue, currentValue) => {
        const newValue = { ...previousValue };
        const quantity = currentValue.quantity || 1;
        const measurement = currentValue.measurement || 1;
        const installedCost = quantity * currentValue.unitCost * measurement;
        newValue.installedCost += installedCost;
        newValue.annualReserve += installedCost / currentValue.avgLife;

        return newValue;
      },
      {
        installedCost: 0,
        annualReserve: 0
      }
    );
    setAllComponents({ ...updatedCostValues });
  }, [state]);
  return (
    <View style={styles.container} wrap={false}>
      <Text style={styles.tableHeader}>{tableTitles[`${type}`]}</Text>
      {type === 'total' && (
        <View style={styles.tableWrapper}>
          <View style={styles.tableRow}>
            <View style={[styles.columnSmall, styles.tableCell]}></View>
            <View style={[styles.columnLarge, styles.tableCell]}></View>
            <View style={[styles.columnSmall, styles.tableCell]}></View>
            <View style={[styles.columnSmall, styles.tableCell]}>
              <Text style={styles.headerText}>Installed Cost</Text>
            </View>
            <View style={[styles.columnSmall, styles.tableCell]}></View>
            <View style={[styles.columnSmall, styles.tableCell]}>
              <Text style={styles.headerText}>Annual Reserve</Text>
            </View>
            <View style={[styles.columnSmall, styles.tableCell]}>
              <Text style={styles.headerText}>Monthly Reserve</Text>
            </View>
            <View style={[styles.columnSmall, styles.tableCell]}>
              <Text style={styles.headerText}>Monthly Reserve</Text>
              <Text style={styles.headerText}>Per Customer</Text>
            </View>
          </View>
          {state.existingComponents.length || state.newComponents.length ? (
            <View style={styles.tableRow}>
              <View style={[styles.columnSmall, styles.tableCell]}></View>
              <View style={[styles.columnLarge, styles.tableCell]}></View>
              <View style={[styles.columnSmall, styles.tableCell]}></View>
              <View style={[styles.columnSmall, styles.tableCell]}>
                <Text style={styles.cellText}>{formatToUSD(allComponents.installedCost)}</Text>
              </View>
              <View style={[styles.columnSmall, styles.tableCell]}></View>
              <View style={[styles.columnSmall, styles.tableCell]}>
                <Text style={styles.cellText}>{formatToUSD(allComponents.annualReserve)}</Text>
              </View>
              <View style={[styles.columnSmall, styles.tableCell]}>
                <Text style={styles.cellText}>{formatToUSD(allComponents.annualReserve / 12)}</Text>
              </View>
              <View style={[styles.columnSmall, styles.tableCell]}>
                <Text style={styles.cellText}>
                  {formatToUSD(
                    allComponents.annualReserve / 12 / state.consolidationCostParams.connections
                  )}
                </Text>
              </View>
            </View>
          ) : (
            <View style={[styles.noColumnData, styles.tableCell]}>
              <Text style={[styles.cellText, { textAlign: 'center' }]}>
                New and/or Existing components required to perform Total CIP Cost Calculations
              </Text>
            </View>
          )}
        </View>
      )}
      {type !== 'total' && (
        <View style={styles.tableWrapper}>
          <View style={styles.tableRow}>
            <View style={[styles.columnSmall, styles.tableCell]}>
              <Text style={styles.headerText}>Quantity</Text>
            </View>
            <View style={[styles.columnLarge, styles.tableCell]}>
              <Text style={styles.headerText}>Component</Text>
            </View>
            <View style={[styles.columnSmall, styles.tableCell]}>
              <Text style={styles.headerText}>Unit Cost</Text>
            </View>
            <View style={[styles.columnSmall, styles.tableCell]}>
              <Text style={styles.headerText}>Installed Cost</Text>
            </View>
            <View style={[styles.columnSmall, styles.tableCell]}>
              <Text style={styles.headerText}>Average Life</Text>
              <Text style={styles.headerText}>{'(Years)'}</Text>
            </View>
            <View style={[styles.columnSmall, styles.tableCell]}>
              <Text style={styles.headerText}>Annual Reserve</Text>
            </View>
            <View style={[styles.columnSmall, styles.tableCell]}>
              <Text style={styles.headerText}>Monthly Reserve</Text>
            </View>
            <View style={[styles.columnSmall, styles.tableCell]}>
              <Text style={styles.headerText}>Monthly Reserve</Text>
              <Text style={styles.headerText}>Per Customer</Text>
            </View>
          </View>
          {state[`${type}Components`].length ? (
            sortBy(state[`${type}Components`], ['component']).map(
              (
                {
                  component,
                  unitCost,
                  avgLife
                }: { component: string; unitCost: number; avgLife: number },
                idx: number
              ) => {
                const installedCost = unitCost;
                const annualReserve = installedCost / avgLife;
                const monthlyReserve = annualReserve / 12;
                const monthlyReservePerCustomer =
                  monthlyReserve / state.consolidationCostParams.connections;
                return (
                  <View style={styles.tableRow} key={idx}>
                    <View style={[styles.columnSmall, styles.tableCell]}>
                      <Text style={styles.cellText}>1</Text>
                    </View>
                    <View style={[styles.columnLarge, styles.tableCell]}>
                      <Text style={styles.cellText}>{component}</Text>
                    </View>
                    <View style={[styles.columnSmall, styles.tableCell]}>
                      <Text style={styles.cellText}>{formatToUSD(unitCost)}</Text>
                    </View>
                    <View style={[styles.columnSmall, styles.tableCell]}>
                      <Text style={styles.cellText}>{formatToUSD(installedCost)}</Text>
                    </View>
                    <View style={[styles.columnSmall, styles.tableCell]}>
                      <Text style={styles.cellText}>{avgLife}</Text>
                    </View>
                    <View style={[styles.columnSmall, styles.tableCell]}>
                      <Text style={styles.cellText}>{formatToUSD(annualReserve)}</Text>
                    </View>
                    <View style={[styles.columnSmall, styles.tableCell]}>
                      <Text style={styles.cellText}>{formatToUSD(monthlyReserve)}</Text>
                    </View>
                    <View style={[styles.columnSmall, styles.tableCell]}>
                      <Text style={styles.cellText}>{formatToUSD(monthlyReservePerCustomer)}</Text>
                    </View>
                  </View>
                );
              }
            )
          ) : (
            <View style={[styles.noColumnData, styles.tableCell]}>
              <Text style={[styles.cellText, { textAlign: 'center' }]}>No Data</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default ComponentsTable;
