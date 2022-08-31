import React, { useContext } from 'react';
import { View, StyleSheet, Text } from '@react-pdf/renderer';
import { fontSize } from '@mui/system';
import { formatToUSD } from '../../util';
const styles = StyleSheet.create({
  table: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid black',
    marginTop: 25,
    borderRadius: '5px',
    overflow: 'hidden'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    borderTop: '1px solid #EEE',
    paddingTop: 8,
    paddingBottom: 8
  },
  header: {
    borderTop: 'none'
  },
  bold: {
    fontWeight: 'bold'
  },

  column1: {
    width: '35%'
  },
  column2: {
    width: '65%'
  },
  cell: { padding: 5, fontSize: 8 },
  oddCell: { backgroundColor: '#dfdfdf' }
});

const WaterSystemDetails = ({ state }: { state: any }): JSX.Element => {
  const { consolidationCostParams, currentWaterSystem } = state;
  console.log(currentWaterSystem);
  console.log(consolidationCostParams);

  const waterSystemObject = {
    values: {
      name: currentWaterSystem.joinSystemName,
      id: currentWaterSystem.joinSystemPWSID,
      numConnections: currentWaterSystem.joinConnections,
      connectionFees: formatToUSD(consolidationCostParams.feeCostPerConnection),
      pipelineCost: formatToUSD(consolidationCostParams.pipelineCosts),
      adminFees: formatToUSD(consolidationCostParams.adminLegalCEQACosts),
      contingency: `${consolidationCostParams.contingency}%`
    },
    categories: {
      name: 'Water System',
      id: 'WSID',
      numConnections: 'Number of Connections',
      connectionFees: 'Connection Fees',
      pipelineCost: 'Pipeline Cost',
      adminFees: 'Admin Fees',
      contingency: 'Contingency'
    }
  };

  return (
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
  );
};

export default WaterSystemDetails;
