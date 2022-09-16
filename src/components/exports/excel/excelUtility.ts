import { utils, writeFile, read } from 'xlsx-js-style';
import axios from 'axios';
import { ExcelTable, generateHtmlString } from './ExcelTable';

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
  'NOTES:'
];
const defaultFont = {
  font: {
    color: { rgb: '000000' },
    family: 2,
    name: 'Arial',
    sz: 12
  }
};
export const handleExcelExport = async (state: any, templateFileNode: any) => {
  const htmlString = generateHtmlString(ExcelTable(state));
  console.log('🚀 ~ handleExcelExportV2 ~ htmlString', htmlString);
  console.log('🚀 ~ handleExcelExportV2 ~ state', state);

  const url = templateFileNode.publicURL as string;

  const test = await axios({
    method: 'GET',
    url,
    responseType: 'arraybuffer'
  });
  const data = new Uint8Array(test.data);
  const workbookTest = read(data, { type: 'array', cellStyles: true, cellNF: true }) as any;

  console.log('wbt', workbookTest);

  try {
    const elt = document.createElement('div');
    elt.innerHTML = htmlString;
    document.body.appendChild(elt);

    /* generate worksheet */
    const workbook = utils.table_to_book(elt, { sheet: 'CIP' });

    /* remove element */
    document.body.removeChild(elt);

    const cipSheet = workbook.Sheets.CIP as Record<string, any>;
    console.log('🚀 ~ handleExcelExport ~ cipSheet', cipSheet);

    const applyDefaultStyles = (sheet: Record<string, any>) => {
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
          key.split('')[0] === 'J' &&
          !excludedValues.includes(sheet[key].v) &&
          sheet[key.replace('J', 'I')].t === 'z' &&
          sheet[key.replace('J', 'B')].v !== 'TOTAL Existing and New Project CIP'
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
