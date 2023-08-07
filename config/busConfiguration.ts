import entities from "apps/bus/src/infrastructure/entities";
import type { DataSourceOptions } from "typeorm";

const busConfiguration: () => {
  port: number;
  typeorm: DataSourceOptions;
} = () => ({
  host: process.env.BUS_APP_HOST,
  port: parseInt(process.env.BUS_APP_PORT, 10) || 3000,
  typeorm: {
    type: 'postgres',
    url: process.env.BUS_DATABASE_URL,
    schema: 'bus_app',
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV !== 'production',
    entities: entities,
  },
});

export default busConfiguration;