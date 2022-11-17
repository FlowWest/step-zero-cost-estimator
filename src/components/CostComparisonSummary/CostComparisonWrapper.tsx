import React, { useState } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ConsolidationCalculator from './Consolidation/ConsolidationCalculator';
import CapitalImprovementCalculator from './CapitalImprovement/CapitalImprovementCalculator';

const CostComparisonWrapper = () => {
  const [value, setValue] = useState('consolidation' as string);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Consolidation" value="consolidation" />
            <Tab label="Capital Improvement" value="capitalImprovement" />
          </TabList>
        </Box>
        <TabPanel value="consolidation">
          <ConsolidationCalculator />
        </TabPanel>
        <TabPanel value="capitalImprovement">
          <CapitalImprovementCalculator />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default CostComparisonWrapper;
