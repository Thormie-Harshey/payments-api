const express = require('express');
const client = require('prom-client');

const app = express();
app.disable('x-powered-by'); // Do not reveal the framework in response headers

// Monitoring: a place to keep our numbers
const register = new client.Registry();
client.collectDefaultMetrics({ register }); // memory, CPU and so on

// Request counter
const httpRequests = new client.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status'],
  registers: [register],
});

// Count every request by method, route and status
app.use((req, res, next) => {
  res.on('finish', () =>
    httpRequests.inc({ method: req.method, route: req.path, status: res.statusCode })
  );
  next();
});

// Service information
app.get('/', (req, res) =>
  res.json({ service: 'payments-api', team: 'team-wallet', message: 'Hello from Owo Lane' })
);

// Liveness check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Prometheus scrape endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

module.exports = app;
