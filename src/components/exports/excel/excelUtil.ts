import { utils, writeFile } from 'xlsx';

export const handleExcelExport = (state: any) => {
  const workbook = utils.book_new();
  // const guidelinesPage = utils.json_to_sheet([]);
  // const budgetPage = utils.json_to_sheet([]);
  const cipPage = utils.json_to_sheet([]);
  utils.book_append_sheet(workbook, cipPage, 'CIP');

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

  const cipExistingRows = state.existingComponents.length
    ? state.existingComponents.map((component: Record<string, unknown>) => ({
        A: '1',
        B: component.component,
        C: component.unitCost,
        D: '',
        E: component.avgLife,
        F: '',
        G: '',
        H: ''
      }))
    : [{ A: 'No Data' }];

  const cipNewRows = state.newComponents.length
    ? state.newComponents.map((component: Record<string, unknown>) => ({
        A: '1',
        B: component.component,
        C: component.unitCost,
        D: '',
        E: component.avgLife,
        F: '',
        G: '',
        H: ''
      }))
    : [{ A: 'No Data' }];

  utils.sheet_add_json(cipPage, [{ A: 'SIMPLIFIED CAPITAL IMPROVEMENT PLAN (CIP)' }], {
    skipHeader: true,
    origin: 'B2'
  });
  utils.sheet_add_json(cipPage, cipSystemName, { skipHeader: true, origin: 'B5' });
  utils.sheet_add_json(cipPage, cipSystemDetails, { skipHeader: true, origin: 'G3' });
  utils.sheet_add_json(cipPage, [{ A: 'EXISTING Project CIP Costs' }], {
    skipHeader: true,
    origin: 'A8'
  });
  utils.sheet_add_json(cipPage, cipColumnHeaders, { skipHeader: true, origin: 'A9' });
  utils.sheet_add_json(cipPage, cipExistingRows, { skipHeader: true, origin: 'A10' });
  utils.sheet_add_json(cipPage, [{ A: 'NEW Project CIP Costs' }], {
    skipHeader: true,
    origin: 'A25'
  });
  utils.sheet_add_json(cipPage, cipNewRows, { skipHeader: true, origin: 'A26' });

  // utils.book_append_sheet(workbook, guidelinesPage, 'GUIDELINES');
  // utils.book_append_sheet(workbook, budgetPage, '5-Year Budget');
  writeFile(workbook, 'sws_budget_calculator.xlsx');

  return;
};
