import { Controller, Get, Header, Param, Post, Query, Body, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { Response } from "express"
import { OrderService } from './order.service';
import { OrderDto } from 'src/entities/order.entity';

@Controller('order')
export class OrderController {
    constructor(
        private readonly _orderService: OrderService
    ){}

    @Get()
    async getOrderArrByOwner( @Query('owner') owner: string ) {
        if( typeof owner !== 'string' ) return [];
        return this._orderService.getOrderArrByOwner( owner );
    }

    @Get()
    async getOrderArrByBuyer( @Query('buyer') buyer: string ) {
        if( typeof buyer !== 'string' ) return [];
        return this._orderService.getOrderArrByBuyer( buyer );
    }

    @Get()
    async getOrderByOwner( @Query('owner') owner: string, @Query('tokenId') tokenId: string ) {
        if( typeof owner !== 'string' || typeof tokenId !== 'string' ) return null;
        const _tokenId = parseInt( tokenId );
        if( isNaN( _tokenId ) ) return null;
        return this._orderService.getOrderByOwner( owner, tokenId );
    }

    @Get()
    async getOrderByBuyer( @Query('buyer') buyer: string, @Query('tokenId') tokenId: string ) {
        if( typeof buyer !== 'string' || typeof tokenId !== 'string' ) return null;
        const _tokenId = parseInt( tokenId );
        if( isNaN( _tokenId ) ) return null;
        return this._orderService.getOrderByOwner( buyer, tokenId );
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
