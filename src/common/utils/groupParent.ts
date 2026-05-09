import { generatePassword } from './token.js';

export interface Row {
  parent_name: string;
  parent_phone: string;
  parent_email: string;
  child_name: string;
  child_class: string;
  admission_number: string;
}
interface Children {
  name: string;
  class: string;
  admissionNumber: string;
}
export interface GroupedRecord {
  parent: {
    name: string;
    phone: string;
    email: string;
    password: string;
  };
  children: Children[];
}

export function groupByParent(rows: Row[]): GroupedRecord[] {
  const grouped: Record<string, GroupedRecord> = {};

  rows.forEach((row: Row, index: number) => {
    const key = row.parent_email || row.parent_phone;

    if (!key) {
      throw new Error('Parent must have email or phone');
    }
    if (!grouped[key]) {
      grouped[key] = {
        parent: {
          name: row.parent_name?.trim(),
          phone: row.parent_phone?.trim(),
          email: row.parent_email?.trim(),
          password: generatePassword(),
        },
        children: [],
      };
    }

    grouped[key].children.push({
      name: row.child_name?.trim(),
      class: row.child_class?.trim(),
      admissionNumber: row.admission_number?.trim(),
    });
  });

  return Object.values(grouped);
}
