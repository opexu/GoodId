<template>
<div class="w-full h-fit px-[10%] py-16 flex flex-col justify-start items-center bg-gray-200 space-y-4">
    
    <Header></Header>

    <Transition name="fade">
    <div class="w-full h-fit flex flex-col justify-start items-center space-y-4"
    v-if="tabStore.activeTab === Tab.Info"
    >
        <InfoBlock1/>
        <InfoBlock2/>
        <InfoBlock3/>
        <InfoBlock4/>
    </div>

    <div class="w-full h-fit flex flex-col justify-start items-center space-y-4"
    v-else-if="tabStore.activeTab === Tab.Production"
    >
        <ProdBlock1/>
        <Production/>
    </div>
    
    <div class="w-full h-fit flex flex-col justify-start items-center space-y-4"
    v-else
    >
        <Consumer/>
    </div>
    </Transition>
</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Header from '@/components/Header.vue'
import InfoBlock1 from '@/components/info/InfoBlock1.vue'
import InfoBlock2 from '@/components/info/InfoBlock2.vue'
import InfoBlock3 from '@/components/info/InfoBlock3.vue'
import InfoBlock4 from '@/components/info/InfoBlock4.vue'
import Production from '@/components/production/Production.vue';
import ProdBlock1 from '@/components/production/ProdBlock1.vue';
import Consumer from '@/components/consumer/Consumer.vue';
import { Tab, useTabStore } from '@/store/tabStore';

const tabStore = useTabStore();

onMounted(()=>{
    console.log('MOUNTD')
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