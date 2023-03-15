<template>
    <div class="item-icon">
        <div class="item-icon-content">
            <slot></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Ref, ref } from 'vue'
// const props = defineProps<{

// }>()
</script>
<style scoped>
.item-icon {
    min-width: 35px;
    min-height: 35px;
    border-radius: 6px;
    transform: rotate(45deg);
    background: linear-gradient(#9d62f5, #6049cd);
    display: flex;
    justify-content: center;
    align-items: center;
}

.item-icon-content {
    transform: rotate(-45deg);
}
</style>
