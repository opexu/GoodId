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
        const tokenArr = await this._tokenRepository.find({
            select: [ 'id', 'name', 'description' ],
            where: { ownerAddress: owner }
        })
        return tokenArr;
    }

    async getCollectionTokenArr( owner: string, contract: string ){
        const tokenArr = await this._tokenRepository.find({
            where: { 
                ownerAddress: owner,
                contractAddress: contract,
            }
        })
        return tokenArr;
    }

    async getToken( owner: string, contract: string, tokenId: string ){
        const token = await this._tokenRepository.findOne({
            where: { 
                ownerAddress: owner,
                contractAddress: contract,
                tokenId: tokenId,
            }
        })
        return token;
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
