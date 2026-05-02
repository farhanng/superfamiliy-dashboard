# ===========================================
# SuperFamily Backend Dockerfile
# Multi-stage build for Go + Gin + SQLite
# ===========================================

# Stage 1: Builder
FROM golang:1.22-alpine AS builder

WORKDIR /app

# Install build dependencies (including CGO for go-sqlite3)
RUN apk add --no-cache git gcc musl-dev

# Copy go mod files first (for caching)
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

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

# Run as non-root user
USER nobody:nobody

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget -q --spider http://localhost:3001/health || exit 1

CMD ["./server"]