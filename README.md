# EazyWalls Server

## 1. Introduction

The backend server for the EazyWalls ecosystem, built with Node.js and Express. It handles API requests, database operations (MongoDB), and image management via Cloudinary.

## 2. Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (via Mongoose)
- **Object Storage**: Cloudinary
- **Tools**: Multer (File Uploads), Nodemon (Dev Server)

## 3. Setup & Installation

1. Navigate to the `server` directory:
   ```bash
   cd server
   npm install
   ```
2. Create a `.env` file in the root with:
   ```env
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 4. API Documentation

**Base URL**: `http://localhost:8000/api/v1`

### Admin Endpoints

| Method     | Endpoint                  | Description             | Request Body                                                    |
| :--------- | :------------------------ | :---------------------- | :-------------------------------------------------------------- |
| **POST**   | `/admin/wallpaper/`       | Upload wallpaper        | `FormData`: `image`, `category`, `tags`, `author`, `isTrending` |
| **PATCH**  | `/admin/wallpaper/`       | Delete wallpapers       | `{ ids: "id1,id2,..." }`                                        |
| **PATCH**  | `/admin/wallpaper/update` | Update wallpaper        | `{ id, category, tags, author, ... }`                           |
| **POST**   | `/admin/category/`        | Create category         | `FormData`: `image`, `category`                                 |
| **PATCH**  | `/admin/category/`        | Update category preview | `FormData`: `image`, `category`                                 |
| **DELETE** | `/admin/category/`        | Delete category         | `{ data: { category: "name" } }`                                |
| **POST**   | `/admin/trending/add`     | Add to Trending         | `{ ids: ... }`                                                  |
| **PATCH**  | `/admin/trending/remove`  | Remove from Trending    | `{ ids: ... }`                                                  |
| **POST**   | `/admin/featured/add`     | Add to Featured         | `{ ids: ... }`                                                  |
| **PATCH**  | `/admin/featured/remove`  | Remove from Featured    | `{ ids: ... }`                                                  |

### Public Endpoints

| Method  | Endpoint                      | Description        |
| :------ | :---------------------------- | :----------------- |
| **GET** | `/category/`                  | Get all categories |
| **GET** | `/wallpaper/`                 | Get wallpapers     |
| **GET** | `/wallpaper/?category={name}` | Get by category    |
| **GET** | `/wallpaper/getNoFeatured`    | Get non-featured   |
| **GET** | `/wallpaper/getNonTrending`   | Get non-trending   |

## 5. Data Models

### Wallpaper

- `category` (String)
- `tags` (String Array)
- `author` (String)
- `previewUrl` (String)
- `originalUrl` (String)
- `featured` (Boolean)
- `trending` (Boolean)
- `height` / `width` (Number)

### Category

- `title` (String)
- `previewUrl` (String)
