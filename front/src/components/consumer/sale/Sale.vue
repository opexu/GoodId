<template>
<div class="w-full h-fit rounded-3xl px-10 py-10 flex flex-col bg-white space-y-4">
    <div class="w-fit h-fit flex flex-row justify-start items-center space-x-8">
            <Third/>
            <p class="w-full h-fit text-[2rem] font-bold">Создание ордера на продажу</p>
        </div>
        <p class="w-full h-fit mt-4 text-gray-500 text-[1rem]">Для создания ордера на продажу заполните все поля. 
            <br>Будет создана транзакция, которую обработает смартконтракт блокчейна.
            <br>После успешного создания ордера вы увидите <b>номер ордера</b>, который необходимо <b>передать покупателю</b> товара
            <br>На данном этапе токен будет зарезервирован в смартконтракте на сутки. В это время вы не сможете сделать с ним никаких действий.
            <br>Если в течение суток токен не будет выкуплен, то смартконтракт возвращает его владельцу.
            <br>В случае успешной сделки смартконтракт передаст владение токеном новому владельцу
        </p>
        <div class="w-full h-fit flex flex-col justify-start items-center space-y-4">
    
        <div class="w-full h-fit flex flex-col justify-center items-start space-y-2">
            <label for="item-name" class="font-bold">Адрес кошелька покупателя</label>
            <input id="item-name" class="w-full h-fit p-4 border rounded-md focus:bg-blue-50"
            placeholder="0x7AB8Cb3a5F5196A27aF1cE1F128a1fD3477Ab9ac"
            v-model="buyerAddress"
            />
        </div>

        <div class="w-full h-fit flex flex-col justify-center items-star space-y-2">
            <label for="item-name" class="font-bold">Номер токена</label>
            <input id="item-name" type="number" min="0" class="w-full h-fit p-4 border rounded-md focus:bg-blue-50"
            placeholder="256"
            v-model="tokenId"
            />
        </div>

        <div class="w-full h-fit flex flex-col justify-center items-star space-y-2">
            <label for="item-name" class="font-bold">Цена продажи (SIBR)</label>
            <input id="item-name" type="number" min="0" class="w-full h-fit p-4 border rounded-md focus:bg-blue-50"
            placeholder="0.05"
            v-model="price"
            />
        </div>

        <button class="w-full h-fit mt-4 px-6 py-4 border rounded-md [&:not([disabled])]hover:border-orange-700 [&:not([disabled])]hover:text-orange-700 disabled:border-slate-300 disabled:text-slate-300"
        @click="onCreateSaleOrder"
        :disabled="IsDisabled"
        >Создать ордер</button>
    </div>
</div>
</template>

<script setup lang="ts">
import { useMetaMask } from '@/store/MetaMaskStore';
import { computed, ref } from 'vue';
import Third from '@/components/misc/Third.vue';

const MetaMaskStore = useMetaMask();

const buyerAddress = ref('');
const tokenId = ref();
const price = ref();

const IsDisabled = computed(()=>{
    if( buyerAddress.value.match(/^0x[a-fA-F0-9]{40}$/g) && tokenId.value && price.value ) return false
    else return true;
})

async function onCreateSaleOrder(){
    MetaMaskStore.onCreateSaleOrder( buyerAddress.value, tokenId.value, price.value )
}
</script>