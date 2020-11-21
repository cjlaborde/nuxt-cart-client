<template>
  <div class="section">
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-half">
          <img src="http://via.placeholder.com/620x620" alt="Product name">
        </div>
        <div class="column is-half">
          <section class="section">
            <h1 class="title is-4">
              {{ product.name }}
            </h1>
            <p v-if="product.description">
              {{ product.description }}
            </p>

            <hr>

            <span class="tag is-rounded is-medium is-dark" v-if="!product.in_stock">
              Out of stock
            </span>

            <span class="tag is-rounded is-medium">
              {{ product.price }}
            </span>
          </section>

          <section class="section">
            <form action="">
              <ProductVariation 
                v-for="(variations, type) in product.variations"
                :type="type"
                :variations="variations"
                :key="type"
                v-model="form.variation"
              />
              {{ form }}

              <div class="field has-addons" v-if="form.variation">
                <div class="control">
                  <div class="select is-fullwidth">
                    <select name="" id="" v-model="form.quantity">
                      <option :value="stock_count" v-for="stock_count in parseInt(form.variation.stock_count)" :key="stock_count">
                        {{ stock_count }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="control">
                  <button type="submit" class="button is-info">Add to cart</button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: null,
      form: {
        variation: "",
        quantity: 1,
      },
    };
  },
  watch: {
    // set default value when we switch to a variation that has less stock than currently selected
    "form.variation"() {
      this.form.quantity = 1;
    },
  },
  // params from the url
  async asyncData({ params, app }) {
    let response = await app.$axios.$get(`products/${params.slug}`);
    return {
      product: response.data,
    };
  },
};
</script>



