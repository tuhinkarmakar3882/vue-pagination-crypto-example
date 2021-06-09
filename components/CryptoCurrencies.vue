<template>
  <div class="crypto-currencies-component">
    <header>
      <button>Previous</button>
      <select v-model="itemsPerPage" name="items-per-page">
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <button>Next</button>
    </header>

    <main>
      <section
        v-for="cryptoCurrency in cryptoCurrencies.slice(0, itemsPerPage)"
        :key="cryptoCurrency.id"
        tabindex="0"
      >
        <img :alt="cryptoCurrency.name" :src="cryptoCurrency.iconUrl" />
        <aside>
          <p><strong>Name:</strong> {{ cryptoCurrency.name }}</p>
          <p><strong>Price:</strong> ${{ cryptoCurrency.price }}</p>
          <p><strong>Change:</strong> {{ cryptoCurrency.change }}%</p>
        </aside>
      </section>
    </main>
  </div>
</template>

<script>
import jsonData from '@/data/response.json'

export default {
  name: 'CryptoCurrencies',
  data() {
    return {
      cryptoCurrencies: undefined,
      itemsPerPage: 25,
    }
  },
  watch: {
    itemsPerPage(newValue) {
      // this.$store.dispatch('Currencies/')
    },
  },
  mounted() {
    this.cryptoCurrencies = this.fetchCryptoData()
  },
  methods: {
    fetchCryptoData() {
      return jsonData.data.coins
    },
  },
}
</script>

<style lang="scss" scoped>
.crypto-currencies-component {
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  main {
    display: flex;
    flex-wrap: wrap;
    gap: var(--standard);

    section {
      display: flex;
      background: var(--card-background);
      gap: 16px;
      flex: 1 1 0;
      min-width: 250px;
      padding: var(--standard);
      border-radius: 8px;
      box-shadow: 0 0 4px hsla(0, 0%, 0%, 0.3);
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

      img {
        height: 64px;
        width: 64px;
        object-fit: cover;
      }
    }
  }
}
</style>
