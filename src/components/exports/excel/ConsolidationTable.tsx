import React from 'react';
import { getConsolidationCostDetails } from '../../../util/costUtil';
import { WaterSystemState } from '../../../util/interfaces';

const ConsolidationTable = (state: any) => {
  function renderEmptyData(num: number, type: 'row' | 'cell') {
    const arr = [];
    for (let i = 0; i < num; i++) {
      if (type === 'row') arr.push(<tr></tr>);
      if (type === 'cell') arr.push(<td></td>);
    }
    return arr;
  }

  function renderConsolidationTotals({
    currentWaterSystem,
    consolidationCostParams
  }: WaterSystemState) {
    const { adjustments, adminFees, materialCosts } = getConsolidationCostDetails({
      waterSystemDetails: currentWaterSystem,
      consolidationCostParams
    });
    return (
      <>
        <tr>
          <td colSpan={6}>Pipeline Costs</td>
          {renderEmptyData(3, 'cell')}
          <td colSpan={2}>{materialCosts.totalPipelineCosts}</td>
        </tr>
        <tr>
          <td colSpan={6}>Connection Costs</td>
          {renderEmptyData(3, 'cell')}
          <td colSpan={2}>{materialCosts.totalConnectionCosts}</td>
        </tr>
        <tr>
          <td colSpan={6}>Service Fees</td>
          {renderEmptyData(3, 'cell')}
          <td colSpan={2}>{materialCosts.totalServiceFee}</td>
        </tr>
        <tr>
          {renderEmptyData(1, 'cell')}
          <td colSpan={3}>TOTAL Material Cost </td>
          {renderEmptyData(5, 'cell')}
          <td colSpan={2}>{materialCosts.total}</td>
        </tr>
        <tr>
          <td colSpan={6}>Admin, Legal, & CEQA</td>
          {renderEmptyData(3, 'cell')}
          <td colSpan={2}>{adminFees.adminLegalCEQACosts}</td>
        </tr>
        <tr>
          {renderEmptyData(1, 'cell')}
          <td colSpan={3}>TOTAL Administrative Fees </td>
          {renderEmptyData(5, 'cell')}
          <td colSpan={2}>{adminFees.total}</td>
        </tr>
        <tr>
          <td colSpan={6}>Contingency Costs</td>
          {renderEmptyData(3, 'cell')}
          <td colSpan={2}>{adjustments.totalContingencyCost}</td>
        </tr>
        <tr>
          <td colSpan={6}>Planning and Construction Costs</td>
          {renderEmptyData(3, 'cell')}
          <td colSpan={2}>{adjustments.planningAndConstructionAdjustmentCost}</td>
        </tr>
        <tr>
          <td colSpan={6}>Elevation Adjustment Costs</td>
          {renderEmptyData(3, 'cell')}
          <td colSpan={2}>{adjustments.elevationAdjustmentCost}</td>
        </tr>
        <tr>
          <td colSpan={6}>Regional Adjustment Costs</td>
          {renderEmptyData(3, 'cell')}
          <td colSpan={2}>{adjustments.regionalAdjustmentCost}</td>
        </tr>
        <tr>
          <td colSpan={6}>Inflation Adjustment Costs</td>
          {renderEmptyData(3, 'cell')}
          <td colSpan={2}>{adjustments.inflationAdjustmentCost}</td>
        </tr>

        <tr>
          {renderEmptyData(1, 'cell')}
          <td colSpan={3}>TOTAL Adjustments </td>
          {renderEmptyData(5, 'cell')}
          <td colSpan={2}>{adjustments.total}</td>
        </tr>
      </>
    );
  }

  return (
    <table>
      <thead>
        {renderEmptyData(1, 'cell')}

        <tr>
          <td colSpan={7}>CONSOLIDATION COSTS</td>
        </tr>
        {renderEmptyData(1, 'row')}
        <tr>
          <td colSpan={3}>CATEGORY</td>
          {renderEmptyData(6, 'cell')}
          <td colSpan={2}>TOTAL</td>
        </tr>
      </thead>
      <tbody>{renderConsolidationTotals(state)}</tbody>
    </table>
  );
};

export default ConsolidationTable;
