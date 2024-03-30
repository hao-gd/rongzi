<template>
    <div class="content">
        <div class="app-container">
            <search-panel title="统计分析" HeaderIcon="lsrzye">
                <el-form label-position="left" label-width="130px" :inline="false" :model="queryParams" size="small">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="担保人" prop="guarantor">
                                <el-select filterable v-model="queryParams.guarantor" placeholder="请选择担保人" clearable @change="getListData">
                                    <el-option v-for="dict in dict.type.sys_1767155091485229000" :key="dict.value"
                                        :label="dict.label" :value="dict.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="借款人" prop="creditor">
                                <el-select filterable v-model="queryParams.creditor" placeholder="请选择借款人" clearable @change="getListData">
                                    <el-option v-for="dict in dict.type.sys_1767154968256577500" :key="dict.value"
                                        :label="dict.label" :value="dict.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="债权人" prop="financialInstitution">
                                <el-select filterable v-model="queryParams.financialInstitution" placeholder="请选择债权人" @change="getListData"
                                    clearable>
                                    <el-option v-for="dict in dict.type.sys_1757271666666242000" :key="dict.value"
                                        :label="dict.label" :value="dict.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="业务类型" prop="businessType">
                                <el-select filterable v-model="queryParams.businessType" placeholder="请选择业务类型" clearable @change="getListData">
                                    <el-option v-for="dict in dict.type.sys_1767155302261588000" :key="dict.value"
                                        :label="dict.label" :value="dict.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="8">
                            <el-form-item label="时间选择" class="no_mb">
                                <el-date-picker @change="changeRang" v-model="daterangeLogCreateTime" style="width: 240px"
                                    value-format="yyyy-MM" type="monthrange" range-separator="-" start-placeholder="开始月份"
                                    end-placeholder="结束月份"></el-date-picker>
                            </el-form-item>
                        </el-col> -->
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item class="flex" style="display: flex; justify-content: flex-end;">
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重 置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </search-panel>

      <el-divider class="mt20 mb20"></el-divider>

      <div class="small-panel-content">
        <el-row class="h" type="flex" align="middle">
          <el-col :span="6" class="flex pl20">
            <div class="small-panel-left-icon" :class="'left-icon' + 1"></div>
            <div class="small-panel-right-text-content">
              <p class="right-text">担保总额（元）</p>
              <p class="right-amount">
                <count-to :start-val='0' :end-val="last_data(listData,'totalGuaranteeAmount')" :duration='1000'
                  :decimals='2' :separator="','" :prefix="''" :suffix="''" :autoplay=true :useEasing="true"></count-to>
              </p>
            </div>
          </el-col>
          <el-col :span="6" class="flex pl20">
            <div class="small-panel-left-icon" :class="'left-icon' + 2"></div>
            <div class="small-panel-right-text-content">
              <p class="right-text">总担保余额（元）</p>
              <p class="right-amount">
                <count-to :start-val='0' :end-val="last_data(listData,'totalGuaranteeBalance')" :duration='1000'
                  :decimals='2' :separator="','" :prefix="''" :suffix="''" :autoplay=true :useEasing="true"></count-to>
              </p>
            </div>
          </el-col>
          <el-col :span="6" class="flex pl20">
            <div class="small-panel-left-icon" :class="'left-icon' + 3"></div>
            <div class="small-panel-right-text-content">
              <p class="right-text">对内担保余额（元）</p>
              <p class="right-amount">
                <count-to :start-val='0' :end-val="last_data(listData,'internalGuaranteeBalance')" :duration='1000'
                  :decimals='2' :separator="','" :prefix="''" :suffix="''" :autoplay=true :useEasing="true"></count-to>
              </p>
            </div>
          </el-col>
          <el-col :span="6" class="flex pl20">
            <div class="small-panel-left-icon" :class="'left-icon' + 4"></div>
            <div class="small-panel-right-text-content">
              <p class="right-text">对外担保余额（元）</p>
              <p class="right-amount">
                <count-to :start-val='0' :end-val="last_data(listData,'externalGuaranteeBalance')" :duration='1000'
                  :decimals='2' :separator="','" :prefix="''" :suffix="''" :autoplay=true :useEasing="true"></count-to>
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

  import {
    getEchartData
  } from '@/api/dashboard/index'
  import moment from 'moment'
  export default {
    components: {
      SearchPanel
    },
    dicts: ['sys_1767154968256577500', 'sys_1757271666666242000', 'sys_1759508335389835300', 'sys_1759509599150407700',
      "sys_1767155091485229000",
      "sys_1767154968256577500",
      "sys_1757271666666242000",
      "sys_1767155302261588000"
    ],
    data() {
      return {
        // 记录创建时间时间范围
        daterangeLogCreateTime: [
          moment().subtract(1, 'years').format('YYYY-MM'),
          moment().format('YYYY-MM')
        ],
        queryParams: {
          managementId: null,
          contractId: null,
          scrUuid: null,
          creditor: null,
          guarantor: null,
          financialInstitution: null,
          businessType: null,
          guaranteeAmount: null,
          guaranteeBalance: null,
          startDate: null,
          deadline: null,
          guaranteeMethod: null,
          isCreditInvestigation: null,
          comment: null,
          createTime: null,
          createBy: null,
          uuid: null,
          type: null,
          logCreateDate: null,
          logCreateTime: null
        },
        option: {
          color: [
            '#165DFF',
            '#33D1C9',
            '#F77234',
            '#722ED1',
            '#7cf700',
            '#f700e2'
          ],
          title: {
            text: 'Stacked Line',
            show: false,
          },
          tooltip: {
            trigger: 'axis',
            formatter(datas) {
              var result = datas[0].axisValue + '<br/>'; // 显示横坐标值
              datas.forEach(function(item) {
                // item 是一个包含数据的对象
                // item.value 是数据值，toFixed(2) 方法用于保留两位小数
                result += item.marker + ' ' + item.seriesName + ' : ' + (item.value).toFixed(2) + '<br/>';
              });
              return result;
            }
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
            data: [],
            axisPointer: {
              lineStyle: {
                color: '#4080FF',
                width: 2
              },
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [{
              name: '担保总额',
              key: 'totalGuaranteeAmount',
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
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(22, 93, 255, .3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(22, 93, 255, 0)'
                  },
                ])
              }
            },
            {
              name: '总担保余额',
              key: 'totalGuaranteeBalance',
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
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(51, 209, 201, .3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(51, 209, 201, 0)'
                  },
                ])
              }
            },
            {
              name: '对内担保余额',
              key: 'internalGuaranteeBalance',
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
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(247, 114, 52, .3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(247, 114, 52, 0)'
                  },
                ])
              }
            },
            {
              name: '对外担保余额',
              key: 'externalGuaranteeBalance',
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
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(114, 46, 209, .3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(114, 46, 209, 0)'
                  },
                ])
              }
            },
            {
              name: '对内担保总额',
              key: 'internalGuaranteeAmount',
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
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(124, 247, 0, .3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(124, 247, 0, 0)'
                  },
                ])
              }
            },
            {
              name: '内外担保总额',
              key: 'externalGuaranteeAmount',
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
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(247, 0, 226, .3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(247, 0, 226, 0)'
                  }
                ])
              }
            },
          ]
        },
        myChart: null,
        listData: [],
      }
    },
    created() {
      this.option.xAxis.data = this.generateMonthsMap();
    },
    mounted() {
      this.getListData();
    },
    methods: {

      async resetQuery() {
        this.queryParams = {
          managementId: null,
          contractId: null,
          scrUuid: null,
          creditor: null,
          guarantor: null,
          financialInstitution: null,
          businessType: null,
          guaranteeAmount: null,
          guaranteeBalance: null,
          startDate: null,
          deadline: null,
          guaranteeMethod: null,
          isCreditInvestigation: null,
          comment: null,
          createTime: null,
          createBy: null,
          uuid: null,
          type: null,
          logCreateDate: null,
          logCreateTime: null
        }
        await this.getListData()
      },

      init() {
        var chartDom = document.getElementById('main-echart');
        var myChart = echarts.init(chartDom);
        myChart.setOption(this.option);
      },
      async getListData() {
        try {
          this.queryParams.params = {};
          if (null != this.daterangeLogCreateTime && '' != this.daterangeLogCreateTime) {
            this.queryParams.params["beginLogCreateDate"] = this.daterangeLogCreateTime[0];
            this.queryParams.params["endLogCreateDate"] = this.daterangeLogCreateTime[1];
          }
          const res = await getEchartData(this.queryParams)

          if (res.code === 200) {
            const data = JSON.parse(JSON.stringify(res.rows));
            this.listData = data;
            this.option.series[0].data = this.transformAndFillData(data, this.option.xAxis.data,
              'totalGuaranteeAmount');
            this.option.series[1].data = this.transformAndFillData(data, this.option.xAxis.data,
              'totalGuaranteeBalance');
            this.option.series[2].data = this.transformAndFillData(data, this.option.xAxis.data,
              'internalGuaranteeBalance');
            this.option.series[3].data = this.transformAndFillData(data, this.option.xAxis.data,
              'externalGuaranteeBalance');
            this.option.series[4].data = this.transformAndFillData(data, this.option.xAxis.data,
              'internalGuaranteeAmount');
            this.option.series[5].data = this.transformAndFillData(data, this.option.xAxis.data,
              'externalGuaranteeAmount');
            this.init();
          }
        } catch (error) {
          this.$modal.msgError('数据获取失败，请重新尝试。');
        }
      },
      getMonths(data) {
        return data.map(item => item.month);
      },
      getDatas(data, key) {
        return data.map(item => Number(item[key]));
      },
      changeRang() {
        if (null != this.daterangeLogCreateTime && '' != this.daterangeLogCreateTime) {
          this.option.xAxis.data = this.generateMonthsMap();
        }
        this.getListData();
      },
      generateMonthsMap() {
        let currentMonth = moment(this.daterangeLogCreateTime[0], 'YYYY-MM');
        const end = moment(this.daterangeLogCreateTime[1], 'YYYY-MM');
        const monthsArray = [];
        while (currentMonth.isSameOrBefore(end)) {
          // 将每个月份添加到数组中
          monthsArray.push(currentMonth.format('YYYY-MM'));
          // 移动到下一个月
          currentMonth.add(1, 'months');
        }
        return monthsArray;
      },
      last_data(listData, key) {
        let total = 0
        if (listData != undefined && listData.length > 0) {
          total = listData[listData.length - 1][key]
        }

        return total
      },

      calculateTotalByKey(dataList, key) {
        const total = dataList.reduce((total, item) => {
          // 检查当前项是否有指定的key，并且该key对应的值是数字类型
          if (item.hasOwnProperty(key) && typeof item[key] === 'number') {
            return total + item[key];
          }
          return total;
        }, 0);

        // 将总和除以10000，得到以“万”为单位的数值
        return total;
      },
      transformAndFillData(backendData, xAxisData, key) {
        // 创建一个填充了 null 的数组，长度与 xAxisData 相同
        let filledData = new Array(xAxisData.length).fill(0);
        // 遍历后端数据
        backendData.forEach(dataItem => {
          // 找到每个数据项对应的月份在 xAxisData 中的索引
          const index = xAxisData.indexOf(dataItem.month);
          if (index !== -1) {
            // 根据索引位置填充相应的数据
            filledData[index] = dataItem[key];
          }
        });
        return filledData;
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

  @for $i from 1 through 4 {
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
