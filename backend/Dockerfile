# ===========================================
# SuperFamily Backend Dockerfile
# Multi-stage build for Go + Gin + SQLite
# ===========================================

# Stage 1: Builder
FROM golang:1.23-alpine AS builder

WORKDIR /app

# Install build dependencies (including CGO for go-sqlite3)
RUN apk add --no-cache git gcc musl-dev

# Set Go to download toolchain automatically if version mismatch
ENV GOTOOLCHAIN=auto

# Copy source code first (needed for go mod to resolve imports)
COPY . .

# Download and tidy dependencies
RUN go mod download && go mod tidy

# Build the binary (CGO_ENABLED=1 required for go-sqlite3)
RUN CGO_ENABLED=1 GOOS=linux go build -a -o server .

# Stage 2: Runtime
FROM alpine:3.19

WORKDIR /app

# Install runtime dependencies (wget for healthcheck, ca-certificates for HTTPS)
# Note: no need for gcc in runtime, binary is statically linked
RUN apk add --no-cache ca-certificates wget

# Create data directory for SQLite
RUN mkdir -p /app/data && chown -R nobody:nobody /app

# Copy binary from builder
COPY --from=builder /app/server .

# Copy Firebase service account JSON
COPY firebase-service-account.json /app/firebase-service-account.json

# Run as non-root user
USER nobody:nobody

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget -q --spider http://localhost:3001/health || exit 1

CMD ["./server"]