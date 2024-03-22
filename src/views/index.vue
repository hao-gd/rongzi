<template>
  <div class="content">
    <div class="app-container">
      <!-- <el-row :gutter="20">
      <el-col :sm="24" :lg="24">
        <blockquote class="text-warning" style="font-size: 14px">

          <h4 class="text-danger">
            欢迎进入融资后台管理系统
          </h4>
        </blockquote>

        <hr />
      </el-col>
    </el-row> -->


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

        <el-row v-for="row in rows" :key="row.id" class="row-panel">
          <el-col v-for="col in row.cols" :key="col.id" :span="col.span" style="background: #fff;" class="card-panel">
            <div class="card-content" :class="'card-content-bg' + col.id">
              <div class="card-title"></div>
              <div class="card-amount amounts-font"></div>
              <div class="card-various-amounts flex">
                <p class="amounts-font"></p>
                <p></p>
              </div>
            </div>
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
export default {
  name: "Index",
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
          text: 'Stacked Line'
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
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var chartDom = document.getElementById('main-echart');
      var myChart = echarts.init(chartDom);
      myChart.setOption(this.option);
    },
    goTarget(href) {
      window.open(href, "_blank");
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }

  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }

  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans",
  "Helvetica Neue",
  Helvetica,
  Arial,
  sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}

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
  padding-left: 17px;
}

.card-content {
  border-radius: 8px;
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
</style>
