import { Controller, Get, Header, Param, Post, Query, Body, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { Response } from "express"
import { TokenService } from './token.service';
import { TokenDto } from 'src/entities/token.entity';

@Controller('token')
export class TokenController {
    constructor(
        private readonly _tokenService: TokenService
    ){}

    @Get()
    async getTokenArr( @Query('owner') owner: string ) {
        if( typeof owner !== 'string' ) return [];
        return this._tokenService.getTokenArrByOwner( owner );
    }

    @Get('properties')
    async getProperties( @Query('id') id: string, @Res() res: Response ){
        const _id = parseInt( id );
        if( isNaN( _id ) ) res.status( HttpStatus.INTERNAL_SERVER_ERROR ).send();
        const properties = await this._tokenService.getProperties( _id );
        res.send(properties);
    }

    @Post()
    @Header('Content-Type', 'application/json')
    async saveToken( @Body() body: TokenDto ){
        console.log('body: ', body)
        try {
            return await this._tokenService.createToken( body );
        }catch(e){
            console.error(e);
            return null;
        }
    }

    @Delete()
    async deleteToken( @Query('id') id: string, @Res() res: Response ){
        const _id = parseInt( id );
        if( isNaN( _id ) ) res.status( HttpStatus.INTERNAL_SERVER_ERROR ).send();
        const deleteResult = await this._tokenService.deleteToken( _id );
        return deleteResult;
    }
}
