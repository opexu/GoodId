<template>
<div class="w-full h-fit flex flex-col">
    <div>

    </div>
    <div class="w-full h-fit flex flex-row space-x-4">
        <input class="w-full h-fit px-6 py-4 rounded-lg focus:bg-blue-50" placeholder="IMEI" type="text" :maxlength="255"
        :class="[ error ? 'border-red-500 border' : 'border' ]"
        v-model="key"
        @input="onChangeKey"
        />
        <input class="w-full h-fit px-6 py-4 border rounded-lg focus:bg-blue-50" placeholder="12345678" type="text" :maxlength="255"
        v-model="value"
        @input="onChangeValue"
        />
        <button class="w-fit h-full p-4 border rounded-lg hover:bg-orange-100 active:bg-orange-200"
        @click="$emit('remove-field', id )"
        >
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
        </button>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits([ 'remove-field', 'set-field' ])
const props = defineProps({
    id: {
        required: true,
        type: Number
    },
    error: {
        required: true,
        type: Boolean
    }
})

const key = ref('');
const value = ref('');

function onChangeKey(){
    key.value.trim();
    if( key.value !== '' && value.value !== '') emit('set-field', { id: props.id, key: key.value, value: value.value });
}

function onChangeValue(){
    value.value.trim();
    if( key.value !== '' && value.value !== '') emit('set-field', { id: props.id, key: key.value, value: value.value });
}
</script>