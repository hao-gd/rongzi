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
                    <div class="mt10">
                      <el-tooltip content="42467000" placement="top" effect="light">
                        <div slot="content">
                          <p class="various-amounts-title mb5">融资负债</p>
                          <count-to class="various-amounts-amount" :start-val='0' :end-val='financingLiabilities(value)' :duration='1000'
                            :decimals='0' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                            :useEasing="true"></count-to>
                        </div>
                        <div>
                          <p class="various-amounts-title mb5">融资负债</p>
                          <count-to class="various-amounts-amount" :start-val='0' :end-val='financingLiabilities(value)' :duration='1000'
                            :decimals='0' :separator="','" :prefix="''" :suffix="''" :autoplay="true"
                            :useEasing="true"></count-to>
                        </div>
                      </el-tooltip>
                    </div>

                    <div class="mt10" v-for="(valuec, keyc, indexc) in value" :key="indexc">
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
          <el-col :span="7"></el-col>
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
import { getCardData, getCardData2, getCardData3 } from '@/api/dashboard/index'
import resize from './dashboard/mixins/resize'
import { mapGetters, mapState } from "vuex";
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
      year: '',
      month: '',
      option: {
        title: {
          text: 'Stacked Line',
          show: false
        },
        tooltip: {
          trigger: 'axis',
          borderWidth: 5
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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210],
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 5 // 调整线条的粗细
            },
            emphasis: {
            focus: 'series',
            itemStyle: {
                color: 'White', // 鼠标悬停时数据点颜色
                borderColor: 'red', // 数据点边框颜色
                borderWidth: 1, // 数据点边框宽度
                borderType: 'solid' // 数据点边框类型
            }
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
      },
      myChart: null,
      creditData: {},
      rzjeData: {},
      dbData: {}
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
  mounted() {

    this.getCardData();
    this.getCardData2();
    this.getCardData3();

    this.init();
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
        console.log(res);
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
          console.log(data);
        }
      } catch (error) {
        this.$modal.msgError('数据获取失败，请重新尝试。');
      }
    },
    /* 请求 card 数据 */
    async getCardData2() {
      try {
        const res = await getCardData2();
        console.log(res);
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
          console.log(data);
        }
      } catch (error) {
        this.$modal.msgError('数据获取失败，请重新尝试。');
      }
    },
    /* 请求 card 数据 */
    async getCardData3() {
      try {
        const res = await getCardData3();
        console.log(res);
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
          console.log(data);
        }
      } catch (error) {
        this.$modal.msgError('数据获取失败，请重新尝试。');
      }
    },
    calculateTotal(obj) {
      let total = 0;
      for (let key in obj) {
        if (key !== 'bgID') {
          total += obj[key];
        }
      }
      return total;
    },

    goTarget(href) {
      window.open(href, "_blank");
    },
    financingLiabilities(value) {
      const total = this.calculateTotal(value)
      return total - value['专项借款'] - value['政府专项债']
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
