# EazyWalls Server

A fully typed, layered-architecture REST API server for the **EazyWalls** wallpaper platform. Built with Node.js, Express 5, and TypeScript following a strict Controller → Service → Repository separation.

## Tech Stack

| Technology | Purpose |
|---|---|
| **TypeScript** | Language (strict mode) |
| **Express 5** | HTTP framework |
| **MongoDB (Mongoose)** | Primary database |
| **Cloudinary** | Image storage & transformation |
| **JWT** | Authentication |
| **bcrypt** | Password hashing |
| **eazyotp** | Email OTP verification |
| **Multer** | File upload handling |
| **Pino** | Structured logging |
| **unique-username-generator** | Auto username generation on register |

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **MongoDB** instance
- **Cloudinary** account
- **EazyOTP** API key (for email OTP)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
PORT=8000
PRODUCTION=false

# MongoDB
MONGO_URI=mongodb://127.0.0.1:27017/eazyWalls

# Authentication
JWT_SECRET=your_jwt_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_api_secret

# Email (for OTP)
EMAIL=your_email@example.com
EMAIL_PASS=your_email_app_password

# OTP Service
EAZY_OTP_API_KEY=your_eazyotp_api_key
```

> **Note**: All env variables are accessed via `src/utils/env-values-fetcher.ts` — `process.env` is not used directly in application code.

> **Note**: Admin routes (`/api/v1/admin/*`) are only mounted when `PRODUCTION=false`. They are disabled in production.

### Running

```bash
# Development (hot reload via nodemon + tsx)
npm run dev

# Production build
npm run build

# Start production
npm start
```

## Architecture

The server follows a strict **Controller → Service → Repository** layered pattern:

```
Request → Route → Middleware → Controller → Service → Repository → Database
```

```
src/
├── app.ts                      # Express app setup, route registration
├── server.ts                   # Entry point, DB connection, server start
│
├── routes/                     # Route definitions
│   ├── Auth.route.ts           # OTP + login + register
│   ├── wallpaper.ts            # Public wallpaper endpoints + favourites
│   ├── category.ts             # Category listing
│   ├── search.ts               # Search endpoint
│   └── admin.ts                # Admin-only endpoints (disabled in production)
│
├── controller/                 # Request handling, validation, error mapping
│   ├── auth.controller.ts
│   ├── wallpaper.ts
│   ├── category.ts
│   ├── favourite.controller.ts
│   ├── report.issue.controller.ts
│   ├── search.ts
│   └── admin.ts
│
├── services/                   # Business logic layer
│   ├── index.sevice.ts         # Dependency injection registry
│   ├── AuthService.ts          # Register, login logic
│   ├── UserService.ts
│   ├── wallpaperService.ts     # Wallpaper CRUD + Cloudinary upload
│   ├── mediaUpload.ts          # Cloudinary media pipeline
│   ├── otpService.ts           # OTP send/verify via eazyotp
│   └── cloudinary.ts           # Cloudinary config
│
├── repository/                 # Data access layer (Mongoose queries)
│   ├── users.ts
│   ├── wallpaper.ts
│   ├── category.ts
│   ├── favourite.repo.ts
│   └── report.repo.ts
│
├── model/                      # Mongoose schemas & TypeScript interfaces
│   ├── user.ts
│   ├── wallpaper.ts
│   ├── category.ts
│   ├── favourite.ts
│   └── report.ts
│
├── middlewares/                # Express middlewares
│   ├── authorization.ts              # JWT verification
│   ├── does-user-exist-check-middleware.ts  # Signup duplicate check
│   ├── jwtSignedOtpTokenValidator.ts # OTP token validation before register
│   └── multer.ts                     # File upload (RAM storage)
│
├── common/                     # Shared classes and enums
│   ├── Error.ts
│   ├── ServiceError.ts
│   ├── ErrorEnum.ts
│   ├── apiError.ts
│   ├── apiResponse.ts
│   ├── constants.ts
│   └── enum.ts
│
├── types/                      # TypeScript type definitions
└── utils/                      # Shared utilities
    ├── env-values-fetcher.ts   # Centralized env var access
    ├── Regex.ts                # Validation patterns
    ├── bcryptUtil.ts           # Password hash/verify helpers
    └── pino.ts                 # Logger setup
```

## API Routes

**Base URL**: `http://localhost:8000/api/v1`

### Authentication

OTP-gated registration flow: send OTP → verify OTP (receive signed JWT) → register with that JWT.

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/sendOtp` | — | Send OTP to email (checks user doesn't already exist) |
| POST | `/auth/verifyOtp` | — | Verify OTP, returns a signed OTP token |
| POST | `/auth/register` | OTP token (header) | Register new user |
| POST | `/auth/login` | — | Login, returns JWT + username + profile |

### Wallpapers

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/wallpaper/` | — | Get all wallpapers (filter by `?category=name`) |
| GET | `/wallpaper/getNoFeatured` | — | Get non-featured wallpapers |
| GET | `/wallpaper/getNonTrending` | — | Get non-trending wallpapers |
| GET | `/wallpaper/favourite` | ✅ JWT | Get user's favourited wallpapers |
| POST | `/wallpaper/favourite` | ✅ JWT | Add wallpaper to favourites |
| DELETE | `/wallpaper/favourite` | ✅ JWT | Remove wallpaper from favourites |

### Categories

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/category/` | — | Get all categories |

### Search

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/search/` | — | Search wallpapers by tag/category |

### Admin *(disabled in production)*

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/admin/wallpaper` | Upload wallpaper (`FormData`: `image`) |
| PATCH | `/admin/wallpaper` | Delete wallpapers by IDs |
| PATCH | `/admin/wallpaper/update` | Update wallpaper metadata |
| POST | `/admin/category` | Create category (`FormData`: `image`, `category`) |
| PATCH | `/admin/category` | Update category preview image |
| DELETE | `/admin/category` | Delete category |
| POST | `/admin/trending/add` | Add wallpapers to trending |
| PATCH | `/admin/trending/remove` | Remove wallpapers from trending |
| POST | `/admin/featured/add` | Add wallpapers to featured |
| PATCH | `/admin/featured/remove` | Remove wallpapers from featured |

## Data Models

### Wallpaper

| Field | Type | Description |
|-------|------|-------------|
| `category` | String | Category name |
| `tags` | String[] | Searchable tags |
| `author` | String | Attribution |
| `previewUrl` | String | Compressed preview image URL |
| `originalUrl` | String | Full-resolution Cloudinary URL |
| `public_id` | String | Cloudinary public ID (for deletion) |
| `featured` | Boolean | Featured flag |
| `trending` | Boolean | Trending flag |
| `status` | `uploading` \| `success` \| `failed` | Upload processing state |
| `height` / `width` | Number | Image dimensions |

### User

| Field | Type | Description |
|-------|------|-------------|
| `email` | String | Unique, required |
| `password` | String | bcrypt hashed |
| `username` | String | Auto-generated from email |
| `profile` | String | Profile picture URL |
| `profileCloudinaryPublicId` | String | Cloudinary public ID for profile pic |

### Favourite

| Field | Type | Description |
|-------|------|-------------|
| `email` | String | User's email |
| `wallpaperId` | ObjectId | Reference to wallpaper |

### Category

| Field | Type | Description |
|-------|------|-------------|
| `title` | String | Category name |
| `previewUrl` | String | Cloudinary preview URL |

### Report

| Field | Type | Description |
|-------|------|-------------|
| `email` | String | Reporter's email |
| `wallpaperId` | ObjectId | Reported wallpaper |
| `issue` | String | Issue description |

## Dependency Injection

All services are instantiated in `src/services/index.sevice.ts` with their repository dependencies:

```typescript
const authService = new AuthService(new UserRepo());
const wallpaperService = new WallpaperService(new WallpaperRepo());
// ...

export { authService, wallpaperService, ... }
```

Controllers import only from this registry.

## Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Development server with hot reload (tsx + nodemon) |
| `build` | `npm run build` | Compile TypeScript to `dist/` |
| `start` | `npm start` | Run compiled production build |

## License

ISC

## Author

Rasid Ekbal
