<template>
<div class="w-full h-fit">
    <div v-if="MetaMaskStore.IsAvailable" class="w-full h-fit flex flex-col justify-start items-center space-y-4">
        <Transition name="fade" mode="out-in">
        <div class="w-full h-fit py-8 rounded-3xl flex flex-col justify-start items-center">
            <p class="w-full h-fit mt-4 items-center text-[2rem] font-bold">Пошаговая регистрация продукта</p>
        </div>
        </Transition>
        <Transition name="fade" mode="out-in">
        <component :is="stepComponents[ProductionStore.step]"
        v-if="state === State.OK"
        />
        <MetaMaskWait
        v-else-if="state === State.WAIT"
        :title="message.title"
        :message="message.message"
        />
        <MetaMaskError
        v-else
        :title="message.title"
        :message="message.message"
        />
        </Transition>
    </div>
    <MetaMaskNotFound v-else/>
</div>
</template>

<script setup lang="ts">
import MetaMaskConnect from '@/components/production/steps/0/MetaMaskConnect.vue';
import SetCollection from '@/components/production/steps/1/SetCollection.vue';
import NewCollection from '@/components/production/steps/2/NewCollection.vue';

import { onMounted, ref, toRef } from 'vue';
import { useMetaMask } from '@/store/MetaMaskStore';
import MetaMaskNotFound from '@/components/metamask/MetaMaskNotFound.vue';
import { useProductionStore } from '@/store/ProductionStore';
import MetaMaskError from '../metamask/MetaMaskError.vue';
import { State, useState } from '@/store/StateStore';
import MetaMaskWait from '../metamask/MetaMaskWait.vue';
import { storeToRefs } from 'pinia';
import ExistCollection from './steps/3/ExistCollection.vue';
import ShowQR from './steps/4/ShowQR.vue';
import { useMessageStore } from '@/store/MessageStore';
import NewToken from './steps/5/NewToken.vue';
import MetaMaskSuccessfull from './steps/6/MetaMaskSuccessfull.vue';

const { state } = storeToRefs( useState() )
const ProductionStore = useProductionStore();
const MetaMaskStore = useMetaMask();
const { message } = storeToRefs( useMessageStore() );

const stepComponents = [
    MetaMaskConnect, 
    SetCollection, 
    NewCollection,
    ExistCollection,
    ShowQR,
    NewToken,
    MetaMaskSuccessfull
]

onMounted(() => {

})
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