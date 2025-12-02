# Testing-ContinuoSIASIS

Proyecto personal de testing continuo con CI/CD enfocado en la detección temprana de errores de FrontEnd.

## Descripción

Este repositorio contiene pruebas automatizadas para el sistema SIASIS, utilizando Cucumber y Playwright. El objetivo es validar funcionalidades clave del sistema, asegurando la calidad y estabilidad en cada despliegue.

## Estructura del proyecto

```
├── src
│   ├── resources
│   │   └── features
│   │       ├── login
│   │       │   ├── login-happy-path.feature
│   │       │   └── login-unhappy-path.feature
│   │       ├── rol-directivo
│   │       │   └── consulta-auxiliares.feature
│   │       ├── rol-profesor-secundaria-tutor
│   │       │   └── edicion-datos-personales-SI-tutor.feature
│   │       └── ...
│   ├── test
│   │   ├── steps
│   │   ├── pages
│   │   ├── locators
│   │   └── utiles
├── target
│   ├── cucumber-report.json
│   └── cucumber-report.html
├── playwright.env
├── playwright.config.ts
├── package.json
```

## Principales tecnologías

- **Cucumber**: Para pruebas BDD y definición de escenarios en archivos `.feature`.
- **Playwright**: Para automatización de la interfaz web y validaciones.
- **Node.js**: Entorno de ejecución.
- **GitHub Actions**: Integración continua y ejecución automática de pruebas.

## Ejecución de pruebas

1. **Instalación de dependencias**
	```bash
	npm install
	```

2. **Ejecución de escenarios por tag**
	```bash
	npm test -- --tags="@Escenario01"
	```

3. **Generación de reporte HTML**
	El reporte se genera automáticamente en `target/cucumber-report.json`.  
	Para convertirlo a HTML:
	```bash
	npm run report
	```
	El archivo estará en `target/cucumber-report.html`.

## Variables de entorno

Las credenciales y configuraciones sensibles se almacenan en el archivo `playwright.env`.

## Integración continua

El proyecto incluye workflows de GitHub Actions para ejecutar pruebas automáticamente en cada push y en horarios programados.

## Autor

QA Automation SSr Yrvin Pachas

---

¿Quieres agregar instrucciones específicas para nuevos escenarios, configuración de roles o detalles sobre los hooks y utilidades?


