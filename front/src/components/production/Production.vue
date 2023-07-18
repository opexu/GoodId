<template>
<div class="w-full h-fit">
    <div v-if="MetaMaskStore.IsAvailable" class="w-full h-fit flex flex-col justify-start items-center space-y-4">
        <Transition name="fade" mode="out-in">
        <div class="w-full h-fit py-8 rounded-3xl flex flex-col justify-start items-center">
            <p class="w-full h-fit mt-4 items-center text-[2rem] font-bold">Пошаговая регистрация продукта</p>
        </div>
        </Transition>
        <Transition name="fade" mode="out-in">
        <component :is="stepComponents[ProductionStore.step]"/>
        </Transition>
    </div>
    <MetaMaskNotFound v-else/>
</div>
</template>

<script setup lang="ts">
import MetaMaskConnect from '@/components/metamask/MetaMaskConnect.vue';
import { onMounted } from 'vue';
import { useMetaMask } from '@/store/MetaMaskStore';
import MetaMaskNotFound from '@/components/metamask/MetaMaskNotFound.vue';
import { useProductionStore } from '@/store/ProductionStore';
import SetCollection from '@/components/production/SetCollection.vue';
import Collection from '@/components/production/Collection.vue';
const ProductionStore = useProductionStore();
const MetaMaskStore = useMetaMask();

const stepComponents = [
    MetaMaskConnect, SetCollection, Collection
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