<template>
  <div class="field">
      <label class="label">
          {{ type }}
      </label>
      <div class="control">
          <div class="select is-fullwidth">
              <!-- When you select Whole Bean then select Ground it will remove Whole bean selection with selectedVariationId -->
              <select :value="selectedVariationId" @change="changed($event, type)">
                  <option value="">Please choose</option>
                  <option
                    v-for="variation in variations" 
                    :key="variation.id"
                    :value="variation.id"
                  >
                    {{ variation.name }}

                    <template v-if="variation.price_varies">
                        ({{ variation.price }})
                    </template>
                  </option>
              </select>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      required: true,
      type: String,
    },
    variations: {
      required: true,
      type: Array,
    },
    value: {
      required: false,
      default: "",
    },
  },

  computed: {
    selectedVariationId() {
      if (!this.findVariation(this.value.id)) {
        return "";
      }

      return this.value.id;
    },
  },
  methods: {
    changed(event, type) {
      this.$emit("input", this.findVariation(event.target.value));
    },

    // reason we use this is because we want to be able to set the variation stock count in future
    findVariation(id) {
      // we want the variation id to equal the id we have given
      let variation = this.variations.find((v) => v.id == id);

      // if it can't be found then return null
      if (typeof variation === "undefined") {
        return null;
      }

      // return variation that we did find
      return variation;
    },
  },
};
</script>

<style>
</style>