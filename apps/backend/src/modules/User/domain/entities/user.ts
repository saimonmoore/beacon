import { plainToClass, classToPlain } from 'class-transformer';
import { sha256 } from "#Shared/infrastructure/helpers/hash.js";

export enum Sex {
  Male = "m",
  Female = "f",
  Other = "o",
}

// DTO
export type User = {
  hash?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  sex: Sex;
  profilePictureUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export class UserEntity {
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  dateOfBirth: Date = new Date();
  sex: Sex = Sex.Other;
  profilePicture: string = '';
  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  static fromData(data: Record<string, any>): User {
    const instance = plainToClass(UserEntity, data);

    instance.hash = data.hash || sha256(data.email);
    instance.password = sha256(data.password);
    instance.dateOfBirth = new Date(data.dateOfBirth);
    instance.createdAt = new Date(data.createdAt);
    instance.updatedAt = new Date(data.updatedAt);

    return instance;
  }

  toData(): Record<string, any> {
    const data = classToPlain(this);
    data.dateOfBirth = this.dateOfBirth.toISOString();
    data.createdAt = this.createdAt.toISOString();
    data.updatedAt = this.updatedAt.toISOString();

    return data;
  }
}
