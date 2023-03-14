<template>
    <button class="rombo-btn">
        <div class="text-container">
            <img :src="`/assets/icon/${icon}.png`" alt="" v-if="!!icon" class="button-icon" />
            <slot></slot>
        </div>
    </button>
</template>
<script setup lang="ts">
import { Ref, ref, toRefs } from 'vue'
const props = defineProps<{
    icon?: string
}>()
const { icon } = toRefs(props)
console.log({ icon })
</script>
<style scoped>
.rombo-btn {
    display: block;
    padding: 5px 5px;
    width: 135px;
    height: 135px;
    font-size: 14px;
    color: white;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    background: linear-gradient(to bottom right, #9d62f5, #6049cd);
    border: none;
    border-radius: 10px;
    transform: rotate(45deg);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
}
.text-container {
    transform: rotate(-45deg);
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.button-icon {
    max-width: 45px;
}
</style>
