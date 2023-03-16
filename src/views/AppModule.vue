<template>
    <ion-app>
        <ion-page>
            <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <back-button v-if="route.name !== 'dashboardPage'"></back-button>
                        <ion-button color="clear" v-else class="text-white rotate-180">
                            <ion-icon :icon="logOutOutline"></ion-icon>
                        </ion-button>
                    </ion-buttons>
                    <ion-button slot="end" color="clear">
                        <ion-icon :icon="personCircleOutline"></ion-icon>
                    </ion-button>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <ion-router-outlet></ion-router-outlet>
            </ion-content>
        </ion-page>
    </ion-app>
</template>
<script setup lang="ts">
import { IonRouterOutlet } from '@ionic/vue'
import { personCircleOutline, logOutOutline } from 'ionicons/icons'
import { Ref, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

console.log({ route })
</script>
<style scoped>
.auth-module-body {
    display: flex;
    flex-direction: column;
}
</style>
