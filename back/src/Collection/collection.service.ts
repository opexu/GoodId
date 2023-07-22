import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CollectionDto, CollectionEntity } from 'src/entities/collection.entity';
import { Repository, Not, IsNull } from "typeorm";

@Injectable()
export class CollectionService {
    
    constructor(
        @InjectRepository( CollectionEntity )
        private readonly _collectionRepository: Repository<CollectionEntity>
    ){}
    
    async getCollectionArrByOwner( owner: string ) {
        const collectionArr = await this._collectionRepository.find({
            where: { 
                ownerAddress: owner, 
                contractAddress: Not(IsNull()) 
            }
        })
        return collectionArr;
    }

    async getProperties( id: number ){
        const properties = await this._collectionRepository.findOne({
            where: { id }
        })
        return properties;
    }

    async createCollection( collection: CollectionDto ){
        return await this._collectionRepository.save( collection );
    }

    async deleteCollection( id: number ){
        return await this._collectionRepository.delete( id );
    }
}
