import { utils, writeFile } from 'xlsx';
import { startCase } from 'lodash';
import { formatToUSD } from '../../../util';

export const handleExcelExport = (state: any) => {
  const workbook = utils.book_new();
  // const guidelinesPage = utils.json_to_sheet([]);
  // const budgetPage = utils.json_to_sheet([]);
  const cipPage = utils.json_to_sheet([]);
  utils.book_append_sheet(workbook, cipPage, 'CIP');

  const emptyRow = { A: '' };
  const cipSystemName = [{ A: 'System Name', B: '', C: state.currentWaterSystem.joinSystemName }];
  const cipSystemDetails = [
    { A: 'Date', B: '', C: new Date() },
    { A: 'System ID No.', B: '', C: state.currentWaterSystem.joinSystemPWSID },
    { A: 'Service Connections', B: '', C: state.consolidationCostParams.connections }
  ];
  const cipColumnHeaders = [
    {
      A: 'QTY',
      B: 'COMPONENT',
      C: 'UNIT COST',
      D: 'INSTALLED COST',
      E: 'AVG LIFE (YEARS)',
      F: 'ANNUAL RESERVE',
      G: 'MONTHLY RESERVE',
      H: 'MONTHLY RESERVE PER CUSTOMER'
    }
  ];

  const getColumnTotal = (componentsArray: any[], columnName: string) => {
    return componentsArray.reduce((totalValue, currentValue) => {
      return (totalValue += currentValue[columnName]);
    }, 0);
  };

  const getRows = (type: 'new' | 'existing') => {
    if (state[`${type}Components`].length) {
      return state[`${type}Components`].map((component: any) => ({
        A: '1',
        B: component.component,
        C: formatToUSD(component.unitCost),
        D: formatToUSD(component.unitCost * 1),
        E: component.avgLife,
        F: formatToUSD(component.annualReserve),
        G: formatToUSD(component.monthlyReserve),
        H: formatToUSD(component.monthlyReserve / state.consolidationCostParams.connections)
      }));
    }
    return [{ A: 'No Data' }];
  };

  const componentSubtotals = (type: 'new' | 'existing') => {
    const componentsArray = state[`${type}Components`];

    return {
      A: '',
      B: `SUBTOTAL ${type} CIP Costs`,
      C: '',
      D: formatToUSD(getColumnTotal(componentsArray, 'unitCost')),
      E: '',
      F: formatToUSD(getColumnTotal(componentsArray, 'annualReserve')),
      G: formatToUSD(getColumnTotal(componentsArray, 'monthlyReserve')),
      H: formatToUSD(
        getColumnTotal(componentsArray, 'monthlyReserve') /
          state.consolidationCostParams.connections
      )
    };
  };

  const totalExistingAndNew = () => {
    const totalCostValues = [...state.existingComponents, ...state.newComponents];
    console.log('🚀 ~ totalExistingAndNew ~ totalCostValues', totalCostValues);
    const updatedCostValues = totalCostValues.reduce(
      (previousValue, currentValue) => {
        return {
          installedCost: (previousValue.installedCost += currentValue.unitCost),
          annualReserve: (previousValue.annualReserve += currentValue.annualReserve),
          monthlyReserve: (previousValue.monthlyReserve += currentValue.monthlyReserve),
          monthlyReservePerCustomer: (previousValue.monthlyReservePerCustomer +=
            currentValue.monthlyReserve / state.consolidationCostParams.connections)
        };
      },
      {
        installedCost: 0,
        annualReserve: 0,
        monthlyReserve: 0,
        monthlyReservePerCustomer: 0
      }
    );
    console.log('🚀 ~ totalExistingAndNew ~ updatedCostValues', updatedCostValues);

    if (totalCostValues.length) {
      return {
        A: '',
        B: `TOTAL Existing and New Project CIP:`,
        C: '',
        D: formatToUSD(updatedCostValues.installedCost),
        E: '',
        F: formatToUSD(updatedCostValues.annualReserve),
        G: formatToUSD(updatedCostValues.monthlyReserve),
        H: formatToUSD(updatedCostValues.monthlyReservePerCustomer)
      };
    }
    return null;
  };

  //=============================================
  //CIP - SHEET 3
  //=============================================

  //WATER SYSTEM DETAILS
  utils.sheet_add_json(cipPage, [{ A: 'SIMPLIFIED CAPITAL IMPROVEMENT PLAN (CIP)' }], {
    skipHeader: true,
    origin: 'B2'
  });
  utils.sheet_add_json(cipPage, cipSystemName, { skipHeader: true, origin: 'B5' });
  utils.sheet_add_json(cipPage, cipSystemDetails, { skipHeader: true, origin: 'G3' });

  //EXISTING COMPONENTS TABLE
  utils.sheet_add_json(cipPage, [{ A: 'EXISTING Project CIP Costs' }], {
    skipHeader: true,
    origin: 'A8'
  });
  utils.sheet_add_json(cipPage, cipColumnHeaders, { skipHeader: true, origin: -1 });
  utils.sheet_add_json(cipPage, getRows('existing'), { skipHeader: true, origin: -1 });
  utils.sheet_add_json(cipPage, [componentSubtotals('existing')], { skipHeader: true, origin: -1 });

  //NEW COMPONENTS TABLE
  utils.sheet_add_json(cipPage, [emptyRow], { skipHeader: true, origin: -1 });
  utils.sheet_add_json(cipPage, [{ A: 'NEW Project CIP Costs' }], {
    skipHeader: true,
    origin: -1
  });
  utils.sheet_add_json(cipPage, getRows('new'), { skipHeader: true, origin: -1 });
  utils.sheet_add_json(cipPage, [componentSubtotals('new')], { skipHeader: true, origin: -1 });

  //NEW AND EXISTING TOTALS
  utils.sheet_add_json(cipPage, [emptyRow], { skipHeader: true, origin: -1 });
  utils.sheet_add_json(cipPage, [totalExistingAndNew()], {
    skipHeader: true,
    origin: -1
  });

  // utils.book_append_sheet(workbook, guidelinesPage, 'GUIDELINES');
  // utils.book_append_sheet(workbook, budgetPage, '5-Year Budget');

  //CREATE EXCEL FILE
  writeFile(workbook, 'test_excel.xlsx');

  return;
};
