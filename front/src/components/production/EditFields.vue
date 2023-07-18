<template>
<div class="w-full h-fit flex flex-col justify-start items-center space-y-4">
    
    <div class="w-full h-fit flex flex-col justify-center items-start space-y-2">
        <label for="item-name" class="font-bold">Название</label>
        <input id="item-name" class="w-full h-fit p-4 border rounded-md focus:bg-blue-50"
        :placeholder="placeholder1"
        v-model="itemName"
        />
    </div>

    <div class="w-full h-fit flex flex-col justify-center items-star space-y-2">
        <label for="item-name" class="font-bold">Описание</label>
        <input id="item-name" class="w-full h-fit p-4 border rounded-md focus:bg-blue-50"
        :placeholder="placeholder2"
        v-model="itemDescription"
        />
    </div>

    <div class="w-full h-fit flex flex-col space-y-4">
        <p class="font-bold">Аттрибуты</p>
        <Field
        v-for="( field ) in fieldArr" :key="field.id"
        :id="field.id"
        :error="field.error"
        @set-field="onSetField"
        @remove-field="onRemoveField"
        />
        <button class="w-full h-fit p-4 border rounded-md flex flex-row justify-center items-center hover:bg-blue-100 active:bg-blue-200"
        @click="onAddField"
        >
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
            </svg>
        </button>
    </div>

    <button class="w-full h-fit mt-4 px-6 py-4 border rounded-md [&:not([disabled])]hover:border-orange-700 [&:not([disabled])]hover:text-orange-700 disabled:border-slate-300 disabled:text-slate-300"
    @click="onApplyNewCollection"
    :disabled="IsDisabled"
    >{{buttonText}}</button>
</div>
</template>

<script setup lang="ts">
import Field from './Field.vue';
import type { IField } from '@/components/interfaces/common';
import { computed, ref } from 'vue';

defineProps({
    placeholder1: String,
    placeholder2: String,
    buttonText: String,
})
const itemName = ref('')
const itemDescription = ref('')

const count = ref(0);
const fieldArr = ref<IField[]>([]);
function onAddField(){
    fieldArr.value.push({
        id: count.value,
        key: '',
        value: '',
        error: true,
    })
    count.value += 1;
    console.log('fieldArr: ', fieldArr.value)
}
function onRemoveField( id: number ){
    const index = fieldArr.value.findIndex( f => f.id === id );
    fieldArr.value.splice( index, 1 );
}
function onSetField( field: Omit<IField, 'error'> ){
    const index = fieldArr.value.findIndex( f => f.id === field.id );
    const errorFields = fieldArr.value.filter( f => f.key === field.key && f.id !== field.id );
    const error = errorFields.length > 0 ? true : false;
    fieldArr.value.splice( index, 1, { error, ...field });
}

const IsDisabled = computed(()=>{
    if( !itemName.value ) return true;
    if( !itemDescription.value ) return true;
    let result = false;
    for( let i = 0; i < fieldArr.value.length; i++ ){
        if( !fieldArr.value[i].key || !fieldArr.value[i].value ) {
            result = true;
            break;
        }
    }
    return result;
})
function onApplyNewCollection(){

}
</script>