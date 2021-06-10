<template>
  <div class="index-page">
    <header>
      <h1>The Crypto Glass</h1>
      <p>
        Explore a large list of Cryptocurrencies, with chronologically updated
        stuffs
      </p>
    </header>

    <main>
      <CryptoCurrencies />
    </main>
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
  header {
    background: var(--body-segment);
    text-align: center;
    padding: var(--spacing-large) var(--spacing-standard);
  }

  main {
    padding: var(--spacing-standard);
    max-width: var(--max-width);
    margin: auto;
  }
}
</style>
