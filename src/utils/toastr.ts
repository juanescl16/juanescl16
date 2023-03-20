import { toastController } from '@ionic/vue'
class Toastr {
    async success(msg: string) {
        const toastr = await toastController.create({
            color: 'success',
            message: msg,
            duration: 2000,
            position: 'top',
        })
        await toastr.present()
    }
    async error(msg: string) {
        const toastr = await toastController.create({
            color: 'danger',
            message: msg,
            duration: 2000,
            position: 'top',
        })
        await toastr.present()
    }
    async info(msg: string) {
        const toastr = await toastController.create({
            color: 'info',
            message: msg,
            duration: 2000,
            position: 'top',
        })
        await toastr.present()
    }
    async warning(msg: string) {
        const toastr = await toastController.create({
            color: 'warning',
            message: msg,
            duration: 2000,
            position: 'top',
        })
        await toastr.present()
    }
}
export const useToastr = () => new Toastr()
