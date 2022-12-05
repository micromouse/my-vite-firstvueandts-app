<template>
  <div id="tags-view-container" class="tags-view-container">
    <div class="tags-view-wrapper">
      <router-link
        v-for="tag in tags"
        :key="tag.path"
        :class="isActiveTag(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query }"
        class="tags-view-item"
        v-on:click:middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        v-on:contextmenu.prevent="openContextMenu(tag, $event)"
      >
        {{ tag.meta?.title }}
        <close v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </div>
    <ul
      v-show="contextState.visible"
      :style="{ left: contextState.left + 'px', top: contextState.top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(contextState.selectedTag)">Refresh</li>
      <li v-if="!isAffix(contextState.selectedTag)" @click="closeSelectedTag(contextState.selectedTag)">Close</li>
      <li @click="closeOtherTags">Close Other Tags</li>
      <li @click="closeAllTags(contextState.selectedTag)">Close All Tags</li>
    </ul>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Close } from '@element-plus/icons-vue'
import { useTagsViewStore } from '@/infrustructures/store/tagsView'
import { RouteRecordRawExtend } from '@/typings/router'
import { ITagsContextState } from '@/typings/tags'
import useTags from '@/infrustructures/hooks/useTags'

export default defineComponent({
  components: {
    Close
  },
  setup() {
    const tagsViewStore = useTagsViewStore()
    const route = useRoute()

    //上下文菜单状态
    const contextState = reactive<ITagsContextState>({
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {} as RouteRecordRawExtend
    })

    const {
      isActiveTag,
      isAffix,
      refreshSelectedTag,
      closeSelectedTag,
      closeOtherTags,
      closeAllTags,
      openContextMenu,
      closeContextMenu
    } = useTags(contextState)

    //有新路由,添加新标签
    watch(
      () => route.path,
      () => tagsViewStore.M_addTag(route as unknown as RouteRecordRawExtend)
    )

    //关闭上下文菜单处理器
    watch(
      () => contextState.visible,
      (value) => {
        if (value) {
          document.body.addEventListener('click', closeContextMenu)
        } else {
          document.body.removeEventListener('click', closeContextMenu)
        }
      }
    )

    //标签集合
    const tags = computed(() => tagsViewStore.views)

    //数据
    return {
      contextState,
      tags,
      isActiveTag,
      isAffix,
      refreshSelectedTag,
      closeSelectedTag,
      closeOtherTags,
      closeAllTags,
      openContextMenu
    }
  }
})
</script>
<style lang="scss" scoped>
.tags-view-container {
  height: var(--tag-view-height);
  width: 100%;
  background: var(--tags-view-background);
  border-bottom: 1px solid var(--tags-view-border-bottom);
  box-shadow: var(--tags-view-box-shadow);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 27px;
      line-height: 26px;
      border: 1px solid var(--tags-view-item-border-color);
      color: var(--tags-view-item-color);
      background: var(--tags-view-item-background);
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 3px;
      &:first-of-type {
        margin-left: 10px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: var(--tags-view-item-active-background);
        color: var(--tags-view-item-active-color);
        border-color: var(--tags-view-item-active-border-color);
        &::before {
          content: '';
          background: var(--tags-view-background);
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: var(--tags-view-contextmenu-background);
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: var(--tags-view-contextmenu-color);
    box-shadow: var(--tags-view-contextmenu-box-shadow);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: var(--tags-view-contextmenu-hover-background);
      }
    }
  }
}
</style>
<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    border-radius: 3px;
    .el-icon-close {
      border-radius: 6px;
      width: 12px;
      height: 12px;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      vertical-align: -2px;

      &:hover {
        background-color: var(--tags-view-close-icon-hover-background);
        color: var(--tags-view-close-icon-hover-color);
      }
    }
  }
}
</style>
