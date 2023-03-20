<template>
    <ion-page>
        <!-- <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <back-button></back-button>
                </ion-buttons>
                <current-venue slot="primary"></current-venue>
            </ion-toolbar>
        </ion-header> -->

        <ion-content class="ion-padding">
            <app-logo></app-logo>
            <page-title>Comunicados</page-title>
            <div class="text-center">
                <ion-button v-if="canCreateNewsletters" @click="router.push({ name: 'newsletterFormPage' })">Nuevo Comunicado</ion-button>
            </div>
            <ion-list v-if="!!newsletters" class="list">
                <list-item v-for="newsletter in newsletters" :key="newsletter.id" @click="viewNewsletter(newsletter)" :detail="true">
                    <template #start>
                        <item-icon>
                            <ion-icon :icon="documentTextOutline"></ion-icon>
                        </item-icon>
                    </template>
                    <!-- <ion-label class="item-label ion-text-wrap"> -->
                    <div class="item-title">{{ newsletter.title }}</div>

                    <div class="item-help">
                        <div class="item-help-text">
                            {{ $filters.datetime(newsletter.created_at) }}
                        </div>
                        <div v-if="!!newsletter.files && newsletter.files.length > 0">
                            <ion-icon :icon="attachOutline"></ion-icon>
                        </div>
                    </div>
                    <!-- </ion-label> -->
                </list-item>
            </ion-list>
            <ion-infinite-scroll @ionInfinite="loadMore" :disabled="loadingComplete">
                <ion-infinite-scroll-content loading-text="Cargando..." loading-spinner="bubbles"></ion-infinite-scroll-content>
            </ion-infinite-scroll>
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
const page: Ref<number> = ref(1)
const newslettersData: Ref<Paginated<Newsletter>> = ref(PaginatorInit)
const newsletters: Ref<Newsletter[]> = ref([])
const canCreateNewsletters: Ref<boolean> = ref(userCan('enviar-circulares'))

const loadingComplete = computed(() => newslettersData.value.meta.last_page === page.value)

const viewNewsletter = (newsletter: Newsletter): void => {
    tempStore.$patch({ newsletter })
    router.push({ name: 'newsletterDetailPage' })
}

const loadNewsletters = async (): Promise<void> => {
    if (!store.person) return
    const { data }: { data: Paginated<Newsletter> } = await vecindappClient.get(`people/${store.person.id}/newsletters`, { page: page.value })
    newslettersData.value = data
    const _data = data?.data ?? []
    _data.map((newsletter: Newsletter) => newsletters.value.push(newsletter))
}

const loadMore = (ev: IonInfiniteScrollCustomEvent<void>) => {
    if (page.value === newslettersData.value.meta.total) return
    page.value = Math.min(newslettersData.value.meta.total, page.value + 1)
    loadNewsletters()
    setTimeout(() => ev.target.complete(), 500)
}

onMounted(() => {
    loadNewsletters()
})
</script>
<style scoped>
.item-help {
    color: white;
    font-size: 0.7rem;
    display: flex;
    justify-content: space-between;
}
.item-help-text {
    font-size: 0.9rem;
}
</style>
