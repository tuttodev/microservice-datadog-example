# Microservice DataDog Example

This project demonstrates how to use DataDog for monitoring a NestJS microservice application.

## Prerequisites

- Docker and Docker Compose
- Node.js and npm/yarn
- A DataDog account (sign up at https://app.datadoghq.com/)

## Setup

There are two ways to set up the environment variables for this project:

### Option 1: Using .env.example directly

You can use the .env.example file directly without creating a .env file:

```bash
# Edit the .env.example file with your actual DataDog API key
# Then run Docker Compose with the --env-file flag
docker-compose --env-file .env.example up -d
```

### Option 2: Creating a .env file (recommended for development)

1. Clone this repository
2. Copy the `.env.example` file to `.env`:
   ```
   cp .env.example .env
   ```
3. Edit the `.env` file and add your DataDog API key:
   ```
   DD_API_KEY=your_datadog_api_key_here
   ```
   You can find your API key in your DataDog account settings.

## Running with Docker Compose

To start the application with MongoDB and the DataDog agent:

### Using the default .env file (if you created one):

```bash
docker-compose up -d
```

### Using .env.example directly:

```bash
docker-compose --env-file .env.example up -d
```

This will start:
- MongoDB service
- DataDog agent service (for monitoring)
- NestJS application service (on port 3000)

## Using the DataDog Agent

The DataDog agent is configured to collect metrics from the application. The application is set up to send StatsD metrics to the DataDog agent on port 8125.

In the application code, the StatsD client is configured to connect to the DataDog agent service:

```typescript
this.statsd = new StatsD({
    host: 'datadog-agent',
    port: 8125,
    prefix: 'microservice_datadog_example.',
    errorHandler: (error) => {
        console.error('StatsD error:', error);
    }
});
```

When running the application outside of Docker, you'll need to update the host to `localhost` or the appropriate hostname where the DataDog agent is running.

## Viewing Metrics in DataDog

Once the application is running and sending metrics to the DataDog agent, you can view them in your DataDog dashboard:

1. Log in to your DataDog account
2. Navigate to Metrics > Explorer
3. Search for metrics with the prefix `microservice_datadog_example`

## Development

To run the application locally without Docker:

```bash
# Install dependencies
npm install

# Start the application
npm run start:dev
```

Note: When running locally, you'll need to have the DataDog agent installed on your machine or update the StatsD configuration to point to where your DataDog agent is running.

## Testing the Dockerfile Without Docker Compose

If you want to test the Dockerfile independently without using docker-compose, you can follow these steps:

### Building the Docker Image

```bash
# Build the Docker image with a tag
docker build -t nestjs-app .
```

### Running the Container

You can run the container with the necessary environment variables:

```bash
# Run the container with environment variables
docker run -d --name nestjs-app-test \
  -p 3000:3000 \
  -e PORT=3000 \
  -e NODE_ENV=production \
  -e MONGO_URL=mongodb://host.docker.internal:27017/learning-platform \
  -e DATADOG_HOST=host.docker.internal \
  -e DATADOG_PORT=8125 \
  nestjs-app
```

> **Note**: The Dockerfile uses an absolute path in the CMD instruction to ensure Node.js can find the main.js file correctly: `CMD ["node", "/app/dist/apps/LearningPlatform/main.js"]`

Notes:
- `host.docker.internal` is used to connect to services running on your host machine from inside the Docker container.
- Make sure MongoDB is running on your host machine on port 27017 or adjust the MONGO_URL accordingly.
- If you want to use DataDog metrics, make sure the DataDog agent is running on your host machine.

### Checking Container Logs

```bash
# View the container logs
docker logs nestjs-app-test
```

### Stopping and Removing the Container

```bash
# Stop the container
docker stop nestjs-app-test

# Remove the container
docker rm nestjs-app-test
```

## Testing the Application

Once the application is running, you can test it by sending HTTP requests to the following endpoints:

### Ping Endpoint

```bash
curl http://localhost:3000/ping
```

### Create Course Endpoint

```bash
curl -X POST http://localhost:3000/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Introduction to Programming",
    "id": "02517ad0-cbd3-4bdb-a638-8e1af77bedb8",
    "duration": "10"
  }'
```

These requests will also generate metrics that you can view in your DataDog dashboard.
