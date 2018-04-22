<template>
  <article class="snippet">
    <header>
      <span class="image" />
      <span class="username">{{ user }}</span>
      <span class="time">{{ customDateTimeFormat(time) }}</span>
      <a class="comment-link" href="#" @click.prevent="goToLink(link)"><octicon name="comment" /></a>

      <ul class="likes">
        <li class="likes-icon">
          <octicon class="likes-icon" name="heart" />
        </li>
        <li class="likes-value">
          <span>{{ likes }}</span>
        </li>
      </ul>
      <div class="clear" />
    </header>
    <span v-if="text" class="content-description" v-html="text" />
  </article>
</template>

<script>
import _ from 'lodash';
import * as moment from 'moment';
import Octicon from 'vue-octicon/components/Octicon';

export default {
  name: 'snippet-comment',

  components: {
    Octicon,
  },

  props: {
    user: {
      type: String,
      default: '',
    },

    time: {
      type: Number,
      default: '',
    },

    text: {
      type: String,
      default: ''
    },

    likes: {
      type: Number,
      default: 0,
    },

    link: {
      type: String,
      default: '',
    },
  },

  data() {
    return {

    };
  },

  methods: {
    goToLink(url) {
      const win = window.open(url, '_blank');
      win.focus();
    },

    // TODO refactoring: this component must be dumb
    customDateTimeFormat(date) {
      return moment.unix(date).format("DD.MM.YYYY HH:MM");
    },
  },
};
</script>

<style scoped>
/* Styles are taken from original site for speed up the development. Need to remove redundant! */
.snippet {
  width: 780px;
  overflow: hidden;
  margin-bottom: 60px;
  max-height: 400px;
}

.clear {
  clear: both;
}

.image {
  height: 24px;
  width: 24px;
  background-color: #8baab5;
  float: left;
}

.username {
  font-family: "-apple-system", BlinkMacSystemFont, Arial, sans-serif;
  margin-left: 8px;
  font-size: 13px;
  color: #548eaa;
  vertical-align: baseline;
  line-height: 20px;
  font-weight: 500;
  float: left;
  margin-top: 2px;
}

.time {
  color: #5f5f5f;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  float: left;
  margin-left: 8px;
  margin-top: 4px;
}

.comment-link {
  color: #aac7d6;
  padding: 0 8px;
  line-height: 0;
  font-size: 0;
  display: inline-block;
  vertical-align: baseline;
  cursor: pointer;
  float: left;
  margin-left: 10px;
  margin-top: 3px;
}

.likes {
  float: right;
  margin-top: 4px;
  display: inline-flex;
  -ms-flex-align: center;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  height: 40px;
  white-space: nowrap;
  color: #aac7d6;
  padding: 0 8px;
  line-height: 0;
  font-size: 0;
  vertical-align: baseline;
}

.likes-icon {
  width: 34px;
  height: auto;
  text-align: center;
  padding: 0;
  margin: 0;
  -ms-flex: none;
  flex: none;
  color: #bbcdd6;
  font-size: 0;
  display: -ms-flexbox;
  display: flex;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  border: 0;
  background-color: transparent;
  box-shadow: none;
  padding: 0;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: auto;
  font-weight: 500;
  font-family: "-apple-system", BlinkMacSystemFont, Arial, sans-serif;
  line-height: 1.15;
}

.likes-value {
  color: #548eaa;
  text-align: left;
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  margin-left: 5px;
}

</style>
