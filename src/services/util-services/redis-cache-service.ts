import { RedisClientType, createClient } from "redis";
import dotenv from "dotenv";

import { injectable } from "tsyringe";
import logger from "../../config/logger";
import { CacheService } from "../../interfaces/util-services/cache-service.interface";

dotenv.config(); // set env variables

@injectable()
export class RedisCacheService implements CacheService {
  private client: RedisClientType;
  private isConnected: boolean = false;

  public constructor() {
    this.client = createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: 19402,
      },
    });
    this.initializeClient();
  }

  private async initializeClient() {
    if (!this.client.isOpen) {
      await this.client.connect();
      this.isConnected = true;
      console.log("Redis is running");
    }
  }

  async set(key: string, value: any, expiresIn?: number): Promise<void> {
    if (!this.isConnected) {
      return;
    }
    const stringValue = JSON.stringify(value);
    logger.info(`Cache: Setting ${key} to ${stringValue}`);
    if (expiresIn) {
      await this.client.set(key, stringValue, { EX: expiresIn });
    } else {
      await this.client.set(key, stringValue);
    }
  }

  async get(key: string): Promise<any | null> {
    // if (this.isConnected) {
    //   const value = await this.client.get(key);
    //   if (value) {
    //     logger.info(`Cache: cache hit for key ${key} with value ${value}`);
    //     return value;
    //   }
    // }

    // logger.info(`Cache: cache miss for key ${key}`);

    return null;
  }

  async delete(key: string): Promise<void> {
    if (!this.isConnected) {
      return;
    }
    logger.info(`Cache: removing key ${key} from cache`);
    await this.client.del(key);
  }

  async quit(): Promise<void> {
    await this.client.quit();
  }
}
