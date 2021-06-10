export const state = () => {
  return {
    currencies: [],
  }
}

export const getters = {
  getCurrencies(state) {
    return state.currencies
  },
}

export const mutations = {
  SET_CURRENCIES(state, currencies) {
    state.currencies = currencies
  },
}

export const actions = {
  async fetchCurrencies({ commit }, payload) {
    const { data } = await this.$axios.$get(
      'https://api.coinranking.com/v1/public/coins/',
      {
        params: {
          limit: payload.limit,
          offset: payload.offset,
        },
      }
    )
    commit('SET_CURRENCIES', data?.coins)
  },
}
