<template>
<div>
    <Transition name="fade" mode="out-in">
    <ExistCollection
    v-if="useState().saleState === SaleState.WAIT_COLLECTION"
    @collection-selected="onCollectionSelected"/>
    
    <ExistToken
    v-else-if="useState().saleState === SaleState.WAIT_TOKEN"
    @token-selected="onTokenSelected"
    />

    <SaleCreate
    v-else-if="useState().saleState === SaleState.WAIT_ORDER"
    />
    
    <MetaMaskSuccessfull
    v-else/>
    </Transition>
</div>
</template>

<script setup lang="ts">
import type { ICollectionItem, ITokenItem } from '@/components/interfaces/common';
import ExistCollection from '@/components/production/steps/3/ExistCollection.vue';
import ExistToken from '@/components/consumer/sale/ExistToken.vue';
import SaleCreate from './SaleCreate.vue';
import MetaMaskSuccessfull from '@/components/production/steps/6/MetaMaskSuccessfull.vue';
import { SaleState, useState } from '@/store/StateStore';

function onCollectionSelected( collection: ICollectionItem ){
    useState().setSaleState( SaleState.WAIT_TOKEN )
}

function onTokenSelected( token: ITokenItem ){
    useState().setSaleState( SaleState.WAIT_ORDER )
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>