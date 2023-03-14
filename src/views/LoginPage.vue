<template>
    <ion-page>
        <!-- <ion-header>
            <ion-toolbar>
                <ion-title>Login</ion-title>
            </ion-toolbar>
        </ion-header> -->

        <ion-content class="ion-paddingx">
            <!-- <div class="header-logo">
                <img src="/assets/images/logo_vecindapp.png" />
            </div> -->
            <div class="login-fields-container">
                <div class="login-inputs">
                    <img src="/assets/images/logo_vecindapp.png" />
                    <ion-item class="login-input">
                        <ion-label position="floating">Usuario</ion-label>
                        <ion-input v-model="username" class=""></ion-input>
                    </ion-item>

                    <ion-item class="login-input">
                        <ion-label position="floating">Password</ion-label>
                        <ion-input v-model="password" class="" type="password"></ion-input>
                    </ion-item>
                    <div class="login-button">
                        <ion-button @click="login()">Ingresar</ion-button>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { Ref, ref, onMounted } from 'vue'
import { IonItem } from '@ionic/vue'
import { useVecindappApiClient } from '../apiClients/vecindappApiClient'
import { useStore } from '../stores/mainStore'
import { useRouter } from 'vue-router'
import jwt_decode from 'jwt-decode'
import { User } from '@/interfaces/interfaces'

const store = useStore()
const router = useRouter()

const vecindappClient = useVecindappApiClient()

const username: Ref<string> = ref('')
const password: Ref<string> = ref('')

const validateAuth = (): void => {
    const jwtToken = localStorage.getItem('auth:jwt_token')
    if (!jwtToken) return
    const decoded = jwt_decode(jwtToken)
    const user = decoded as User

    if (!user) return

    store.$patch({ user })

    const route = user.venues_count > 1 ? 'selectVenuePage' : 'tab1'
    router.push({ name: route })
}

const login = async (): Promise<void> => {
    try {
        const { data } = await vecindappClient.post('auth/login', {
            username: username.value,
            password: password.value,
        })

        const { jwtToken, profile, venue } = data
        if (jwtToken) {
            localStorage.setItem('auth:jwt_token', jwtToken)
            const user = jwt_decode(jwtToken) as User
            store.$patch({
                user,
            })

            if (user.profiles_count === 1 && !!profile) {
                store.$patch({ profile })
            }

            if (user.venues_count === 1 && !!venue) {
                store.$patch({ venue })
            }

            if (user.profiles_count > 1) {
                router.push({ name: 'selectProfilePage' })
                return
            }

            if (user.venues_count > 1) {
                router.push({ name: 'selectVenuePage' })
                return
            }
        }
    } catch (error) {
        console.log({ error })
    }
}

onMounted(() => {
    validateAuth()
})
</script>
<style scoped>
.login-fields-container {
    width: 400px;
    height: 400px;
    border-radius: 50px;
    background: linear-gradient(to bottom right, #9d62f5, #6049cd);
    transform: rotate(45deg);
    margin: 100px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.login-inputs {
    transform: rotate(-45deg);
    margin-top: 40px;
    margin-left: 40px;
    text-align: center;
    max-width: 80%;
}

.login-input {
    border-radius: 25px;
    margin: 10px 0;
}
.login-button {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}
.login-input-control {
    background-color: #7f0fba;
}
</style>
