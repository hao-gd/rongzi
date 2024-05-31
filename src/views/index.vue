<template>
  <div class="content">
    <div class="app-container">
      <search-panel title="融资快报" :isIcon="false">

        <div class="tr unit">
          单位（万元）
        </div>


        <el-row :gutter="20">
          <el-col :span="6">
            <el-row>
              <el-col v-for="(value, key, index) in creditData" :key="index" :span="24" style="background: #fff;"
                class="card-panel">
                <div class="card-content  pl20" :class="'card-content-bg' + 1">
                  <div class="pt50">
                    <div class="card-title">{{ key }}</div>

                    <el-tooltip placement="top" effect="light">
                      <P slot="content">
                        <count-to class="amounts-font cp" :start-val='0' :end-val='calculateTotal(value)'
                          :duration='1000' :decimals='2' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                          :useEasing="true"></count-to>
                      </P>
                      <count-to class="card-amount amounts-font cp" :start-val='0' :end-val='calculateTotal(value)'
                        :duration='1000' :decimals='2' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                        :useEasing="true"></count-to>
                    </el-tooltip>

                  </div>

                  <div class="card-various-amounts" style="display: grid;align-items: center;">
                    <div v-for="(valuec, keyc, indexc) in value" :key="indexc">
                      <el-tooltip v-if="keyc !== 'bgID'" content="42467000" placement="top" effect="light">
                        <div slot="content">
                          <p class="various-amounts-title mb3">{{ keyc }}</p>
                          <count-to class="various-amounts-amount" :start-val='0' :end-val='valuec / 10000'
                            :duration='1000' :decimals='2' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                            :useEasing="true"></count-to>
                        </div>
                        <div>
                          <p class="various-amounts-title mb3">{{ keyc }}</p>
                          <count-to class="various-amounts-amount" :start-val='0' :end-val='valuec / 10000'
                            :duration='1000' :decimals='2' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                            :useEasing="true"></count-to>
                        </div>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-col v-for="(value, key, index) in rzjeData" :key="index" :span="24" style="background: #fff;"
                class="card-panel">
                <div class="card-content pl20" :class="'card-content-bg' + 4">
                  <div class="pt50">
                    <div class="card-title">{{ key }}</div>

                    <el-tooltip placement="top" effect="light">
                      <P slot="content">
                        <count-to class="amounts-font cp" :start-val='0' :end-val='calculateTotal(value)'
                          :duration='1000' :decimals='2' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                          :useEasing="true"></count-to>
                      </P>
                      <count-to class="card-amount amounts-font cp" :start-val='0' :end-val='calculateTotal(value)'
                        :duration='1000' :decimals='2' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                        :useEasing="true"></count-to>
                    </el-tooltip>

                  </div>

                  <div class="card-various-amounts" style="display: grid;align-items: center;">
                    <div v-for="(valuec, keyc, indexc) in value" :key="indexc">
                      <el-tooltip v-if="keyc !== 'bgID'" content="42467000" placement="top" effect="light">
                        <div slot="content">
                          <p class="various-amounts-title mb3">{{ keyc }}</p>
                          <count-to class="various-amounts-amount" :start-val='0' :end-val='valuec / 10000'
                            :duration='1000' :decimals='2' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                            :useEasing="true"></count-to>
                        </div>
                        <div>
                          <p class="various-amounts-title mb3">{{ keyc }}</p>
                          <count-to class="various-amounts-amount" :start-val='0' :end-val='valuec / 10000'
                            :duration='1000' :decimals='2' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                            :useEasing="true"></count-to>
                        </div>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="6">
            <el-row>
              <el-col v-for="(value, key, index) in dbData" :key="index" :span="24" style="background: #fff;"
                class="card-panel">
                <div class="card-content pt50 pb30 pl20" :class="'card-content-bg' + 7">
                  <div>
                    <div class="card-title">{{ key }}</div>

                    <el-tooltip placement="top" effect="light">
                      <P slot="content">
                        <count-to class="amounts-font cp" :start-val='0' :end-val='value / 10000'
                          :duration='1000' :decimals='2' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                          :useEasing="true"></count-to>
                      </P>
                      <count-to class="card-amount amounts-font cp" :start-val='0' :end-val='value / 10000'
                        :duration='1000' :decimals='2' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                        :useEasing="true"></count-to>
                    </el-tooltip>

                  </div>

                  <!-- <div class="card-various-amounts flex">
                    <div class="flex" v-for="(valuec, keyc, indexc) in value" :key="indexc">
                      <el-tooltip v-if="keyc !== 'bgID'" content="42467000" placement="top" effect="light">
                        <div slot="content">
                          <p class="various-amounts-title mb3">{{ keyc }}</p>
                          <count-to class="various-amounts-amount" :start-val='0' :end-val='valuec' :duration='1000'
                            :decimals='2' :separator="','" :prefix="''" :suffix="''" :autoplay="true" :useEasing="true">
                          </count-to>
                        </div>
                        <div class="mb15">
                          <p class="various-amounts-title mb3">{{ keyc }}</p>
                          <count-to class="various-amounts-amount" :start-val='0' :end-val='valuec' :duration='1000'
                            :decimals='2' :separator="','" :prefix="''" :suffix="''" :autoplay="true" :useEasing="true">
                          </count-to>
                        </div>
                      </el-tooltip>
                    </div>
                  </div> -->
                </div>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="6">
            <el-row>
              <el-col v-if="Object.keys(currentMonthData).length !== 0" :span="24" style="background: #fff;"
                class="card-panel">
                <div class="card-content pl20" :class="'card-content-bg' + 5">
                  <!-- <div class="w">
                    <div class="card-title">本月还款计划</div>

                    <el-row :gutter="10">
                      <el-col :span="17">
                        <el-tooltip placement="top" effect="light">
                          <div slot="content">
                            <p class="various-amounts-title mb3">本金（利息）</p>
                            <count-to class="various-amounts-amount dlb mr10" :start-val='0'
                              :end-val='currentMonthData.totalPrincipal / 10000' :duration='1000' :decimals='2'
                              :separator="','" :prefix="''" :suffix="''" :autoplay="true" :useEasing="true"></count-to>
                            <count-to class="various-amounts-amount dlb" :start-val='0'
                              :end-val='currentMonthData.totalInterest / 10000' :duration='1000' :decimals='2'
                              :separator="','" :prefix="'('" :suffix="')'" :autoplay="true" :useEasing="true"></count-to>
                          </div>
                          <div class="various-amounts-amount w">
                            <p class="various-amounts-title mb3">本金（利息）</p>
                            <count-to class="various-amounts-amount dlb mr10" :start-val='0'
                              :end-val='currentMonthData.totalPrincipal / 10000' :duration='1000' :decimals='2'
                              :separator="','" :prefix="''" :suffix="''" :autoplay="true" :useEasing="true"></count-to>

                            <count-to class="various-amounts-amount dlb" :start-val='0'
                              :end-val='currentMonthData.totalInterest / 10000' :duration='1000' :decimals='2'
                              :separator="','" :prefix="'('" :suffix="')'" :autoplay="true" :useEasing="true"></count-to>
                          </div>

                        </el-tooltip>
                      </el-col>
                      <el-col :span="7">
                        <el-tooltip placement="top" effect="light">
                          <div slot="content">
                            <p class="various-amounts-title mb3">已还（未还）</p>
                            <count-to class="various-amounts-amount dlb mr10" :start-val='0'
                              :end-val='(currentMonthData.totalPaidInterest + currentMonthData.totalPaidPrincipal) / 10000'
                              :duration='1000' :decimals='2' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                              :useEasing="true"></count-to>

                            <count-to class="various-amounts-amount dlb" :start-val='0'
                              :end-val='(currentMonthData.totalUnpaidInterest + currentMonthData.totalUnpaidPrincipal) / 10000'
                              :duration='1000' :decimals='2' :separator="','" :prefix="'('" :suffix="')'" :autoplay="true"
                              :useEasing="true"></count-to>
                          </div>

                          <div class="various-amounts-amount w" style="margin-left: -5px;">
                            <p class="various-amounts-title mb3">已还（未还）</p>
                            <count-to class="various-amounts-amount dlb mr10" :start-val='0'
                              :end-val='(currentMonthData.totalPaidInterest + currentMonthData.totalPaidPrincipal) / 10000'
                              :duration='1000' :decimals='2' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                              :useEasing="true"></count-to>

                            <count-to class="various-amounts-amount dlb" :start-val='0'
                              :end-val='(currentMonthData.totalUnpaidInterest + currentMonthData.totalUnpaidPrincipal) / 10000'
                              :duration='1000' :decimals='2' :separator="','" :prefix="'('" :suffix="')'" :autoplay="true"
                              :useEasing="true"></count-to>
                          </div>
                        </el-tooltip>
                      </el-col>
                    </el-row>
                  </div> -->

                  <div class="pt50">
                    <div class="card-title">本月还款计划</div>

                    <el-tooltip placement="top" effect="light">
                      <P slot="content">
                        <count-to class="amounts-font cp" :start-val='0' :end-val="currentMonthData.totalPrincipal +
                          currentMonthData.totalInterest / 10000" :duration='1000' :decimals='2' :separator="','"
                          :prefix="''" :suffix="''" :autoplay="true" :useEasing="true"></count-to>
                      </P>
                      <count-to class="card-amount amounts-font cp" :start-val='0' :end-val="currentMonthData.totalPrincipal +
                        currentMonthData.totalInterest / 10000" :duration='1000' :decimals='2' :separator="','"
                        :prefix="''" :suffix="''" :autoplay="true" :useEasing="true"></count-to>
                    </el-tooltip>

                  </div>

                  <div class="card-various-amounts" style="display: grid;align-items: center; padding: 6px 0;">
                    <div class="">
                      <el-tooltip content="42467000" placement="top" effect="light">
                        <div slot="content">
                          <p class="various-amounts-title mb3">本金</p>
                          <count-to class="various-amounts-amount" :start-val='0'
                            :end-val='currentMonthData.totalPrincipal / 10000' :duration='1000' :decimals='2'
                            :separator="','" :prefix="''" :suffix="''" :autoplay="true" :useEasing="true"></count-to>
                        </div>
                        <div>
                          <p class="various-amounts-title mb3">本金</p>
                          <count-to class="various-amounts-amount" :start-val='0'
                            :end-val='currentMonthData.totalPrincipal / 10000' :duration='1000' :decimals='2'
                            :separator="','" :prefix="''" :suffix="''" :autoplay="true" :useEasing="true"></count-to>
                        </div>
                      </el-tooltip>
                    </div>

                    <div class="">
                      <el-tooltip content="42467000" placement="top" effect="light">
                        <div slot="content">
                          <p class="various-amounts-title mb3">利息</p>
                          <count-to class="various-amounts-amount" :start-val='0'
                            :end-val='currentMonthData.totalInterest / 10000' :duration='1000' :decimals='2'
                            :separator="','" :prefix="''" :suffix="''" :autoplay="true" :useEasing="true"></count-to>
                        </div>
                        <div>
                          <p class="various-amounts-title mb3">利息</p>
                          <count-to class="various-amounts-amount" :start-val='0'
                            :end-val='currentMonthData.totalInterest / 10000' :duration='1000' :decimals='2'
                            :separator="','" :prefix="''" :suffix="''" :autoplay="true" :useEasing="true"></count-to>
                        </div>
                      </el-tooltip>
                    </div>

                    <div class="">
                      <el-tooltip content="42467000" placement="top" effect="light">
                        <div slot="content">
                          <p class="various-amounts-title mb3">已还</p>
                          <count-to class="various-amounts-amount" :start-val='0'
                            :end-val='(currentMonthData.totalPaidInterest + currentMonthData.totalPaidPrincipal) / 10000'
                            :duration='1000' :decimals='2' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                            :useEasing="true"></count-to>
                        </div>
                        <div>
                          <p class="various-amounts-title mb3">已还</p>
                          <count-to class="various-amounts-amount" :start-val='0'
                            :end-val='(currentMonthData.totalPaidInterest + currentMonthData.totalPaidPrincipal) / 10000'
                            :duration='1000' :decimals='2' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                            :useEasing="true"></count-to>
                        </div>
                      </el-tooltip>
                    </div>

                    <div class="">
                      <el-tooltip content="42467000" placement="top" effect="light">
                        <div slot="content">
                          <p class="various-amounts-title mb3">未还</p>
                          <count-to class="various-amounts-amount" :start-val='0'
                            :end-val='(currentMonthData.totalUnpaidInterest + currentMonthData.totalUnpaidPrincipal) / 10000'
                            :duration='1000' :decimals='2' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                            :useEasing="true"></count-to>
                        </div>
                        <div>
                          <p class="various-amounts-title mb3">未还</p>
                          <count-to class="various-amounts-amount" :start-val='0'
                            :end-val='(currentMonthData.totalUnpaidInterest + currentMonthData.totalUnpaidPrincipal) / 10000'
                            :duration='1000' :decimals='2' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                            :useEasing="true"></count-to>
                        </div>
                      </el-tooltip>
                    </div>
                  </div>

                </div>
              </el-col>

              <el-col :span="24" style="background: #fff;" class="card-panel">
                <div class="card-content pl20 pb30 pt50" :class="'card-content-bg' + 5">
                  <div>
                    <div class="card-title">下月还款计划</div>

                    <el-tooltip placement="top" effect="light">
                      <div slot="content">
                        <count-to class="amounts-font" :start-val='0' :end-val='calculateTotal(NextMonthData)'
                          :duration='1000' :decimals='2' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                          :useEasing="true"></count-to>
                      </div>
                      <count-to class="card-amount amounts-font cp" :start-val='0'
                        :end-val='calculateTotal(NextMonthData)' :duration='1000' :decimals='2' :separator="','"
                        :prefix="''" :suffix="''" :autoplay="true" :useEasing="true"></count-to>
                    </el-tooltip>

                  </div>

                  <div class="card-various-amounts flex">
                    <div class="mb15">
                      <el-tooltip content="42467000" placement="top" effect="light">
                        <div slot="content">
                          <p class="various-amounts-title mb3">本金</p>
                          <count-to class="various-amounts-amount" :start-val='0'
                            :end-val='NextMonthData.totalPrincipal / 10000' :duration='1000' :decimals='2'
                            :separator="','" :prefix="''" :suffix="''" :autoplay="true" :useEasing="true"></count-to>
                        </div>
                        <div>
                          <p class="various-amounts-title mb3">本金</p>
                          <count-to class="various-amounts-amount" :start-val='0'
                            :end-val='NextMonthData.totalPrincipal / 10000' :duration='1000' :decimals='2'
                            :separator="','" :prefix="''" :suffix="''" :autoplay="true" :useEasing="true"></count-to>
                        </div>
                      </el-tooltip>
                    </div>

                    <div class="mb15">
                      <el-tooltip content="42467000" placement="top" effect="light">
                        <div slot="content">
                          <p class="various-amounts-title mb3">利息</p>
                          <count-to class="various-amounts-amount" :start-val='0'
                            :end-val='NextMonthData.totalInterest / 10000' :duration='1000' :decimals='2'
                            :separator="','" :prefix="''" :suffix="''" :autoplay="true" :useEasing="true"></count-to>
                        </div>
                        <div>
                          <p class="various-amounts-title mb3">利息</p>
                          <count-to class="various-amounts-amount" :start-val='0'
                            :end-val='NextMonthData.totalInterest / 10000' :duration='1000' :decimals='2'
                            :separator="','" :prefix="''" :suffix="''" :autoplay="true" :useEasing="true"></count-to>
                        </div>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </search-panel>
    </div>
    <div class="app-container mt20">
      <search-panel :isIcon="false" title="还款计划（未来12个月）"></search-panel>

      <div id="main-echart" style="height: 500px;"></div>
    </div>
  </div>
