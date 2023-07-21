<template>
<div class="w-full px-[10%] py-16 flex flex-col justify-start items-center bg-gray-200 space-y-4"
:class="[ tabStore.activeTab === Tab.Info ? 'h-full' : 'h-fit' ]"
>
    
    <Header></Header>

    <Transition name="fade" mode="out-in">
    <Main v-if="tabStore.activeTab === Tab.Main"/>
    <Production v-else-if="tabStore.activeTab === Tab.Production"/>
    <Consumer v-else-if="tabStore.activeTab === Tab.Consumer"/>
    <Info v-else/>
    </Transition>
</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Header from '@/components/Header.vue'
import Main from '@/components/main/Main.vue'
import Info from '@/components/info/Info.vue'
import Consumer from '@/components/consumer/Consumer.vue';
import Production from '@/components/production/Production.vue';
import { Tab, useTabStore } from '@/store/tabStore';
import { useMetaMask } from './store/MetaMaskStore';

const tabStore = useTabStore();

onMounted(()=>{
    useMetaMask().init();
})
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