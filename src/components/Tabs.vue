<template>
  <ul class="tabs">
    <li v-for="item in items" v-bind:class="{ 'active_tab': selected === itemIndex(item) }" v-on:click="onSelect(itemIndex(item))">{{ item }}</li>
  </ul>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'tabs',

  data() {
    return {
      selected: null,
    };
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  mounted() {
    this.onLoad();
  },

  methods: {
    itemIndex(item) {
      return this.items.indexOf(item);
    },

    onLoad() {
      if (!_.size(this.items)) {
        return;
      }

      this.selected = 0;
      this.$emit('select', 0);
    },

    onSelect(key) {
      if (this.selected !== key) {
        this.selected = key;
        this.$emit('select', key);
      }
    },
  },
};
</script>

<style scoped>
.tabs {
  font-family: "Lucida Console", Monaco, monospace;
  font-size: 18px;
}

.tabs li {
  display: inline-block;
  user-select: none;
  cursor: pointer;
  margin-right: 10px;
}

.tabs li:hover {
  color: tomato;
  text-decoration: underline;
}

.active_tab {
  color: green;
  text-decoration: underline;
}
</style>
