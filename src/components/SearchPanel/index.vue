<template>
    <div class="search-panel">
        <div class="search-title">
            <svg-icon :icon-class="HeaderIcon"></svg-icon>
            <span>{{ title }}</span>
        </div>
        <slot name="content"></slot>
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
</style>