export const state = () => ({
    products: [],
    empty: true,
    subtotal: null,
    total: null,
})

export const getters = {
    products(state) {
        return state.products
    },

    count(state) {
        return state.products.length
    },
    // check if cart is empty
    empty(state) {
        return state.empty
    },

    subtotal(state) {
        return state.subtotal
    },

    total(state) {
        return state.total
    }
}

export const mutations = {
    SET_PRODUCTS(state, products) {
        state.products = products
    },

    SET_EMPTY(state, empty) {
        state.empty = empty
    },

    SET_SUBTOTAL(state, subtotal) {
        state.subtotal = subtotal
    },

    SET_TOTAL(state, total) {
        state.total = total
    }
}

export const actions = {
    async getCart({ commit }) {
        let response = await this.$axios.$get('cart')

        // you can look in postman to see the data we want to add
        commit('SET_PRODUCTS', response.data.products)
        commit('SET_EMPTY', response.meta.empty)
        commit('SET_SUBTOTAL', response.meta.subtotal)
        commit('SET_TOTAL', response.meta.total)

        return response
    },

    async destroy({ dispatch }, productId) {
        let response = await this.$axios.$delete(`cart/${productId}`)

        dispatch('getCart')
    },

    async update({ dispatch }, { productId, quantity }) {
        let response = await this.$axios.$patch(`cart/${productId}`, {
            quantity
        })

        dispatch('getCart')
    }
}