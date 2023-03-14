<template>
    <button class="rombo-btn">
        <div class="text-container">
            <slot></slot>
        </div>
    </button>
</template>
<script setup lang="ts">
import { Ref, ref } from 'vue'
</script>
<style scoped>
.rombo-btn {
    display: block;
    padding: 5px 5px;
    width: 130px;
    height: 130px;
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
}
</style>
