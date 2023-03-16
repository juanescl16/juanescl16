import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { IonicVue, IonPage, IonHeader, IonLabel, IonInput, IonButton, IonContent, IonApp, IonItem, IonList, IonToolbar, IonTitle, IonIcon } from '@ionic/vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import TopBarLogo from '@/components/TopBarLogo.vue'
import AppLogo from '@/components/AppLogo.vue'
import CurrentVenue from '@/components/CurrentVenue.vue'
import ListItem from '@/components/ListItem.vue'
import ItemIcon from '@/components/ItemIcon.vue'
import BackButton from '@/components/BackButton.vue'

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

import { datetime, date, replaceURLWithHTML } from './filters/filters'

/* Theme variables */
import './theme/variables.css'
import './theme/common.css'

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
    .component('IonList', IonList)
    .component('IonItem', IonItem)
    .component('IonToolbar', IonToolbar)
    .component('IonTitle', IonTitle)
    .component('PageHeader', PageHeader)
    .component('PageTitle', PageTitle)
    .component('TopBarLogo', TopBarLogo)
    .component('AppLogo', AppLogo)
    .component('CurrentVenue', CurrentVenue)
    .component('ListItem', ListItem)
    .component('IonIcon', IonIcon)
    .component('ItemIcon', ItemIcon)
    .component('BackButton', BackButton)

app.config.globalProperties.$filters = {
    datetime,
    date,
    replaceURLWithHTML,
}

router.isReady().then(() => {
    app.mount('#app')
})
