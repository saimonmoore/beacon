import { plainToClass, classToPlain } from 'class-transformer';
import { sha256 } from '#Shared/infrastructure/helpers/hash.js';
import { NotificationTemplateEntity } from '#NotificationTemplate/domain/entities/notificationTemplate.js';

export enum NotificationMethods {
  Email = 'email',
  SMS = 'sms',
  Phone = 'phone',
  PushNotification = 'pushNotification',
}

export type NotificationMethod = {
  email: string;
  phoneNumber: string;
  notificationTemplate: NotificationTemplateEntity;
};

export class NotificationMethodEntity {
  type: NotificationMethods;

  email: string;
  phoneNumber: string;
  notificationTemplate: NotificationTemplateEntity;

  static fromData(data: Record<string, any>): NotificationMethodEntity {
    const instance = plainToClass(NotificationMethodEntity, data);
    instance.notificationTemplate = NotificationTemplateEntity.fromData(data.notificationTemplate);
    return instance;
  }

  toData(): Record<string, any> {
    const data = classToPlain(this);
    data.notificationTemplate = this.notificationTemplate.toData();
    return data;
  }
}
