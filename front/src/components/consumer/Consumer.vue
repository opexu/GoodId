<template>
<div class="w-full h-fit flex flex-col justify-start items-center space-y-4">
    <div class="w-full h-fit flex flex-col justify-start items-center space-y-4"
    v-if="MetaMaskStore.IsAvailable" 
    >
        <Transition name="fade" mode="out-in">
        <div class="w-full h-fit py-8 rounded-3xl flex flex-col justify-start items-center">
            <p class="w-full h-fit mt-4 items-center text-[2rem] font-bold">Покупка и продажа</p>
        </div>
        </Transition>

        <Transition name="fade" mode="out-in">
            <MarketInfo v-if="MarketStore.state === MarketState.None"/>
            <Sale v-else-if="MarketStore.state === MarketState.Sale"/>
            <Buy v-else/>
        </Transition>
    </div>
    <MetaMaskNotFound v-else/>
</div>
</template>

<script setup lang="ts">
import { useMetaMask } from '@/store/MetaMaskStore';
import MarketInfo from './MarketInfo.vue';
import Sale from './sale/Sale.vue';
import Buy from './buy/Buy.vue';
import MetaMaskNotFound from '@/components/metamask/MetaMaskNotFound.vue';
import { MarketState, useMarketStore } from '@/store/MarketStore';

const MetaMaskStore = useMetaMask();
const MarketStore = useMarketStore();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>