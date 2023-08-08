import { plainToClass, classToPlain } from 'class-transformer';
import { sha256 } from '#Shared/infrastructure/helpers/hash.js';
import { ContactEntity } from '#Contact/domain/entities/contact.js';

export type Settings = {
  userId: string;
  contacts: ContactEntity[];
};

export class SettingsEntity {
  userId: string;
  contacts: ContactEntity[];

  static fromData(data: Record<string, any>): SettingsEntity {
    const instance = plainToClass(SettingsEntity, data);

    instance.contacts = data.contacts.map((contactData: any) => {
      const contact = ContactEntity.fromData(contactData);
      return contact;
    });

    return instance;
  }

  toData(): Record<string, any> {
    const data = classToPlain(this);

    data.contacts = this.contacts.map((contact) => contact.toData());

    return data;
  }
}