</template>

<script>
  import SearchPanel from '@/components/SearchPanel/index.vue'
  import * as echarts from 'echarts';
  import {
    getCardData,
    getCardData2,
    getCardData3,
    getRepaymentPlanByDate,
    getRepaymentPlanData,
    getRepaymentPlan,
    getNextRepaymentPlan
  } from '@/api/dashboard/index'
  import resize from './dashboard/mixins/resize'
  import {
    mapGetters,
    mapState
  } from "vuex";
  import moment from 'moment';
  const color = {
    totalFinancingAmount: '#F77234',
    totalRepaidAmount: '#33D1C9',
    totalRemainingAmount: '#F77234'
  }
  export default {
    name: "Index",
    mixins: [resize],
    components: {
      SearchPanel
    },
    data() {
      return {
        // 版本号
        version: "3.8.6",
        queryParams: {},
        year: '',
        month: '',
        option: {
          color: ['#A086FD', '#23ADFF', '#13CFB2'],
          title: {
            text: 'Stacked Line',
            show: false
          },
          tooltip: {
            trigger: 'axis',
            borderWidth: 5,
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
              name: '还款合计',
              type: 'line',
              // stack: 'Total',
              data: [],
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
                    color: 'rgba(160, 134, 253, .3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(160, 134, 253, 0)'
                  }
                ])
              },
              z: 1
            },
            {
              name: '还款本金',
              key: 'totalPrincipal',
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
                    color: 'rgba(35, 173, 255, .3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(35, 173, 255, 0)'
                  }
                ])
              },
              z: 2
            },
            {
              name: '还款利息',
              key: 'totalInterest',
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
                    color: 'rgba(19, 207, 178, .3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(19, 207, 178, 0)'
                  }
                ])
              },
              z: 3
            },
          ]
        },
        myChart: null,
        creditData: {},
        rzjeData: {},
        dbData: {},
        daterangeLogCreateDate: [
          moment().format('YYYY-MM'),
          moment().add(1, 'years').format('YYYY-MM')
        ],
        currentMonthData: {
          totalPrincipal: 0,
          totalInterest: 0,
          totalPaidInterest: 0,
          totalPaidPrincipal: 0,
          totalUnpaidInterest: 0,
          totalUnpaidPrincipal: 0,
        },
        NextMonthData: {
          totalPrincipal: 0,
          totalInterest: 0,
        },
        NextMonthDataKey: {
          'totalPrincipal': '本金',
          'totalInterest': '利息'
        }
      };
    },
    watch: {
      sidebar: {
        handler(n, o) {
          console.log(n, o);
          setTimeout(() => {
            this.myChart.resize();
          }, 200)
        },
        deep: true
      },
      currentMonthData: {
        handler(n, o) {
          console.log(n, o);
        },
        deep: true
      }
    },
    computed: {
      ...mapGetters(["sidebarRouters", "sidebar"]),
    },
    created() {
      this.option.xAxis.data = this.generateMonthsMap();
    },
    mounted() {

      this.getCardData();
      this.getCardData2();
      this.getCardData3();
      this.getCardData4();
      this.getHuankuanjihua();
    },
    methods: {
      init() {
        var chartDom = document.getElementById('main-echart');
        this.myChart = echarts.init(chartDom);
        this.myChart.setOption(this.option);
      },
      /* 请求 card 数据 */
      async getCardData() {
        try {
          const res = await getCardData();
          if (res.code === 200) {
            const data = JSON.parse(JSON.stringify(res.data));
            const order = ['已授信金额', '授信余额'];
            const orderedData = {};
            order.forEach(key => {
              if (data[key]) {
                orderedData[key] = data[key];
              }
            });
            this.creditData = orderedData;
          }
        } catch (error) {
          this.$modal.msgError('数据获取失败，请重新尝试。');
        }
      },
      /* 请求 card 数据 */
      async getCardData2() {
        try {
          const res = await getCardData2();
          if (res.code === 200) {
            const data = JSON.parse(JSON.stringify(res.data));
            const order = ['已融资金额', '融资余额'];
            const orderedData = {};
            order.forEach(key => {
              if (data[key]) {
                orderedData[key] = data[key];
              }
            });
            this.rzjeData = orderedData;
          }
        } catch (error) {
          this.$modal.msgError('数据获取失败，请重新尝试。');
        }
      },
      /* 请求 card 数据 */
      async getCardData3() {
        try {
          const res = await getCardData3();
          if (res.code === 200) {
            const data = JSON.parse(JSON.stringify(res.data));
            // const order = ['已担保金额', '担保余额']; // 2024年5月27日，用户不需要展示 对内担保
            // const orderedData = {};
            // order.forEach(key => {
            //   if (data[key]) {
            //     orderedData[key] = data[key];
            //   }
            // });
            // this.dbData = this.filterGuarantees(orderedData);

            this.dbData["对外已担保金额"] = data["已担保金额"]["对外担保"]
            this.dbData["对外担保余额"] = data["担保余额"]["对外担保"]
            console.log(this.dbData);
          }
        } catch (error) {
          this.$modal.msgError('数据获取失败，请重新尝试。');
        }
      },
      /* 过滤掉对内担保数据 */
      filterGuarantees(data) {
        // 创建一个新的对象，用于存储过滤后的数据
        const filteredData = {};

        // 遍历原始数据对象的每一项
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            // 创建一个新的对象，用于存储当前项的过滤后的数据
            filteredData[key] = {};
            for (const subKey in data[key]) {
              if (data[key].hasOwnProperty(subKey) && subKey !== "对内担保") {
                filteredData[key][subKey] = data[key][subKey];
              }
            }
          }
        }

        return filteredData;
      },
      /* 请求还款计划列表数据 */
      async getHuankuanjihua() {
        try {
          this.queryParams.params = {};
          if (null != this.daterangeLogCreateDate && '' != this.daterangeLogCreateDate) {
            this.queryParams["startDate"] = this.daterangeLogCreateDate[0];
            this.queryParams["endDate"] = this.daterangeLogCreateDate[1];
          }
          const res = await getRepaymentPlanData(this.queryParams);
          if (res.code === 200) {
            const data = JSON.parse(JSON.stringify(res.data));

            this.option.series[0].data = this.transformAndFillData(data, this.option.xAxis.data, ['totalPrincipal',
              'totalInterest'
            ]);
            this.option.series[1].data = this.transformAndFillData(data, this.option.xAxis.data, 'totalPrincipal');
            this.option.series[2].data = this.transformAndFillData(data, this.option.xAxis.data, 'totalInterest');
            this.init();
          }
        } catch (error) {
          this.$modal.msgError('数据获取失败，请重新尝试。');
        }
      },
      // 获取当月和下个月还款计划
      async getCardData4() {
        try {
          const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
          const currentMonth = moment().format('YYYY-MM');
          const NextMonth = moment().add(1, 'months').format('YYYY-MM');;


          const currentDateData = await getRepaymentPlanByDate(yesterday);
          if (currentDateData.code === 200 && 'data' in currentDateData) {
            // 还款计划查询本月前一天的已还和未还
            this.currentMonthData = currentDateData.data;
          }

          const currentMonthData = await getRepaymentPlan(currentMonth);
          if (currentMonthData.code === 200 && 'data' in currentMonthData) {
            // 还款计划查询本月所有本金和利息，和上个接口使用同一个变量进行处理
            this.currentMonthData.totalInterest = currentMonthData.data.totalInterest;
            this.currentMonthData.totalPrincipal = currentMonthData.data.totalPrincipal;
          }
          const NextMonthData = await getNextRepaymentPlan(NextMonth);
          if (NextMonthData.code === 200 && 'data' in NextMonthData) {
            this.NextMonthData = NextMonthData.data;
          }
        } catch (error) {
          this.$modal.msgError('数据获取失败，请重新尝试。');
        }
      },
      calculateTotal(obj) {
        let total = 0;
        for (let key in obj) {
          if (key !== 'bgID' || key !== 'month') {
            total += obj[key];
          }
        }
        return total / 10000;
      },

      goTarget(href) {
        window.open(href, "_blank");
      },
      financingLiabilities(value) {
        const total = this.calculateTotal(value)
        return total - value['专项借款'] - value['政府专项债']
      },
      generateMonthsMap() {
        let currentMonth = moment(this.daterangeLogCreateDate[0], 'YYYY-MM');
        const end = moment(this.daterangeLogCreateDate[1], 'YYYY-MM');
        const monthsArray = [];
        while (currentMonth.isSameOrBefore(end)) {
          // 将每个月份添加到数组中
          monthsArray.push(currentMonth.format('YYYY-MM'));
          // 移动到下一个月
          currentMonth.add(1, 'months');
        }
        return monthsArray;
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
              if (sum !== 0) {
                filledData[index] = sum / 10000;
              }
            } else {
              // 如果 key 是字符串，则直接赋值
              let value = dataItem[key];
              if (value !== 0) {
                filledData[index] = value / 10000;
              }
            }
          }
        });
        return filledData;
      }
    }
  };
