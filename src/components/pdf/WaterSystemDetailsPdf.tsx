import React from 'react';
import { View, StyleSheet, Text } from '@react-pdf/renderer';

import { formatToUSD } from '../../util';
const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold'
  },
  column1: {
    width: '50%'
  },
  column2: {
    width: '50%'
  },
  textDefault: { fontSize: 10 },
  table: {
    width: '85%',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid black',
    marginTop: 10,
    borderRadius: '5px',
    overflow: 'hidden'
  },
  tableRow: { display: 'flex', flexDirection: 'row', padding: 8 },
  oddRow: { backgroundColor: '#dfdfdf' },
  waterSystemID: { fontSize: 12 },
  waterSystemName: { fontSize: 12, marginTop: 15 }
});

const WaterSystemDetailsPdf = ({ state }: { state: any }): JSX.Element => {
  const { consolidationCostParams, currentWaterSystem } = state;

  const waterSystemObject = {
    values: {
      numConnections: consolidationCostParams.connections,
      connectionFees: formatToUSD(consolidationCostParams.feeCostPerConnection),
      pipelineCost: formatToUSD(consolidationCostParams.pipelineCosts),
      adminFees: formatToUSD(consolidationCostParams.adminLegalCEQACosts),
      contingency: `${consolidationCostParams.contingency}%`
    },
    categories: {
      numConnections: 'Number of Connections',
      connectionFees: 'Connection Fees',
      pipelineCost: 'Pipeline Cost',
      adminFees: 'Admin Fees',
      contingency: 'Contingency'
    }
  } as any;

  return (
    <View>
      <Text
        style={styles.waterSystemName}
      >{`${currentWaterSystem.joinSystemName} (${currentWaterSystem.joinSystemPWSID})`}</Text>
      <View style={styles.table}>
        {Object.keys(waterSystemObject.values).map((item, idx) => (
          <View
            key={idx}
            style={idx % 2 !== 0 ? [styles.oddRow, styles.tableRow] : styles.tableRow}
          >
            <View style={styles.column1}>
              <Text style={styles.textDefault}>{waterSystemObject.categories[`${item}`]}</Text>
            </View>
            <View style={styles.column2}>
              <Text style={styles.textDefault}>{waterSystemObject.values[`${item}`]}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default WaterSystemDetailsPdf;
