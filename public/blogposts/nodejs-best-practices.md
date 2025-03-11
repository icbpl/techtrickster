
---
title: "Node.js Best Practices for Production Applications"
date: "2024-05-15"
excerpt: "Learn the essential best practices for building robust, scalable, and maintainable Node.js applications for production environments."
cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
category: "Node.js"
readTime: "11 min read"
author: "David Wilson"
---

# Node.js Best Practices for Production Applications

Building Node.js applications that perform well in production requires attention to detail and adherence to best practices. In this article, we'll explore key strategies for developing robust, scalable, and maintainable Node.js applications.

## 1. Error Handling

Proper error handling is crucial for production applications:

```javascript
// Bad - unhandled promise rejection
getData().then(data => {
  // Process data
});

// Good - always handle promise rejections
getData()
  .then(data => {
    // Process data
  })
  .catch(error => {
    logger.error('Failed to get data:', error);
    // Handle error appropriately
  });

// Better - use async/await with try/catch
async function processData() {
  try {
    const data = await getData();
    // Process data
  } catch (error) {
    logger.error('Failed to get data:', error);
    // Handle error appropriately
  }
}
```

### Global Error Handler

Implement a global uncaught exception handler:

```javascript
process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception:', error);
  // Perform cleanup if necessary
  process.exit(1); // Exit with failure
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});
```

## 2. Asynchronous Patterns

Use modern asynchronous patterns:

```javascript
// Avoid callback hell
function processData(callback) {
  fetchData((err, data) => {
    if (err) return callback(err);
    
    transformData(data, (err, transformed) => {
      if (err) return callback(err);
      
      saveData(transformed, (err, result) => {
        if (err) return callback(err);
        
        callback(null, result);
      });
    });
  });
}

// Better - use async/await
async function processData() {
  try {
    const data = await fetchData();
    const transformed = await transformData(data);
    return await saveData(transformed);
  } catch (error) {
    throw error; // Re-throw or handle appropriately
  }
}
```

## 3. Security Best Practices

### Dependency Management

Regularly scan and update dependencies:

```bash
# Use npm audit to identify vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Keep dependencies updated
npm update
```

### Input Validation

Always validate user input:

```javascript
const { body, validationResult } = require('express-validator');

app.post('/user',
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Process valid request
  }
);
```

### Security Headers

Use Helmet to set security headers:

```javascript
const helmet = require('helmet');
const express = require('express');
const app = express();

app.use(helmet());
```

## 4. Performance Optimization

### Caching

Implement appropriate caching strategies:

```javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes default TTL

async function getUserData(userId) {
  // Check cache first
  const cachedData = cache.get(userId);
  if (cachedData) {
    return cachedData;
  }
  
  // If not in cache, fetch from database
  const userData = await db.findUser(userId);
  
  // Store in cache
  cache.set(userId, userData);
  
  return userData;
}
```

### Database Query Optimization

Optimize database queries:

```javascript
// Bad - fetching all fields
await User.find({});

// Good - select only needed fields
await User.find({}).select('name email');

// Bad - no indexing on frequently queried field
await User.find({ email: userEmail });

// Good - create index for frequently queried fields
// In your schema:
userSchema.index({ email: 1 });
```

## 5. Logging

Implement structured logging:

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Use logger throughout your application
logger.info('Application started', { environment: process.env.NODE_ENV });
logger.error('Database connection failed', { error: err.message });
```

## 6. Environment Configuration

Use environment variables for configuration:

```javascript
// config.js
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  logLevel: process.env.LOG_LEVEL || 'info'
};
```

## 7. Process Management

Use a process manager like PM2:

```bash
# Install PM2
npm install -g pm2

# Start application with PM2
pm2 start app.js --name "my-app" -i max

# Enable startup script
pm2 startup

# Save current process list
pm2 save
```

## 8. Containerization

Use Docker for consistent environments:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

USER node

CMD ["node", "app.js"]
```

## 9. Code Structure and Organization

Follow a clear structure:

```
project/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
├── tests/
├── .env.example
├── .gitignore
├── app.js
├── package.json
└── README.md
```

## 10. Continuous Integration and Deployment

Implement CI/CD pipelines:

- Use GitHub Actions, Jenkins, or CircleCI
- Automate testing and deployment
- Implement staging environments
- Use feature flags for safer deployments

## Conclusion

Following these best practices will help you build Node.js applications that are robust, secure, and easier to maintain in production environments. Remember that production-ready code requires thinking beyond functionality—performance, security, error handling, and monitoring are equally important aspects of a successful application.

As your application grows, continuously review and refine your approach based on real-world performance and emerging best practices in the Node.js community.
