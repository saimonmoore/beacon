import { plainToClass, classToPlain } from 'class-transformer';
import { sha256 } from '#Shared/infrastructure/helpers/hash.js';

export type NotificationTemplate = {
  text: string;
  createdAt: Date;
  updatedAt: Date;
};

export class NotificationTemplateEntity {
  text: string;
  createdAt: Date;
  updatedAt: Date;

  static fromData(data: Record<string, any>): NotificationTemplateEntity {
    const instance = plainToClass(NotificationTemplateEntity, data);
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
