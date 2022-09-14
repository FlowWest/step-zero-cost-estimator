import { read, utils, writeFile } from 'xlsx';
import axios from 'axios';

export const handleExcelExport = async (state: any, templateFileNode: Record<string, unknown>) => {
  const url = templateFileNode.publicURL as string;

  try {
    const test = await axios({
      method: 'GET',
      url,
      responseType: 'arraybuffer'
    });
    const data = new Uint8Array(test.data);
    const workbook = read(data, { cellStyles: true });

    console.log('wb', workbook);

    writeFile(workbook, 'test_excel.xlsx');
  } catch (error) {}
};
