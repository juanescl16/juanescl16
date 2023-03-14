<template>
    <ion-app>
        <ion-content class="ion-padding">
            <page-header></page-header>
            <page-title>Seleccione la sede</page-title>
            <ion-list>
                <ion-item v-for="venue in venues" :key="venue.id" :detail="true" @click.prevent="selectVenue(venue)">
                    <ion-label class="ion-text-wrap venue-name">{{ venue.name }}</ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-app>
</template>
<script setup lang="ts">
import { useVecindappApiClient } from '@/apiClients/vecindappApiClient'
import { Venue } from '@/interfaces/interfaces'
import { IonList } from '@ionic/vue'

import { useStore } from '@/stores/mainStore'
import { Ref, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const vecindappClient = useVecindappApiClient()

const venues: Ref<Venue[]> = ref([])

const loadVenues = async (): Promise<void> => {
    const user = store.user
    const profile = store.profile
    if (!user || !profile) {
        router.push({ name: 'login' })
        return
    }
    const { data }: { data: Venue[] } = await vecindappClient.get(`users/${user.id}/venues`, { profile_id: profile.id })
    if (data.length === 1) {
        selectVenue(data[0])
        return
    }
    venues.value = data
}

const selectVenue = (venue: Venue) => {
    store.$patch({ venue })
    router.push({ name: 'dashboardPage' })
}

onMounted(() => {
    loadVenues()
})
</script>
<style scoped>
.venue-name {
    font-weight: bold;
}
ion-item::part(native) {
    background: none;
    color: #fff;

    border-color: #fff;
    border-style: solid;
    border-width: 1px;

    border-radius: 10px;
}
</style>
