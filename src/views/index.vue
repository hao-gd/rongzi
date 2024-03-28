<template>
  <div class="content">
    <div class="app-container">
      <search-panel title="融资管理数据" :isIcon="false">


        <!-- <div slot="search">
          <el-form label-position="left" label-width="80px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="时间选择" class="no_mb">
                  <el-date-picker v-model="year" type="year" placeholder="请选择年度">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="时间选择" class="no_mb">
                  <el-date-picker type="month" v-model="month" placeholder="请选择月份">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div> -->

        <div class="tr unit">
          单位（万元）
        </div>

        <!-- <el-row v-for="row in rows" :key="row.id" class="row-panel">
          <el-col v-for="col in row.cols" :key="col.id" :span="col.span" style="background: #fff;" class="card-panel">
            <div class="card-content pt30 pl20" :class="'card-content-bg' + col.id">
              <div>
                <div class="card-title">已授信金额</div>

                <el-tooltip content="42467000" placement="top" effect="light">
                  <count-to class="card-amount amounts-font cp" :start-val='0' :end-val='42467000' :duration='1000'
                    :decimals='0' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                    :useEasing="true"></count-to>
                </el-tooltip>

              </div>

              <div class="card-various-amounts flex">
                <div class="mb10">
                  <el-tooltip content="42467000" placement="top" effect="light">
                    <div slot="content">
                      <p class="various-amounts-title mb5">项目贷xxxx</p>
                      <count-to class="various-amounts-amount" :start-val='0' :end-val='42467000' :duration='1000'
                        :decimals='0' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                        :useEasing="true"></count-to>
                    </div>
                    <div>
                      <p class="various-amounts-title mb5">项目贷xxxx</p>
                      <count-to class="various-amounts-amount" :start-val='0' :end-val='42467000' :duration='1000'
                        :decimals='0' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                        :useEasing="true"></count-to>
                    </div>
                  </el-tooltip>
                </div>

                <div>
                  <el-tooltip content="42467000" placement="top" effect="light">
                    <div slot="content">
                      <p class="various-amounts-title mb5">非项目贷xxxx</p>
                      <count-to class="various-amounts-amount" :start-val='0' :end-val='42467000' :duration='1000'
                        :decimals='0' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                        :useEasing="true"></count-to>
                    </div>
                    <div>
                      <p class="various-amounts-title mb5">非项目贷xxxx</p>
                      <count-to class="various-amounts-amount" :start-val='0' :end-val='42467000' :duration='1000'
                        :decimals='0' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                        :useEasing="true"></count-to>
                    </div>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </el-col>

        </el-row> -->

        <el-row :gutter="20">
          <el-col :span="5">
            <el-row>
              <el-col v-for="(value, key, index) in creditData" :key="index" :span="24" style="background: #fff;"
                class="card-panel">
                <div class="card-content pt30 pl20" :class="'card-content-bg' + 1">
                  <div>
                    <div class="card-title">{{ key }}</div>

                    <el-tooltip placement="top" effect="light">
                      <P slot="content">{{ calculateTotal(value) }}</P>
                      <count-to class="card-amount amounts-font cp" :start-val='0' :end-val='calculateTotal(value)'
                        :duration='1000' :decimals='0' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                        :useEasing="true"></count-to>
                    </el-tooltip>

                  </div>

                  <div class="card-various-amounts flex">
                    <div class="mb10" v-for="(valuec, keyc, indexc) in value" :key="indexc">
                      <el-tooltip v-if="keyc !== 'bgID'" content="42467000" placement="top" effect="light">
                        <div slot="content">
                          <p class="various-amounts-title mb5">{{ keyc }}</p>
                          <count-to class="various-amounts-amount" :start-val='0' :end-val='valuec / 10000' :duration='1000'
                            :decimals='0' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                            :useEasing="true"></count-to>
                        </div>
                        <div>
                          <p class="various-amounts-title mb5">{{ keyc }}</p>
                          <count-to class="various-amounts-amount" :start-val='0' :end-val='valuec / 10000' :duration='1000'
                            :decimals='0' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                            :useEasing="true"></count-to>
                        </div>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="5">
            <el-row>
              <el-col v-for="(value, key, index) in rzjeData" :key="index" :span="24" style="background: #fff;"
                class="card-panel">
                <div class="card-content pl20" :class="'card-content-bg' + 4">
                  <div class="pt30">
                    <div class="card-title">{{ key }}</div>

                    <el-tooltip placement="top" effect="light">
                      <P slot="content">{{ calculateTotal(value) }}</P>
                      <count-to class="card-amount amounts-font cp" :start-val='0' :end-val='calculateTotal(value)'
                        :duration='1000' :decimals='0' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                        :useEasing="true"></count-to>
                    </el-tooltip>

                  </div>

                  <div class="card-various-amounts flex">
                    <div class="mt10" v-for="(valuec, keyc, indexc) in value" :key="indexc">
                      <el-tooltip v-if="keyc !== 'bgID'" content="42467000" placement="top" effect="light">
                        <div slot="content">
                          <p class="various-amounts-title mb5">{{ keyc }}</p>
                          <count-to class="various-amounts-amount" :start-val='0' :end-val='valuec / 10000' :duration='1000'
                            :decimals='0' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                            :useEasing="true"></count-to>
                        </div>
                        <div>
                          <p class="various-amounts-title mb5">{{ keyc }}</p>
                          <count-to class="various-amounts-amount" :start-val='0' :end-val='valuec / 10000' :duration='1000'
                            :decimals='0' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                            :useEasing="true"></count-to>
                        </div>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="7">
            <el-row>
              <el-col v-for="(value, key, index) in dbData" :key="index" :span="24" style="background: #fff;"
                class="card-panel">
                <div class="card-content pt30 pl20" :class="'card-content-bg' + 7">
                  <div>
                    <div class="card-title">{{ key }}</div>

                    <el-tooltip placement="top" effect="light">
                      <P slot="content">{{ calculateTotal(value) }}</P>
                      <count-to class="card-amount amounts-font cp" :start-val='0' :end-val='calculateTotal(value)'
                        :duration='1000' :decimals='0' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                        :useEasing="true"></count-to>
                    </el-tooltip>

                  </div>

                  <div class="card-various-amounts flex">
                    <div class="mb10" v-for="(valuec, keyc, indexc) in value" :key="indexc">
                      <el-tooltip v-if="keyc !== 'bgID'" content="42467000" placement="top" effect="light">
                        <div slot="content">
                          <p class="various-amounts-title mb5">{{ keyc }}</p>
                          <count-to class="various-amounts-amount" :start-val='0' :end-val='valuec' :duration='1000'
                            :decimals='0' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                            :useEasing="true"></count-to>
                        </div>
                        <div>
                          <p class="various-amounts-title mb5">{{ keyc }}</p>
                          <count-to class="various-amounts-amount" :start-val='0' :end-val='valuec' :duration='1000'
                            :decimals='0' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                            :useEasing="true"></count-to>
                        </div>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>


          <el-col :span="7">
            <el-row>
              <el-col :span="24" style="background: #fff;" class="card-panel">
                <div class="card-content pt30 pl20" :class="'card-content-bg' + 5">
                  <div class="w">
                    <div class="card-title">本月还款计划</div>

                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-tooltip placement="top" effect="light">
                          <div slot="content">
                            <p class="various-amounts-title mb5">本金（利息）</p>
                            <count-to class="various-amounts-amount dlb" :start-val='0'
                              :end-val='currentMonthData.totalPrincipal / 10000' :duration='1000' :decimals='0' :separator="','"
                              :prefix="''" :suffix="''" :autoplay="true" :useEasing="true"></count-to>

                              (<count-to class="various-amounts-amount dlb" :start-val='0'
                              :end-val='currentMonthData.totalInterest / 10000' :duration='1000' :decimals='0' :separator="','"
                              :prefix="''" :suffix="''" :autoplay="true" :useEasing="true"></count-to>)
                          </div>
                          <div class="various-amounts-amount w">
                            <p class="various-amounts-title mb5">本金（利息）</p>
                            <count-to class="various-amounts-amount dlb" :start-val='0'
                              :end-val='currentMonthData.totalPrincipal / 10000' :duration='1000' :decimals='0' :separator="','"
                              :prefix="''" :suffix="''" :autoplay="true" :useEasing="true"></count-to>

                            (<count-to class="various-amounts-amount dlb" :start-val='0'
                              :end-val='currentMonthData.totalInterest / 10000' :duration='1000' :decimals='0' :separator="','"
                              :prefix="''" :suffix="''" :autoplay="true" :useEasing="true"></count-to>)
                          </div>

                        </el-tooltip>
                      </el-col>
                      <el-col :span="12">
                        <el-tooltip placement="top" effect="light">
                          <div slot="content">
                            <p class="various-amounts-title mb5">已还（未还）</p>
                            <count-to class="various-amounts-amount dlb" :start-val='0'
                              :end-val='(currentMonthData.totalPaidInterest + currentMonthData.totalPaidPrincipal) / 10000'
                              :duration='1000' :decimals='0' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                              :useEasing="true"></count-to>

                            (<count-to class="various-amounts-amount dlb" :start-val='0'
                              :end-val='(currentMonthData.totalUnpaidInterest + currentMonthData.totalUnpaidPrincipal) / 10000'
                              :duration='1000' :decimals='0' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                              :useEasing="true"></count-to>)
                          </div>

                          <div class="various-amounts-amount w">
                            <p class="various-amounts-title mb5">已还（未还）</p>
                          <count-to class="various-amounts-amount dlb" :start-val='0'
                            :end-val='(currentMonthData.totalPaidInterest + currentMonthData.totalPaidPrincipal) / 10000'
                            :duration='1000' :decimals='0' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                            :useEasing="true"></count-to>

                            (<count-to class="various-amounts-amount dlb" :start-val='0'
                            :end-val='(currentMonthData.totalUnpaidInterest + currentMonthData.totalUnpaidPrincipal) / 10000'
                            :duration='1000' :decimals='0' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                            :useEasing="true"></count-to>)
                          </div>
                        </el-tooltip>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-col>

              <el-col :span="24" style="background: #fff;"
                class="card-panel">
                <div class="card-content pl20 pt30" :class="'card-content-bg' + 5">
                  <div>
                    <div class="card-title">下月还款计划</div>

                    <el-tooltip placement="top" effect="light">
                      <P slot="content">{{ calculateTotal(NextMonthData) }}</P>
                      <count-to class="card-amount amounts-font cp" :start-val='0' :end-val='calculateTotal(NextMonthData)'
                        :duration='1000' :decimals='0' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                        :useEasing="true"></count-to>
                    </el-tooltip>

                  </div>

                  <div class="card-various-amounts flex">
                    <div class="mt10">
                      <el-tooltip content="42467000" placement="top" effect="light">
                        <div slot="content">
                          <p class="various-amounts-title mb5">本金</p>
                          <count-to class="various-amounts-amount" :start-val='0' :end-val='NextMonthData.totalPrincipal / 10000' :duration='1000'
                            :decimals='0' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                            :useEasing="true"></count-to>
                        </div>
                        <div>
                          <p class="various-amounts-title mb5">本金</p>
                          <count-to class="various-amounts-amount" :start-val='0' :end-val='NextMonthData.totalPrincipal / 10000' :duration='1000'
                            :decimals='0' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                            :useEasing="true"></count-to>
                        </div>
                      </el-tooltip>
                    </div>

                    <div class="mt10">
                      <el-tooltip  content="42467000" placement="top" effect="light">
                        <div slot="content">
                          <p class="various-amounts-title mb5">利息</p>
                          <count-to class="various-amounts-amount" :start-val='0' :end-val='NextMonthData.totalInterest / 10000' :duration='1000'
                            :decimals='0' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                            :useEasing="true"></count-to>
                        </div>
                        <div>
                          <p class="various-amounts-title mb5">利息</p>
                          <count-to class="various-amounts-amount" :start-val='0' :end-val='NextMonthData.totalInterest / 10000' :duration='1000'
                            :decimals='0' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                            :useEasing="true"></count-to>
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
  getCardData, getCardData2, getCardData3, getRepaymentPlanData, getRepaymentPlan,
  getNextRepaymentPlan
} from '@/api/dashboard/index'
import resize from './dashboard/mixins/resize'
import { mapGetters, mapState } from "vuex";
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
      rows: [
        {
          id: 1,
          cols: [
            { id: 1, span: 5, content: '第一行第一个列', bgurl: require('../assets/images/rzkb1.png') },
            { id: 2, span: 5, content: '第一行第二个列', bgurl: require('../assets/images/rzkb2.png') },
            { id: 3, span: 7, content: '第一行第三个列', bgurl: require('../assets/images/rzkb3.png') },
            { id: 4, span: 7, content: '第一行第四个列', bgurl: require('../assets/images/rzkb4.png') },
          ],
        },
        {
          id: 2,
          cols: [
            { id: 5, span: 5, content: '第二行第一个列', bgurl: require('../assets/images/rzkb5.png') },
            { id: 6, span: 5, content: '第二行第二个列', bgurl: require('../assets/images/rzkb6.png') },
            { id: 7, span: 7, content: '第二行第三个列', bgurl: require('../assets/images/rzkb7.png') },
            { id: 8, span: 7, content: '第二行第四个列', bgurl: require('../assets/images/rzkb8.png') },
          ],
        },
      ],
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
          borderWidth: 5
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
        series: [
          {
            name: '还款合计',
            type: 'line',
            stack: 'Total',
            data: [],
            data: [],
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
                  color: 'rgba(160, 134, 253, .3)'
                },
                {
                  offset: 1,
                  color: 'rgba(160, 134, 253, 0)'
                }
              ])
            }
          },
          {
            name: '还款本金',
            key: 'totalPrincipal',
            type: 'line',
            stack: 'Total',
            data: [],
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
                  color: 'rgba(35, 173, 255, .3)'
                },
                {
                  offset: 1,
                  color: 'rgba(35, 173, 255, 0)'
                }
              ])
            }
          },
          {
            name: '还款利息',
            key: 'totalInterest',
            type: 'line',
            stack: 'Total',
            data: [],
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
                  color: 'rgba(19, 207, 178, .3)'
                },
                {
                  offset: 1,
                  color: 'rgba(19, 207, 178, 0)'
                }
              ])
            }
          },
        ]
      },
      myChart: null,
      creditData: {},
      rzjeData: {},
      dbData: {},
      daterangeLogCreateDate: [
        moment().subtract(1, 'years').format('YYYY-MM'),
        moment().format('YYYY-MM')
      ],
      currentMonthData: {},
      NextMonthData: {},
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
          const order = ['已担保金额', '担保余额'];
          const orderedData = {};
          order.forEach(key => {
            if (data[key]) {
              orderedData[key] = data[key];
            }
          });
          this.dbData = orderedData;
        }
      } catch (error) {
        this.$modal.msgError('数据获取失败，请重新尝试。');
      }
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
          this.listData = data;

          this.option.series[0].data = this.transformAndFillData(data, this.option.xAxis.data, ['totalPrincipal', 'totalInterest']);
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
        const currentMonth = moment().format('YYYY-MM');
        const NextMonth = moment().add(1, 'months').format('YYYY-MM');;

        const currentMonthData = await getRepaymentPlan(currentMonth);
        const NextMonthData = await getNextRepaymentPlan(NextMonth);
        if (currentMonthData.code === 200) {
          this.currentMonthData = currentMonthData.data;
        }
        if (NextMonthData.code === 200) {
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
            filledData[index] = sum;
          } else {
            // 如果 key 是字符串，则直接赋值
            filledData[index] = dataItem[key];
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
  height: 130px;
  min-height: 130px;
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
  font-size: 16px;
  color: #FFFFFF;
  line-height: 14px;
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
