<template>
    <div class="content">
        <div class="app-container">
            <search-panel title="历史融资余额" HeaderIcon="lsrzye">
                <el-form label-position="left" label-width="130px" :inline="false" :model="queryParams" size="small">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item class="no_mb" label="借款人" prop="borrower">
                                <el-select v-model="queryParams.borrower" placeholder="请选择借款人" clearable>
                                    <el-option v-for="dict in dict.type.sys_1767154968256577500" :key="dict.value"
                                        :label="dict.label" :value="dict.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item class="no_mb" label="债权人" prop="financialInstitution">
                                <el-select v-model="queryParams.financialInstitution" placeholder="请选择债权人" clearable>
                                    <el-option v-for="dict in dict.type.sys_1757271666666242000" :key="dict.value"
                                        :label="dict.label" :value="dict.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item class="no_mb" label="融资类型" prop="financingType">
                                <el-select v-model="queryParams.financingType" placeholder="请选择融资类型">
                                    <el-option v-for="dict in dict.type.sys_1759508335389835300" :key="dict.value"
                                        :label="dict.label" :value="dict.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="mt20">
                            <el-form-item class="no_mb" label="融资金额（万元）" prop="financingAmount">
                                <el-input v-model="queryParams.financingAmount" placeholder="请输入融资金额" clearable
                                    @keyup.enter.native="handleQuery" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="mt20">
                            <el-form-item class="no_mb" label="借款期限" prop="loanTerm">
                                <el-input v-model="queryParams.loanTerm" placeholder="请输入借款期限" clearable
                                    @keyup.enter.native="handleQuery" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="mt20">
                            <el-form-item class="no_mb" label="放款日" prop="loanDate">
                                <el-date-picker clearable v-model="queryParams.loanDate" type="date"
                                    value-format="yyyy-MM-dd" placeholder="请选择放款日" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="mt20">
                            <el-form-item class="no_mb" label="到期日" prop="dueDate">
                                <el-date-picker clearable v-model="queryParams.dueDate" type="date"
                                    value-format="yyyy-MM-dd" placeholder="请选择到期日">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="mt20">
                            <el-form-item class="no_mb" label="年利率" prop="rate">
                                <el-input v-model="queryParams.rate" placeholder="请输入年利率" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="mt20">
                            <el-form-item class="no_mb" label="债务状态" prop="loanState">
                                <el-select v-model="queryParams.loanState" placeholder="请选择债务状态">
                                    <el-option v-for="dict in dict.type.sys_1759509599150407700" :key="dict.value"
                                        :label="dict.label" :value="dict.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </search-panel>

            <el-divider class="mt20 mb20"></el-divider>

            <div class="small-panel-content">
                <el-row class="h" type="flex" align="middle">
                    <el-col :span="8" v-for="i in 3" :key="i" class="flex pl20">
                        <div class="small-panel-left-icon" :class="'left-icon' + i"></div>
                        <div class="small-panel-right-text-content">
                            <p class="right-text">融资总额（万元）xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                            <!-- <p class="right-amount"></p> -->
                            <p class="right-amount">
                                <count-to :start-val='0' :end-val='10000000' :duration='1000' :decimals='0' :separator="','"
                                    :prefix="''" :suffix="''" :autoplay=true :useEasing="true"></count-to>
                            </p>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <el-divider class="mt20 mb20"></el-divider>

            <search-panel title="各项金额趋势（近12个月）" :isIcon="false">
                <div id="main-echart" style="height: 500px;"></div>
            </search-panel>
        </div>
        <!-- <div class="app-container">
            
        </div> -->
    </div>
</template>
<script>
import SearchPanel from '@/components/SearchPanel/index.vue'
import * as echarts from 'echarts';
export default {
    components: {
        SearchPanel
    },
    dicts: ['sys_1767154968256577500', 'sys_1757271666666242000', 'sys_1759508335389835300', 'sys_1759509599150407700'],
    data() {
        return {
            queryParams: {
                borrower: '',
                financialInstitution: '',
                financingType: '',
                financingAmount: '',
                loanTerm: '',
                loanDate: '',
                dueDate: '',
                rate: '',
                loanState: '',
            },
            option: {
                title: {
                    text: 'Stacked Line',
                    show: false,
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    show: false,
                    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    },
                    show: false
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: 'Email',
                        type: 'line',
                        stack: 'Total',
                        data: [120, 132, 101, 134, 90, 230, 210],
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            width: 5 // 调整线条的粗细
                        },
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgb(0, 221, 255)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(77, 119, 255)'
                                }
                            ])
                        }
                    },
                    {
                        name: 'Union Ads',
                        type: 'line',
                        stack: 'Total',
                        data: [220, 182, 191, 234, 290, 330, 310],
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            width: 5 // 调整线条的粗细
                        },
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgb(0, 221, 255)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(77, 119, 255)'
                                }
                            ])
                        }
                    },
                    {
                        name: 'Video Ads',
                        type: 'line',
                        stack: 'Total',
                        data: [150, 232, 201, 154, 190, 330, 410],
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            width: 5 // 调整线条的粗细
                        },
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgb(0, 221, 255)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(77, 119, 255)'
                                }
                            ])
                        }
                    },
                ]
            }
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            var chartDom = document.getElementById('main-echart');
            var myChart = echarts.init(chartDom);
            myChart.setOption(this.option);
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

.small-panel-right-text-content {
    width: 100%;

}

.right-text {
    width: 200px;
    font-size: 12px;
    color: #1D2129;
    line-height: 20px;
    height: 20px;
    font-weight: 600;
    margin-bottom: 10px;
    white-space: nowrap;
    /* 确保文本在一行内显示 */
    overflow: hidden;
    /* 隐藏溢出的文本 */
    text-overflow: ellipsis;
    /* 文本溢出时显示省略号 */
}

.right-amount {
    font-size: 22px;
    color: #1D2129;
    line-height: 22px;
    height: 22px;
    font-weight: bold;
}
</style>