"use strict";
var config = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'sumariosDb',
    database: 'dbTesste',
    synchronize: false,
    entities: ['src/typeorm/entities/**/*.ts', 'build/typeorm/entities/*.ts'],
    migrations: ['src/typeorm/migrations/**/*.ts', 'build/typeorm/migrations/*.ts'],
    subscribers: ['src/typeorm/subscriber/**/*.ts'],
    cli: {
        entitiesDir: 'src/typeorm/entities',
        migrationsDir: 'src/typeorm/migrations',
        subscribersDir: 'src/typeorm/subscriber'
    }
};
module.exports = config;
//# sourceMappingURL=ormconfig.js.map