</script>

<style scoped lang="scss">
  @import url('../assets//styles//rzkb.scss');

  .row-panel+.row-panel {
    margin-top: 17px;
  }

  .card-panel {
    height: 160px;
    min-height: 160px;
    box-sizing: border-box;

    >div {
      height: 100%;
    }
  }

  .card-panel+.card-panel {
    margin-top: 17px;
  }

  .card-content {
    border-radius: 8px;
    color: #FFFFFF;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding-right: 30px;

    >div:nth-of-type(1) {
      width: 60%;
      white-space: nowrap;
      /* 确保文本在一行内显示 */
      overflow: hidden;
      /* 隐藏溢出的文本 */
      text-overflow: ellipsis;
      /* 文本溢出时显示省略号 */
    }
  }

  @for $i from 1 through 8 {
    .card-content-bg#{$i} {
      background-image: url('../assets/images/rzkb#{$i}.png');
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }

  .amounts-font {
    font-family: 'DIN Alternate Bold', sans-serif;
  }

  .unit {
    font-size: 14px;
    font-weight: bold;
    color: #000000;
    margin-bottom: 13px;
  }

  .card-title {
    font-size: 24px;
    color: #FFFFFF;
    line-height: 24px;
    margin-bottom: 23px;
  }

  .card-amount {
    font-size: 24px;
    line-height: 20ppx;
    color: #FFFFFF;
  }

  .card-various-amounts {
    width: 29%;
    flex-direction: column;
  }

  .various-amounts-title,
  .various-amounts-amount {
    font-size: 12px;
    line-height: 12px;
    font-weight: 600;
    white-space: nowrap;
    /* 确保文本在一行内显示 */
    overflow: hidden;
    /* 隐藏溢出的文本 */
    text-overflow: ellipsis;
    /* 文本溢出时显示省略号 */
    display: block;
  }
</style>
