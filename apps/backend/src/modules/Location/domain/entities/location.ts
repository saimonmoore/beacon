import { plainToClass, classToPlain } from 'class-transformer';
import { sha256 } from '#Shared/infrastructure/helpers/hash.js';

// DTO
export type Location = {
  latitude: number;
  longitude: number;
  area: string;
  region: string;
  countryCode: string;
  createdAt: Date;
  updatedAt: Date;
};

export class LocationEntity {
  latitude: number;
  longitude: number;
  area: string;
  region: string;
  countryCode: string;
  createdAt: Date;
  updatedAt: Date;

  static fromData(data: Record<string, any>): LocationEntity {
    const instance = plainToClass(LocationEntity, data);
    instance.createdAt = new Date(data.createdAt);
    instance.updatedAt = new Date(data.updatedAt);
    return instance;
  }

  toData(): Record<string, any> {
    const data = classToPlain(this);
    data.createdAt = this.createdAt.toISOString();
    data.updatedAt = this.updatedAt.toISOString();
    return data;
  }
}
