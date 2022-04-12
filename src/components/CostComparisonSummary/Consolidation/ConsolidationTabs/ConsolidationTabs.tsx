import React, { useState } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import DoughnutChart from '../../../uiComponents/DoughnutChart';
import { ConsolidationCostDetails } from '../../../../util/interfaces';

const ConsolidationTabs = ({ chartData }: { chartData: ConsolidationCostDetails }) => {
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            centered
            aria-label="lab API tabs example"
            textColor="primary"
            indicatorColor="secondary"
          >
            <Tab label="Overview" value="1" />
            <Tab label="Details" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <DoughnutChart chartData={chartData} />
        </TabPanel>
        <TabPanel value="2">Cost Details Panel</TabPanel>
      </TabContext>
    </Box>
  );
};

export default ConsolidationTabs;
