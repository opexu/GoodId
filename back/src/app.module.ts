import { Module } from '@nestjs/common';
import { CollectionController } from './Collection/collection.controller';
import { TokenController } from './Token/token.controller';
import { CollectionService } from './Collection/collection.service';
import { TokenService } from './Token/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { CollectionEntity } from './entities/collection.entity';
import { TokenEntity } from './entities/token.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot( typeOrmConfig ),
        TypeOrmModule.forFeature([ CollectionEntity, TokenEntity ])
    ],
    controllers: [ 
        CollectionController,
        TokenController,
    ],
    providers: [ 
        CollectionService,
        TokenService,
    ],
})
export class AppModule { }
