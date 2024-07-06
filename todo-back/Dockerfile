# Use the official Bun image
FROM oven/bun:latest

WORKDIR /src

# Copy package.json and bun.lockb
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application
COPY . .

# Command to run the application
CMD ["bun", "run", "src/index.ts"]
