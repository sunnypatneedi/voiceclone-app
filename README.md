# Voice Clone Application

A modern web application for voice cloning and text-to-speech synthesis using AI.

## Features

- 🎤 Upload voice samples for cloning
- 🔍 Process and analyze voice characteristics
- 📝 Convert text to speech using cloned voices
- 🎧 Playback and download generated audio
- 🔒 Secure authentication and user management

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **AI/ML**: Cartesia API for voice processing
- **Database**: PostgreSQL
- **Deployment**: Vercel, Docker

## Prerequisites

- Node.js 16.x or later
- npm 8.x or later
- PostgreSQL 14 or later
- Docker (optional, for containerization)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/voiceclone-app.git
cd voiceclone-app
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd apps/frontend
npm install

# Install backend dependencies
cd ../../packages/backend
npm install
```

### 3. Set Up Environment Variables

Copy the example environment file and update the values:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Application
NODE_ENV=development
NEXT_PUBLIC_APP_ENV=development

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Authentication (if needed)
# NEXT_AUTH_SECRET=your-secret-here
# NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
# GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 4. Set Up Database

Create a new PostgreSQL database and update the connection string in your `.env.local`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/voiceclone?schema=public
```

Run database migrations:

```bash
cd packages/backend
npx prisma migrate dev
```

### 5. Start the Development Servers

In separate terminal windows:

```bash
# Start the frontend
cd apps/frontend
npm run dev

# Start the backend
cd ../../packages/backend
npm run dev
```

The application will be available at `http://localhost:3000`.

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| NODE_ENV | Node environment | Yes | `development` |
| NEXT_PUBLIC_APP_ENV | Application environment | Yes | `development` |
| NEXT_PUBLIC_API_URL | API base URL | Yes | `http://localhost:3000/api` |
| DATABASE_URL | PostgreSQL connection string | Yes | - |
| NEXTAUTH_SECRET | Secret for NextAuth.js | No | - |
| NEXTAUTH_URL | Base URL for NextAuth.js | No | `http://localhost:3000` |

## Security

This project follows security best practices:

- Environment variables are not committed to version control
- Sensitive data is stored securely
- Dependencies are regularly updated
- Security headers are configured
- Input validation is implemented

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Cartesia](https://cartesia.ai) for voice processing APIs
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling