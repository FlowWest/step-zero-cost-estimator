import React from 'react';
import { View, StyleSheet, Text } from '@react-pdf/renderer';
import { formatToUSD, formatSubItemText } from '../../../util';
import { getConsolidationCostDetails } from '../../../util/costUtil';
import { sumBy } from 'lodash';

const styles = StyleSheet.create({
  defaultText: { fontSize: 10 },
  costTitle: { fontSize: 12, marginBottom: 3 },
  totalTitle: { fontSize: 15, marginBottom: 3 },
  table: { marginTop: 20, width: '100%' },
  tableWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' },
  totalWrapper: { marginTop: 15 },
  divider: { marginTop: 5, width: '100%', height: 1, backgroundColor: 'rgba(0,0,0,.4)' },
  costDetails: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  costDetailsRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    margin: 8
  },
  costDetailsTitle: { color: 'rgba(0,0,0)' },
  costDetailsAmount: { color: 'rgba(0,0,0,0.5)' }
});

const FeesTable = ({ state }: { state: any }): JSX.Element => {
  const feeDetails = getConsolidationCostDetails({
    waterSystemDetails: state.currentWaterSystem,
    consolidationCostParams: state.consolidationCostParams
  });

  const adjustments = { ...feeDetails.adjustments, title: 'Adjustments' };
  const materialCosts = { ...feeDetails.materialCosts, title: 'Material Costs' };
  const adminFees = { ...feeDetails.adminFees, title: 'Administrative Fees' };

  //Map over each object in the costTypeArray to produce nested table
  const costTypeArray = [materialCosts, adjustments, adminFees];
  const tables = costTypeArray.map((costType: any, idx: number) => {
    const tableRows = [];
    for (const subItem in costType) {
      if (subItem !== 'total' && subItem !== 'title') {
        tableRows.push(
          <View style={styles.costDetailsRow}>
            <Text style={[styles.costDetailsTitle, styles.defaultText]}>
              {formatSubItemText(subItem)}
            </Text>
            <Text style={[styles.costDetailsAmount, styles.defaultText]}>
              {formatToUSD(costType[subItem])}
            </Text>
          </View>
        );
      }
    }

    return (
      <View style={styles.table} key={idx}>
        <View>
          <Text style={styles.costTitle}>{costType.title}</Text>
          <Text style={styles.defaultText}>{formatToUSD(costType.total)}</Text>
          <View style={styles.divider} />
        </View>
        <View style={styles.costDetails}>{tableRows}</View>
      </View>
    );
  });

  return (
    <>
      <View style={styles.tableWrapper}>{tables}</View>;
      <View style={styles.totalWrapper}>
        <Text style={styles.totalTitle}>
          Total Consolidation Cost: {formatToUSD(sumBy(costTypeArray, 'total'))}
        </Text>
      </View>
      ;
    </>
  );
};

export default FeesTable;
