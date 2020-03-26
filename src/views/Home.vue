<template>
  <div class="home">
    <div class="routes">
      <router-link
        v-for="route in routes"
        :key="route.path"
        :to="route.path"
        :exact="route.exact"
        class="route"
      >
        {{ route.path }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    routes() {
      return this.$router.options.routes.filter(
        (route) => route.component && route.path != '/'
      );
    },
  },
};
</script>

<style scoped>
.routes {
  display: flex;
  flex-direction: column;
}
</style>
