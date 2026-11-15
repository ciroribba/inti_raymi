# ☀️ INTI-RAYMI: Sonidos del Sol Eterno (2026)

> **Festival Conceptual de Música Electrónica de Alta Gama en las Cumbres de Los Andes**  
> *Inspirado fielmente en la estética de alto impacto visual, tipografías audaces, atmósfera oscura, acentos neón y micro-interacciones inmersivas de [landonorris.com](https://landonorris.com).*

---

## 🏔️ 1. Concepto y Arquitectura de Experiencia

**INTI-RAYMI** es una experiencia conceptual de festival de música electrónica situada a **3,820 metros sobre el nivel del mar** en el Valle Sagrado de la Puna andina durante el Solsticio de Invierno.

### 🏛️ Los 3 Escenarios Simultáneos:
1. **INTI STAGE (Temple of Sol):** Peak Time & Raw Industrial Techno (134–144 BPM). Estructura piramidal con sistema *Funktion-One Vero 360°* (320,000 W RMS) y halo láser cinético.
2. **PACHA STAGE (Sanctuary of Earth):** Melodic House & Techno Journey (122–128 BPM). Encastrado en roca volcánica con acústica espacial *L-Acoustics K2*.
3. **KOLLA STAGE (Valley of the Winds):** Organic House, Andean Folktronica & Downtempo (98–118 BPM). Domos geodésicos calefaccionados, fuego ritual y sintetizadores modulares analógicos con sonido *d&b audiotechnik SL-Series*.

### 📅 Las 3 Noches:
* **Noche I (Viernes 19 Junio):** *El Despertar del Sol* (Amelie Lens, Stephan Bodzin Live, Nicola Cruz).
* **Noche II (Sábado 20 Junio):** *Kusikuy: La Noche del Solsticio* (Reinier Zonneveld Live Marathon, Tale of Us, Indira Paganotto, Satori Live).
* **Noche III (Domingo 21 Junio):** *Chaska: Comunión Estelar* (Boris Brejcha, Charlotte de Witte, Adriatique, Acid Pauli).

---

## ⚡ 2. Decisiones de Diseño & UI/UX (Inspiración Lando Norris)

* **Paleta Cromática de Alto Contraste:**
  * Fondo Dominante: Negro Obsidiana Profundo (`#050507`, `#0a0a10`, `#0d0d14`).
  * Acento Solar Primario: Verde Lima Ácido / Electric Acid Neon (`#d9ff00` / `#ccff00`).
  * Acentos Secundarios Andinos: Cian Glaciar (`#00f5d4`) y Fuego Solar (`#ff4a11`).
* **Tipografía Híbrida Brutalista & Editorial:**
  * **Titulares:** `Syne` (Black 900) con tracking ultracondensado y proporciones monumentales.
  * **Subtítulos y Acentos Poéticos:** `Cormorant Garamond` (Italic) para balancear la agresividad técnica con elegancia orgánica.
  * **Telemetría y Métricas:** `Space Grotesk` y `JetBrains Mono` para coordenadas geográficas, altitud, BPM y tickers.
* **Micro-interacciones y Animaciones Fluidas:**
  * Cursor cinético magnético con estela fluorescente y detección de botones / tarjetas.
  * Capa de grano de película cinematográfica (*Film Noise Texture*) mediante SVG turbulence filter.
  * Ticker infinito (*Marquee*) con nombres de DJs, especificaciones de sonido y telemetría.
  * Sintetizador de audio en tiempo real mediante **Web Audio API** (sub-bass drop en compras, clics cinéticos y conmutador de ambiente en el navbar).
  * Tarjetas de artistas estilo *Hall of Fame* con zoom dinámico, ecualizador simulado y modal de dossier expandido.

---

## 🎟️ 3. Sistema de Entradas & Pasarela de Pagos (Checkout)

* **Tipos de Pases Disponibles:**
  * **Pases por Pista y Noche Individual** (ej. Noche 1 - Inti Stage, $55 USD).
  * **Pases por Día Completo** (Acceso irrestricto a los 3 escenarios por noche, $110 USD).
  * **Festival Full Pass 3 Noches** (Best Value, $245 USD).
  * **INTI VIP Solar Pass** (All Access, Backstage, domos térmicos, barra libre y helicóptero/shuttle transfer, $490 USD).
* **Control de Stock Dinámico & Urgencia Visual:**
  * Indicadores de cupos disponibles en tiempo real con barras de progreso animadas (*"Últimos 14 cupos"*, *"88% vendido"*).
* **Banner de Oferta Relámpago (Flash Sale):**
  * Cronómetro regresivo en vivo con milisegundos (`Horas : Minutos : Segundos : MS`).
  * Cupón de descuento interactivo copiable en un clic: **`SOL2026`** (25% OFF).
* **Modal de Pago / Checkout de Alta Fidelidad:**
  * Tarjeta de crédito/débito interactiva con renderizado dinámico en tiempo real (detección automática de emisor Visa, Mastercard o Amex, formato 4-4-4-4 y fecha de expiración).
  * Validación robusta de formularios mediante **Zod** y **React Hook Form**.
  * Pipeline de procesamiento bancario simulado con cifrado SSL.
  * Pantalla de confirmación con **animación de confeti (`canvas-confetti`)**, generación de **Pase Digital con Código QR dinámico** y comprobante descargable.

---

## 🛠️ 4. Estructura del Código

```text
inti-raymi/
├── index.html                   # HTML base, fuentes de Google (Syne, Cormorant, JetBrains, Space Grotesk)
├── vite.config.ts               # Configuración de Vite con Tailwind v4 y Rollup manualChunks
├── package.json                 # React 19, Framer Motion, Tailwind v4, Lucide, Zod, React Hook Form
├── tsconfig.json                # TypeScript project references
├── src/
│   ├── types/
│   │   └── index.ts             # Interfaces TypeScript (DJs, Stages, Tickets, Checkout, Orders)
│   ├── data/
│   │   └── festivalData.ts      # Dataset completo de las 3 noches, 3 escenarios, 18 DJs y tickets
│   ├── hooks/
│   │   ├── useFlashSale.ts      # Hook de cuenta regresiva con cálculo de milisegundos y stock
│   │   └── useSoundEffect.ts    # Sintetizador Web Audio API para feedback sonoro de la UI
│   ├── context/
│   │   └── FestivalContext.tsx  # Estado global de carrito, filtros de noches/pistas y modales
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # Barra de navegación flotante con vúmetro y botón de entradas
│   │   │   ├── Footer.tsx       # Pie de página con telemetría andina, newsletter y coordenadas
│   │   │   ├── CustomCursor.tsx # Cursor magnético neón fluido
│   │   │   └── NoiseOverlay.tsx # Overlay de grano cinematográfico
│   │   ├── home/
│   │   │   ├── HeroSection.tsx  # Portada con tipografía monumental, badges y ticker continuo
│   │   │   ├── FlashSaleBanner.tsx # Banner interactivo de oferta relámpago con timer
│   │   │   ├── LineupGrid.tsx   # Grilla de artistas interactiva con filtros por noche y escenario
│   │   │   ├── FestivalExperience.tsx # Desglose arquitectónico de las 3 pistas y lore andino
│   │   │   └── FaqSection.tsx   # Preguntas frecuentes con acordeón dinámico
│   │   ├── tickets/
│   │   │   └── TicketSelector.tsx # Selector interactivo de tickets con cupos en vivo y cantidad
│   │   ├── checkout/
│   │   │   └── CheckoutModal.tsx # Pasarela de pago con validación Zod, tarjeta 3D y pase QR
│   │   └── dj/
│   │       └── DJModal.tsx      # Modal de dossier del artista con reproductor de audio simulado
│   ├── App.tsx                  # Integración del layout principal
│   ├── main.tsx                 # Entrada de montaje de React 19
│   └── index.css                # Tailwind CSS v4, animaciones cinéticas y estilos de badges
```

---

## 🚀 5. Scripts de Ejecución

Para iniciar el servidor de desarrollo local:
```bash
cd inti-raymi
pnpm dev
# o con npm:
npm run dev
```

Para generar la compilación estática optimizada para producción:
```bash
npm run build
```

Para previsualizar la compilación de producción:
```bash
npm run preview
```

