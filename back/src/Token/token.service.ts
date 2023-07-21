import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenDto, TokenEntity } from 'src/entities/token.entity';
import { Repository } from "typeorm";

@Injectable()
export class TokenService {
    
    constructor(
        @InjectRepository( TokenEntity )
        private readonly _tokenRepository: Repository<TokenEntity>
    ){}
    
    async getTokenArrByOwner( owner: string ) {
        const collectionArr = await this._tokenRepository.find({
            select: [ 'id', 'name', 'description' ],
            where: { ownerAddress: owner }
        })
        return collectionArr;
    }

    async getProperties( id: number ){
        const properties = await this._tokenRepository.findOne({
            where: { id }
        })
        return properties;
    }

    async createToken( collection: TokenDto ){
        return await this._tokenRepository.save( collection );
    }

    async deleteToken( id: number ){
        return await this._tokenRepository.delete( id );
    }
}
