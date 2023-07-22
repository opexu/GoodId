import { Controller, Get, Header, Param, Post, Query, Body, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { Response } from "express"
import { OrderService } from './order.service';
import { OrderDto } from 'src/entities/order.entity';

@Controller('order')
export class OrderController {
    constructor(
        private readonly _orderService: OrderService
    ){}

    @Get('owner')
    async getOrderArrByOwner( @Query('owner') owner: string ) {
        if( typeof owner !== 'string' ) return [];
        return this._orderService.getOrderArrByOwner( owner );
    }

    @Get('buyer')
    async getOrderArrByBuyer( @Query('buyer') buyer: string ) {
        if( typeof buyer !== 'string' ) return [];
        return this._orderService.getOrderArrByBuyer( buyer );
    }

    @Get('one')
    async getOrderByBuyer( @Query('buyer') buyer: string, @Query('orderId') orderId: string ) {
        if( typeof buyer !== 'string' || typeof orderId !== 'string' ) return null;
        if( isNaN( parseInt( orderId ) ) ) return null;
        return this._orderService.getOrderByBuyer( buyer, orderId );
    }

    @Post()
    @Header('Content-Type', 'application/json')
    async saveCollection( @Body() body: OrderDto ){
        console.log('body: ', body)
        try {
            return await this._orderService.createOrder( body );
        }catch(e){
            console.error(e);
            return null;
        }
    }

    @Delete()
    async deleteOrder( @Query('id') id: string, @Res() res: Response ){
        const _id = parseInt( id );
        if( isNaN( _id ) ) res.status( HttpStatus.INTERNAL_SERVER_ERROR ).send();
        const deleteResult = await this._orderService.deleteOrder( _id );
        return deleteResult;
    }
}
