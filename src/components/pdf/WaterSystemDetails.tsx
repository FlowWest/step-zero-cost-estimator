import React, { useContext } from 'react';
import { View, StyleSheet, Text } from '@react-pdf/renderer';
import { fontSize } from '@mui/system';
import { formatToUSD } from '../../util';
const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    borderTop: '1px solid #EEE',
    paddingTop: 8,
    paddingBottom: 8
  },
  column1: {
    width: '50%'
  },
  column2: {
    width: '50%'
  },
  cell: { padding: 10, fontSize: 9 },
  header: {
    borderTop: 'none'
  },
  oddCell: { backgroundColor: '#dfdfdf' },
  table: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid black',
    marginTop: 10,
    borderRadius: '5px',
    overflow: 'hidden'
  },
  waterSystemID: { fontSize: 12 },
  waterSystemName: { fontSize: 14, marginTop: 15 }
});

const WaterSystemDetails = ({ state }: { state: any }): JSX.Element => {
  const { consolidationCostParams, currentWaterSystem } = state;
  console.log(currentWaterSystem);
  console.log(consolidationCostParams);

  const waterSystemObject = {
    values: {
      numConnections: currentWaterSystem.joinConnections,
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
  };

  return (
    <View>
      <Text style={styles.waterSystemName}>{currentWaterSystem.joinSystemName}</Text>
      <Text style={styles.waterSystemID}>{currentWaterSystem.joinSystemPWSID}</Text>
      <View style={styles.table}>
        <View style={[styles.column, styles.column1, styles.bold]}>
          {Object.values(waterSystemObject.categories).map((value, idx) => {
            return (
              <View key={idx} style={idx % 2 !== 0 ? [styles.oddCell, styles.cell] : styles.cell}>
                <Text>{value}</Text>
              </View>
            );
          })}
        </View>
        <View style={[styles.column, styles.column2, styles.bold]}>
          {Object.values(waterSystemObject.values).map((value, idx) => {
            return (
              <View key={idx} style={idx % 2 !== 0 ? [styles.oddCell, styles.cell] : styles.cell}>
                <Text>{value}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default WaterSystemDetails;
