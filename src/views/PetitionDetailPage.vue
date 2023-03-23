<template>
    <ion-page>
        <ion-content class="ion-padding">
            <app-logo></app-logo>

            <div v-if="!!petition && petition?.files.length > 0">
                <ion-accordion-group>
                    <ion-accordion value="files">
                        <ion-item slot="header">
                            <ion-label>Archivos Adjuntos</ion-label>
                        </ion-item>
                        <div class="ion-padding" slot="content">
                            <div v-for="(file, index) in petition.files" :key="file.id" class="mb-2">
                                <a :href="file.url" target="_blank">{{ index + 1 }} - {{ file.name }}<ion-icon :icon="attachOutline"></ion-icon></a>
                                <div v-if="!!file.comment" class="text-xs italic mt-1">Descripción: {{ file.comment }}</div>
                            </div>
                        </div>
                    </ion-accordion>
                </ion-accordion-group>
            </div>

            <ion-card v-if="!!petition" class="v-card">
                <ion-card-header>
                    <ion-card-title class="text-center">{{ petition.name }}</ion-card-title>
                    <ion-card-subtitle class="text-center color-white">{{ $filters.datetime(petition.created_at) }}</ion-card-subtitle>
                    <ion-card-subtitle class="text color-white font-bold">Tipo: {{ petition.petition_type.name }}</ion-card-subtitle>
                    <ion-card-subtitle class="text color-white font-bold">Tema: {{ petition.petition_topic.name }}</ion-card-subtitle>
                    <ion-card-subtitle class="text color-white font-bold">Estado: {{ petition.petition_status.name }}</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                    <div v-html="$filters.replaceURLWithHTML(petition.description)" class="petition-description"></div>
                </ion-card-content>
            </ion-card>

            <ion-card v-if="!!petition && petition?.comments.length > 0" class="v-card">
                <ion-card-header>
                    <ion-card-title class="text-center">Comentarios</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-item v-for="comment in petition.comments" :key="comment.id" class="mb-2">
                        <ion-label class="ion-text-wrap">
                            <h3>{{ comment.status }} - {{ $filters.datetime(petition.created_at) }}</h3>
                            <h3>{{ comment.person }}:</h3>
                            <p>{{ comment.comment }}</p>
                        </ion-label>
                    </ion-item>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { useTempStore } from '@/stores/tempStore'
import { toRefs } from 'vue'
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonAccordionGroup, IonAccordion } from '@ionic/vue'
import { attachOutline } from 'ionicons/icons'

const { petition } = toRefs(useTempStore())
</script>
<style scoped>
ion-toolbar {
    --ion-toolbar-background: var(--ion-background-color);
}

ion-card-title {
    font-size: 1.2rem;
}

.petition-description {
    border-radius: 6px;
    background-color: white;
    color: #121212;
    padding: 10px;
}
</style>
