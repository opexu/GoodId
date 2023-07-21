import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt( process.env.POSTGRES_PORT ),
    database: process.env.POSTGRES_DATABASE,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    entities: [ __dirname + '/**/*.entity.{js,ts}' ],
    autoLoadEntities: true,
    migrationsRun: false,
    logging: false,
    migrationsTableName: 'migration',
    migrations: [ __dirname + '/migration/**/*.{ts,js}' ],
    synchronize: true,
}