<template>
    <div class="section">
    <div class="container is-fluid">
      <div class="columns is-centered">
        <div class="column is-three-quarters">
          <h1 class="title is-4">Your cart</h1>

          <article class="message">
            <CartOverview />
          </article>
          <p>
            Your cart is empty
          </p>

          <nuxt-link
            :to="{ name: 'checkout' }"
            class="button is-fullwidth is-info is-medium"
          >
            Checkout
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>