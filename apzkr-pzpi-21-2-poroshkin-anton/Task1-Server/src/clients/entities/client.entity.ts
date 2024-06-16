import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/base-entity.entity';
import { ClimateProfile } from 'src/climate-profiles/entities/climate-profile.entity';
import { Room } from 'src/rooms/entities/room.entity';

@Entity()
export class Client extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  roomId: string;

  @ManyToOne(() => Room, (room) => room.clients)
  room: Room;

  @OneToMany(() => ClimateProfile, (profile) => profile.client)
  climateProfiles: ClimateProfile[];
}
