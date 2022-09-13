import { utils, writeFile } from 'xlsx-js-style';
import { startCase } from 'lodash';
import { formatToUSD } from '../../../util';

export const handleExcelExport = (state: any) => {
  const styles = {
    boldText: { font: { bold: true } },
    fillYellow: {
      fill: { fgColor: { rgb: 'fafa6b' } }
    },
    fillOrange: {
      fill: { fgColor: { rgb: 'fac66b' } }
    },
    thinBorder: {
      border: {
        top: { style: 'thin', color: { rgb: '000' } },
        bottom: { style: 'thin', color: { rgb: '000' } },
        left: { style: 'thin', color: { rgb: '000' } },
        right: { style: 'thin', color: { rgb: '000' } }
      }
    },
    thickBorder: {
      border: {
        top: { style: 'thick', color: { rgb: '000' } },
        bottom: { style: 'thick', color: { rgb: '000' } },
        left: { style: 'thick', color: { rgb: '000' } },
        right: { style: 'thick', color: { rgb: '000' } }
      }
    }
  };

  const workbook = utils.book_new();

  //=============================================
  //GUIDELINES - SHEET 1
  //=============================================
  //const guidelinesPage = utils.json_to_sheet([]);
  // utils.book_append_sheet(workbook, guidelinesPage, 'GUIDELINES');

  //=============================================
  //5-YEAR BUDGET - SHEET 2
  //=============================================
  // const budgetPage = utils.json_to_sheet([]);
  // utils.book_append_sheet(workbook, budgetPage, '5-Year Budget');

  //=============================================
  //CIP - SHEET 3
  //=============================================
  const cipPage = utils.json_to_sheet([]);
  utils.book_append_sheet(workbook, cipPage, 'CIP');

  const emptyRow = { A: '' };
  const cipSystemName = [
    [
      { v: 'System Name' },
      { v: state.currentWaterSystem.joinSystemName, s: { ...styles.fillYellow } }
    ]
  ];
  const cipSystemDetails = [
    [
      { v: 'Date:' },
      { v: new Date().toLocaleString(), s: { ...styles.fillYellow, ...styles.thinBorder } }
    ],
    [
      { v: 'System ID No.:' },
      {
        v: state.currentWaterSystem.joinSystemPWSID,
        s: { ...styles.fillYellow, ...styles.thinBorder }
      }
    ],
    [
      { v: 'Connections:' },
      {
        v: state.consolidationCostParams.connections,
        s: { ...styles.fillYellow, ...styles.thinBorder }
      }
    ]
  ];
  const cipColumnHeaders = [
    [
      { v: 'QTY' },
      { v: 'COMPONENT' },
      { v: '' },
      { v: '' },
      { v: '' },
      { v: 'UNIT COST' },
      { v: 'INSTALLED COST' },
      { v: 'AVG LIFE (YEARS)' },
      { v: 'ANNUAL RESERVE' },
      { v: 'MONTHLY RESERVE' },
      { v: 'MONTHLY RESERVE PER CUSTOMER' }
    ]
  ];

  const getColumnTotal = (componentsArray: any[], columnName: string) => {
    return componentsArray.reduce((totalValue, currentValue) => {
      return (totalValue += currentValue[columnName]);
    }, 0);
  };

  const getRows = (type: 'new' | 'existing') => {
    if (state[`${type}Components`].length) {
      return state[`${type}Components`].map((component: any) => [
        { v: '1', s: { ...styles.fillYellow, ...styles.thinBorder } },
        { v: component.component, s: { ...styles.fillYellow, ...styles.thinBorder } },
        { v: '' },
        { v: '' },
        { v: '' },
        {
          v: formatToUSD(component.unitCost),
          s: { ...styles.fillYellow, ...styles.thinBorder }
        },
        {
          v: formatToUSD(component.unitCost * 1),
          s: { ...styles.thinBorder }
        },
        {
          v: component.avgLife,
          s: { ...styles.fillYellow, ...styles.thinBorder }
        },
        {
          v: formatToUSD(component.annualReserve),
          s: { ...styles.thinBorder }
        },
        { v: formatToUSD(component.monthlyReserve), s: { ...styles.thinBorder } },
        {
          v: formatToUSD(component.monthlyReserve / state.consolidationCostParams.connections),
          s: { ...styles.thinBorder }
        }
      ]);
    }
    return [{ A: 'No Data' }];
  };

  const componentSubtotalsRow = (type: 'new' | 'existing') => {
    const componentsArray = state[`${type}Components`];
    return [
      { v: '', s: { ...styles.thickBorder } },
      {
        v: `SUBTOTAL ${startCase(type)} CIP Costs`,
        s: { ...styles.thickBorder, ...styles.boldText }
      },
      { v: '', s: { ...styles.thickBorder } },
      { v: '', s: { ...styles.thickBorder } },
      { v: '', s: { ...styles.thickBorder } },
      { v: '', s: { ...styles.thickBorder } },
      { v: '', s: { ...styles.thickBorder } },
      {
        v: formatToUSD(getColumnTotal(componentsArray, 'unitCost')),
        s: { ...styles.thickBorder }
      },
      { v: '', s: { ...styles.thickBorder } },
      {
        v: formatToUSD(getColumnTotal(componentsArray, 'annualReserve')),
        s: { ...styles.thickBorder, ...styles.fillOrange }
      },
      {
        v: formatToUSD(getColumnTotal(componentsArray, 'monthlyReserve')),
        s: { ...styles.thickBorder }
      },
      {
        v: formatToUSD(
          getColumnTotal(componentsArray, 'monthlyReserve') /
            state.consolidationCostParams.connections
        ),
        s: { ...styles.thickBorder }
      }
    ];
  };

  const totalExistingAndNew = () => {
    const totalCostValues = [...state.existingComponents, ...state.newComponents];
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

  //WATER SYSTEM DETAILS
  utils.sheet_add_json(cipPage, [{ A: 'SIMPLIFIED CAPITAL IMPROVEMENT PLAN (CIP)' }], {
    skipHeader: true,
    origin: 'B2'
  });
  utils.sheet_add_json(cipPage, cipSystemName, { skipHeader: true, origin: 'B5' });
  utils.sheet_add_json(cipPage, cipSystemDetails, { skipHeader: true, origin: 'G3' });

  let cipCellMerges = [
    //header
    { s: { r: 1, c: 1 }, e: { r: 1, c: 5 } }, //page title
    { s: { r: 4, c: 2 }, e: { r: 4, c: 5 } }, //system name
    { s: { r: 2, c: 7 }, e: { r: 2, c: 9 } }, //date
    { s: { r: 3, c: 7 }, e: { r: 3, c: 9 } }, //system no.
    { s: { r: 4, c: 7 }, e: { r: 4, c: 9 } } //connections
  ];
  cipPage['!merges'] = cipCellMerges;

  //EXISTING COMPONENTS TABLE
  utils.sheet_add_json(cipPage, [{ A: 'EXISTING Project CIP Costs' }], {
    skipHeader: true,
    origin: 'A8'
  });
  utils.sheet_add_json(cipPage, cipColumnHeaders, { skipHeader: true, origin: -1 });
  utils.sheet_add_json(cipPage, getRows('existing'), { skipHeader: true, origin: -1 });
  utils.sheet_add_json(cipPage, [componentSubtotalsRow('existing')], {
    skipHeader: true,
    origin: -1
  });
  cipCellMerges = [
    ...cipCellMerges,
    //EXISTING subtotals
    { s: { r: -1, c: 1 }, e: { r: -1, c: 5 } } //page title
  ];

  //NEW COMPONENTS TABLE
  utils.sheet_add_json(cipPage, [emptyRow], { skipHeader: true, origin: -1 });
  utils.sheet_add_json(cipPage, [{ A: 'NEW Project CIP Costs' }], {
    skipHeader: true,
    origin: -1
  });
  utils.sheet_add_json(cipPage, getRows('new'), { skipHeader: true, origin: -1 });
  utils.sheet_add_json(cipPage, [componentSubtotalsRow('new')], { skipHeader: true, origin: -1 });

  //NEW AND EXISTING TOTALS
  utils.sheet_add_json(cipPage, [emptyRow], { skipHeader: true, origin: -1 });
  utils.sheet_add_json(cipPage, [totalExistingAndNew()], {
    skipHeader: true,
    origin: -1
  });

  const row = [
    { v: 'Courier: 24', t: 's', s: { font: { name: 'Courier', sz: 24 } } },
    { v: 'bold & color', t: 's', s: { font: { bold: true, color: { rgb: 'FF0000' } } } },
    {
      v: 'fill: color in advamce long sentence',
      t: 'z',
      s: { fill: { fgColor: { rgb: 'E9E9E9' } } }
    },
    { v: 'line\nbreak', t: 's', s: { alignment: { wrapText: true } } }
  ];

  // STEP 3: Create worksheet with rows; Add worksheet to workbook
  const guidelinesPage = utils.aoa_to_sheet([row]);
  utils.book_append_sheet(workbook, guidelinesPage, 'readme demo');

  //CREATE EXCEL FILE
  writeFile(workbook, 'test_excel.xlsx');

  return;
};
