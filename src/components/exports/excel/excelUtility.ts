import { read, utils, writeFile } from 'xlsx-js-style';
import axios from 'axios';
import { values } from 'lodash';
import { useStaticQuery, graphql } from 'gatsby';

export const handleExcelExport = async (state: any, templateFileNode: Record<string, unknown>) => {
  const url = templateFileNode.publicURL as string;

  const queryResponse = useStaticQuery(
    graphql`
      query {
        allFile(filter: { name: { eq: "export_template" } }) {
          edges {
            node {
              extension
              dir
              modifiedTime
              name
              sourceInstanceName
              publicURL
            }
          }
        }
      }
    `
  );

  try {
    const test = await axios({
      method: 'GET',
      url,
      responseType: 'arraybuffer'
    });
    const data = new Uint8Array(test.data);
    const workbook = read(data, { type: 'array', cellStyles: true, cellNF: true }) as any;

    console.log('wb', workbook);
    Object.keys(workbook.Sheets.CIP).forEach((address: any) => {
      const cell = workbook.Sheets.CIP[address];
      if (cell.s?.bgColor) {
        cell.s.fill = {
          fgColor: cell.s.fgColor,
          bgColor: cell.s.bgColor
        };
      }

      if (address === 'D4') {
        cell.s.border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        };
      }
    });

    writeFile(workbook, 'test_excel.xlsx');
  } catch (error) {}
};
