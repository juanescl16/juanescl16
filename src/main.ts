import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { IonicVue, IonPage, IonHeader, IonLabel, IonInput, IonButton, IonContent, IonApp, IonItem } from '@ionic/vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import TopBarLogo from '@/components/TopBarLogo.vue'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

/* Theme variables */
import './theme/variables.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
    .use(IonicVue)
    .use(pinia)
    .use(router)
    .component('IonPage', IonPage)
    .component('IonHeader', IonHeader)
    .component('IonLabel', IonLabel)
    .component('IonInput', IonInput)
    .component('IonButton', IonButton)
    .component('IonContent', IonContent)
    .component('IonApp', IonApp)
    .component('IonItem', IonItem)
    .component('PageHeader', PageHeader)
    .component('PageTitle', PageTitle)
    .component('TopBarLogo', TopBarLogo)

router.isReady().then(() => {
    app.mount('#app')
})
