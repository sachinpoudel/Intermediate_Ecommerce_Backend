# E-commerce Backend API

A robust e-commerce backend built with Node.js, Express, TypeScript, Prisma, and PostgreSQL (Neon).

## 🚀 Features

- User authentication (signup/login) with JWT
- Product management (CRUD operations)
- Secure password hashing with bcrypt
- Input validation using Zod
- RESTful API design
- Docker containerization support
- PostgreSQL database with Prisma ORM

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Validation:** Zod
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt
- **Containerization:** Docker & Docker Compose

## 📋 Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- Docker & Docker Compose (for containerization)
- Neon PostgreSQL account (or any PostgreSQL database)

## 🔧 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd Intermediate_Ecommerce_Backend/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://username:password@host/database?sslmode=require
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
PORT=3000
```

### 4. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# (Optional) Seed database
npx prisma db seed
```

## 🏃 Running the Application

### Development Mode

```bash
npm run start
```

### Production Build

```bash
# Build TypeScript
npm run build

# Start production server
node dist/index.js
```

## 🐳 Docker Deployment

### Using Docker Compose

```bash
# Build and start container
docker-compose up -d --build

# View logs
docker-compose logs -f backend

# Stop container
docker-compose down
```

### Using Docker CLI

```bash
# Build image
docker build -t ecommerce-backend .

# Run container
docker run -d -p 3000:3000 \
  -e DATABASE_URL="your-database-url" \
  -e JWT_SECRET="your-secret" \
  --name ecommerce-backend \
  ecommerce-backend
```

## 📚 API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Products

- `GET /api/products` - Get all products (paginated)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (authenticated)
- `PUT /api/products/:id` - Update product (authenticated)
- `DELETE /api/products/:id` - Delete product (authenticated)

## 🗂️ Project Structure

```
backend/
├── src/
│   ├── controllers/      # Route controllers
│   ├── exceptions/       # Custom error classes
│   ├── middlewares/      # Custom middlewares
│   ├── validations/      # Zod validation schemas
│   ├── routes/           # API routes
│   ├── errorHandler.ts   # Global error handler
│   ├── secret.ts         # Environment variables
│   └── index.ts          # App entry point
├── prisma/
│   └── schema.prisma     # Database schema
├── dist/                 # Compiled JavaScript
├── Dockerfile
├── docker-compose.yaml
├── tsconfig.json
├── package.json
└── .env
```

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `JWT_SECRET` | Secret key for JWT signing | Yes |
| `NODE_ENV` | Environment (development/production) | No |
| `PORT` | Server port (default: 3000) | No |

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test
```

## 📦 Database Schema

### User
- id (String)
- name (String)
- email (String, unique)
- password (String, hashed)

### Product
- id (String)
- name (String)
- description (String)
- price (Float)
- tags (String)
- createdAt (DateTime)
- updatedAt (DateTime)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

Your Name

## 🐛 Known Issues

- None currently

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

Made with ❤️ using TypeScript and Express