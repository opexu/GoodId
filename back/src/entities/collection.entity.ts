import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class CollectionEntity extends BaseEntity {

    @Index('collection-id-idx')
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Index('collection-owner-idx')
    @Column({ type: 'varchar', nullable: false })
    ownerAddress: string;

    @Column({ type: 'varchar', nullable: true })
    contractAddress: string;

    @Column({ type: 'simple-json', nullable: true })
    properties: {[key:string]:string};

    @CreateDateColumn({
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP(6)'
    })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    updated_at: Date;

}

export class CollectionDto {
    public description?: string;
    public properties?: {[key:string]:string};
    public contractAddress?: string;
    constructor(
        public name: string,
        public ownerAddress: string,        
    ){}
}