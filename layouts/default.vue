<template>
  <div>
    <Navigation />
    <Nuxt />
  </div>
</template>

<script>
import Navigation from "@/layouts/partials/Navigation.vue";

export default {
  components: {
    Navigation,
  },
};
</script>