<template>
  <div class="crypto-currencies-component">
    <header>
      <button :disabled="isFirstPage" @click="goToPreviousPage">&lt;</button>
      <select v-model="itemsPerPage" name="items-per-page">
        <option
          v-for="option in perPageItemCount"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
      <button @click="goToNextPage">&gt;</button>
    </header>

    <main>
      <section
        v-for="cryptoCurrency in cryptoCurrencies.slice(0, itemsPerPage)"
        :key="cryptoCurrency.id"
        tabindex="0"
      >
        <a :href="cryptoCurrency.websiteUrl" target="_blank">
          <img :alt="cryptoCurrency.name" :src="cryptoCurrency.iconUrl" />
          <aside>
            <p><strong>Name:</strong> {{ cryptoCurrency.name }}</p>
            <p><strong>Symbol:</strong> {{ cryptoCurrency.symbol }}</p>
            <p><strong>Price:</strong> ${{ cryptoCurrency.price }}</p>
            <p><strong>Change:</strong> {{ cryptoCurrency.change }}%</p>
          </aside>
        </a>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'CryptoCurrencies',

  data() {
    return {
      perPageItemCount: [10, 25, 50, 100],
      itemsPerPage: 10,
      currentPage: 1,
      refreshInterval: undefined,
    }
  },

  computed: {
    offsetValue() {
      return this.itemsPerPage * this.currentPage - this.itemsPerPage
    },

    isFirstPage() {
      return this.currentPage === 1
    },

    cryptoCurrencies: {
      get() {
        return this.$store.getters['Currencies/getCurrencies']
      },
      set(payload) {
        return this.$store.dispatch('Currencies/fetchCurrencies', payload)
      },
    },
  },

  watch: {
    itemsPerPage(newValue, oldValue) {
      const existingOffset = oldValue * this.currentPage - oldValue
      this.currentPage = existingOffset / newValue + 1
      this.fetchCryptoData()
    },
    currentPage() {
      this.fetchCryptoData()
    },
  },

  mounted() {
    const refreshTime = 10 * 60 * 1000 // minutes * seconds * milliseconds
    this.refreshInterval = setInterval(this.fetchCryptoData, refreshTime)

    this.fetchCryptoData()
  },

  beforeDestroy() {
    clearInterval(this.refreshInterval)
  },

  methods: {
    async fetchCryptoData() {
      await this.$store.dispatch('Currencies/fetchCurrencies', {
        limit: this.itemsPerPage,
        offset: this.offsetValue,
      })
    },

    goToPreviousPage() {
      const pageNumber = this.currentPage - 1 > 0 ? this.currentPage - 1 : 1
      if (pageNumber === this.currentPage) return
      this.currentPage = pageNumber
      this.fetchCryptoData()
    },

    goToNextPage() {
      this.currentPage++
      this.fetchCryptoData()
    },
  },
}
</script>

<style lang="scss" scoped>
.crypto-currencies-component {
  header,
  main {
    padding: 0 var(--spacing-standard);
  }
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
    gap: var(--spacing-standard);
    position: sticky;
    z-index: 1;
    background: var(--body-segment);
    top: 0;
  }

  main {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-standard);

    section {
      display: flex;
      flex: 1 1 0;
      min-width: 300px;
      padding: var(--spacing-standard);
      background: var(--card-background);
      border-radius: var(--spacing-micro);
      box-shadow: 0 0 var(--spacing-nano) hsla(0, 0%, 0%, 0.3);
      cursor: pointer;

      &:hover,
      &:focus {
        transform: scale(1.05);
        background: var(--primary-color);
      }

      &:active {
        background: var(--primary-color);
        transform: scale(0.95);
      }

      a {
        text-decoration: none;
        display: flex;
        gap: var(--spacing-standard);

        img {
          height: 64px;
          width: 64px;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
