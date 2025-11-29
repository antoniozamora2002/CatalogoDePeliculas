## 📽️ **Cinema DB**

Un proyecto en **Angular** que muestra películas usando la API de **The Movie Database (TMDb)**, con soporte para paginación y un diseño atractivo usando **Tailwind CSS**.

![Cinema DB](https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tmdb.new.logo.svg/512px-Tmdb.new.logo.svg.png)

---

## 📌 **Características**

✅ Consumo de la API de TMDb 📡  
✅ Listado de películas con imágenes y detalles 🎞️  
✅ Paginación funcional 🔄  
✅ Diseño responsive con Tailwind CSS 🎨  
✅ Proyecto en Angular con Standalone Components ⚡  
✅ Uso de Signals para gestión de estado 📶

---

## 🚀 **Instalación y Ejecución**

### 📋 **Requisitos Previos**

- **Node.js**: Versión **20 (LTS)** o superior (Se recomienda v20.19.6).
- **NPM**: Gestor de paquetes incluido con Node.js.

### 1️⃣ **Clonar el repositorio**

```bash
git clone https://github.com/antoniozamora2002/CatalogoDePeliculas.git
cd CatalogoDePeliculas
```

### 2️⃣ **Instalar dependencias**

Para una instalación limpia y exacta de las versiones probadas (recomendado):

```bash
npm ci
```

### 3️⃣ **Configurar API Key**

Necesitas una API Key de **TMDb**.  
🔹 Crea un archivo en `src/environments/environment.ts` con:

```typescript
export const environment = {
  apiUrl: "https://api.themoviedb.org/3/",
  apiKey: "TU_API_KEY_AQUÍ",
};
```

### 4️⃣ **Ejecutar el proyecto**

```bash
ng serve
```

Abre [http://localhost:4200](http://localhost:4200) en tu navegador.

---

## 📜 **Uso**

🔹 Al abrir la app, verás un listado de películas populares.  
🔹 Usa los botones `Anterior ⬅️` y `Siguiente ➡️` para cambiar de página.  
🔹 Si no hay imagen, se mostrará un mensaje de "No Poster Available".

---

## 🛠 **Tecnologías usadas**

- **Angular 19** 🚀
- **Node.js 20 (LTS)** 🟩
- **TypeScript 5.7** 📝
- **RxJS** 🔄
- **Tailwind CSS 3.4** 🎨
- **TMDb API** 🎥

---

## 👤 **Autor**

💡 Creado por [Antonio Zamora Pastor](https://github.com/antoniozamora2002) 🤖

Si te gustó el proyecto, ¡dale una ⭐ en GitHub! 😃
