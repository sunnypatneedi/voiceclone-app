# Voice Clone Application - Architecture

## System Overview
The Voice Clone application follows a modern web application architecture with decoupled frontend and backend services. It employs a monolithic backend API that interfaces with external services for audio processing and voice synthesis.

## Component Architecture

### Frontend (React + Vite)
- **App Shell**: PWA-compatible React application with responsive design
- **Upload Component**: Handles file selection, validation, and upload
- **Processing Status**: Displays file processing status with polling
- **Text Input UI**: Interface for entering text to be synthesized
- **Audio Player**: Custom audio player with waveform visualization
- **Download Component**: Handles audio file download

### Backend (Node.js + Express)
- **API Layer**: REST API endpoints for client requests
- **Auth Service**: JWT authentication and authorization
- **Storage Service**: File management and S3 integration
- **Queue Service**: Job scheduling and management
- **Cartesia Integration**: Audio preprocessing middleware
- **PipeCat Integration**: Voice cloning and synthesis service
- **Database Service**: PostgreSQL data access layer

## Data Flow

1. **Voice Sample Upload**:
   - Client uploads audio file → Backend validates format and length
   - Backend stores file in temporary storage → Sends to Cartesia
   - Cartesia processes and normalizes audio → Returns processed file
   - Backend stores processed file → Updates status in database

2. **Text-to-Speech Synthesis**:
   - Client sends text with sample ID → Backend validates request
   - Backend creates job in queue → Sends to PipeCat with processed voice sample
   - PipeCat generates synthesized audio → Returns audio file
   - Backend stores synthesized file → Updates status in database
   - Client polls status → Receives audio URL when ready

## Database Schema

**Voice Samples Table**:
- Sample ID (UUID, PK)
- User ID (UUID, FK)
- Original File URL (String)
- Processed File URL (String)
- Sample Status (Enum)
- Created At (Timestamp)
- Updated At (Timestamp)

**Clone Jobs Table**:
- Job ID (UUID, PK)
- Sample ID (UUID, FK)
- Text Input (String)
- Audio Result URL (String)
- Job Status (Enum)
- Created At (Timestamp)
- Updated At (Timestamp)

## Technology Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL
- **Authentication**: JWT
- **File Storage**: AWS S3 or compatible
- **External Services**: Cartesia (audio processing), PipeCat (voice synthesis)
- **DevOps**: Docker, GitHub Actions, Kubernetes/Docker Compose
- **Monitoring**: Prometheus, Grafana (future implementation)
