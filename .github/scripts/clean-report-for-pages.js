const fs = require('fs');

console.log('🧹 Limpiando videos embebidos del reporte HTML para GitHub Pages...');

// Leer el reporte HTML
let htmlContent = fs.readFileSync('target/cucumber-report.html', 'utf-8');

console.log(`📏 Tamaño original: ${(htmlContent.length / 1024 / 1024).toFixed(2)} MB`);

// Remover todos los videos embebidos en base64
// Buscar y eliminar los divs de video que contienen data:video/webm;base64
htmlContent = htmlContent.replace(/<div style="margin: 20px 0;[^"]*">[\s\S]*?<video controls[\s\S]*?<\/video>[\s\S]*?<\/div>/g, 
  '<div style="padding: 15px; background: #fff3cd; border-left: 4px solid #ffc107; margin: 10px 0;"><p>🎥 Video disponible en los artefactos de GitHub Actions</p></div>');

console.log(`📏 Tamaño después de limpiar: ${(htmlContent.length / 1024 / 1024).toFixed(2)} MB`);

// Guardar la versión limpia
fs.writeFileSync('target/cucumber-report-clean.html', htmlContent);

console.log('✅ Reporte limpio generado: cucumber-report-clean.html');
