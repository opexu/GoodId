import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class TokenEntity extends BaseEntity {

    @Index('token-id-idx')
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer', nullable: true })
    tokenId: number;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'varchar', nullable: false })
    contractAddress: string;

    @Index('token-owner-idx')
    @Column({ type: 'varchar', nullable: false })
    ownerAddress: string;

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

export class TokenDto {
    public tokenId?: number;
    public description?: string;
    public properties?: {[key:string]:string};
    constructor(
        public name: string,
        public contractAddress: string,
        public ownerAddress: string,        
    ){}
}