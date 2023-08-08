import { plainToClass, classToPlain } from 'class-transformer';
import { sha256 } from '#Shared/infrastructure/helpers/hash.js';
import { LocationEntity } from '#Location/domain/entities/location.js';
import { ActivityEntity } from '#Activity/domain/entities/activity.js';

export enum BeaconStatus {
  Active = 'active',
  InActive = 'inactive',
  Alarm = 'alarm',
}

// DTO
export type Beacon = {
  userId: string;
  location: LocationEntity;
  timestamp: Date;
  periodOfTime: number;
  activity: ActivityEntity;
  beaconStatus: BeaconStatus;
  createdAt: Date;
  updatedAt: Date;
};

// Join Table
export class BeaconEntity {
  userId: string;
  location: LocationEntity;
  timestamp: Date;
  periodOfTime: number;
  activity: ActivityEntity;
  beaconStatus: BeaconStatus = BeaconStatus.Active;
  createdAt: Date;
  updatedAt: Date;

  static fromData(data: Record<string, any>): BeaconEntity {
    const instance = plainToClass(BeaconEntity, data);
    instance.location = LocationEntity.fromData(data.location);
    instance.activity = ActivityEntity.fromData(data.activity);
    instance.createdAt = new Date(data.createdAt);
    instance.updatedAt = new Date(data.updatedAt);
    return instance;
  }

  toData(): Record<string, any> {
    const data = classToPlain(this);
    data.location = this.location.toData();
    data.activity = this.activity.toData();
    data.createdAt = this.createdAt.toISOString();
    data.updatedAt = this.updatedAt.toISOString();
    return data;
  }
}
