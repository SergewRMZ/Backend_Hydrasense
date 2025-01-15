import 'chartjs-adapter-date-fns';
import { ChartConfiguration } from 'chart.js';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
export async function generateChart(healthData: any[]) {
  const width = 800;
  const height = 600;
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour: 'white' });
  const labels = healthData.map((data) => new Date(data.timestamp));
  const temperatureData = healthData.map((data) => data.temperature);
  const hydrationData = healthData.map((data) => data.hydration);

  const configuration: ChartConfiguration = {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Temperatura (°C)',
          data: temperatureData,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 2,
          fill: false,
          tension: 0.1,
        },
        {
          label: 'Hidratación (%)',
          data: hydrationData,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 2,
          fill: false,
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Temperatura e Hidratación a lo Largo del Tiempo',
        },
        legend: {
          position: 'top',
        },
      },

      scales: {
        x: {
          type: 'time',  // ⏰ Escala de tiempo
          time: {
            unit: 'minute',            
            tooltipFormat: 'dd/MM/yyyy HH:mm:ss', 
            displayFormats: {
              minute: 'HH:mm:ss', 
            },
          },
          title: {
            display: true,
            text: 'Tiempo',
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Valor',
          },
        },
      },
    },
  };

  try {
    const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration, 'image/jpeg');
    //console.log('Buffer:', imageBuffer);
    return imageBuffer;
  } catch (error) {
    console.error('Error al generar el gráfico: ', error);
    throw error;
  }
}
