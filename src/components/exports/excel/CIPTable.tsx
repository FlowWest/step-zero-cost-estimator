import React from 'react';
import { TransformedSystemComponent, Treatment, WaterSystemState } from '../../../util/interfaces';
import { formatToUSD } from '../../../util';
import { startCase } from 'lodash';
import { getConsolidationCostDetails } from '../../../util/costUtil';

const CIPTable = (state: any): JSX.Element => {
  console.log('🚀 ~ ExcelTable ~ state', state);
  const connections = state?.consolidationCostParams?.connections;

  function renderEmptyData(num: number, type: 'row' | 'cell') {
    const arr = [];
    for (let i = 0; i < num; i++) {
      if (type === 'row') arr.push(<tr></tr>);
      if (type === 'cell') arr.push(<td></td>);
    }
    return arr;
  }

  function getDataRows(componentAge: 'new' | 'existing') {
    return state[`${componentAge}Components`]?.map((component: TransformedSystemComponent) => {
      const { annualReserve, avgLife, component: name, monthlyReserve, unitCost } = component;

      return (
        <tr key={component.uid}>
          <td>1</td>
          <td colSpan={5}>{name}</td>
          <td>{formatToUSD(unitCost)}</td>
          <td>{formatToUSD(unitCost)}</td>
          <td>{avgLife}</td>
          <td>{formatToUSD(annualReserve)}</td>
          <td>{formatToUSD(monthlyReserve)}</td>
          <td>{formatToUSD(monthlyReserve / connections)}</td>
        </tr>
      );
    });
  }

  function generateSubtotals(componentAge: 'new' | 'existing' | 'all') {
    const components =
      componentAge === 'all'
        ? [...state?.existingComponents, ...state?.newComponents]
        : [...state[`${componentAge}Components`]];

    const totals = components.reduce(
      (total, currentValue) => {
        return {
          installedCost: (total.installedCost += currentValue.unitCost),
          annualReserve: (total.annualReserve += currentValue.annualReserve),
          monthlyReserve: (total.monthlyReserve += currentValue.monthlyReserve),
          monthlyReservePerCustomer: (total.monthlyReservePerCustomer +=
            currentValue.monthlyReserve / connections)
        };
      },
      {
        installedCost: 0,
        annualReserve: 0,
        monthlyReserve: 0,
        monthlyReservePerCustomer: 0
      }
    );

    return (
      <tr>
        <td></td>
        <td colSpan={5}>
          {componentAge === 'all'
            ? 'TOTAL Existing and New Project CIP'
            : `SUBTOTAL ${startCase(componentAge)} CIP Costs`}
        </td>
        <td></td>
        <td>{formatToUSD(totals.installedCost)}</td>
        <td></td>
        <td>{formatToUSD(totals.annualReserve)}</td>
        <td>{formatToUSD(totals.monthlyReserve)}</td>
        <td>{formatToUSD(totals.monthlyReservePerCustomer)}</td>
      </tr>
    );
  }

  function renderSignatureAndNotes() {
    return (
      <>
        <tr id="lookAtMe">
          <td></td>
          <td colSpan={7} className="bold" style={{ backgroundColor: 'blue', color: 'white' }}>
            Report Prepared by (Title):
            _________________________________________________________________
          </td>
          {renderEmptyData(1, 'cell')}
          <td colSpan={3}>Date: ________________________________</td>
        </tr>
        <tr>
          {renderEmptyData(2, 'cell')}
          <td colSpan={9}>
            NOTE: Installed costs are averages and include all materials and contracted labor and
            equipment.
          </td>
        </tr>
        {renderEmptyData(1, 'row')}
        <tr>
          <td colSpan={12} rowSpan={5}>
            NOTES:
          </td>
        </tr>
      </>
    );
  }

  return (
    <>
      <table
        id="test-table"
        className="table table-striped"
        style={{ width: '100%', textAlign: 'center' }}
      >
        <thead>
          <tr>
            <td></td>
            <th colSpan={4}>CAPITAL IMPROVEMENT PLAN (CIP)</th>
          </tr>
          <tr>
            {renderEmptyData(8, 'cell')}
            <td colSpan={2}>Date:</td>
            <td colSpan={3}>{new Date().toLocaleString()}</td>
          </tr>
          <tr>
            {renderEmptyData(8, 'cell')}
            <td colSpan={2}>System ID No.:</td>
            <td colSpan={3}>{state?.currentWaterSystem?.joinSystemPWSID}</td>
          </tr>
          <tr>
            <td></td>
            <td colSpan={2}>System Name:</td>
            <td colSpan={5}>{state?.currentWaterSystem?.joinSystemName}</td>
            <td colSpan={2}>Service Connections:</td>
            <td colSpan={3}>{connections}</td>
          </tr>
          {renderEmptyData(1, 'row')}
          <tr>
            {renderEmptyData(11, 'cell')}
            <td>MONTHLY</td>
          </tr>
          <tr>
            <td></td>
            <td colSpan={5}>*Enter information only in YELLOW shaded cells</td>
            {renderEmptyData(2, 'cell')}
            <td>AVG</td>
            {renderEmptyData(2, 'cell')}
            <td>RESERVE</td>
          </tr>
          <tr>
            {renderEmptyData(6, 'cell')}
            <td>UNIT</td>
            <td>INSTALLED</td>
            <td>LIFE,</td>
            <td>ANNUAL</td>
            <td>MONTHLY</td>
            <td>PER</td>
          </tr>
          <tr>
            <td>QTY</td>
            <td colSpan={5}>COMPONENT</td>
            <td>COST</td>
            <td>COST</td>
            <td>YEARS</td>
            <td>RESERVE</td>
            <td>RESERVE</td>
            <td>CUSTOMER</td>
          </tr>
        </thead>
        <tbody>
          {getDataRows('existing')}
          {generateSubtotals('existing')}
          {renderEmptyData(2, 'row')}
          {getDataRows('new')}
          {generateSubtotals('new')}
          {renderEmptyData(1, 'row')}
          {generateSubtotals('all')}
          {renderEmptyData(2, 'row')}
          {renderSignatureAndNotes()}
        </tbody>
      </table>
    </>
  );
};

export default CIPTable;
