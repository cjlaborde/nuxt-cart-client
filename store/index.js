export const state = () => ({
    categories: []
});

export const getters = {
    categories(state) {
        return state.categories
    }
}

export const mutations = {
    SET_CATEGORIES(state, categories) {
        state.categories = categories
    }
}

export const actions = {
    // nuxtServerInit allows us to make request beforewe load application
    async nuxtServerInit({ commit }) {
        // $ = response.data.data
        let response = await this.$axios.$get('categories')

        commit('SET_CATEGORIES', response.data)
    }
}