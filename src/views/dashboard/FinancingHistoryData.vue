<template>
  <div class="content">
    <div class="app-container">
      <search-panel title="历史融资余额" HeaderIcon="lsrzye">
        <el-form label-position="left" label-width="130px" :inline="false" :model="queryParams" size="small">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item class="no_mb" label="借款人" prop="borrowingUnit">
                <el-select filterable v-model="queryParams.borrowingUnit" @change="getrzloghistoryFinancing" placeholder="请选择借款人"
                  clearable>
                  <el-option v-for="dict in dict.type.sys_1767154968256577500" :key="dict.value" :label="dict.label"
                    :value="dict.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="no_mb" label="债权人" prop="financialInstitution">
                <el-select filterable v-model="queryParams.financialInstitution" @change="getrzloghistoryFinancing"
                  placeholder="请选择债权人" clearable>
                  <el-option v-for="dict in dict.type.sys_1757271666666242000" :key="dict.value" :label="dict.label"
                    :value="dict.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="no_mb" label="融资类型" prop="financingType">
                <el-select filterable v-model="queryParams.financingType" @change="getrzloghistoryFinancing" placeholder="请选择融资类型">
                  <el-option v-for="dict in dict.type.sys_1759508335389835300" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="mt20">
              <el-form-item label="起始月" class="no_mb">
                <el-date-picker format='yyyy/MM' :picker-options="pickerOptions1" @change="changeRang" v-model="daterangeLogCreateDate1"
                  value-format="yyyy-MM" type="month" placeholder="请选择起始月"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="mt20">
              <el-form-item label="结束月" class="no_mb">
                <el-date-picker format='yyyy/MM' :picker-options="pickerOptions2" @change="changeRang" v-model="daterangeLogCreateDate2"
                  value-format="yyyy-MM" type="month" placeholder="请选择结束月"></el-date-picker>
              </el-form-item>
            </el-col>
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
          <el-col :span="8" class="flex pl20">
            <div class="small-panel-left-icon" :class="'left-icon' + 1"></div>
            <div class="small-panel-right-text-content">
              <p class="right-text">融资总额（元）</p>
              <p class="right-amount">
                <count-to :start-val='0' :end-val="last_data(listData, 'totalFinancingAmount')" :duration='1000'
                  :decimals='2' :separator="','" :prefix="''" :suffix="''" :autoplay=true :useEasing="true"></count-to>
              </p>
            </div>
          </el-col>
          <el-col :span="8" class="flex pl20">
            <div class="small-panel-left-icon" :class="'left-icon' + 2"></div>
            <div class="small-panel-right-text-content">
              <p class="right-text">月偿还金额（元）</p>
              <p class="right-amount">
                <count-to :start-val='0' :end-val="last_data_add(listData1, 'totalPrincipal', 'totalInterest')"
                  :duration='1000' :decimals='2' :separator="','" :prefix="''" :suffix="''" :autoplay=true
                  :useEasing="true"></count-to>
              </p>
            </div>
          </el-col>
          <el-col :span="8" class="flex pl20">
            <div class="small-panel-left-icon" :class="'left-icon' + 3"></div>
            <div class="small-panel-right-text-content">
              <p class="right-text">融资余额（元）</p>
              <p class="right-amount">
                <count-to :start-val='0' :end-val="last_data(listData, 'totalRemainingAmount')" :duration='1000'
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
  </div>
