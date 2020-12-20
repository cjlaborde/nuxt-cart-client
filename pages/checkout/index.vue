<template>
    <div class="section">
        <div class="container is-fluid">
            <div class="columns">
                <div class="column is-three-quarters">
                    <!-- {{ form }} -->
                    <!-- v-model here is just syntax sugar to listen what the event says -->
                <ShippingAddress 
                    :addresses="addresses"
                    v-model="form.address_id"
                />

                    <article class="message">
                        <div class="message-body">
                            <h1 class="title is-5">Payment</h1>
                        </div>
                    </article>
                    <!-- <ShippingAddress :addresses="addresses" v-model="form.address_id" /> -->

                    <!-- <PaymentMethods :payment-methods="paymentMethods" v-model="form.payment_method_id" /> -->

                    <article class="message">
                        <div class="message-body">
                            <h1 class="title is-5">
                                Shipping
                            </h1>
                            <div class="select is-fullwidth">
                                <select v-model="shippingMethodId">
                                     <option v-for="shipping in shippingMethods" :key="shipping.id" :value="shipping.id">
                                        {{ shipping.name }} ({{ shipping.price }})
                                    </option>
                                </select>
                            </div>
                        </div>
                    </article>

                    <article class="message" v-if="products.length">
                        <div class="message-body">
                            <h1 class="title is-5">
                                Cart summary
                            </h1>
                            <CartOverview>
                                <template slot=rows v-if="shippingMethodId">
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td class="has-text-weight-bold">
                                            Shipping
                                        </td>
                                        <td>
                                            {{ shipping.price }}
                                        </td>
                                        <td></td>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td class="has-text-weight-bold">
                                            Total
                                        </td>
                                        <td>
                                            {{ total }}
                                        </td>
                                        <td></td>
                                    </tr>
                                </template>
                            </CartOverview>
                        </div>
                    </article>

                    <article class="message">
                        <div class="message-body">
                            <button 
                                class="button is-info is-fullwidth is-medium"
                                :disabled="empty"
                            >
                                Place order
                            </button>
                        </div>
                    </article>
                </div>
                <div class="column is-one-quarter">
                    <article class="message">
                        <div class="message-body">
                            <button 
                                class="button is-info is-fullwidth is-medium"
                                :disabled="empty"
                            >
                                Place order
                            </button>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      addresses: [],
      shippingMethods: [],
      form: {
        address_id: null,
      },
    };
  },

  watch: {
    "form.address_id"(addressId) {
      this.getShippingMethodsForAddress(addressId).then(() => {
        // display the first result from shipping methods
        this.setShipping(this.shippingMethods[0]);
      });
    },

    shippingMethodId() {
      this.getCart();
    },
  },

  computed: {
    ...mapGetters({
      total: "cart/total",
      products: "cart/products",
      empty: "cart/empty",
      shipping: "cart/shipping",
    }),

    shippingMethodId: {
      // this.shipping will be getter from our store
      get() {
        return this.shipping ? this.shipping.id : "";
      },
      // method we created on vuex store cart.js
      // this.setShipping(this.shippingMethodId);
      set(shippingMethodId) {
        // console.log(shippingMethodId);
        // Inside here pass the shipping object
        this.setShipping(
          // will return object that should be that shipping method id
          // Then we will be able to get it back with get() once is it set
          this.shippingMethods.find((s) => s.id === shippingMethodId)
        );
      },
    },
  },

  methods: {
    ...mapActions({
      setShipping: "cart/setShipping",
      getCart: "cart/getCart",
    }),
    async getShippingMethodsForAddress(addressId) {
      let response = await this.$axios.$get(`addresses/${addressId}/shipping`);
      //   console.log(response);
      this.shippingMethods = response.data;

      // you can chain on even after you winish on the form.address_is
      return response;
    },
  },

  async asyncData({ app }) {
    let addresses = await app.$axios.$get("addresses");

    return {
      addresses: addresses.data,
    };
  },
};
</script>