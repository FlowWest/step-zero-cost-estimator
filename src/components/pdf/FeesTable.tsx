import React from 'react';
import { View, StyleSheet, Text } from '@react-pdf/renderer';
import { formatToUSD } from '../../util';
import { getConsolidationCostDetails } from '../../util/costUtil';

import { startCase } from 'lodash';

const styles = StyleSheet.create({
  defaultText: { fontSize: 12 },
  table: { marginTop: 15, width: '100%' },
  tableWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' },
  costType: {},
  costTitle: { fontSize: 14 },
  divider: { marginTop: 5, width: '100%', height: 1, backgroundColor: 'rgba(0,0,0,.4)' },
  costDetails: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  costDetailsRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    margin: 10
  },
  costDetailsTitle: { color: 'rgba(0,0,0)' },
  costDetailsAmount: { color: 'rgba(0,0,0,0.5)' }
});

const FeesTable = ({ state }: { state: any }): JSX.Element => {
  const feeDetails = getConsolidationCostDetails(state);
  console.log('🚀 ~ FeesTable ~ feeDetails', feeDetails);

  const adjustments = { ...feeDetails.adjustments, title: 'Adjustments' };
  const materialCosts = { ...feeDetails.materialCosts, title: 'Material Costs' };
  const adminFees = { ...feeDetails.adminFees, title: 'Administrative Fees' };

  //Map over each object in the costTypeArray to produce nested table
  const costTypeArray = [materialCosts, adjustments, adminFees];
  const tables = costTypeArray.map((costType, idx) => {
    //Function will create title cased strings from the object keys
    const convertSubItem = (subItem: any) => {
      const subItemWordsArray = subItem.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ');
      const updatedWordsArray: string[] = [];

      subItemWordsArray.forEach((word: string) => {
        if (word.toLowerCase() === 'total') {
          return;
        } else if (word.toLowerCase() === 'and') {
          updatedWordsArray.push(word.toLowerCase());
        } else {
          updatedWordsArray.push(startCase(word));
        }
      });
      const newString = updatedWordsArray.join(' ');
      return newString;
    };

    const tableRows = [];
    for (const subItem in costType) {
      if (subItem !== 'total' && subItem !== 'title') {
        tableRows.push(
          <View style={styles.costDetailsRow}>
            <Text style={[styles.costDetailsTitle, styles.defaultText]}>
              {convertSubItem(subItem)}
            </Text>
            <Text style={[styles.costDetailsAmount, styles.defaultText]}>
              {/* TypeScript Error - implicit any */}
              {formatToUSD(costType[subItem])}
            </Text>
          </View>
        );
      }
    }

    return (
      <View style={styles.table} key={idx}>
        <View style={styles.costType}>
          <Text style={styles.costTitle}>{costType.title}</Text>
          <Text style={styles.defaultText}>{formatToUSD(costType.total)}</Text>
          <View style={styles.divider} />
        </View>
        <View style={styles.costDetails}>{tableRows}</View>
      </View>
    );
  });

  return <View style={styles.tableWrapper}>{tables}</View>;
};

export default FeesTable;
