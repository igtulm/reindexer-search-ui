<template>
  <div>
    <span class="total">Total results: {{totalItems}}</span>
    <ul class="paginator">
      <li v-on:click="onStartClick()" v-bind:class="{ 'block_btn': !canStart }"><<</li>
      <li v-on:click="onBackClick()" v-bind:class="{ 'block_btn': !canBack }"><</li>
      <li
        v-for="page in pages"
        v-on:click="onPageSelect(page)"
        v-bind:class="{ 'active_btn': page === pageSelected }">
        {{page}}
      </li>
      <li v-on:click="onForwardClick()" v-bind:class="{ 'block_btn': !canForward }">></li>
      <li v-on:click="onEndClick()" v-bind:class="{ 'block_btn': !canEnd }">>></li>
    </ul>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'searcher',

  props: {
    totalItems: {
      type: Number,
      default: 0,
    },

    itemsPerPage: {
      type: Number,
      default: 10,
    },

    page: {
      type: Number,
      default: 1,
    },
  },

  data() {
    return {
      pageListOffset: this.itemsPerPage * (Math.ceil(this.page / this.itemsPerPage) - 1) + 1,
      pageSelected: this.page,
    };
  },

  computed: {
    pagesCount() {
      return Math.ceil(this.totalItems/this.itemsPerPage);
    },

    canBack() {
      const res = this.pageListOffset - this.itemsPerPage;

      return res > 0 ? true : false;
    },

    canForward() {
      const res = this.pageListOffset + this.itemsPerPage;

      return res > this.pagesCount ? false : true;
    },

    canStart() {
      if (!this.canBack) {
        return false;
      }

      return true;
    },

    canEnd() {
      if (!this.canForward) {
        return false;
      }

      return true;
    },

    pages() {
      const upperBound = this.pageListOffset + this.itemsPerPage;
      const res = upperBound > this.pagesCount ? this.pagesCount + 1 : upperBound;

      return _.range(this.pageListOffset, res);
    },
  },

  methods: {
    onPageSelect(page) {
      this.pageSelected = page;

      this.$emit('onchange', this.pageSelected);
    },

    onStartClick() {
      this.pageListOffset = 1;
      this.pageSelected = 1;

      this.$emit('onchange', this.pageSelected);
    },

    onBackClick() {
      const res = this.pageListOffset - this.itemsPerPage;
      this.pageListOffset = res > 0 ? res : this.pageListOffset;
      this.pageSelected = this.pageSelected - this.itemsPerPage > 0 ? this.pageSelected - this.itemsPerPage : 1;

      this.$emit('onchange', this.pageSelected);
    },

    onForwardClick() {
      const res = this.pageListOffset + this.itemsPerPage;
      this.pageListOffset = res > this.pagesCount ? this.pageListOffset : res;
      this.pageSelected = this.pageSelected + this.itemsPerPage > this.pagesCount ? this.pagesCount : this.pageSelected + this.itemsPerPage;

      this.$emit('onchange', this.pageSelected);
    },

    onEndClick() {
      this.pageListOffset = this.itemsPerPage * (Math.ceil(this.pagesCount / this.itemsPerPage) - 1) + 1;
      this.pageSelected = this.pagesCount;

      this.$emit('onchange', this.pageSelected);
    }
  },

  watch: {
    page(newPage) {
      this.pageListOffset = this.itemsPerPage * (Math.ceil(newPage / this.itemsPerPage) - 1) + 1;
      this.pageSelected = newPage;

      return newPage;
    },
  },
};
</script>

<style scoped>
.paginator {
  overflow: hidden;
}

.paginator li {
  display: inline-block;
  cursor: pointer;
  user-select: none;
  padding-top: 10px;
  min-width: 30px;
  height: 25px;
  text-align: center;
  border: 1px solid black;
  float: left;
}

.paginator li:hover {
  background-color: #b5b5b5;
}

.active_btn {
  background-color: gray;
}

.block_btn {
  opacity: 0.5;
  pointer-events: none;
}

.total {
  display: block;
  margin-bottom: 10px;
}
</style>
