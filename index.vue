<template>
    <script setup>
    import { createApp, ref } from 'vue'

    createApp({
    setup() {
        return {
        count: ref(0)
        }
    }
    }).mount('#app')
    </script>

    <div id="app">
        <button @click="count++">
        Count is: {{ count }}
        </button>
    </div>
</template>