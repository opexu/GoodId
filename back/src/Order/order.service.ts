import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto, OrderEntity } from 'src/entities/order.entity';
import { Repository } from "typeorm";

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
        const orderArr = await this._orderRepository.find({
            where: { buyerAddress: buyer }
        })
        return orderArr;
    }

    async getOrderByOwner( owner: string, tokenId: string ){
        const order = await this._orderRepository.findOne({
            where: {
                ownerAddress: owner,
                tokenId: tokenId
            }
        })
        return order;
    }

    async getOrderByBuyer( buyer: string, tokenId: string ){
        const order = await this._orderRepository.findOne({
            where: {
                buyerAddress: buyer,
                tokenId: tokenId
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
