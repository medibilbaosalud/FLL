declare module "jspdf-autotable" {
  import type { jsPDF } from "jspdf";
  interface AutoTableOptions {
    startY?: number;
    head?: Array<Array<string>>;
    body?: Array<Array<string | number>>;
  }
  export default function autoTable(doc: jsPDF, options: AutoTableOptions): jsPDF;
}
