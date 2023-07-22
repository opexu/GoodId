<template>
<div>
    <Transition name="fade" mode="out-in">
    <ExistOrder
    v-if="useState().buyState === BuyState.WAIT_ORDER"/>
    <MetaMaskSuccessfull
    v-else/>
    </Transition>
</div>
</template>

<script setup lang="ts">
import { BuyState, useState } from '@/store/StateStore';
import ExistOrder from './ExistOrder.vue';
import MetaMaskSuccessfull from '@/components/production/steps/6/MetaMaskSuccessfull.vue';
</script>