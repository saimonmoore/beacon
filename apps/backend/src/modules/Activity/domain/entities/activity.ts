import { plainToClass, classToPlain } from 'class-transformer';
import { RouteEntity } from '#Route/domain/entities/route.js';

export type Activity = {
  description: string;
  clothesDescription: string;
  route: RouteEntity;
  createdAt: Date;
  updatedAt: Date;
};

export class ActivityEntity {
  description: string;
  clothesDescription: string;
  route: RouteEntity;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  static fromData(data: Record<string, any>): Activity {
    const instance = plainToClass(ActivityEntity, data);
    instance.route = RouteEntity.fromData(data.route);
    instance.createdAt = new Date(data.createdAt);
    instance.updatedAt = new Date(data.updatedAt);
    return instance;
  }

  toData(): Record<string, any> {
    const data = classToPlain(this);
    data.route = this.route.toData();
    data.createdAt = this.createdAt.toISOString();
    data.updatedAt = this.updatedAt.toISOString();
    return data;
  }
}
