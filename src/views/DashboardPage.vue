<template>
    <ion-page>
        <!-- <ion-header>
            <ion-toolbar>
                <ion-title>
                    <current-venue></current-venue>
                </ion-title>
            </ion-toolbar>
        </ion-header> -->
        <ion-content>
            <app-logo></app-logo>
            <div class="menu">
                <div class="ion-text-center ion-padding">
                    <div class="option-button-row middle-button">
                        <option-button @click="goTo('newslettersPage')" icon="1_circulares"> Comunicados </option-button>
                    </div>
                    <div class="option-button-row double-button">
                        <option-button @click="goTo('mailboxPage')" icon="2_correspondencia"> Correspondencia </option-button>
                        <option-button @click="goTo('facilitiesPage')" icon="3_zonas_comunes"> Zonas comunes </option-button>
                    </div>
                    <div class="option-button-row middle-button">
                        <option-button @click="goTo('visitsPage')" icon="4_visitas"> Visitas </option-button>
                    </div>
                    <div class="option-button-row double-button">
                        <option-button @click="goTo('petitionsPage')" icon="5_pqrs"> PQRS </option-button>
                        <option-button @click="goTo('councilPage')" icon="6_consejo"> Consejo </option-button>
                    </div>
                    <div class="option-button-row middle-button">
                        <option-button @click="closeSession() && goTo('login')" icon="7_cerrar_sesion"> Salir </option-button>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import OptionButton from '@/components/OptionButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goTo = (page: string) => router.push({ name: page })
const closeSession = (): boolean => {
    localStorage.clear()
    router.push({ name: 'login' })
    return true
}
</script>
<style scoped>
.option-button-row {
    display: flex;
}
.middle-button {
    justify-content: center;
}
.double-button {
    justify-content: space-around;
}
.menu {
    margin-top: 50px;
}
</style>
