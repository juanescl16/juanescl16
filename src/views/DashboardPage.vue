<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    <top-bar-logo></top-bar-logo>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="menu">
                <div class="ion-text-center ion-padding">
                    <div class="option-button-row middle-button">
                        <option-button @click="opcionSeleccionada = 'opcion1'"> Comunicados </option-button>
                    </div>
                    <div class="option-button-row double-button">
                        <option-button @click="opcionSeleccionada = 'opcion2'"> Correspondencia </option-button>
                        <option-button @click="opcionSeleccionada = 'opcion3'"> Zonas comunes </option-button>
                    </div>
                    <div class="option-button-row middle-button">
                        <option-button @click="opcionSeleccionada = 'opcion4'"> Visitas </option-button>
                    </div>
                    <div class="option-button-row double-button">
                        <option-button @click="opcionSeleccionada = 'opcion4'"> PQR's </option-button>
                        <option-button @click="opcionSeleccionada = 'opcion4'"> Consejo </option-button>
                    </div>
                    <div class="option-button-row middle-button">
                        <option-button @click="opcionSeleccionada = 'opcion4'"> Salir </option-button>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IonTitle, IonIcon, IonToolbar } from '@ionic/vue'
import OptionButton from '@/components/OptionButton.vue'

const opcionSeleccionada = ref('opcion1')
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
</style>
