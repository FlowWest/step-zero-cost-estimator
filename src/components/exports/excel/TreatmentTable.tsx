import React from 'react';
import { Treatment, WaterSystemState } from '../../../util/interfaces';

const TreatmentTable = (state: WaterSystemState) => {
  function renderEmptyData(num: number, type: 'row' | 'cell') {
    const arr = [];
    for (let i = 0; i < num; i++) {
      if (type === 'row') arr.push(<tr></tr>);
      if (type === 'cell') arr.push(<td></td>);
    }
    return arr;
  }

  function getTreatmentRows(treatments: Treatment[]) {
    console.log('🚀 ~ getTreatmentRows ~ treatments', treatments);
    return treatments?.map((treatment) => {
      return (
        <tr key={treatment?.uid}>
          <td colSpan={6}>{treatment?.contaminant || 'N/A'}</td>
          <td colSpan={3}>{treatment?.treatment}</td>
          <td colSpan={2}>{treatment?.capitalCost}</td>
          {renderEmptyData(1, 'cell')}
          <td colSpan={2}>{treatment?.operationalCost}</td>
        </tr>
      );
    });
  }

  function generateTreatmentSubtotals(treatments: Treatment[]) {
    const totals = treatments?.reduce(
      (total, currentValue) => {
        return {
          capitalCost: (total.capitalCost += currentValue.capitalCost),
          operationalCost: (total.operationalCost += currentValue.operationalCost)
        };
      },
      { capitalCost: 0, operationalCost: 0 }
    );

    return (
      <tr>
        <td colSpan={6}>TOTAL Treatment Costs</td>
        {renderEmptyData(3, 'cell')}
        <td colSpan={2}>{totals.capitalCost}</td>
        {renderEmptyData(1, 'cell')}
        <td colSpan={2}>{totals.operationalCost}</td>
      </tr>
    );
  }

  return (
    <table>
      <thead>
        <td colSpan={6}>CONTAMINANT</td>
        <td colSpan={3}>TREATMENT</td>
        <td colSpan={2}>CAPITAL COST</td>
        <td colSpan={3}>ANNUAL OPERATIONAL COST</td>
      </thead>
      <tbody>
        {getTreatmentRows(state.selectedTreatments)}
        {generateTreatmentSubtotals(state.selectedTreatments)}
        {renderEmptyData(2, 'row')}
      </tbody>
    </table>
  );
};

export default TreatmentTable;
