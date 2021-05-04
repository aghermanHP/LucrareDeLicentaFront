<template>
    <div>
        <v-banner v-model="modalOrgans" single-line transition="slide-y-transition">
            <template v-slot:actions="{ dismiss }">
                <v-btn text color="primary" @click="dismiss">Dismiss</v-btn>
                <v-btn text color="primary">Retry</v-btn>
            </template>
        </v-banner>
    </div>
</template>

<script>
export default {
    props:{
        modalOrgans:{
            type: Boolean,
			default: false
        }
    }
}
</script>