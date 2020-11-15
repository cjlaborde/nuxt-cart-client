<template>
   <div class="section">
    <div class="container is-fluid">
      <div class="columns is-multiline">
        <div class="column is-3" v-for="product in products" :key="product.slug">
          <Product :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    products: [];
  },
  async asyncData({ params, app }) {
    let response = await app.$axios.$get(`products?category=${params.slug}`);

    return {
      products: response.data,
    };
  },
};
</script>

<style>
</style>