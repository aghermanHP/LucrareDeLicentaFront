<template>
  <select v-model="$i18n.locale">
    <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
      {{ lang }}
    </option>
  </select>
</template>

<script>
export default {
  name: "i18nFilter",

  data () {
    return { langs: ['fr', 'en', 'ro', 'ru'] }
  }
}
</script>

<style scoped>

</style>