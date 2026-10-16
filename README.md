# DevCard | Tarjeta Interactiva para Desarrolladores

**DevCard** es una tarjeta de presentación personalizable e interactiva para desarrolladores, diseñada con estética de terminal moderna y neofetch. Ofrece una experiencia visual cuidada, soporte para temas (oscuro/claro), terminal interactiva con ejecución de comandos y un único archivo de configuración para personalizar todo el perfil.

## Tecnologías Elegidas y Justificación

- **React 19**: Proporciona una arquitectura declarativa ideal para gestionar el estado de la terminal interactiva, el historial de comandos y el cambio de tema visual sin complejidad innecesaria.
- **Vite**: Empaquetador ultra rápido que facilita el desarrollo local, recarga rápida (HMR) y compilación optimizada con la configuración `base: './'` recomendada para GitHub Pages.
- **TypeScript**: Añade tipado estático estricto para garantizar que los datos del perfil tengan la estructura correcta y evitar errores en tiempo de ejecución al omitir campos opcionales.
- **Tailwind CSS v4**: Permite construir interfaces inspiradas en terminales mediante utilidades CSS modernas y variables CSS nativas para la conmutación fluida entre temas visuales.
- **Vitest & React Testing Library**: Conjunto de pruebas unitarias ligeras y rápidas para verificar la lógica del analizador de comandos de la terminal y el renderizado correcto de los componentes.
- **Lucide React & Iconos SVG Personalizados**: Iconografía técnica coherente y accesible.

---

## Estructura del Proyecto 

```text
devcard/
├── .github/
│   └── workflows/
│       └── deploy.yml        # Flujo de trabajo CI/CD para publicar en GitHub Pages
├── src/
│   ├── components/
│   │   ├── BrandIcons.tsx    # Iconos SVG nativos para marcas y redes sociales
│   │   ├── InteractiveTerminal.tsx # Componente de la terminal interactiva integrada
│   │   ├── MainSections.test.tsx    # Pruebas de integración de componentes
│   │   ├── NeofetchCard.tsx  # Bloque de perfil técnico estilo neofetch
│   │   ├── ProjectsSection.tsx      # Galería de proyectos destacados
│   │   ├── SkillsSection.tsx        # Grid de tecnologías por categoría
│   │   ├── StatsAndContact.tsx      # Métricas y tarjetas de redes sociales
│   │   ├── TerminalHeader.tsx       # Barra superior estilo ventana de terminal
│   │   └── TerminalHeaderAndNeofetch.test.tsx # Pruebas unitarias
│   ├── data/
│   │   ├── profile.ts        # ARCHIVO CENTRAL DE CONFIGURACIÓN DEL PERFIL
│   │   └── profile.test.ts   # Pruebas de integridad de datos del perfil
│   ├── test/
│   │   └── setup.ts          # Configuración inicial para Vitest y jsdom
│   ├── utils/
│   │   ├── terminalEngine.ts # Motor del analizador de comandos de la terminal
│   │   └── terminalEngine.test.ts # Pruebas unitarias del motor CLI
│   ├── App.tsx               # Componente principal de la aplicación
│   ├── index.css             # Estilos globales y variables de tema CSS
│   └── main.tsx              # Punto de entrada de React
├── index.html                # Plantilla HTML con idioma castellano (lang="es")
├── package.json              # Scripts y dependencias
├── vite.config.ts            # Configuración de Vite y Vitest
└── README.md                 # Documentación del proyecto
```

---

## Instalación y Ejecución Local

### Requisitos previos
- **Node.js**: v18 o superior
- **npm**: v9 o superior

### Pasos

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/devcard.git
   cd devcard
   ```

2. Instalar las dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## Cómo Personalizar tu Perfil

Toda la información de la tarjeta está centralizada en el archivo:
**`src/data/profile.ts`**

Para adaptar la tarjeta a tu identidad:

1. Abre `src/data/profile.ts`.
2. Edita los campos del objeto `defaultProfile`:
   - `name`: Tu nombre completo o profesional.
   - `handle`: Tu nombre de usuario (ej. `tu_usuario`).
   - `role`: Tu rol profesional o especialidad.
   - `bio`: Breve biografía personal.
   - `location`: Ubicación (opcional).
   - `avatarUrl`: Enlace a tu imagen de avatar (opcional).
   - `email`: Tu correo de contacto (opcional).
   - `systemSpecs`: Especificaciones decorativas de tu entorno (SO, Shell, Uptime, etc.).
   - `socialLinks`: Array con tus enlaces a GitHub, LinkedIn, Twitter/X, Portfolio, etc.
   - `skillCategories`: Tecnologías agrupadas por categorías.
   - `projects`: Lista de tus proyectos con descripción, tags, repositorio y enlace demo.
   - `stats`: Cifras y métricas relevantes de tu perfil.

Si se omite cualquier campo opcional (como `email` o `location`), la aplicación seguirá funcionando de manera fluida sin mostrar espacios en blanco.

---

## Ejecución de Pruebas Unitarias

El proyecto incluye un conjunto de pruebas automatizadas con Vitest:

```bash
# Ejecutar todas las pruebas una vez
npm test

# Ejecutar las pruebas en modo observador (watch mode)
npx vitest
```

---

## Limitaciones Conocidas

- La terminal integrada es un simulador interactivo para la presentación del perfil y no ejecuta comandos reales del sistema operativo ni acceso a shells remotas.
- Las cifras mostradas en las estadísticas son estáticas y configurables desde `src/data/profile.ts`. No requieren ni dependen de tokens privados de APIs externas.

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo [LICENSE](./LICENSE) para obtener más detalles.
