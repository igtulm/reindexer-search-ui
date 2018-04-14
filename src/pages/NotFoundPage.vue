<template>
  <div class="page-wrapper">
    <p class="notfound">404 Not Found</p>
  </div>
</template>

<script>
export default {
  name: 'not-found-page',
};
</script>

<style scoped>
.page-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 75px;
  grid-gap: 10px;
  font-family: "Lucida Console", Monaco, monospace;
}

.notfound {
  display: grid;
  align-items: center;
  justify-items: center;
  font-size: 36px;
  color: red;
}
</style>
