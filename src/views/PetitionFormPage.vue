<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title> Nueva PQRS </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-item :class="{ 'ion-valid': !typeError, 'ion-invalid': !!typeError }">
                <ion-label position="floating">Tipo</ion-label>
                <ion-select interface="action-sheet" placeholder="Seleccione" cancel-text="Cancelar" v-model="type">
                    <ion-select-option v-for="(petitionType, index) in petitionTypesData" :key="index" :value="petitionType.id">
                        {{ petitionType.name }}
                    </ion-select-option>
                </ion-select>
                <ion-note slot="error" color="danger">{{ typeError }}</ion-note>
            </ion-item>

            <ion-item :class="{ 'ion-valid': !topicError, 'ion-invalid': !!topicError }">
                <ion-label position="floating">Tema</ion-label>
                <ion-select interface="action-sheet" placeholder="Seleccione" cancel-text="Cancelar" v-model="topic">
                    <ion-select-option v-for="(petitionTopic, index) in filteredPetitionTopicsData" :key="index" :value="petitionTopic.id">{{
                        petitionTopic.name
                    }}</ion-select-option>
                </ion-select>
                <ion-note slot="error" color="danger">{{ topicError }}</ion-note>
            </ion-item>
            <ion-item :class="{ 'ion-valid': !subjectError, 'ion-invalid': !!subjectError }">
                <ion-label position="floating">Asunto</ion-label>
                <ion-input v-model="subject" type="text"></ion-input>
                <ion-note slot="error" color="danger">{{ subjectError }}</ion-note>
            </ion-item>
            <ion-item :class="{ 'ion-valid': !descriptionError, 'ion-invalid': !!descriptionError }">
                <ion-label position="floating">Descripción</ion-label>
                <ion-textarea :rows="5" class="text-area" v-model="description" :auto-grow="true"></ion-textarea>
                <ion-note slot="error">{{ descriptionError }}</ion-note>
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
            <ion-item :class="{ 'ion-valid': !documentsDescriptionError, 'ion-invalid': !!documentsDescriptionError }">
                <ion-label position="floating">Descripción documentos</ion-label>
                <ion-textarea :rows="5" class="text-area" v-model="documentsDescription" :auto-grow="true"></ion-textarea>
                <ion-note slot="error">{{ documentsDescriptionError }}</ion-note>
            </ion-item>
            <ion-button expand="block" @click="create()" class="mt-4">Crear &nbsp;<ion-icon :icon="saveOutline"></ion-icon></ion-button>
            <!-- <ion-button expand="block" @click="saveAndSend()">Guardar y enviar &nbsp;<ion-icon :icon="paperPlaneOutline"></ion-icon></ion-button> -->
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonNote, IonTextarea, IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/vue'
import { attachOutline, documentAttachOutline, saveOutline, trashOutline } from 'ionicons/icons'
import { onMounted, Ref, ref, toRefs, watch } from 'vue'
import { PetitionType, Paginated, PetitionTopic } from '../interfaces/interfaces'
import { round } from '@/filters/filters'
import { useVecindappApiClient } from '@/apiClients/vecindappApiClient'
import { useStore } from '@/stores/mainStore'
import { useToastr } from '@/utils/toastr'
import { ResultBag } from '@/interfaces/interfaces'

const store = useStore()
const page: Ref<number> = ref(1)

const petitionTypesData: Ref<PetitionType[]> = ref([])
const petitionTopicsData: Ref<PetitionTopic[]> = ref([])
const filteredPetitionTopicsData: Ref<PetitionTopic[]> = ref([])

const subject = ref<string>('')
const description = ref<string>('')
const type = ref<number>()
const topic = ref<number>()
const documentsDescription = ref<string>('')

const interval: Ref<number> = ref(null)

const subjectError = ref<string>('')
const descriptionError = ref<string>('')
const typeError = ref<string>('')
const topicError = ref<string>('')
const documentsDescriptionError = ref<string>('')

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

const loadPetitionTypes = async (): Promise<void> => {
    if (!store.person) return
    const { data }: { data: PetitionType[] } = await vecindappClient.get(`petitions/petition-types`)
    petitionTypesData.value = data
}

const loadPetitionTopics = async (): Promise<void> => {
    if (!store.person) return
    const { data }: { data: PetitionTopic[] } = await vecindappClient.get(`petitions/petition-topics`)
    petitionTopicsData.value = data
}

const filterLoadPetitionTopics = (selectedType: number | void): PetitionTopic[] => {
    filteredPetitionTopicsData.value = petitionTopicsData.value.filter(function (petitionTopic) {
        return petitionTopic.petition_type_id === selectedType
    })
    return filteredPetitionTopicsData.value
}

watch(type, (selectedType: number | void) => {
    console.log('entro al watch', selectedType)
    filterLoadPetitionTopics(selectedType)
})

const create = async (): Promise<void> => {
    try {
        subjectError.value = ''
        descriptionError.value = ''
        topicError.value = ''
        typeError.value = ''
        if (!subject.value) {
            subjectError.value = 'Debe definir un asunto para la PQRS'
            return
        }
        if (!description.value) {
            descriptionError.value = 'Debe especificar la descripción de la PQRS'
            return
        }
        if (!type.value) {
            typeError.value = 'Debe especificar el tipo de PQRS'
            return
        }
        if (!topic.value) {
            topicError.value = 'Debe especificar el tema de la PQRS'
            return
        }
        const formData = new FormData()
        formData.append('subject', subject.value)
        formData.append('description', description.value)
        formData.append('petitionTypeId', `${type.value}`)
        formData.append('petitionTopicId', topic.value.toString())
        !!venue.value && formData.append('venue_id', `${venue.value.id}`)
        !!user.value && formData.append('user_id', `${user.value.id}`)
        files.value.map((file: File) => formData.append('files[]', file))
        // const { data }: { data: ResultBag<Newsletter> } = await vecindappClient.post('newsletters', formData)
        // if (data.status) {
        //     //TODO: mostrar mensaje de confirmación para enviar el comunicado
        // }
    } catch (error) {
        console.log({ error })
        toastr.error('Error al crear el comunicado, por favor intente de nuevo más tarde.')
    }
}

onMounted(() => {
    loadPetitionTypes()
    loadPetitionTopics()
})
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
