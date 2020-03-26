<template>
  <div v-if="origin" class="baidu-origin" />
  <div v-else class="baidu">
    <div class="nav-top">
      <div v-for="menu of topMenus" :key="menu.label" class="top-menu">
        <a href="javascript:void(0)" @click="openLocation(menu)">
          {{ menu.label }}
        </a>
      </div>
    </div>
    <div class="nav-content">
      <Logo />
      <div class="search">
        <span class="search-input"><input v-model="keyword"/></span>
        <div class="search-button" @click="searchKeyword(keyword)">
          百度一下
        </div>
      </div>
    </div>
    <div class="nav-bottom">
      <div class="left">
        <div v-for="menu of bottomMenus" :key="menu.label" class="bottom-menu">
          <a href="javascript:void(0)" @click="openLocation(menu)">
            {{ menu.label }}
          </a>
        </div>
      </div>
      <div class="right">
        <div>©{{ new Date().getFullYear() }}&nbsp;Baidu&nbsp;</div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '../components/Baidu/Logo';

export default {
  name: 'Baidu',
  components: { Logo },
  data() {
    return {
      origin: false,
      keyword: '',
      topMenus: [
        { label: '抗击肺炎', style: 'badge' },
        { label: '新闻', location: 'https://news.baidu.com/' },
        { label: 'hao123', location: 'https://www.hao123.com/' },
        { label: '地图', location: 'https://map.baidu.com/' },
        { label: '视频', location: 'https://v.baidu.com/' },
        { label: '贴吧', location: 'https://tieba.baidu.com/' },
        { label: '学术', location: 'https://xueshu.baidu.com/' },
        { label: '登录' },
        {
          label: '设置',
          style: 'dropdown',
          nested: [
            { label: '搜索设置' },
            { label: '高级搜索' },
            { label: '关闭预测' },
            { label: '隐私设置' },
          ],
        },
        {
          label: '更多产品',
          style: 'dropdown',
          nested: [
            { label: '百度营销', icon: 'fas fa-globe-asia' },
            { label: '音乐', icon: 'fas fa-square' },
            { label: '图片', icon: 'fas fa-square' },
            { label: '知道', icon: 'fas fa-question-circle' },
            { label: '文科', icon: 'fas fa-square' },
            { label: '风云榜', icon: 'fas fa-poll' },
            { label: '全部产品' },
          ],
        },
      ],
      bottomMenus: [
        { label: '设为首页' },
        { label: '关于百度', location: 'https://home.baidu.com/' },
        { label: 'About Baidu', location: 'https://ir.baidu.com/' },
        { label: '百度推广', location: 'https://e.baidu.com/' },
        { label: '使用百度前必读', location: 'https://www.baidu.com/duty' },
        { label: '意见反馈' },
        { label: '帮助中心', location: 'https://help.baidu.com/' },
      ],
    };
  },
  methods: {
    openLocation(menu) {
      menu.location && window.open(menu.location, '_blank');
    },
    searchKeyword(keyword) {
      keyword && window.open(`https://www.baidu.com/s?wd=${keyword}`, '_blank');
    },
  },
};
</script>

<style lang="less" scoped>
.baidu-origin {
  background-image: url('../assets/Baidu.png');
  background-repeat: no-repeat;
  background-size: cover;
}

.baidu {
  display: flex;
  flex-direction: column;
}

.nav-top {
  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  .top-menu {
    margin-left: 1rem;
    font-size: 13px;
    font-weight: 700;
    display: flex;
    align-items: center;
    > a {
      color: #333;
    }
  }
}

.nav-content {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  flex-grow: 10;
  margin-top: 10%;
  .search {
    margin-top: 1rem;
    height: 36px;
    display: flex;
    justify-content: center;
  }
  .search-input {
    flex-grow: 1;
    display: flex;
    max-width: 30rem;
    input {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      flex-grow: 1;
      border: 1px solid #999;
      &:focus {
        border: 1px solid #2d78f4;
      }
    }
  }
  .search-button {
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    background-color: #3385ff;
    color: #fff;
    cursor: pointer;
    user-select: none;
  }
}

.nav-bottom {
  flex-shrink: 0;
  flex-basis: 40px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: #fafafa;
  .left {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .bottom-menu {
      margin-right: 1rem;
      font-size: 12px;
      display: flex;
      align-items: center;
      > a {
        text-decoration: none;
        color: #999;
      }
    }
  }
  .right {
    font-size: 12px;
    color: #bbb;
    display: flex;
    align-items: center;
  }
}
</style>
