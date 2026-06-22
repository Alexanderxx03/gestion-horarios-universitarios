import fs from 'fs';
import path from 'path';
import * as chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runLighthouse() {
  const url = 'http://localhost:5173';
  const opts = {
    chromeFlags: ['--headless', '--no-sandbox'],
    output: 'html',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  };

  console.log(`🚀 Iniciando auditoría Lighthouse para ${url}...`);
  console.log('⚠️ Asegúrate de que el servidor frontend (npm run dev) esté en ejecución.');

  let chrome;
  try {
    chrome = await chromeLauncher.launch({ chromeFlags: opts.chromeFlags });
    opts.port = chrome.port;

    const runnerResult = await lighthouse(url, opts);

    const reportHtml = runnerResult.report;

    // Ruta de guardado: docs/Pruebas/capturas/
    const outDir = path.resolve(__dirname, '../../docs/Pruebas/capturas');
    
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    const reportPath = path.join(outDir, 'Lighthouse_Report_Local.html');
    fs.writeFileSync(reportPath, reportHtml);

    console.log(`✅ Reporte HTML guardado exitosamente en: ${reportPath}`);
    
    console.log('📊 Resumen de Puntajes:');
    for (const cat in runnerResult.lhr.categories) {
      const score = Math.round(runnerResult.lhr.categories[cat].score * 100);
      console.log(` - ${runnerResult.lhr.categories[cat].title}: ${score}/100`);
    }

  } catch (error) {
    console.error('❌ Error ejecutando Lighthouse:', error);
  } finally {
    if (chrome) {
      await chrome.kill();
    }
  }
}

runLighthouse();
