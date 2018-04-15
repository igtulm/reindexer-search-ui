<template>
  <div class="viewer-container">
    <div v-for="item in items" class="item">
      <a :href="item.link">{{ item.title || item.link }}</a>
      <div class="flex-wrapper">
        <img class="image" v-if="item.image" :src="item.image">
        <span class="description">{{ item.text }}</span>
      </div>
      <span class="user">User: {{ item.user }}</span>
      <span class="time">Datetime: {{ getTime(item.time) }}</span>
      <div class="clear" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'viewer',

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    getTime(epoch) {
      return new Date(epoch * 1000);
    },
  },
};
</script>

<style scoped>
.viewer-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;

  min-width: 320px;
  max-width: 600px;
}

.item {
  font-family: "Lucida Console", Monaco, monospace;


  border-bottom: 1px solid #626262;
  margin: 3px;
  padding: 10px 0 10px;
  overflow: hidden;
}

.item a {
  font-size: 18px;
}

.flex-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
}

.image {
  flex-grow: 0;
  flex-shrink: 0;
  height: 100px;
  width: 100px;
}

.description {
  font-size: 12px;
  margin: 10px 0 10px 10px;
}

.user {
  font-size: 14px;
  float: left;
}

.time {
  font-size: 14px;
  float: right;
}

.div {
  clear: both;
}
</style>
