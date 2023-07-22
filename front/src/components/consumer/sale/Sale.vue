<template>
<div class="w-full h-fit">
    <SaleOrder
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
</div>
</template>

<script setup lang="ts">
import SaleOrder from './SaleOrder.vue';
import { storeToRefs } from 'pinia';
import { State, useState } from '@/store/StateStore';
import MetaMaskWait from '@/components/metamask/MetaMaskWait.vue';
import MetaMaskError from '@/components/metamask/MetaMaskError.vue';
import { useMessageStore } from '@/store/MessageStore';

const { state } = storeToRefs( useState() )
const { message } = storeToRefs( useMessageStore() );
</script>