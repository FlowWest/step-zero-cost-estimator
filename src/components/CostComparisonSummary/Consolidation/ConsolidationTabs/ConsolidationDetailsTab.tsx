import React from 'react';
import { Typography } from '@mui/material';
import { ConsolidationCostDetails } from '../../../../util/interfaces';

const ConsolidationDetailsTab = ({ chartData }: { chartData: ConsolidationCostDetails }) => {
  const { materialCosts, adminFees, financialAssistance, adjustments, total } = chartData;
  console.log(chartData);
  return (
    <div>
      <Typography gutterBottom style={{ color: 'green' }}>
        Material Costs: {materialCosts.total} <br />
        Pipeline Costs: {materialCosts.totalPipelineCosts} <br />
        Connection Costs: {materialCosts.totalConnectionCosts}
      </Typography>
      <Typography gutterBottom style={{ color: 'purple' }}>
        Administrative Fees: {adminFees.total} <br />
        Admin and Legal: {adminFees.adminLegalCosts}
      </Typography>
      <Typography gutterBottom style={{ color: 'orange' }}>
        Adjustments: {adjustments.total} <br />
        Contingency: {adjustments.totalContingency}
      </Typography>
      <Typography gutterBottom>TOTAL MERGER COST: {total}</Typography>
    </div>
  );
};

export default ConsolidationDetailsTab;
