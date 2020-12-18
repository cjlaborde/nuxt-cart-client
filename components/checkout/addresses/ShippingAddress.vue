<template>
    <article class="message">
        <div class="message-body">
            <h1 class="title is-5">Ship to</h1>

            <template v-if="selecting">
              <ShippingAddressSelector 
                :addresses="addresses" 
                :selectedAddress="selectedAddress"
                @click="addressSelected"
              />
            </template>
            <template v-else>
              <template v-if="selectedAddress">
                <p>
                  {{ selectedAddress.name }} <br>
                  {{ selectedAddress.address_1 }} <br>
                  {{ selectedAddress.city }} <br>
                  {{ selectedAddress.postal_code }} <br>
                  {{ selectedAddress.country.name }} <br>
                </p>
                <br>
              </template>
              <div class="field is-grouped">
                <p class="control">
                  <a href="" class="button is-info" @click.prevent="selecting = true">Change shipping address</a>
                </p>
              </div>
            </template>

        </div>
    </article>
</template>

<script>
export default {
  data() {
    return {
      selecting: false,
      created: false,
      localAddresses: this.addresses,
      selectedAddress: null,
    };
  },
  props: {
    addresses: {
      required: true,
      type: Array,
    },
  },

  computed: {
    defaultAddress() {
      //   return this.localAddresses.find((address) => {
      //     return address.default === true;
      //   });
      // Short version
      return this.localAddresses.find((address) => address.default === true);
    },
  },

  methods: {
    addressSelected(address) {
      this.switchAddress(address);
      this.selecting = false;
    },
    switchAddress(address) {
      this.selectedAddress = address;
    },
  },

  created() {
    if (this.addresses.length) {
      this.switchAddress(this.defaultAddress);
    }
  },
};
</script>