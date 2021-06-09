<template>
  <div class="crypto-currencies-component">
    <section
      v-for="cryptoCurrency in cryptoCurrencies"
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
  </div>
</template>

<script>
import jsonData from '@/data/response.json'

export default {
  name: 'CryptoCurrencies',
  data() {
    return {
      cryptoCurrencies: undefined,
    }
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
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  section {
    display: flex;
    background: hsl(0, 0%, 90%);
    gap: 16px;
    flex: 1 1 0;
    min-width: 250px;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 0 4px hsla(0, 0%, 0%, 0.3);
    transition: all 200ms ease-in-out;
    cursor: pointer;

    &:hover,
    &:focus {
      transform: scale(1.05);
      background: hsl(100, 40%, 90%);
    }

    &:active {
      background: hsl(100, 40%, 90%);
      transform: scale(0.9);
    }

    img {
      height: 64px;
      width: 64px;
      object-fit: cover;
    }
  }
}
</style>
