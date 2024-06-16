import { BaseEntity } from 'src/common/base-entity.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Room } from 'src/rooms/entities/room.entity';

export enum ClimateDeviceType {
  Thermostat = 'thermostat',
  Humidistat = 'humidistat',
}

export enum ClimateDeviceStatus {
  Ok = 'ok',
  Warning = 'warning',
  Error = 'error',
}

@Entity()
export class ClimateDevice extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ClimateDeviceType,
  })
  type: ClimateDeviceType;

  @Column()
  address: string;

  @Column()
  accessionNumber: string;

  @Column()
  manufacturer: string;

  @Column({
    type: 'enum',
    enum: ClimateDeviceStatus,
    default: ClimateDeviceStatus.Ok,
  })
  status: ClimateDeviceStatus;

  @Column()
  roomId: string;

  @ManyToOne(() => Room, (room) => room.climateDevices)
  room: Room;
}
