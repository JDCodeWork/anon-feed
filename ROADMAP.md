# 🗺️ AnonFeed Light — Roadmap de Desarrollo

## 🎯 Objetivo General

Construir un MVP funcional para la hackatón que permita subir proyectos y recibir feedback técnico confiable y anónimo, con persistencia real mediante Supabase y una estructura de frontend modular, escalable y mantenible.

---

## 📌 Fases del Desarrollo

### 🥇 Fase 1 — **Setup Inicial y Base Técnica**

✅ Configuración del entorno:

* [x] React + Vite + TypeScript
* [x] TailwindCSS + shadcn/ui
* [x] React Router v7 (declarativo)
* [x] Clerk (Auth frontend-only)
* [ ] Supabase JS SDK (setup conexión)
* [ ] TanStack Query + Zustand
* [x] Estructura modular de features

✅ Setup de desarrollo:

* [x] Git + ramas `main` y `develop`
* [x] Convenciones: Conventional Commits
* [x] Biome como formatter/linter

---

### 🥈 Fase 2 — **Subida de Proyecto (submit/)**

**Objetivo:** Permitir a usuarios logueados subir sus proyectos con metadata útil para recibir feedback.

* [ ] Formulario multisección con:

  * [ ] Título, categoría, descripción
  * [ ] Tags técnicos (input dinámico)
  * [ ] Screenshots (upload a Supabase Storage)
  * [ ] GitHub repo + demo URL
  * [ ] Metas del feedback (UI/UX, code, performance)
  * [ ] Preguntas específicas
  * [ ] Nivel de experiencia
* [ ] Validación con Zod + react-hook-form
* [ ] Envío a Supabase (tabla `projects`)
* [ ] Redirección a página del proyecto

---

### 🥉 Fase 3 — **Visualización de Proyecto (projects/)**

**Objetivo:** Mostrar el detalle de un proyecto, su info, feedback recibido y formulario para enviar nuevo comentario.

* [ ] Página `/project/:id`

  * [ ] Card con metadata del proyecto
  * [ ] Listado de comentarios recibidos
  * [ ] Visualización condicional de etiquetas (anon vs verificado)
  * [ ] Botón “Editar feedback propio” si ya ha comentado

---

### 🧑‍💬 Fase 4 — **Feedback (feedback/)**

**Objetivo:** Permitir a usuarios registrados dejar o editar feedback textual.

* [ ] Formulario: texto + tags opcionales
* [ ] Validación con Zod
* [ ] Identificación de autor vía Clerk
* [ ] Detección si el usuario ya comentó:

  * [ ] Mostrar botón de editar si es su comentario
* [ ] Almacenamiento en Supabase (tabla `feedback`)
* [ ] Etiqueta “Dev confiable” si logueado con GitHub

---

### 🗂️ Fase 5 — **Dashboard (home/)**

**Objetivo:** Listar proyectos subidos con info básica y filtros mínimos.

* [ ] Página `/`

  * [ ] Cards por proyecto
  * [ ] Filtro por tags / categoría (local)
  * [ ] Badge de “comentado por mí” si aplica

---

### 🎨 Fase 6 — **Pulido UI/UX**

* [ ] Estados de carga con Skeletons o spinners
* [ ] Manejo de errores global
* [ ] Animaciones suaves (tailwind + framer-motion si hay tiempo)
* [ ] Responsive full en móviles y desktop

---

## 🚀 Preparación para Deploy

* [ ] Configurar entorno `.env` para Supabase y Clerk
* [ ] Configurar deploy en **Vercel**
* [ ] Scripts de build y preview
* [ ] Pruebas rápidas en mobile y desktop
* [ ] Documentación de pasos para probar

---

## 🧪 Fases Futuras (Post-Hackatón)

* 🧠 Moderación de comentarios (toxicity detection con Perspective API)
* 📈 Sistema de reputación de revisores
* 📊 Métricas de engagement en dashboard
* 🔔 Notificaciones para autores
* 🌍 Internacionalización (i18n)
* 🤖 Feedback sugerido por IA (GPT embedding + Supabase Vector)

---

## ✅ MVP Entregable

✔️ Subida de proyectos
✔️ Autenticación con Clerk
✔️ Feedback anónimo y verificado
✔️ Dashboard básico
✔️ UI responsive con diseño base
✔️ Subida real a Supabase (proyectos y comentarios)