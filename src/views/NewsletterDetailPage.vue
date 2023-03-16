<template>
    <ion-page>
        <!-- <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <back-button></back-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header> -->
        <ion-content class="ion-padding">
            <app-logo></app-logo>
            <div v-if="!!newsletter && newsletter?.files.length > 0">
                <ion-accordion-group>
                    <ion-accordion value="files">
                        <ion-item slot="header">
                            <ion-label>Archivos Adjuntos</ion-label>
                        </ion-item>
                        <div class="ion-padding" slot="content">
                            <div v-for="(file, index) in newsletter.files" :key="file.id">
                                <a :href="file.url" target="_blank" class="text-white">{{ index + 1 }} - {{ file.name }}</a>
                            </div>
                        </div>
                    </ion-accordion>
                </ion-accordion-group>
            </div>
            <ion-card v-if="!!newsletter" class="v-card">
                <ion-card-header>
                    <ion-card-title class="text-center">{{ newsletter.title }}</ion-card-title>
                    <ion-card-subtitle class="text-center color-white">{{ $filters.datetime(newsletter.created_at) }}</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                    <div v-html="$filters.replaceURLWithHTML(newsletter.description)" class="newsletter-description"></div>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { useTempStore } from '@/stores/tempStore'
import { toRefs } from 'vue'
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButtons, IonAccordionGroup, IonAccordion } from '@ionic/vue'

const { newsletter } = toRefs(useTempStore())
</script>
<style scoped>
ion-toolbar {
    --ion-toolbar-background: var(--ion-background-color);
}

ion-card-title {
    font-size: 1.2rem;
}

.newsletter-description {
    border-radius: 6px;
    background-color: white;
    color: #121212;
    padding: 10px;
}
</style>
