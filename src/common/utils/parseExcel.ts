import XLSX from 'xlsx';
import { Row } from './groupParent.js';
export function parseExcel(filePath: string): Row[] {
  const workbook = XLSX.readFile(filePath);

  const sheetName = workbook.SheetNames[0]!;
  const sheet = workbook.Sheets[sheetName]!;

  const data = XLSX.utils.sheet_to_json(sheet, {
    defval: null,
  }) as Row[];

  return data;
}
