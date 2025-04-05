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

---

## 🚀 **Instalación y Ejecución**

### 1️⃣ **Clonar el repositorio**

```bash
git clone https://github.com/antoniozamora2002/CatalogoDePeliculas.git
cd cinema-db
```

### 2️⃣ **Instalar dependencias**

```bash
npm install
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

- **Angular** 🚀
- **TypeScript** 📝
- **RxJS** 🔄
- **Tailwind CSS** 🎨
- **TMDb API** 🎥

---

## 👤 **Autor**

💡 Creado por [Antonio Zamora](https://github.com/antoniozamora2002) 🤖

Si te gustó el proyecto, ¡dale una ⭐ en GitHub! 😃
