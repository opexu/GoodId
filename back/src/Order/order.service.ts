import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto, OrderEntity } from 'src/entities/order.entity';
import { Repository } from "typeorm";

const ID_NFT_MARKET = '0x4e2177e1dC5F49F441aBff77880c0247279d2c1a';

@Injectable()
export class OrderService {
    
    constructor(
        @InjectRepository( OrderEntity )
        private readonly _orderRepository: Repository<OrderEntity>
    ){}
    
    async getOrderArrByOwner( owner: string ){
        const orderArr = await this._orderRepository.find({
            where: { ownerAddress: owner }
        })
        return orderArr;
    }

    async getOrderArrByBuyer( buyer: string ){
        try{
            const orderArr = await this._orderRepository
                .query(`
                    select * from order_entity oe
                    inner join token_entity te on ( te."tokenId" = oe."tokenId" and te."contractAddress" = oe."contractAddress" )
                    where oe."buyerAddress" = '${buyer}' and te."ownerAddress" = '${ID_NFT_MARKET}' and oe.status = 'ACTIVE_ORDER'
                `)
            return orderArr;
        }catch(e){
            console.error('Ошибка получения информации о токене из ордера')
            return [];
        }
        
        
    }

    async getOrderByBuyer( buyer: string, orderId: string ){
        const order = await this._orderRepository.findOne({
            where: {
                buyerAddress: buyer,
                orderId: orderId
            }
        })
        return order;
    }

    async createOrder( order: OrderDto ){
        return await this._orderRepository.save( order );
    }

    async deleteOrder( id: number ){
        return await this._orderRepository.delete( id );
    }
}
