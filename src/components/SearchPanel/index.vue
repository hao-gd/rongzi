<template>
    <div class="search-panel">
        <div class="search-title mb20">
            <svg-icon :icon-class="HeaderIcon" class-name="search-icon"></svg-icon>
            <span>{{ title }}</span>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ['HeaderIcon', 'title'],
    data() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.search-panel {
    background: #FFFFFF;
}

.search-title {
    color: #1D2129;

}

.search-title>span {
    margin-left: 8px;
    font-size: 20px;
    font-weight: 600;
}
.search-icon {
    font-size: 18px;
    // vertical-align: middle;
}
</style>