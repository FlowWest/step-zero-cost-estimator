import { utils, writeFile, read } from 'xlsx-js-style';
import axios from 'axios';
import { ExcelTable, generateHtmlString } from './ExcelTable';

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

    // cipSheet['!merges'] = [
    //   {
    //     s: { c: 1, r: 3 },
    //     e: { c: 2, r: 3 }
    //   },
    //   {
    //     s: { c: 3, r: 3 },
    //     e: { c: 6, r: 3 }
    //   }
    // ];

    cipSheet.B1.s = {
      ...cipSheet.B1.s,
      font: {
        color: { rgb: '000000' },
        family: 2,
        name: 'Arial',
        sz: 14
      }
    };
    console.log('wb', workbook);
    addSystemNameStyling(cipSheet);
    console.log('wb', workbook);
    writeFile(workbook, `swsbudgetcalculator_${new Date().toLocaleDateString()}.xlsx`);
  } catch (error) {
    console.log(error);
  }
};

const addHighlight = () => {
  return {
    bgColor: { rgb: 'FFFF99' },
    fgColor: { rgb: 'FFFF00' },
    patternType: 'solid'
  };
};

const addBorder = () => {
  return {
    top: { style: 'thin' },
    bottom: { style: 'thin' },
    left: { style: 'thin' },
    right: { style: 'thin' }
  };
};

const addSystemNameStyling = (cipSheet: any) => {
  const cells = ['D4', 'E4', 'F4', 'G4'];
  cells.forEach((cell) => {
    if (cipSheet[cell]) {
      cipSheet[cell].s = {
        fill: addHighlight(),
        border: addBorder()
      };
    } else {
      cipSheet[cell] = {
        s: {
          fill: addHighlight(),
          border: addBorder()
        }
      };
    }
  });
};
