<template>
  <div class="index-page">
    <h1>Explore a large list of Cryptocurrencies</h1>
    <CryptoCurrencies />
  </div>
</template>

<script>
import CryptoCurrencies from '~/components/CryptoCurrencies'

export default {
  components: { CryptoCurrencies },
}
</script>

<style lang="scss" scoped>
.index-page {
  max-width: var(--max-width);
  margin: auto;
  padding: var(--spacing-standard);

  h1 {
    margin-bottom: 3rem;
    text-align: center;
  }
}
</style>
