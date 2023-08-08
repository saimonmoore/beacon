import { plainToClass, classToPlain } from 'class-transformer';
import { sha256 } from '#Shared/infrastructure/helpers/hash.js';
import { NotificationMethodEntity } from '#NotificationMethod/domain/entities/notificationMethod.js';

export type NotificationRule = {
  userId: string;
  notificationMethod: NotificationMethodEntity;
  order: number;
  timeDelay: number;
  createdAt: Date;
  updatedAt: Date;
};

export class NotificationRuleEntity {
  userId: string;
  notificationMethod: NotificationMethodEntity;
  order: number;
  timeDelay: number;
  createdAt: Date;
  updatedAt: Date;

  static fromData(data: Record<string, any>): NotificationRuleEntity {
    const instance = plainToClass(NotificationRuleEntity, data);
    instance.notificationMethod = NotificationMethodEntity.fromData(data.notificationMethod);
    instance.createdAt = new Date(data.createdAt);
    instance.updatedAt = new Date(data.updatedAt);
    return instance;
  }

  toData(): Record<string, any> {
    const data = classToPlain(this);
    data.notificationMethod = this.notificationMethod.toData();
    data.createdAt = this.createdAt.toISOString();
    data.updatedAt = this.updatedAt.toISOString();
    return data;
  }
}
