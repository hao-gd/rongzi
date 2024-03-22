<template>
    <div class="search-panel">
        <div class="search-title mb20 flex fjb aic">
            <div>
                <svg-icon v-if="isIcon" :icon-class="HeaderIcon" class-name="search-icon"></svg-icon>
                <slot name="title">
                    <!-- 如果没有插槽内容，则显示 prop "title" 的值 -->
                    <span class="title" v-if="!hasTitleSlot">{{ title }}</span>
                </slot>
            </div>
            <slot name="search"></slot>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        HeaderIcon: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: '搜索'
        },
        isIcon: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {

        }
    },
    computed: {
        // 通过检查 $slots 对象来判断是否有内容传递给 "title" 插槽
        hasTitleSlot() {
            return !!this.$slots.title;
        }
    }
}
</script>

<style lang="scss" scoped>
.search-panel {
    background: #FFFFFF;
    box-sizing: border-box;
}

.search-title {
    color: #1D2129;

}

.search-title>span {}

.title {
    font-size: 20px;
    font-weight: 600;
}

.search-icon {
    margin-right: 8px;
    font-size: 18px;
    // vertical-align: middle;
}
</style>