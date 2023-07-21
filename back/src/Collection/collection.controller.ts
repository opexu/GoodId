import { Controller, Get, Header, Param, Post, Query, Body, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { Response } from "express"
import { CollectionService } from './collection.service';
import { CollectionDto } from 'src/entities/collection.entity';

@Controller('collection')
export class CollectionController {
    constructor(
        private readonly _collectionService: CollectionService
    ){}

    @Get()
    async getCollectionArr( @Query('owner') owner: string ) {
        if( typeof owner !== 'string' ) return [];
        return this._collectionService.getCollectionArrByOwner( owner );
    }

    @Get('properties')
    async getProperties( @Query('id') id: string, @Res() res: Response ){
        const _id = parseInt( id );
        if( isNaN( _id ) ) res.status( HttpStatus.INTERNAL_SERVER_ERROR ).send();
        const properties = await this._collectionService.getProperties( _id );
        res.send(properties);
    }

    @Post()
    @Header('Content-Type', 'application/json')
    async saveCollection( @Body() body: CollectionDto ){
        console.log('body: ', body)
        try {
            return await this._collectionService.createCollection( body );
        }catch(e){
            console.error(e);
            return null;
        }
    }

    @Delete()
    async deleteCollection( @Query('id') id: string, @Res() res: Response ){
        const _id = parseInt( id );
        if( isNaN( _id ) ) res.status( HttpStatus.INTERNAL_SERVER_ERROR ).send();
        const deleteResult = await this._collectionService.deleteCollection( _id );
        return deleteResult;
    }
}
