FROM node:24-alpine
WORKDIR /app
RUN apk add --no-cache libc6-compat curl

# Copy package manager files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy app source code
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]