const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to add required headers
app.use((req, res, next) => {
  console.log(`[CORS] Request origin: ${req.get('origin') || req.get('referer')}`);
  res.setHeader('Access-Control-Allow-Origin', '*'); // For debugging purposes only
  res.setHeader('Permissions-Policy', 'camera=*, display-capture=(self), microphone=*');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
  next();
});

// Serve static files from the React build
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
