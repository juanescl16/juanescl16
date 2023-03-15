<template>
    <div class="page-title">
        <slot />
    </div>
</template>
<script setup lang="ts">
import { Ref, ref } from 'vue'
</script>
<style scoped>
.page-title {
    font-weight: bold;
    font-size: 1.6rem;
    text-align: center;
    margin: 25px 0;
}
</style>
