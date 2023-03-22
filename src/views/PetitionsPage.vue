<template>
    <ion-page>
        <ion-content class="ion-padding">
            <app-logo></app-logo>
            <page-title>PQRS</page-title>
            <div class="text-center">
                <ion-button @click="router.push({ name: 'newsletterFormPage' })">Nuevo +</ion-button>
                <ion-button @click="router.push({ name: 'petitionFormPage' })">Nuevo +</ion-button>
                <!-- <ion-button v-if="canCreatePetitions" @click="router.push({ name: 'newsletterFormPage' })">Nuevo +</ion-button> -->
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { useVecindappApiClient } from '@/apiClients/vecindappApiClient'
import { useStore } from '@/stores/mainStore'
import { Ref, ref, onMounted, computed } from 'vue'
import { Newsletter, Paginated } from '../interfaces/interfaces'
import { IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/vue'
import { attachOutline, documentTextOutline } from 'ionicons/icons'
import { PaginatorInit } from '@/initializers/initializers'
import { IonInfiniteScrollCustomEvent } from '@ionic/core'
import { useTempStore } from '@/stores/tempStore'
import { useRouter } from 'vue-router'
import { userCan } from '@/security/security'

const router = useRouter()
const store = useStore()
const tempStore = useTempStore()
const vecindappClient = useVecindappApiClient()

const canCreatePetitions: Ref<boolean> = ref(userCan('creacion-de-pqrs'))
</script>

<style></style>
