<template>
  <v-row justify="center" align="center">
    <div class="text-center ma-12">
      <v-progress-circular
        :indeterminate="indeterminate"
        :rotate="13"
        :size="64"
        :width="8"
        color="light-blue"
      >{{ value }}</v-progress-circular>
    </div>
  </v-row>
</template>
<script>
  export default {
    data: () => ({
      indeterminate: true,
      rotate: 13,
      size: 64,
      value: 0,
      width: 8,
    }),
  }
</script>