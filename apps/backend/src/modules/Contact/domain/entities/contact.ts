import { plainToClass, classToPlain } from 'class-transformer';
import { sha256 } from '#Shared/infrastructure/helpers/hash.js';
import { NotificationRuleEntity } from '#NotificationRule/domain/entities/notificationRule.js';

export type Contact = {
  userId: string;
  notificationRules: NotificationRuleEntity[];
  createdAt: Date;
  updatedAt: Date;
};

export class ContactEntity {
  userId: string;
  notificationRules: NotificationRuleEntity[];
  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  static fromData(data: Record<string, any>): ContactEntity {
    const instance = plainToClass(ContactEntity, data);
    instance.notificationRules = data.notificationRules.map((ruleData: any) => {
      const rule = NotificationRuleEntity.fromData(ruleData);
      return rule;
    });
    // TODO: Look up and assign User
    instance.createdAt = new Date(data.createdAt);
    instance.updatedAt = new Date(data.updatedAt);
    return instance;
  }

  toData(): Record<string, any> {
    const data = classToPlain(this);

    data.notificationRules = this.notificationRules.map((rule) => rule.toData());
    data.createdAt = this.createdAt.toISOString();
    data.updatedAt = this.updatedAt.toISOString();

    return data;
  }
}
