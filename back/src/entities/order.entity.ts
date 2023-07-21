import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class OrderEntity extends BaseEntity {

    @Index('order-id-idx')
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: false })
    tokenId: string;

    @Column({ type: 'varchar', nullable: false })
    contractAddress: string;

    @Column({ type: 'varchar', nullable: false })
    buyerAddress: string;

    @Column({ type: 'varchar', nullable: false })
    ownerAddress: string;

    @Column({ type: 'varchar', nullable: false })
    orderId: string;

    @Column({ type: 'varchar', nullable: false })
    status: string;

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

export class OrderDto {
    constructor(
        public tokenId: string,
        public contractAddress: string,
        public buyerAddress: string,
        public ownerAddress: string,
        public status: string,      
    ){}
}