<template>
    <ion-label>
        {{ venue?.name ?? 'No hay sede seleccionada' }}
    </ion-label>
</template>
<script setup lang="ts">
import { useStore } from '@/stores/mainStore'
import { Ref, ref } from 'vue'
import { storeToRefs } from 'pinia'
const { venue } = storeToRefs(useStore())
</script>
