
# Stream Vault Addon

## Overview
Stream Vault Addon is a custom Stremio Addon designed to fetch and stream movie metadata and content from a backend server. It seamlessly integrates with Stremio, providing support for catalog browsing, metadata fetching, and video streaming.

## Features
- Stremio-compatible addon providing **catalog**, **meta**, and **stream** resources.
- Fetch metadata and video streams via backend server endpoints.
- Dockerized deployment for easy setup.

## Directory Structure
```
src/
  config/         # Configuration files
  interfaces/     # TypeScript interfaces for data modeling
  Addon.ts        # Main addon logic and HTTP handlers
  Manifest.ts     # Stremio addon manifest definition
.gitignore        # Ignored files and directories
docker-compose.yml # Docker Compose configuration
Dockerfile        # Docker image definition
package.json      # Node.js project configuration
tsconfig.json     # TypeScript compiler configuration
```

## Prerequisites
- Node.js (v16 or later)
- npm
- Docker (optional for containerized deployment)

## Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Build the project:
   ```sh
   npm run build
   ```

## Running
- **Local**: Start the addon locally using:
  ```sh
  npm start
  ```
- **Docker**: Build and run the Docker container:
  ```sh
  docker-compose up --build
  ```

## Configuration
- Adjust `src/config/index.ts` for backend URLs and authentication codes.
- Set environment variables like `NODE_ENV` and `AUTH_CODE` for production environments.

## License
This project is licensed under the ISC License.
