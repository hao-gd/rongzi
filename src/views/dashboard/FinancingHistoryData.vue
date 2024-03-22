<template>
    <div class="content">
        <div class="app-container">
            <search-panel title="历史融资余额" :isIcon="false">
                <el-form slot="search" :inline="true" :model="queryParams">
                    <el-row :gutter="20" type="flex">
                        <el-col :span="8">
                            <el-form-item class="no_mb" label="借款单位"></el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item class="no_mb" label="金融机构"></el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item class="no_mb" label="融资类型"></el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item class="no_mb" label="时间类型"></el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </search-panel>

            <el-divider class="mt20 mb20"></el-divider>

            <div class="small-panel-content">
                <el-row :gutter="20">
                    <el-col :span="8" v-for="i in 3" :key="i" class="flex">
                        <div class="small-panel-left-icon" :class="'left-icon'+i"></div>
                        <div class="small-panel-right-text-content">
                            <p class="right-text"></p>
                            <!-- <p class="right-amount"></p> -->
                            <count-to :start-val='0' :end-val='10000000'
                            :duration='1000' :decimals='0'
                            :separator="'.'" :prefix="'¥ '"
                            :suffix="''" :autoplay=true
                            :useEasing="true"></count-to>
                        </div>
                    </el-col>
                    <!-- <el-col :span="8">
                        <div class="small-panel-left-icon"></div>
                        <div class="small-panel-right-text-content">
                            <p class="right-text"></p>
                            <p class="right-amount"></p>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="small-panel-left-icon"></div>
                        <div class="small-panel-right-text-content">
                            <p class="right-text"></p>
                            <p class="right-amount"></p>
                        </div>
                    </el-col> -->
                </el-row>
            </div>
        </div>
        <div class="app-container">
            <search-panel title="融资管理数据" :isIcon="false"></search-panel>
        </div>
    </div>
</template>
<script>
import SearchPanel from '@/components/SearchPanel/index.vue'
import * as echarts from 'echarts';
export default {
    components: {
        SearchPanel
    },
    data() {
        return {
            queryParams: {

            }
        }
    }
}
</script>
<style lang="scss" scoped>
.small-panel-content {
    width: 100%;
    height: 140px;
}
.small-panel-left-icon {
    width: 55px;
    height: 55px;
    margin-right: 10px;
    border-radius: 50%;
}

@for $i from 1 through 3 {
    .left-icon#{$i} {
        background-image: url('../../assets/images/lsrzye#{$i}.png');
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
}
</style>