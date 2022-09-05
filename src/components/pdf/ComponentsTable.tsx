import React from 'react';
import { View, StyleSheet, Text } from '@react-pdf/renderer';
import { formatToUSD } from '../../util';
import { getConsolidationCostDetails } from '../../util/costUtil';

import { startCase } from 'lodash';

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
  column1: { width: '12.5%' },
  column2: { width: '37.5%' },
  column3: { width: '12.5%' },
  column4: { width: '12.5%' },
  column5: { width: '12.5%' },
  column6: { width: '12.5%' },
  column7: { width: '12.5%' },
  column8: { width: '12.5%' },
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
  const feeDetails = getConsolidationCostDetails(state);
  console.log('🚀 ~ ComponentsTable ~ state', state);
  const tableTitles = {
    new: 'New Components',
    existing: 'Existing Components',
    total: 'Total Existing and New Project Capital Imporvement Costs'
  };

  const allUsedComponents = state.existingComponents.concat(state.newComponents);
  const installedCostTotal = allUsedComponents.reduce((cur, acc) => (cur.unitCost += acc), 0);

  return (
    <View style={styles.container} wrap={false}>
      <Text style={styles.tableHeader}>{tableTitles[`${type}`]}</Text>
      {type === 'total' && (
        <View style={styles.tableWrapper}>
          <View style={styles.tableRow}>
            <View style={[styles.column1, styles.tableCell]}></View>
            <View style={[styles.column2, styles.tableCell]}></View>
            <View style={[styles.column3, styles.tableCell]}></View>
            <View style={[styles.column4, styles.tableCell]}>
              <Text style={styles.headerText}>Installed Cost</Text>
            </View>
            <View style={[styles.column5, styles.tableCell]}></View>
            <View style={[styles.column6, styles.tableCell]}>
              <Text style={styles.headerText}>Annual Reserve</Text>
            </View>
            <View style={[styles.column7, styles.tableCell]}>
              <Text style={styles.headerText}>Monthly Reserve</Text>
            </View>
            <View style={[styles.column8, styles.tableCell]}>
              <Text style={styles.headerText}>Monthly Reserve</Text>
              <Text style={styles.headerText}>Per Customer</Text>
            </View>
          </View>
          {state.existingComponents.length || state.newComponents.length ? (
            <View style={styles.tableRow}>
              <View style={[styles.column1, styles.tableCell]}></View>
              <View style={[styles.column2, styles.tableCell]}></View>
              <View style={[styles.column3, styles.tableCell]}></View>
              <View style={[styles.column4, styles.tableCell]}>
                <Text style={styles.cellText}>$1,234,567</Text>
              </View>
              <View style={[styles.column5, styles.tableCell]}></View>
              <View style={[styles.column6, styles.tableCell]}>
                <Text style={styles.cellText}>$34,322</Text>
              </View>
              <View style={[styles.column7, styles.tableCell]}>
                <Text style={styles.cellText}>$2,394</Text>
              </View>
              <View style={[styles.column8, styles.tableCell]}>
                <Text style={styles.cellText}>$98</Text>
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
            <View style={[styles.column1, styles.tableCell]}>
              <Text style={styles.headerText}>Quantity</Text>
            </View>
            <View style={[styles.column2, styles.tableCell]}>
              <Text style={styles.headerText}>Component</Text>
            </View>
            <View style={[styles.column3, styles.tableCell]}>
              <Text style={styles.headerText}>Unit Cost</Text>
            </View>
            <View style={[styles.column4, styles.tableCell]}>
              <Text style={styles.headerText}>Installed Cost</Text>
            </View>
            <View style={[styles.column5, styles.tableCell]}>
              <Text style={styles.headerText}>Average Life</Text>
              <Text style={styles.headerText}>{'(Years)'}</Text>
            </View>
            <View style={[styles.column6, styles.tableCell]}>
              <Text style={styles.headerText}>Annual Reserve</Text>
            </View>
            <View style={[styles.column7, styles.tableCell]}>
              <Text style={styles.headerText}>Monthly Reserve</Text>
            </View>
            <View style={[styles.column8, styles.tableCell]}>
              <Text style={styles.headerText}>Monthly Reserve</Text>
              <Text style={styles.headerText}>Per Customer</Text>
            </View>
          </View>
          {state[`${type}Components`].length ? (
            state[`${type}Components`].map(
              (
                {
                  component,
                  unitCost,
                  avgLife
                }: { component: string; unitCost: number; avgLife: number },
                idx: number
              ) => {
                console.log('🚀 ~ {state.systemComponents.map ~ components', component);
                const quantity = state[`${type}Components`].filter(
                  (item) => item.component === component
                ).length;
                const installedCost = unitCost * quantity;
                const annualReserve = installedCost / avgLife;
                const monthlyReserve = annualReserve / 12;
                const monthlyReservePerCustomer =
                  monthlyReserve / state.consolidationCostParams.connections;
                return (
                  <View style={styles.tableRow} key={idx}>
                    <View style={[styles.column1, styles.tableCell]}>
                      <Text style={styles.cellText}>{quantity}</Text>
                    </View>
                    <View style={[styles.column2, styles.tableCell]}>
                      <Text style={styles.cellText}>{component}</Text>
                    </View>
                    <View style={[styles.column3, styles.tableCell]}>
                      <Text style={styles.cellText}>{formatToUSD(unitCost)}</Text>
                    </View>
                    <View style={[styles.column4, styles.tableCell]}>
                      <Text style={styles.cellText}>{formatToUSD(installedCost)}</Text>
                    </View>
                    <View style={[styles.column5, styles.tableCell]}>
                      <Text style={styles.cellText}>{avgLife}</Text>
                    </View>
                    <View style={[styles.column6, styles.tableCell]}>
                      <Text style={styles.cellText}>{formatToUSD(annualReserve)}</Text>
                    </View>
                    <View style={[styles.column7, styles.tableCell]}>
                      <Text style={styles.cellText}>{formatToUSD(monthlyReserve)}</Text>
                    </View>
                    <View style={[styles.column8, styles.tableCell]}>
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
