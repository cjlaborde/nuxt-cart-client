<template>
  <form action="#" @submit.prevent="store">
    <div class="field">
        <div id="card-element"></div>
    </div>
    <div class="field">
        <p class="control">
            <button class="button is-info" :disabled="storing">
                Store card
            </button>
            <a href="#" class="button is-text" @click.prevent="$emit('cancel')">
                Cancel
            </a>
        </p>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      stripe: null,
      card: null,
      storing: false,
    };
  },

  methods: {
    async store() {
      this.storing = true;
      const { token, error } = await this.stripe.createToken(this.card);

      if (error) {
      } else {
        // console.log(token);
        // store on api
        let response = await this.$axios.$post("payment-methods", {
          token: token.id,
        });
        // emit added response data we get back
        this.$emit("added", response.data);
      }
      this.storing = false;
    },
  },
  mounted() {
    const stripe = Stripe(
      "pk_test_51I4NfbHCos07RG12lQTrUfTJlF2MOTsXvRMF5OA3FXRPf7ojdPnvX1oogLTcBeD2X0di58DKaFQjZAKF2Orme0ir00vjVtjhpS"
    );

    this.stripe = stripe;
    // console.log(this.stripe);

    this.card = this.stripe.elements().create("card", {
      style: {
        base: {
          fontSize: "16px",
        },
      },
      hidePostalCode: true,
    });

    this.card.mount("#card-element");
  },
};
</script>