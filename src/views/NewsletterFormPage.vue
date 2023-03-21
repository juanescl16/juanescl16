<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title> Nuevo Comunicado </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-item :class="{ 'ion-valid': !titleError, 'ion-invalid': !!titleError }">
                <ion-label position="floating">Título</ion-label>
                <ion-input v-model="title" type="text"></ion-input>
                <ion-note slot="error" color="danger">{{ titleError }}</ion-note>
            </ion-item>
            <ion-item :class="{ 'ion-valid': !contentError, 'ion-invalid': !!contentError }">
                <ion-label position="floating">Contenido</ion-label>
                <ion-textarea :rows="5" class="text-area" v-model="content" :auto-grow="true"></ion-textarea>
                <ion-note slot="error">{{ contentError }}</ion-note>
            </ion-item>
            <!-- <ion-item> -->
            <div class="d-flex justify-center w-full mt-3">
                <input type="file" @change="($event) => setFiles($event)" style="display: none" id="file-input" multiple />
                <ion-button @click="addFiles" expand="block" size="default" color="orange"
                    ><ion-icon :icon="documentAttachOutline"></ion-icon>&nbsp;Adjuntar Archivos</ion-button
                >
            </div>
            <!-- </ion-item> -->
            <ion-item v-if="!!files && files?.length > 0">
                <div class="files-list w-full">
                    <div v-for="(file, index) in files" :key="index">
                        <div class="file-item">
                            <div>
                                <ion-icon :icon="attachOutline"></ion-icon>
                                {{ file.name }} - {{ round(file.size / 1000000) }}Mb
                            </div>
                            <div>
                                <ion-button color="clear" size="large" class="file-trash-button" @click="removeFile(index)">
                                    <ion-icon :icon="trashOutline"></ion-icon>
                                </ion-button>
                            </div>
                        </div>
                    </div>
                </div>
            </ion-item>
            <ion-button expand="block" @click="create()" class="mt-4">Crear &nbsp;<ion-icon :icon="saveOutline"></ion-icon></ion-button>
            <!-- <ion-button expand="block" @click="saveAndSend()">Guardar y enviar &nbsp;<ion-icon :icon="paperPlaneOutline"></ion-icon></ion-button> -->
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonNote, IonTextarea } from '@ionic/vue'
import { attachOutline, documentAttachOutline, saveOutline, trashOutline } from 'ionicons/icons'
import { ref, toRefs } from 'vue'
import { round } from '@/filters/filters'
import { useVecindappApiClient } from '@/apiClients/vecindappApiClient'
import { useStore } from '@/stores/mainStore'
import { Newsletter } from '@/interfaces/interfaces'
import { useToastr } from '@/utils/toastr'
import { ResultBag } from '@/interfaces/interfaces'

const title = ref<string>('')
const content = ref<string>('')
const titleError = ref<string>('')
const contentError = ref<string>('')
const { venue, user } = toRefs(useStore())
const toastr = useToastr()

const vecindappClient = useVecindappApiClient()

const files = ref<File[]>([])

const setFiles = (e: Event) => {
    const el = e.target as HTMLInputElement
    if (!el.files) return
    for (let i = 0; i < el.files.length; i++) {
        files.value?.push(el.files[i])
    }
}

const addFiles = () => {
    const el = document.getElementById('file-input') as HTMLInputElement
    el.click()
}

const removeFile = (i: number) => {
    const _files = files.value.slice(i, 1)
    files.value = _files
}

const create = async (): Promise<void> => {
    try {
        titleError.value = ''
        contentError.value = ''
        if (!title.value) {
            titleError.value = 'Debe definir un título para el comunicado'
            return
        }
        if (!content.value) {
            contentError.value = 'Debe especificar el contenido del comunicado'
            return
        }

        const formData = new FormData()
        formData.append('title', title.value)
        formData.append('content', content.value)
        !!venue.value && formData.append('venue_id', `${venue.value.id}`)
        !!user.value && formData.append('user_id', `${user.value.id}`)
        files.value.map((file: File) => formData.append('files[]', file))

        const { data }: { data: ResultBag<Newsletter> } = await vecindappClient.post('newsletters', formData)
        if (data.status) {
            //TODO: mostrar mensaje de confirmación para enviar el comunicado
        }
    } catch (error) {
        console.log({ error })

        toastr.error('Error al crear el comunicado, por favor intente de nuevo más tarde.')
    }
}
</script>
<style scoped>
.files-list {
    display: flex;
    flex-direction: column;
}
.file-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
}
.file-trash-button {
    color: red;
}
.text-area {
    /* background-color: #ffffff; */
    color: #333333;
}
/* ion-textarea.custom-textarea {
    --background: #ffffff;
    --color: #333333;
    --padding-end: 10px;
    --padding-start: 10px;
    --placeholder-color: #333333;
    --placeholder-opacity: 0.8;
} */
</style>
