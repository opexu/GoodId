<template>
<div class="w-fit h-fit">
    <canvas ref="canvas" width="300" height="300"></canvas>
</div>
</template>

<script setup lang="ts">
import QRCode from 'qrcode';
import { onMounted, ref } from 'vue';

const props = defineProps({
    link: String
})

const canvas = ref(null)
onMounted(()=>{
    console.log('canvas.value', canvas.value)
    console.log('props.link', props.link)
    console.log(typeof props.link)
    QRCode.toCanvas( canvas.value , props.link?.toString(), ( error ) => {
        console.log('Ошибка генерации QRCode', error)
    })
})
</script>