<template>
    <IonItem class="list-item">
        <div class="icon">
            <slot name="start"></slot>
        </div>
        <IonLabel class="item-label">
            <slot></slot>
        </IonLabel>
        <div class="helper">
            <slot name="helper"></slot>
        </div>
        <slot name="end"></slot>
    </IonItem>
</template>
<script setup lang="ts">
import { Ref, ref } from 'vue'
</script>
<style scoped>
.item-label {
    color: white;
    font-size: 1.2rem;
}
.icon {
    margin: 0 13px;
}
.list-item {
    margin: 10px 0;
}
</style>
