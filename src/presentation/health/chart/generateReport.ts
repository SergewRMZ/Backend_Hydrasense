import { PDFDocument, StandardFonts } from "pdf-lib";
import { generateChart } from "./generateChart";
import fs from "fs";
import { Profile } from "@prisma/client";

export async function generateHealthReport(
  healthData: any[],
  profile: Profile,
  fileName: string
) {
  try {
    const chartImage = await generateChart(healthData);
    const pdfDoc = await PDFDocument.create();

    const page = pdfDoc.addPage([600, 800]);

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const logo = await pdfDoc.embedPng(fs.readFileSync("./public/logo.png"));
    const logoDimensions = logo.scale(0.1);
    page.drawImage(logo, {
      x: 50,
      y: 700,
      width: logoDimensions.width,
      height: logoDimensions.height,
    });

    const title = "Reporte de Salud - HYDRASENSE";
    page.drawText(title, { x: 150, y: 750, size: 24, font: fontBold });

    // Añadir información del usuario
    const nombre = profile.name;
    const lastname = profile.lastname;
    page.drawText("Información del usuario: ", { x: 75, y: 700, size: 16, font: fontBold });
    page.drawText("Nombre de usuario: " + nombre + " " + lastname, {
      x: 75,
      y: 680,
      size: 14,
      font,
    });

    const gender = profile.gender;
    const weight = profile.weight;
    const height = profile.height;
    const edad = profile.birthdate;
    page.drawText("Género: " + gender, { x: 75, y: 660, size: 14, font });
    page.drawText("Peso: " + weight, { x: 75, y: 640, size: 14, font })
    page.drawText("Altura: " + height + " cm", { x: 75, y: 620, size: 14, font })

    // Añadir gráfica
    const chartImageEmbed = await pdfDoc.embedJpg(chartImage);
    const chartDimensions = chartImageEmbed.scale(0.5);
    page.drawImage(chartImageEmbed, {
      x: 100,
      y: 250,
      width: chartDimensions.width,
      height: chartDimensions.height,
    });

    // Guardar el archivo PDF
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(fileName, pdfBytes);

    return fileName;
  } catch (error) {
    console.error(error);
  }
}
