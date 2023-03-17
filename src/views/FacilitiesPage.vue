<template>
    <ion-page>
        <ion-content class="ion-padding">
            <app-logo></app-logo>
            <page-title>Zonas Comunes</page-title>
            <ion-list class="list">
                <list-item v-for="facility in facilities" :key="facility.id">
                    <template #start>
                        <item-icon>
                            <ion-icon :icon="basketballOutline"></ion-icon>
                        </item-icon>
                    </template>
                    <div class="item-title">{{ facility.name }}</div>
                    <template #end>
                        <ion-button>Reservar</ion-button>
                    </template>
                </list-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { useVecindappApiClient } from '@/apiClients/vecindappApiClient'
import { useStore } from '@/stores/mainStore'
import { Ref, ref, toRefs, onMounted } from 'vue'
import { Facility } from '@/interfaces/interfaces'
import { basketballOutline } from 'ionicons/icons'
import { IonButton } from '@ionic/vue'

const { venue } = toRefs(useStore())
const vecindappClient = useVecindappApiClient()
const facilities: Ref<Facility[]> = ref([])

const loadFacilities = async (): Promise<void> => {
    if (!venue.value) return
    const { data }: { data: Facility[] } = await vecindappClient.get(`venues/${venue.value.id}/facilities`)
    facilities.value = data
}

onMounted(() => {
    loadFacilities()
})
</script>
