<template>
<div class="w-full h-full p-4 rounded-3xl bg-white">
    <iframe ref="iframeRef" class="w-full h-full min-h-[1000px]" 
    :src="explorerUri"
    ></iframe>
</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

defineExpose({ reload })

const props = defineProps({
    ownerAddress: String,
})

const iframeRef = ref<HTMLIFrameElement|null>(null)
const explorerUri = computed(() => {
    return 'https://explorer.test.siberium.net/address/' + props.ownerAddress + '/tokens#address-tabs' + '?=' + count.value
})

// const explorerUri = ref('');
const count = ref(0);
function reload(){
    count.value += 1
    // if( !iframeRef.value ) return
    // iframeRef.value.contentDocument?.location.reload()
    // explorerUri.value = 'https://explorer.test.siberium.net/address/' + props.ownerAddress + '/tokens#address-tabs' + '?=' + count++
}
</script>