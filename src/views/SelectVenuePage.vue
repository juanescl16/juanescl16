<template>
    <ion-app>
        <ion-content class="ion-padding">
            <page-header></page-header>
            <page-title>Seleccione la sede</page-title>
            <ion-list class="venue-list" :inset="true">
                <ion-item v-for="person in people" :key="person.id" :detail="true" @click.prevent="selectPerson(person)" class="venue-list-item">
                    <ion-label class="ion-text-wrap venue-name">{{ person.venue.name }}</ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-app>
</template>
<script setup lang="ts">
import { useVecindappApiClient } from '@/apiClients/vecindappApiClient'
import { Person } from '@/interfaces/interfaces'
import { IonList } from '@ionic/vue'

import { useStore } from '@/stores/mainStore'
import { Ref, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const vecindappClient = useVecindappApiClient()

const people: Ref<Person[]> = ref([])

const loadPeople = async (): Promise<void> => {
    const user = store.user
    const profile = store.profile
    if (!user || !profile) {
        router.push({ name: 'login' })
        return
    }
    const { data }: { data: Person[] } = await vecindappClient.get(`users/${user.id}/people`, { profile_id: profile.id })
    people.value = data
    if (data.length === 1) {
        const person = data[0]
        selectPerson(person)
        return
    }
}

const selectPerson = (person: Person) => {
    const venue = person.venue
    store.$patch({ person, venue })
    router.push({ name: 'dashboardPage' })
}

onMounted(() => {
    loadPeople()
})
</script>
<style scoped>
.venue-name {
    font-weight: bold;
}
.venue-list {
    background: none;
}
.venue-list-item {
    --ion-item-background: none;
}
/* ion-item::part(native) {
    background: none;
    color: #fff;

    border-color: #fff;
    border-style: solid;
    border-width: 1px;

    border-radius: 10px;
} */
</style>
