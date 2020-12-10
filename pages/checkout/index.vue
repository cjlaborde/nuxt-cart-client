<template>
    <div class="section">
        <div class="container is-fluid">
            <div class="columns">
                <div class="column is-three-quarters">

                    <article class="message">
                        <div class="message-body">
                            <h1 class="title is-5">Ship to</h1>
                        </div>
                    </article>

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
                                <select>
                                    <option>
                                        Royal Mail 1st Class
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
                                <template slot=rows>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td class="has-text-weight-bold">
                                            Shipping
                                        </td>
                                        <td>
                                            $0.00
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
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      total: "cart/total",
      products: "cart/products",
      empty: "cart/empty",
    }),
  },
};
</script>