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
            <ion-list v-if="!!petitions" class="list">
                <list-item v-for="petition in petitions" :key="petition.id" @click="viewPetition(petition)" :detail="true">
                    <template #start>
                        <item-icon>
                            <ion-icon :icon="documentTextOutline"></ion-icon>
                        </item-icon>
                    </template>
                    <!-- <ion-label class="item-label ion-text-wrap"> -->
                    <div class="item-title">{{ petition.name }}</div>

                    <div class="item-help">
                        <div class="item-help-text">
                            {{ $filters.datetime(petition.created_at) }}
                        </div>
                        <div v-if="!!petition.files && petition.files.length > 0">
                            <ion-icon :icon="attachOutline"></ion-icon>
                        </div>
                    </div>
                    <!-- </ion-label> -->
                </list-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { useVecindappApiClient } from '@/apiClients/vecindappApiClient'
import { useStore } from '@/stores/mainStore'
import { Ref, ref, onMounted, computed } from 'vue'
import { Newsletter, Paginated, Petition } from '../interfaces/interfaces'
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
const page: Ref<number> = ref(1)
const petitionsData: Ref<Paginated<Petition>> = ref(PaginatorInit)
const petitions: Ref<Petition[]> = ref([])

const canCreatePetitions: Ref<boolean> = ref(userCan('creacion-de-pqrs'))

const loadingComplete = computed(() => petitionsData.value.meta.last_page === page.value)

const viewPetition = (petition: Petition): void => {
    tempStore.$patch({ petition })
    router.push({ name: 'petitionDetailPage' })
}

const loadPetitions = async (): Promise<void> => {
    if (!store.person) return
    const { data }: { data: Paginated<Petition> } = await vecindappClient.get(`people/${store.person.id}/petitions`, { page: page.value })
    petitionsData.value = data
    const _data = data?.data ?? []
    _data.map((petition: Petition) => petitions.value.push(petition))
}

const loadMore = (ev: IonInfiniteScrollCustomEvent<void>) => {
    if (page.value === petitionsData.value.meta.total) return
    page.value = Math.min(petitionsData.value.meta.total, page.value + 1)
    loadPetitions()
    setTimeout(() => ev.target.complete(), 500)
}

onMounted(() => {
    loadPetitions()
})
</script>

<style></style>
