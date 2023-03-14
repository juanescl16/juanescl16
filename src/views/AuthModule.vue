<template>
    <ion-app>
        <ion-page>
            <ion-content>
                <ion-router-outlet></ion-router-outlet>
            </ion-content>
        </ion-page>
    </ion-app>
</template>
<script setup lang="ts">
import { IonRouterOutlet } from '@ionic/vue'
import { Ref, ref } from 'vue'
</script>
<style scoped>
.auth-module-body {
    display: flex;
    flex-direction: column;
}
</style>
