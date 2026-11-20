# payments-api

Owned by **team-wallet**. Created from the Owo Lane golden path.

## Endpoints

| Path | Purpose |
|---|---|
| `/` | Service information |
| `/health` | Liveness check used by Docker and Kubernetes |
| `/metrics` | Prometheus metrics |

## Run locally

```bash
npm install
npm test
npm start
```

The service listens on port 3000, or on `PORT` if set.

## Run with Docker

```bash
docker build -t payments-api .
docker run -p 3000:3000 payments-api
```

## CI/CD

Every pull request runs tests and a Trivy security scan. Every merge to `main` also builds the image and pushes it to `ghcr.io/thormie-harshey/payments-api`, tagged with the commit SHA.

## Security defaults

- Multi-stage build; production image has no dev dependencies
- Runs as a non-root user
- Exact dependency versions locked in `package-lock.json`
- Pipeline fails on critical or high vulnerabilities, misconfigurations or leaked secrets

## Monitoring

Prometheus can scrape `/metrics`. It exposes request counts by route and status, plus Node.js memory and CPU.
