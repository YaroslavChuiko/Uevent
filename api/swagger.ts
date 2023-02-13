export default {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'The Uevent API',
      description: 'Documentation of the Uevent API',
    },
    servers: [{ url: 'http://localhost:8080' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./docs/**/*.yaml'],
};