</template>
<script>
import SearchPanel from '@/components/SearchPanel/index.vue'
import * as echarts from 'echarts';
import {
  rzloghistoryFinancing,
  getRepaymentPlanData,
  getNextRepaymentPlan
} from '@/api/dashboard/index'
import moment from 'moment'
const color = {
  totalFinancingAmount: '#F77234',
  totalRepaidAmount: '#33D1C9',
  totalRemainingAmount: '#F77234'
}
const legend = {
  totalFinancingAmount: '总融资金额',
  totalRepaidAmount: '月偿还金额',
  totalRemainingAmount: '融资余额'
}
export default {
  components: {
    SearchPanel
  },
  dicts: ['sys_1767154968256577500', 'sys_1757271666666242000', 'sys_1759508335389835300', 'sys_1759509599150407700'],
  data() {
    return {
      queryParams: {
        managementId: null,
        scrUuid: null,
        borrowingUnit: null,
        financialInstitution: null,
        financingAmount: null,
        financingType: null,
        contractId: null,
        contractSigningDate: null,
        loanDate: null,
        dueDate: null,
        rate: null,
        loanTerm: null,
        creditEnhancementMeasures: null,
        repaidAmount: null,
        remainingAmount: null,
        loanState: null,
        comment: null,
        uuid: null,
        logCreateTime: null,
        logCreateDate: null
      },
      // 记录创建的年月时间范围
      daterangeLogCreateDate: [
        moment().subtract(1, 'years').format('YYYY-MM'),
        moment().format('YYYY-MM')
      ],
      daterangeLogCreateDate1: moment().subtract(1, 'years').format('YYYY-MM'),
      daterangeLogCreateDate2: moment().format('YYYY-MM'),
      option: {
        color: ['#165DFF', '#33D1C9', '#F77234'],
        title: {
          text: 'Stacked Line',
          show: false,
        },
        tooltip: {
          trigger: 'axis',
          formatter(datas) {
            var result = datas[0].axisValue + '<br/>'; // 显示横坐标值
            datas.forEach(function (item) {
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
          name: '总融资金额',
          key: 'totalFinancingAmount',
          type: 'line',
          // stack: 'Total',
          data: [],
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
            }
            ])
          },
          z: 1
        },
        {
          name: '月偿还金额',
          key: 'totalRepaidAmount',
          type: 'line',
          // stack: 'Total',
          data: [],
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
            }
            ])
          },
          z: 2
        },
        {
          name: '融资余额',
          key: 'totalRemainingAmount',
          type: 'line',
          // stack: 'Total',
          data: [],
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
            }
            ])
          },
          z: 3
        },
        ]
      },
      listData: [],
      listData1: [],
      pickerOptions1: {
        disabledDate: (time) => {
          if (this.daterangeLogCreateDate2) {
            const endMonthDate = new Date(this.daterangeLogCreateDate2);
            endMonthDate.setMonth(endMonthDate.getMonth() + 1);
            return time.getTime() >= endMonthDate.getTime();
          }
        }
      },
      pickerOptions2: {
        disabledDate: (time) => {
          if (this.daterangeLogCreateDate1) {
            const startMonthDate = new Date(this.daterangeLogCreateDate1);
            // startMonthDate.setMonth(startMonthDate.getMonth() + 1);
            return time.getTime() <= startMonthDate.getTime();
          }
        }
      }

    }
  },
  created() {
    this.option.xAxis.data = this.generateMonthsMap();
  },
  mounted() {
    this.getrzloghistoryFinancing();
  },
  methods: {

    async resetQuery() {
      this.queryParams = {
        managementId: null,
        scrUuid: null,
        borrowingUnit: null,
        financialInstitution: null,
        financingAmount: null,
        financingType: null,
        contractId: null,
        contractSigningDate: null,
        loanDate: null,
        dueDate: null,
        rate: null,
        loanTerm: null,
        creditEnhancementMeasures: null,
        repaidAmount: null,
        remainingAmount: null,
        loanState: null,
        comment: null,
        uuid: null,
        logCreateTime: null,
        logCreateDate: null
      }
      this.daterangeLogCreateDate = [
        moment().subtract(1, 'years').format('YYYY-MM'),
        moment().format('YYYY-MM')
      ]
      this.daterangeLogCreateDate1 = moment().subtract(1, 'years').format('YYYY-MM');
      this.daterangeLogCreateDate2 = moment().format('YYYY-MM');
      this.changeRang()
      await this.getrzloghistoryFinancing()
    },
    init() {
      var chartDom = document.getElementById('main-echart');
      var myChart = echarts.init(chartDom);
      myChart.setOption(this.option);
    },

    async getrzloghistoryFinancing() {
      try {
        this.queryParams.params = {};
        if (![null, '', undefined].includes(this.daterangeLogCreateDate1) && ![null, '', undefined].includes(this.daterangeLogCreateDate2)) {
          this.queryParams.params["beginLogCreateDate"] = this.daterangeLogCreateDate1;
          this.queryParams.params["endLogCreateDate"] = this.daterangeLogCreateDate2;
        }
        const res = await rzloghistoryFinancing(this.queryParams);
        if (res.code === 200) {
          const data = JSON.parse(JSON.stringify(res.rows));
          this.listData = data;
          this.option.series[0].data = this.transformAndFillData(data, this.option.xAxis.data,
            'totalFinancingAmount');

          this.option.series[2].data = this.transformAndFillData(data, this.option.xAxis.data,
            'totalRemainingAmount');

          this.queryParams["startDate"] = this.daterangeLogCreateDate1;
          this.queryParams["endDate"] = this.daterangeLogCreateDate2;

          const res1 = await getRepaymentPlanData(this.queryParams);
          if (res1.code === 200) {
            const data1 = JSON.parse(JSON.stringify(res1.data));
            this.listData1 = data1;
            this.option.series[1].data = this.transformAndFillData(data1, this.option.xAxis.data, ['totalPrincipal',
              'totalInterest'
            ]);

            //都成功再初始化
            this.init();
          }

        }

      } catch (error) {
        console.log(error);
        this.$modal.msgError('数据获取失败，请重新尝试。');
      }


    },
    getDatas(data, key) {
      return data.map(item => Number(item[key]));
    },
    changeRang() {
      if (![null, '', undefined].includes(this.daterangeLogCreateDate1) && ![null, '', undefined].includes(this.daterangeLogCreateDate2)) {
        this.option.xAxis.data = this.generateMonthsMap();
      }
      this.getrzloghistoryFinancing();
    },
    generateMonthsMap() {
      let currentMonth = moment(this.daterangeLogCreateDate1, 'YYYY-MM');
      const end = moment(this.daterangeLogCreateDate2, 'YYYY-MM');
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

    last_data_add(listData, k1, k2) {
      let total = 0
      if (listData != undefined && listData.length > 0) {
        total = listData[listData.length - 1][k1] + listData[listData.length - 1][k2]
      }

      return total
    },
    calculateTotalByKey(dataList, key) {
      const total = dataList.reduce((total, item) => {
        // 检查当前项是否有指定的key，并且该key对应的值是数字类型
        console.log("total", key, total, item[key], item);
        if (item.hasOwnProperty(key) && typeof item[key] === 'number') {
          return total + item[key];
        }
        return total;
      }, 0);
      console.log("total", key, total);
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
          // 如果 key 是字符串数组，则累加各项的值
          if (Array.isArray(key)) {
            let sum = 0;
            key.forEach(k => {
              sum += dataItem[k] || 0; // 使用 || 0 来确保未定义的值被当作 0 处理
            });
            filledData[index] = sum;
          } else {
            // 如果 key 是字符串，则直接赋值
            filledData[index] = dataItem[key];
          }
        }
      });
      return filledData;
    },
    calculateTotal(obj) {
      let total = 0;
      for (let key in obj) {
        if (key !== 'bgID' || key !== 'month') {
          total += obj[key];
        }
      }
      return total;
    },
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
