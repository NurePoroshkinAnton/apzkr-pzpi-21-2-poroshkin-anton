import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/base-entity.entity';
import { ClimateDevice } from 'src/climate-devices/entities/climate-device.entity';
import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Client } from 'src/clients/entities/client.entity';

@Entity()
export class Room extends BaseEntity {
  @Column()
  number: number;

  @Column()
  hotelId: string;

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
  hotel: Hotel;

  @OneToMany(() => Client, (client) => client.room)
  clients: Client[];

  @OneToMany(() => ClimateDevice, (climateDevice) => climateDevice.room)
  climateDevices: ClimateDevice[];
}
