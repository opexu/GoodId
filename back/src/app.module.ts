import { Module } from '@nestjs/common';
import { CollectionController } from './Collection/collection.controller';
import { TokenController } from './Token/token.controller';
import { CollectionService } from './Collection/collection.service';
import { TokenService } from './Token/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { CollectionEntity } from './entities/collection.entity';
import { TokenEntity } from './entities/token.entity';
import { OrderEntity } from './entities/order.entity';
import { OrderController } from './Order/order.controller';
import { OrderService } from './Order/order.service';

@Module({
    imports: [
        TypeOrmModule.forRoot( typeOrmConfig ),
        TypeOrmModule.forFeature([ CollectionEntity, TokenEntity, OrderEntity ])
    ],
    controllers: [ 
        CollectionController,
        TokenController,
        OrderController,
    ],
    providers: [ 
        CollectionService,
        TokenService,
        OrderService,
    ],
})
export class AppModule { }
