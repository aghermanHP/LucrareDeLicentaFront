<template>
  <div class="row align-top">
    <select v-model="$i18n.locale" class="col-md-12" style="font-size: 25px;">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
        {{ lang }}
      </option>
    </select>
  </div>
</template>

<script>

export default {
  name: "i18nFilter",
  data() {
    return {langs: ['fr', 'en', 'ro', 'ru']}
  }
}
</script>

<style scoped>
.align-top{
  top: 0;
  right: unset;
  left: 10px;
  position: fixed;
}

</style>