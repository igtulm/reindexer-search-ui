<template>
  <article class="snippet">
    <header>
      <span class="image" />
      <span class="username">{{ user }}</span>
      <span class="time">{{ customDateTimeFormat(time) }}</span>
      <div class="clear" />
    </header>
    <p><a class="title" href="#" @click.prevent="goToLink(link)">{{ title }}</a></p>
    <ul class="hubs">
      <li v-for="hub in hubs">{{ hub }}</li>
    </ul>
    <ul class="tags">
      <li v-for="tag in tags">{{ tag }}</li>
    </ul>
    <div class="content">
      <img v-if="image" class="content-image" :src="image"/>
      <span v-if="text" class="content-description" v-html="text" />
      <div class="clear" />
    </div>
    <a class="read-btn" href="#" @click.prevent="goToLink(link)">Читать дальше</a>
    <footer>
      <ul class="signs">
        <li class="signs-icon">
          <octicon name="heart" />
        </li>
        <li>
          <span class="signs-value">{{ likes }}</span>
        </li>
        <li class="signs-icon">
          <octicon name="bookmark" />
        </li>
        <li>
          <span class="signs-value">{{ favorites }}</span>
        </li>
        <li class="signs-icon">
          <octicon name="eye" />
        </li>
        <li>
          <span class="signs-value">{{ views }}</span>
        </li>
      </ul>
    </footer>
  </article>
</template>

<script>
import _ from 'lodash';
import * as moment from 'moment';
import Octicon from 'vue-octicon/components/Octicon';

export default {
  name: 'snippet-post',

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

    title: {
      type: String,
      default: '',
    },

    link: {
      type: String,
      default: '',
    },

    image: {
      type: String,
      default: '',
    },

    text: {
      type: String,
      default: ''
    },

    tags: {
      type: Array,
      default: () => [],
    },

    hubs: {
      type: Array,
      default: () => [],
    },

    likes: {
      type: Number,
      default: 0,
    },

    favorites: {
      type: Number,
      default: 0,
    },

    views: {
      type: Number,
      default: 0,
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
  margin-bottom: 40px;
  max-height: 850px;
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

.title {
  font-family: 'Fira Sans',sans-serif;
  color: #444;
  font-weight: 500;
  font-size: 28px;
  line-height: 36.4px;
  text-decoration: none;
  max-height: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title:hover {
  color: #487284;
}

.hubs {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hubs li {
  margin: 0;
  color: #5e6973;
  font-size: 13px;
}

.hubs li:after {
  content: ',';
  margin-right: 5px;
}

.hubs li:last-child:after {
  content: "";
}

.tags {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tags li {
  margin: 0;
  margin-top: 10px;
  color: #5e6973;
  font-size: 13px;
}

.tags li:before {
  content: '#';
}

.tags li:after {
  content: ',';
  margin-right: 5px;
}

.tags li:last-child:after {
  content: "";
}

.content {
  max-height: 102px;
  height: auto;
  margin-top: 10px;
  white-space: nowrap;
}

.content-image {
  display: block;
  height: 100px;
  width: auto;
  max-width: 100px;
  float: left;
}

.content-description {
  margin-left: 5px;
  width: 670px;
  float: left;
  max-height: 75px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #222;
  font-size: 16px;
  line-height: 1.56;
  font-weight: 400;
  font-style: normal;
  text-rendering: optimizeLegibility;
  font-family: "-apple-system", BlinkMacSystemFont, Arial, sans-serif;
}

.read-btn, .read-btn:link, .read-btn:visited {
  displat: block;
  margin-top: 15px;
  margin-bottom: 15px;
  text-decoration: none;
  padding: 0 13px;
  height: 36px;
  border-radius: 3px;
  font-size: 13px;
  border: 1px solid #75aeca;
  color: #7aa1bd !important;
  box-shadow: none;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  font-weight: 500;
  font-family: "-apple-system", BlinkMacSystemFont, Arial, sans-serif;
}

.read-btn:hover {
  border: 1px solid transparent;
  background-color: #7aa1bd;
  color: #fff !important;
}

.signs {
  display: inline-flex;
  -ms-flex-align: center;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid #e5e9eb;
  height: 40px;
  white-space: nowrap;
}

.signs-icon {
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
  margin-left: 10px;
}

.signs-value {
  margin-left: 5px;
  margin-right: 10px;
  width: 30px;
  color: #548eaa;
  text-align: left;
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
}
</style>
