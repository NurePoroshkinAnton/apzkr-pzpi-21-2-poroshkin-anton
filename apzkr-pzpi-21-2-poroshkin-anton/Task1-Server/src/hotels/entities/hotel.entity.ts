import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/base-entity.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Company } from 'src/companies/entities/company.entity';

@Entity()
export class Hotel extends BaseEntity {
  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  companyId: string;

  @ManyToOne(() => Company, (company) => company.hotels)
  company: Company;

  @OneToMany(() => Room, (room) => room.hotel)
  rooms: Room[];
}
