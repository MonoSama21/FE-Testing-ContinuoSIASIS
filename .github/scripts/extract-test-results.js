const fs = require('fs');

// Leer el archivo HTML del reporte de forma eficiente (sin parsear todo el DOM)
const htmlContent = fs.readFileSync('target/cucumber-report.html', 'utf-8');

// Usar expresiones regulares para extraer escenarios (más eficiente que JSDOM)
const scenarioRegex = /<b>Scenario:<\/b><div class="ellipsis" data-text="([^"]+)">.*?<span class="label label-(\w+)"/gs;
const matches = [...htmlContent.matchAll(scenarioRegex)];

console.log(`📊 Escenarios encontrados: ${matches.length}`);

let tableRows = '';
let totalPassed = 0;
let totalFailed = 0;
let totalPending = 0;

const scenarios = [];

matches.forEach((match, index) => {
  const scenarioName = match[1]; // Nombre del escenario desde data-text
  const labelClass = match[2]; // success, danger, warning
  
  console.log(`  [${index + 1}] ${scenarioName} -> ${labelClass}`);
  
  // Buscar si tiene label-danger en ese bloque de escenario
  const scenarioBlock = match[0];
  const hasDanger = scenarioBlock.includes('label-danger');
  const hasWarning = scenarioBlock.includes('label-warning');
  const hasSuccess = scenarioBlock.includes('label-success');
  
  let status = '';
  let statusColor = '';
  let statusIcon = '';
  
  if (hasDanger) {
    status = 'FAILED';
    statusColor = '#dc3545';
    statusIcon = '❌';
    totalFailed++;
  } else if (hasWarning && !hasSuccess) {
    status = 'PENDING';
    statusColor = '#ffc107';
    statusIcon = '⏸️';
    totalPending++;
  } else if (hasSuccess) {
    status = 'PASSED';
    statusColor = '#28a745';
    statusIcon = '✅';
    totalPassed++;
  } else {
    status = 'UNKNOWN';
    statusColor = '#6c757d';
    statusIcon = '❓';
  }
  
  scenarios.push({ name: scenarioName, status, statusColor, statusIcon });
  
  tableRows += `
    <tr>
      <td style="padding: 12px; border: 1px solid #ddd; text-align: left;">${scenarioName}</td>
      <td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: ${statusColor}; font-weight: bold;">
        ${statusIcon} ${status}
      </td>
    </tr>
  `;
});

// Crear el HTML de la tabla completa
const tableHtml = `
<div style="margin: 20px 0;">
  <h3 style="color: #333;">📋 Resultados de Ejecución</h3>
  
  <div style="display: flex; gap: 10px; margin-bottom: 15px;">
    <span style="padding: 8px 15px; background: #d4edda; color: #155724; border-radius: 4px; font-weight: bold;">
      ✅ Passed: ${totalPassed}
    </span>
    <span style="padding: 8px 15px; background: #f8d7da; color: #721c24; border-radius: 4px; font-weight: bold;">
      ❌ Failed: ${totalFailed}
    </span>
    <span style="padding: 8px 15px; background: #fff3cd; color: #856404; border-radius: 4px; font-weight: bold;">
      ⏸️ Pending: ${totalPending}
    </span>
  </div>
  
  <table style="width: 100%; border-collapse: collapse; margin-top: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <thead>
      <tr style="background: #f8f9fa;">
        <th style="padding: 12px; border: 1px solid #ddd; text-align: left; font-weight: bold;">Caso de Prueba</th>
        <th style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: bold;">Estado</th>
      </tr>
    </thead>
    <tbody>
      ${tableRows}
    </tbody>
  </table>
</div>
`;

// Guardar la tabla HTML para el correo
fs.writeFileSync('test-results-table.html', tableHtml);

// Crear tabla en formato Markdown para GitHub Actions Summary
let markdownTable = `## 📊 Resultados de Ejecución

### Resumen
- ✅ **Passed:** ${totalPassed}
- ❌ **Failed:** ${totalFailed}
- ⏸️ **Pending:** ${totalPending}
- 📦 **Total:** ${totalPassed + totalFailed + totalPending}

### Detalle de Casos de Prueba

| Caso de Prueba | Estado |
|----------------|--------|
`;

// Recrear las filas en formato Markdown
scenarios.forEach(scenario => {
  markdownTable += `| ${scenario.name} | ${scenario.statusIcon} ${scenario.status} |\n`;
});

// Guardar la tabla Markdown
fs.writeFileSync('test-results-summary.md', markdownTable);

console.log('\n✅ Tabla de resultados generada exitosamente');
console.log(`📊 Total: ${totalPassed + totalFailed + totalPending} escenarios`);
console.log(`   ✅ Passed: ${totalPassed}`);
console.log(`   ❌ Failed: ${totalFailed}`);
console.log(`   ⏸️ Pending: ${totalPending}`);

// Si no se encontraron escenarios, mostrar advertencia
if (totalPassed + totalFailed + totalPending === 0) {
  console.log('\n⚠️ ADVERTENCIA: No se encontraron escenarios en el reporte HTML');
  console.log('   Verifica que target/cucumber-report.html se haya generado correctamente');
}
