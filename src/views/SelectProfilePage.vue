<template>
    <ion-app>
        <ion-content class="ion-padding">
            <page-header></page-header>
            <page-title>Seleccione el perfil</page-title>
            <ion-list :inset="true" class="profile-list">
                <ion-item
                    v-for="profile in profiles"
                    :key="profile.id"
                    href="#"
                    :detail="true"
                    @click.prevent="selectProfile(profile)"
                    class="profile-list-item"
                >
                    <ion-label>{{ profile.name }}</ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-app>
</template>
<script setup lang="ts">
import { useVecindappApiClient } from '@/apiClients/vecindappApiClient'
import { Profile } from '@/interfaces/interfaces'
import { useStore } from '@/stores/mainStore'
import { Ref, ref, onMounted } from 'vue'
import { IonList } from '@ionic/vue'
import router from '@/router'
import PageTitle from '@/components/PageTitle.vue'

const store = useStore()
const vecindappClient = useVecindappApiClient()

const profiles: Ref<Profile[]> = ref([])

const loadProfiles = async (): Promise<void> => {
    const user = store.user
    if (!user) return
    const { data } = await vecindappClient.get(`users/${user.id}/profiles`)
    profiles.value = data
}

const selectProfile = (profile: Profile): void => {
    store.$patch({ profile })
    const venue = store.venue
    if (venue) {
        router.push({ name: 'dashboard' })
        return
    }
    router.push({ name: 'selectVenuePage' })
}

onMounted(() => {
    loadProfiles()
})
</script>
<style scoped>
.profile-list {
    background: none;
}
.profile-list-item {
    --ion-item-background: none;
}
</style>
