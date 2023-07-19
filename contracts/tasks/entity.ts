import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BIMEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'string', nullable: false })
    collectionAddress: string;

    @Column({ type: 'integer', nullable: false })
    tokenId: number;

    @Column({ type: 'simple-json', nullable: true })
    properties: string;
    
    @Column({ type: 'string', nullable: false })
    tokenUri: string;
}
