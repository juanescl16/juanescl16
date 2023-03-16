<template>
    <ion-button @click="router.back()"> <ion-icon :icon="chevronBackOutline"></ion-icon> Volver </ion-button>
</template>
<script setup lang="ts">
import { IonButton } from '@ionic/vue'
import { chevronBackOutline } from 'ionicons/icons'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
<style scoped>
ion-button {
    --color: #ffffff;
}
</style>
