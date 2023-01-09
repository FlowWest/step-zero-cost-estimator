import ReactDOMServer from 'react-dom/server';
import { utils, writeFile, read } from 'xlsx-js-style';
import axios from 'axios';
import CIPTable from './CIPTable';
import TreatmentTable from './TreatmentTable';
import ConsolidationTable from './ConsolidationTable';

export const generateHtmlString = (element: any) => ReactDOMServer.renderToStaticMarkup(element);

const excludedKeys = ['!cols', '!ref', '!fullref', '!merges', '!rows'];
const highlightedColumns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'I'];
const wsDetails = ['K2', 'K3', 'K4'];
const excludedValues = [
  'CAPITAL IMPROVEMENT PLAN (CIP)',
  'System Name:',
  'Date:',
  'System ID No.:',
  'Service Connections:',
  'QTY',
  'COMPONENT',
  'UNIT',
  'COST',
  'AVG',
  'LIFE,',
  'YEARS',
  'ANNUAL',
  'MONTHLY',
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
  'TOTAL Consolidation Costs',
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
    const cipElement = document.createElement('div');
    cipElement.innerHTML = cipString;
    document.body.appendChild(cipElement);
    const treatmentElement = document.createElement('div');
    treatmentElement.innerHTML = treatmentString;
    document.body.appendChild(treatmentElement);
    const consolidationElement = document.createElement('div');
    consolidationElement.innerHTML = consolidationString;
    document.body.appendChild(consolidationElement);

    /* generate worksheet */
    //const workbook = utils.table_to_book(elt, { sheet: 'CIP' });
    const workbook = utils.book_new();
    const sheet1 = utils.table_to_sheet(cipElement, { sheet: 'CIP' });
    const sheet2 = utils.table_to_sheet(treatmentElement, { sheet: 'Treatments' });
    const sheet3 = utils.table_to_sheet(consolidationElement, { sheet: 'Consolidation' });

    utils.book_append_sheet(workbook, sheet1, 'CIP');
    utils.book_append_sheet(workbook, sheet2, 'Treatments');
    utils.book_append_sheet(workbook, sheet3, 'Consolidation');
    /* remove element */
    document.body.removeChild(cipElement);
    document.body.removeChild(treatmentElement);
    document.body.removeChild(consolidationElement);

    const cipSheet = workbook.Sheets.CIP as Record<string, any>;
    const consolidationSheet = workbook.Sheets.Consolidation as Record<string, any>;
    const treatmentsSheet = workbook.Sheets.Treatments as Record<string, any>;
    //console.log('🚀 ~ handleExcelExport ~ cipSheet', cipSheet);

    const applyCIPStyles = (sheet: Record<string, any>) => {
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
            fill: addHighlight(),
            border: addBorder()
          };
        }

        if (
          key.split('')[0] === 'J' &&
          !excludedValues.includes(sheet[key].v) &&
          sheet[key.replace('J', 'I')]?.t === 'z' &&
          [
            'TOTAL Existing and New Project CIP',
            'TOTAL Material Cost',
            'TOTAL Administrative Fees',
            'TOTAL Adjustments',
            'SUBTOTAL Existing CIP Costs',
            'SUBTOTAL New CIP Costs'
          ].includes(sheet[key.replace('J', 'B')]?.v)
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
            border: addBorder(),
            alignment: {
              vertical: 'top',
              horizontal: 'left'
            }
          };
        }
      }

      // cipSheet.J11.f = 'J10 + 1000';
    };
    const applyTreatmentStyles = (sheet: Record<string, any>) => {
      console.log('🚀 ~ applyDefaultStyles ~ sheet', sheet);
      for (const key in sheet) {
        if (!excludedKeys.includes(key)) {
          sheet[key].s = defaultFont;
        }

        if (
          (['J', 'L'].includes(key.split('')[0]) &&
            !excludedValues.includes(sheet[key].v) &&
            sheet[key].t !== 'z') ||
          wsDetails.includes(key)
        ) {
          sheet[key].s = {
            ...defaultFont,
            fill: addHighlight(),
            border: addBorder()
          };
        }

        if (
          !excludedValues.includes(sheet[key].v) &&
          (sheet[key.replace('J', 'A')]?.v === 'TOTAL Treatment Costs' ||
            sheet[key.replace('L', 'A')]?.v === 'TOTAL Treatment Costs')
        ) {
          sheet[key].s = {
            ...defaultFont,
            fill: addHighlight('orange'),
            border: addBorder()
          };
        }
      }

      // cipSheet.J11.f = 'J10 + 1000';
    };
    const applyConsolidationStyles = (sheet: Record<string, any>) => {
      console.log('🚀 ~ applyDefaultStyles ~ sheet', sheet);
      for (const key in sheet) {
        if (!excludedKeys.includes(key)) {
          sheet[key].s = defaultFont;
        }

        // if (
        //   (highlightedColumns.includes(key.split('')[0]) &&
        //     !excludedValues.includes(sheet[key].v) &&
        //     sheet[key].t !== 'z') ||
        //   wsDetails.includes(key)
        // ) {
        //   sheet[key].s = {
        //     ...defaultFont,
        //     fill: addHighlight(),
        //     border: addBorder()
        //   };
        // }

        if (
          key.split('')[0] === 'J' &&
          !excludedValues.includes(sheet[key].v) &&
          (excludedValues.includes(sheet[key.replace('J', 'B')]?.v) ||
            sheet[key.replace('J', 'A')]?.v === 'TOTAL Consolidation Costs')
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
    applyCIPStyles(cipSheet);
    applyTreatmentStyles(treatmentsSheet);
    applyConsolidationStyles(consolidationSheet);

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
