<template>
  <table class="table is-hoverable is-fullwidth">
      <tbody>
          <CartOverviewProduct 
            v-for="product in products" 
            :key="product.id"
            :product="product"
          />
          <tr>
            <td></td>
            <td></td>
            <td>
              <p class="has-text-weight-bold">Subtotal</p>
            </td>
            <td>
              {{ subtotal }}
            </td>
            <td></td>
          </tr>
          <slot name="rows" />
      </tbody>
  </table>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      products: "cart/products",
      subtotal: "cart/subtotal",
    }),
  },
};
</script>

<style>
</style>