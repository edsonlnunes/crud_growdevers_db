import { DataSource } from "typeorm";
import config from "./ormconfig";

export interface PgHelper {
  client: DataSource | null;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

export const pgHelper: PgHelper = {
  client: null,
  async connect(): Promise<void> {
    this.client = new DataSource(config);
    await this.client.initialize();
  },
  async disconnect(): Promise<void> {
    await this.client?.destroy();
    this.client = null;
  },
};
