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
* [x] Supabase JS SDK (setup conexión)
* [x] TanStack Query
* [x] Estructura modular de features

✅ Setup de desarrollo:

* [x] Convenciones: Conventional Commits
* [x] Biome como formatter/linter

---

### 🥈 Fase 2 — **Subida de Proyecto (submit/)**

**Objetivo:** Permitir a usuarios autenticados subir sus proyectos con metadata útil para recibir feedback.

* [x] Formulario multi-sección con:
  * [x] Título, categoría, descripción
  * [x] Tags técnicos (input dinámico)
  * [x] Screenshots (upload a Supabase Storage)
  * [x] GitHub repo + demo URL
  * [x] Metas del feedback (UI/UX, code, performance)
  * [x] Preguntas específicas
  * [x] Nivel de experiencia
* [x] Validación con Zod
* [x] Envío a Supabase (tabla `projects`)
* [x] Redirección a página del proyecto

---

### 🥉 Fase 3 — **Visualización de Proyecto (projects/)**

**Objetivo:** Mostrar el detalle de un proyecto, su info, feedback recibido y formulario para enviar nuevo comentario.

* [x] Página `/project/:id`
  * [x] Card con metadata del proyecto
  * [x] Listado de comentarios recibidos
  * [ ] Visualización condicional de etiquetas (anon vs verificado)
  * [ ] Botón “Editar feedback propio” si ya ha comentado

---

### 🧑‍💬 Fase 4 — **Feedback**

**Objetivo:** Permitir a usuarios registrados dejar o editar feedback textual.
* [x] Formulario: texto + tags opcionales
* [x] Identificación de autor vía Clerk
* [ ] Detección si el usuario ya comentó:
  * [ ] Mostrar botón de editar si es su comentario
* [x] Almacenamiento en Supabase (tabla `comments`)
* [ ] Etiqueta “Dev confiable” si se autentico con GitHub

---

### 🗂️ Fase 5 — **Dashboard (home/)**

**Objetivo:** Listar proyectos subidos con info básica y filtros mínimos.

* [x] Página `/dashboard`
  * [x] Cards por proyecto
  * [ ] Filtro por tags / categoría (local)
  * [ ] Badge de “comentado por mí” si aplica
---

### 🎨 Fase 6 — **Pulido UI/UX**
* [x] Estados de carga con Skeletons o spinners
* [x] Manejo de errores global
* [ ] Animaciones suaves (tailwind + framer-motion si hay tiempo)
* [ ] Responsive full en móviles y desktop

---

## 🚀 Preparación para Deploy
* [x] Configurar entorno `.env` para Supabase y Clerk
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
✔️ UI responsive con diseño base
✔️ Subida real a Supabase (proyectos y comentarios)