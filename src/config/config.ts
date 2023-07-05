export const appConfig = () => ({
  app: {
    url: process.env.APP_URL,
    port: process.env.PORT,
  },
  database: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    dbname: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logLevel: JSON.parse(process.env.DB_LOG),
    entities: JSON.parse(process.env.DB_ENTITIES),
    autoLoadEntities: process.env.DB_AUTOLOAD_ENTITIES === 'true',
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    dropSchema: process.env.DB_DROPSCHEMA === 'true',
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiration: process.env.JWT_EXPIRATION,
  },
  minio: {
    endPoint: process.env.MINIO_HOST,
    port: +process.env.MINIO_PORT,
    accessKey: process.env.MINIO_USER,
    secretKey: process.env.MINIO_PASS,
    bucket: process.env.MINIO_BUCKET,
  },
});
