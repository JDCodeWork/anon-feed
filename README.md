# 🛡️ AnonFeed Light — Feedback Rápido y Ético para Devs

Bienvenido al repositorio de **AnonFeed Light**, un prototipo funcional creado para brindar **feedback técnico anónimo, confiable y accesible** a desarrolladores. Diseñado para la hackatón, pero con una visión clara de crecimiento.

## 🌟 Visión

> "Hacer que recibir y dar feedback técnico sea tan accesible, confiable y rápido como enviar un mensaje en Slack."

---

## 🧩 ¿Qué problema resuelve?

Recibir comentarios útiles sobre un proyecto puede ser lento, sesgado o poco confiable. **AnonFeed Light** aborda esto con una plataforma donde:

* ✅ Puedes recibir **feedback público anónimo**, pero con trazabilidad ética.
* 🧠 Sabrás si quien comenta tiene una cuenta verificada (GitHub).
* 🚀 Todo esto sin perder tiempo en configuraciones complejas.

---

## Capturas 

![Autenticación](https://github.com/user-attachments/assets/e9b0c767-ca9a-461e-b60a-a6a5513d9e54)
![Proyectos](https://github.com/user-attachments/assets/fb7bc61b-0987-4ccd-a7a8-42ff6a84f45f)
![Creación de comentarios](https://github.com/user-attachments/assets/a29725fe-fc41-40b5-9d7b-20c4e9c8e297)
![Eliminación de comentarios](https://github.com/user-attachments/assets/a2b95a98-3dd4-419e-960f-645791dcac24)
![Creación de proyecto](https://github.com/user-attachments/assets/ee1ce094-9352-4559-bf10-9830bd59739f)

---

## 🔗 Deploy

> https://anon-feed.netlify.app

---

## 🏗️ Estructura del Proyecto

```
anonfeed-light/
├── public/
│   └── vite.svg
├── src/
│   ├── features/               # Funcionalidades agrupadas por dominio
│   │   ├── home/
│   │   ├── projects/
│   │   └── submit/
│   ├── shared/
│   │   ├── components/         # Componentes reutilizables
│   │   │   └── ui/             # Componentes de shadcn/ui
│   │   ├── lib/
│   │   │   └── utils.ts        # Utilidades generales
│   │   └── AppRouter.tsx       # Rutas con React Router v7
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
├── tsconfig*.json
├── bun.lock
├── biome.json
└── README.md
```

---

## 🚀 Tecnologías Clave

### 🧑‍💻 Frontend

* **React** + **React Router v7** — Navegación moderna y declarativa
* **TailwindCSS** — Estilo utilitario rápido
* **shadcn/ui** — Componentes accesibles y componibles
* **TanStack Query** — Gestión de datos y caché
* **zod** — Validación robusta de formularios

### ☁️ Servicios

* **Supabase (JS SDK)** — Base de datos y autenticación serverless desde el frontend
* **Clerk (Auth)** — Identidades verificadas sin backend complejo

---

## 📌 Roadmap Técnico

> ⚠️ Este proyecto es un prototipo funcional creado para una hackatón. Su evolución dependerá del interés y resultados obtenidos.

### ✅ MVP actual (Hackatón)

* Subida de proyectos con URL + tags técnicos
* Comentarios 
* Filtrado básico en dashboard
* Subida de capturas vía enlaces
* Validación de formularios con Zod
* Persistencia con Supabase (feedback, proyectos, usuarios)

### 🧪 Posible evolución (post-hackatón)

* Moderación ética y detección de toxicidad (Perspective API)
* Reputación de revisores y métricas de confiabilidad
* Organización de proyectos por categorías, equipos o regiones
* Dashboard avanzado con insights y métricas

---

## 🎯 Casos de Uso

### ⚡ Feedback Express

*"Tengo 2 horas antes del demo, necesito 3 opiniones sobre el landing."*

* Subes tu proyecto con tags como `UI`, `Copy`
* Recibes:

  * Comentarios anónimos rápidos
  * Revisor verificado te sugiere mejoras técnicas

### 🔍 Validación Técnica

*"¿Mi API funciona fuera de mi país?"*

* Solicitas feedback sobre rendimiento
* Recibes:

  * Captura de Postman
  * Sugerencias concretas sobre CORS y latencia

---

## 🧪 Cómo Ejecutar el Proyecto

> 🔧 **Instalación y pasos de ejecución estarán disponibles próximamente.**

```bash
# coming soon...
git clone https://github.com/JDCodeWork/anon-feed.git
cd anon-feed

# 2. Instala las dependencias
bun install

# 3. Configura tus variables de entorno
cp .env.example .env
# → Rellena .env con tus claves de Supabase y Clerk

# 4. Inicia el servidor de desarrollo
bun run dev
```

---

## 🤝 Contribuciones

Por el momento, este proyecto no está abierto a contribuciones externas. Sin embargo, si tienes feedback o ideas, puedes abrir un issue.

---


## 🧠 Lema del Proyecto

**"Feedback rápido y ético para desarrolladores reales."**
