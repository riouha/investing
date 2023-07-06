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
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION,
    refreshTokenSecret: process.env.REFERESH_TOKEN_SECRET,
    refreshTokenExpiration: process.env.REFERESH_TOKEN_EXPIRATION,
  },
  minio: {
    endPoint: process.env.MINIO_HOST,
    port: +process.env.MINIO_PORT,
    accessKey: process.env.MINIO_USER,
    secretKey: process.env.MINIO_PASS,
    bucket: process.env.MINIO_BUCKET,
  },
});
