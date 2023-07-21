<template>
<div class="w-full h-fit">
    <Transition name="fade" mode="out-in">
    <MetaMaskConnect
    v-if="!MetaMaskStore.IsConnected"
    @metamask-connected="onMetaMaskConnected"
    />
    <div class="w-full h-fit px-16 py-8 rounded-3xl flex flex-row justify-start items-center bg-white space-x-16"
    v-else
    >
        <div class="w-fit h-fit flex flex-row justify-start items-center">
            <CollectionLogo/>
        </div>
        <div class="w-full h-fit flex flex-col justify">
            <div class="w-fit h-fit flex flex-row justify-start items-center space-x-8">
                <Second/>
                <p class="w-full h-fit text-[2rem] font-bold">Покупка / продажа ?</p>
            </div>
            <p class="w-full h-fit mt-4 text-gray-500 text-[1rem]">Выберите желаемое действие<br>Для совершения сделки по покупке продукта выберите "Покупка"<br>Если желаете продать продукт, нажмите на кнопку "Продажа"</p>
            <div class="w-full h-fit flex flex-row justify-start space-x-8">
                <button class="w-full h-fit mt-4 px-6 py-2 border rounded-md hover:border-orange-700 hover:text-orange-700"
                @click="useMarketStore().SetState( MarketState.Buy )"
                >
                    Покупка
                </button>
                <button class="w-full h-fit mt-4 px-6 py-2 border rounded-md hover:border-orange-700 hover:text-orange-700"
                @click="useMarketStore().SetState( MarketState.Sale )"
                >
                    Продажа
                </button>
            </div>
        </div>
    </div>
    </Transition>
</div>
</template>

<script setup lang="ts">
import MetaMaskConnect from '@/components/production/steps/0/MetaMaskConnect.vue';
import { useMetaMask } from '@/store/MetaMaskStore';
import Second from '@/components/misc/Second.vue';
import CollectionLogo from '@/components/misc/CollectionLogo.vue';
import { MarketState, useMarketStore } from '@/store/MarketStore';
const MetaMaskStore = useMetaMask();

function onMetaMaskConnected(){
    // TODO Maybe
}
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