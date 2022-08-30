import React from 'react';
import { View, StyleSheet, Text } from '@react-pdf/renderer';
import { fontSize } from '@mui/system';

const styles = StyleSheet.create({
  table: {
    width: '45%',
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
    width: '50%'
  },
  column2: {
    width: '50%'
  },
  cell: { padding: 5, fontSize: 10 },
  oddCell: { backgroundColor: '#dfdfdf' }
});
const currentWaterSystem = {
  values: {
    name: '49ER TRAILER RANCH',
    id: 'CA5500120',
    numConnections: '80',
    connectionFees: '$6,600',
    piplineCost: '$155',
    adminFees: '$285,000',
    contingency: '20%'
  },
  categories: {
    name: 'Water System',
    id: 'WSID',
    numConnections: 'Number of Connections',
    connectionFees: 'Connection Fees',
    piplineCost: 'Pipeline Cost',
    adminFees: 'Admin Fees',
    contingency: 'Contingency'
  }
};
const WaterSystemDetails = () => {
  return (
    <View style={styles.table}>
      <View style={[styles.column, styles.column1, styles.bold]}>
        {Object.values(currentWaterSystem.categories).map((value, idx) => {
          return (
            <View key={idx} style={idx % 2 !== 0 ? [styles.oddCell, styles.cell] : styles.cell}>
              <Text>{value}</Text>
            </View>
          );
        })}
      </View>
      <View style={[styles.column, styles.column2, styles.bold]}>
        {Object.values(currentWaterSystem.values).map((value, idx) => {
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
