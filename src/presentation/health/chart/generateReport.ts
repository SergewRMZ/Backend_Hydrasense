import { PDFDocument, StandardFonts } from 'pdf-lib';
import { generateChart } from './generateChart';
import fs from 'fs';

export async function generateHealthReport(healthData: any[], fileName: string) {
  const chartImage = await generateChart(healthData);
  // Crear un nuevo documento PDF
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const title = 'Reporte de Salud - Temperatura e Hidratación';
  page.drawText(title, { x: 50, y: 750, size: 24, font });
  const chartImageEmbed = await pdfDoc.embedJpg(chartImage);
  const chartDimensions = chartImageEmbed.scale(0.5);
  page.drawImage(chartImageEmbed, { x: 50, y: 350, width: chartDimensions.width, height: chartDimensions.height });
  
  // Añadir más información si es necesario (por ejemplo, datos adicionales)
  const text = 'Este es el reporte de mediciones de temperatura e hidratación.';
  page.drawText(text, { x: 50, y: 320, size: 12, font });
  
  // Guardar el archivo PDF
  const pdfBytes = await pdfDoc.save();
  try {
    fs.writeFileSync(fileName, pdfBytes);
  } catch (error) {
    console.error(error);
  }

  return fileName;
}
