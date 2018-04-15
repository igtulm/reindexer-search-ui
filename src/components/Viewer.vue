<template>
  <div class="viewer-container">
    <div v-if="!itemsAreProvided">
      <span class="noresults">No results</span>
    </div>
    <div v-for="item in items" class="item">
      <a :href="item.link">{{ item.title || item.link }}</a>
      <div class="description-wrapper">
        <img class="image" v-if="item.image" :src="item.image">
        <span class="description" v-html="item.text" />
        <div class="clear" />
      </div>
      <span class="user">User: {{ item.user }}</span>
      <span class="time">Datetime: {{ getDateTime(item.time) }}</span>
      <div class="clear" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'viewer',

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    itemsAreProvided() {
      return !!_.size(this.items);
    },
  },

  methods: {
    getDateTime(epoch) {
      return new Date(epoch * 1000);
    },
  },
};
</script>

<style scoped>
.viewer-container {
  min-width: 600px;
}

.noresults {
  font-family: "Lucida Console", Monaco, monospace;
  font-size: 18px;
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

.description-wrapper {
  margin: 10px 0;
}

.image {
  float: left;
  max-width: 100px;
  max-height: 100px;
  width: auto;
  height: 100px;
}

.description {
  float: left;
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

.clear {
  clear: both;
}
</style>
