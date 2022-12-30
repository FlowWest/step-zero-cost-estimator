import ReactDOMServer from 'react-dom/server';
import { utils, writeFile, read } from 'xlsx-js-style';
import axios from 'axios';
import CIPTable from './CIPTable';
import TreatmentTable from './TreatmentTable';
import ConsolidationTable from './ConsolidationTable';

export const generateHtmlString = (element: any) => ReactDOMServer.renderToStaticMarkup(element);

const excludedKeys = ['!cols', '!ref', '!fullref', '!merges', '!rows'];
const highlightedColumns = ['A', 'B', 'C', 'D', 'E', 'F', 'I'];
const wsDetails = ['K2', 'K3', 'K4'];
const excludedValues = [
  'CAPITAL IMPROVEMENT PLAN (CIP)',
  'System Name:',
  'Date:',
  'System ID No.:',
  'Service Connections:',
  'QTY',
  'COMPONENT',
  'AVG',
  'LIFE,',
  'YEARS',
  'ANNUAL',
  'RESERVE',
  'Report Prepared by (Title): _________________________________________________________________',
  'Date: ________________________________',
  'NOTE: Installed costs are averages and include all materials and contracted labor and equipment.',
  'SUBTOTAL Existing CIP Costs',
  'SUBTOTAL New CIP Costs',
  'TOTAL Existing and New Project CIP',
  'NOTES:',
  'CONTAMINANT',
  'TREATMENT',
  'CAPITAL COST',
  'ANNUAL OPERATIONAL COST',
  'TOTAL Treatment Costs',
  'CONSOLIDATION COSTS',
  'TOTAL Material Cost',
  'TOTAL Administrative Fees',
  'TOTAL Adjustments',
  'CATEGORY'
];
const defaultFont = {
  font: {
    color: { rgb: '000000' },
    family: 2,
    name: 'Arial',
    sz: 12
  }
};
export const handleExcelExport = async (state: any, templateFileNode: any): Promise<void> => {
  const cipString = generateHtmlString(CIPTable(state));
  const treatmentString = generateHtmlString(TreatmentTable(state));
  const consolidationString = generateHtmlString(ConsolidationTable(state));

  const url = templateFileNode.publicURL as string;

  const test = await axios({
    method: 'GET',
    url,
    responseType: 'arraybuffer'
  });
  const data = new Uint8Array(test.data);
  const workbookTest = read(data, { type: 'array', cellStyles: true, cellNF: true }) as any;

  try {
    const elt1 = document.createElement('div');
    elt1.innerHTML = cipString;
    document.body.appendChild(elt1);
    const elt2 = document.createElement('div');
    elt2.innerHTML = treatmentString;
    document.body.appendChild(elt2);
    const elt3 = document.createElement('div');
    elt3.innerHTML = consolidationString;
    document.body.appendChild(elt3);

    /* generate worksheet */
    //const workbook = utils.table_to_book(elt, { sheet: 'CIP' });
    const workbook = utils.book_new();
    const sheet1 = utils.table_to_sheet(elt1, { sheet: 'CIP' });
    const sheet2 = utils.table_to_sheet(elt2, { sheet: 'Treatments' });
    const sheet3 = utils.table_to_sheet(elt3, { sheet: 'Consolidation' });

    utils.book_append_sheet(workbook, sheet1, 'CIP');
    utils.book_append_sheet(workbook, sheet2, 'Treatments');
    utils.book_append_sheet(workbook, sheet3, 'Consolidation');
    /* remove element */
    document.body.removeChild(elt1);
    document.body.removeChild(elt2);
    document.body.removeChild(elt3);

    const cipSheet = workbook.Sheets.CIP as Record<string, any>;
    const consolidationSheet = workbook.Sheets.Consolidation as Record<string, any>;
    const treatmentsSheet = workbook.Sheets.Treatments as Record<string, any>;
    //console.log('🚀 ~ handleExcelExport ~ cipSheet', cipSheet);

    const applyDefaultStyles = (sheet: Record<string, any>) => {
      console.log('🚀 ~ applyDefaultStyles ~ sheet', sheet);
      for (const key in sheet) {
        if (!excludedKeys.includes(key)) {
          sheet[key].s = defaultFont;
        }

        if (
          (highlightedColumns.includes(key.split('')[0]) &&
            !excludedValues.includes(sheet[key].v) &&
            sheet[key].t !== 'z') ||
          wsDetails.includes(key)
        ) {
          sheet[key].s = {
            ...defaultFont,
            fill: addHighlight()
            //border: addBorder()
          };
        }

        if (
          (['J', 'M'].includes(key.split('')[0]) &&
            !excludedValues.includes(sheet[key].v) &&
            sheet[key.replace('J', 'I')]?.t === 'z' &&
            [
              'TOTAL Existing and New Project CIP',
              'TOTAL Material Cost',
              'TOTAL Administrative Fees',
              'TOTAL Adjustments'
            ].includes(sheet[key.replace('J', 'B')]?.v)) ||
          (sheet[key.replace('M', 'L')]?.t === 'z' &&
            sheet[key.replace('M', 'A')]?.v === 'TOTAL Treatment Costs')
        ) {
          sheet[key].s = {
            ...defaultFont,
            fill: addHighlight('orange'),
            border: addBorder()
          };
        }

        if (key.split('')[0] === 'A' && sheet[key].v === 'NOTES:') {
          sheet[key].s = {
            ...defaultFont,
            //border: addBorder(),
            alignment: {
              vertical: 'top',
              horizontal: 'left'
            }
          };
        }
      }

      // cipSheet.J11.f = 'J10 + 1000';
    };
    applyDefaultStyles(cipSheet);

    console.log('wb', workbook);
    writeFile(workbook, `swsbudgetcalculator_${new Date().toLocaleDateString()}.xlsx`);
  } catch (error) {
    console.log(error);
  }
};

function addHighlight(color: 'orange' | 'yellow' = 'yellow') {
  if (color === 'orange') {
    return {
      bgColor: { rgb: 'FFBB99' },
      fgColor: { rgb: 'FFBB00' },
      patternType: 'solid'
    };
  }
  return {
    bgColor: { rgb: 'FFFF99' },
    fgColor: { rgb: 'FFFF00' },
    patternType: 'solid'
  };
}

function addBorder() {
  return {
    top: { style: 'thin' },
    bottom: { style: 'thin' },
    left: { style: 'thin' },
    right: { style: 'thin' }
  };
}
