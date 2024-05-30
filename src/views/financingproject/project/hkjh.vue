<template>
  <div class="w">
    <el-row>
      <el-form-item>
        <div class="w flex fjb" slot="label" @click.prevent.stop="addType($event, 'zjbj')">
          <span class="required">提款信息输入区（元）</span>
          <div>
            <el-button size="mini" class="reset-total-btn" id="sort-btn">排序</el-button>
            <el-button type="primary" size="mini" class="reset-total-btn" id="add-btn">新增一行</el-button>
          </div>
        </div>

        <tiny-grid align="center" ref="zjbj" :data="zjbj" max-height="300" :optimization="optimizationData">
          <tiny-grid-column type="index" width="60" title="序号"></tiny-grid-column>
          <tiny-grid-column field="date" title="日期" :renderer="renderDate('date')"></tiny-grid-column>
          <tiny-grid-column field="amount" title="提款金额" :renderer="renderInput('amount')"></tiny-grid-column>
          <tiny-grid-column width="100">
            <template #default="data">
              <div class="f16 tc">
                <!-- <el-button icon="el-icon-plus" type="text" @click="$refs.insertGrid.insertAt(record, data.row)"></el-button> -->
                <el-button type="text" @click="remove(data, 'zjbj')">删 除</el-button>
              </div>
            </template>
          </tiny-grid-column>
        </tiny-grid>
      </el-form-item>
      <!-- <el-button icon="el-icon-refresh" size="mini" @click="init('提款信息输入区')">初始化</el-button> -->
    </el-row>

    <el-row>
      <el-form-item>
        <div class="w flex fjb" slot="label" @click.prevent.stop="addType($event, 'bjch')">
          <span class="required">本金偿还信息输入区（元）</span>
          <div>
            <el-button type="info" plain icon="el-icon-document-copy" size="mini"
              @click="dialogbjchVisible = true">粘贴本金偿还信息</el-button>
            <el-button size="mini" class="reset-total-btn" id="sort-btn">排序</el-button>
            <el-button type="primary" size="mini" class="reset-total-btn" id="add-btn">新增一行</el-button>
          </div>
        </div>

        <tiny-grid align="center" ref="bjch" :data="bjch" max-height="300">
          <tiny-grid-column type="index" width="60" title="序号"></tiny-grid-column>
          <tiny-grid-column field="createdDate" title="日期" :renderer="renderDate('date')"></tiny-grid-column>
          <tiny-grid-column field="amount" title="偿还本金" :renderer="renderInput('amount')"></tiny-grid-column>
          <tiny-grid-column width="100">
            <template #default="data">
              <div class="f16 tc">
                <!-- <el-button icon="el-icon-plus" type="text" @click="$refs.insertGrid2.insertAt(record, data.row)"></el-button> -->
                <el-button type="text" @click="remove(data, 'bjch')">删 除</el-button>
              </div>
            </template>
          </tiny-grid-column>
        </tiny-grid>
      </el-form-item>
      <!-- <el-button icon="el-icon-refresh" size="mini" @click="init('本金偿还信息输入区')">初始化</el-button> -->
    </el-row>
    <el-row>
      <el-form-item>

        <div class="w flex fjb" slot="label" @click.prevent.stop="addType($event, 'lvbg')">
          <span class="required">年利率信息输入区（固定利率只写一个）</span>
          <div>

            <el-button size="mini" class="reset-total-btn" id="sort-btn">排序</el-button>
            <el-button type="primary" size="mini" class="reset-total-btn" id="add-btn"
              :disabled="form.rateType === '固定'">
              新增一行</el-button>
          </div>
        </div>
        <tiny-grid align="center" ref="lvbg" :data="lvbg" max-height="300" :optimization="optimizationData">
          <tiny-grid-column type="index" width="60" title="序号"></tiny-grid-column>
          <tiny-grid-column field="createdDate" title="日期" :renderer="renderDate('date')"></tiny-grid-column>
          <tiny-grid-column field="rate" title="利率" :renderer="renderRate('rate')"></tiny-grid-column>
          <tiny-grid-column width="100">
            <template #default="data">
              <div class="f16 tc">
                <!-- <el-button icon="el-icon-plus" type="text" @click="$refs.insertGrid3.insertAt(record, data.row)"></el-button> -->
                <el-button type="text" @click="remove(data, 'lvbg')">删 除</el-button>
              </div>
            </template>
          </tiny-grid-column>
        </tiny-grid>
      </el-form-item>
      <!-- <el-button icon="el-icon-refresh" size="mini" @click="init('年利率信息输入区')">初始化</el-button> -->
    </el-row>

    <el-row>
      <el-form-item>
        <div class="w flex fjb" slot="label" @click.prevent.stop="addType($event, 'zjywjnjl')">
          <span class="required">手续费缴纳记录</span>
          <div>
            <el-button size="mini" class="reset-total-btn" id="sort-btn">排序</el-button>
            <el-button type="primary" size="mini" class="reset-total-btn" id="add-btn">
              新增一行</el-button>
          </div>
        </div>
        <tiny-grid align="center" ref="zjywjnjl" :data="zjywjnjl" max-height="300" :optimization="optimizationData">
          <tiny-grid-column type="index" width="60" title="序号"></tiny-grid-column>
          <tiny-grid-column field="createdDate" title="日期" :renderer="renderDate('date')"></tiny-grid-column>
          <tiny-grid-column field="amount" title="手续费" :renderer="renderInput('amount')"></tiny-grid-column>
          <tiny-grid-column width="100">
            <template #default="data">
              <div class="f16 tc">
                <!-- <el-button icon="el-icon-plus" type="text" @click="$refs.insertGrid3.insertAt(record, data.row)"></el-button> -->
                <el-button type="text" @click="remove(data, 'zjywjnjl')">删 除</el-button>
              </div>
            </template>
          </tiny-grid-column>
        </tiny-grid>
      </el-form-item>
      <!-- <el-button icon="el-icon-refresh" size="mini" @click="init('年利率信息输入区')">初始化</el-button> -->
    </el-row>


    <el-alert title="如果修改上面的表格数据,必须重新导入或生成还款计划明细." type="success" center show-icon></el-alert>


    <!-- <div class="flex fje mb20"> -->
    <div style="display: flex;justify-content: space-between;margin-top: 20px;">
      <div style="display: flex;">
        <el-button style="align-self:flex-end" type="info" plain icon="el-icon-upload2" size="mini"
          @click="handleImport">
          导入还款计划明细</el-button>
        <el-button style="align-self:flex-end" type="warning" plain icon="el-icon-download" size="mini"
          @click="exportToExcel">导出还款计划明细</el-button>
      </div>
      <!-- <el-button type="warning" plain icon="el-icon-download" size="mini" @click="exportToExcel">导 出</el-button> -->

      <div style="display: flex;">
        <el-checkbox style="margin-right: 30px;align-self:flex-end" v-model="huanbenjintongshihuanlixi">还本金的同时还利息
        </el-checkbox>
        <el-button v-if="bjch || lvbg || lvbg" type="primary" @click="handleGenerate">
          生成还款计划明细</el-button>
      </div>
    </div>

    <el-row v-if="repaymentPlanTable.length !== 0" class="mb20 mt20">
      <el-divider class="no_mt mb20"></el-divider>

      <h2 class="tc 20 mb10">还款计划明细</h2>
      <el-table ref="tableRef" show-summary :summary-method="getSummaries" border :data="filteredRepaymentPlanTable"
        style="width: 100%">
        <el-table-column v-for="(item, index) in hkjh_repaymentPlanClearingTableColumn" :key="index" :prop="item.prop"
          :label="item.label" :width="item.width" :min-width="item.minWidth" align="center" header-align="center">

        </el-table-column>

      </el-table>
    </el-row>

    <!-- 用户导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" destroy-on-close width="400px" append-to-body>
      <el-upload ref="upload" :limit="1" accept=".xlsx, .xls" action="#" :auto-upload="false"
        :on-change="uploadOnChange" drag>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link :href="`${upload.template_excel}`" type="primary" :underline="false" target="_blank"
            style="font-size:12px;vertical-align: baseline;">下载模板</el-link>

        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定 使 用</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 粘贴本金偿还信息 -->
    <el-dialog title="粘贴本金偿还信息(单位:元)" :visible.sync="dialogbjchVisible" :modal="false">
      <el-alert title="直接从Excel复制日期和偿还金额数据,不需要复制表头,否则会失败." type="warning" center show-icon></el-alert>
      <el-input type="textarea" :rows="30" placeholder="直接从Excel复制日期和偿还金额数据,例子:

2026/11/30	1000.00
2027/04/20	20000.00" v-model="textarea_bjch">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handlePaste">确 定 使 用</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import {
    Grid as TinyGrid,
    GridColumn as TinyGridColumn,
    Numeric as TinyNumeric
  } from '@opentiny/vue'
  import {
    getDatesBasedOnStartDate,
    addEventsToTimeline,
    generateRepaymentPlan,
    sortTimeLineByDate
  } from './hkjh'
  import {
    renderInput,
    renderDate,
    renderRate,
    hkjh_repaymentPlanClearingTableColumn
  } from './form'
  const xlsx = require("xlsx");
  const moment = require('moment');
  export default {
    name: 'hkjhPanel',
    components: {
      TinyGrid,
      TinyGridColumn,
      TinyNumeric
    },
    props: {
      form: {
        type: Object,
        default: () => {}
      },
      huankuanmingxi2List: { // 回显显示的还款计划明细
        type: Array,
        default: () => {
          return []
        }
      },
      isEditable: {
        type: Boolean,
      }
    },
    data() {
      return {
        optimizationData: {
          animat: false,
          delayHover: 1000,
          scrollX: {
            gt: 100, // 指定大于多少范围时自动启动虚拟滚动（启用 X 虚拟滚动，必须固定所有列宽，否则无法兼容）默认100
            oSize: 2, // 当剩余数据少于指定范围时触发重新渲染 默认自动计算
            rSize: 10, // 每次渲染条数 默认自动计算
            vSize: 10 // 指定可视区域条数
          },
          scrollY: {
            gt: 20, // 指定大于多少范围时自动启动虚拟滚动（启用 Y 虚拟滚动，必须固定所有行高，否则无法兼容）默认500
            oSize: 2, // 当剩余数据少于指定范围时触发重新渲染 默认自动计算
            rSize: 10, // 每次渲染条数 默认自动计算
            vSize: 10, // 指定可视区域条数 默认自动计算
            rHeight: 50, // 指定行高 默认自动计算
            adaptive: true // 自动适配最优的渲染方式 默认true
          }
        },
        hkjh_repaymentPlanClearingTableColumn,
        bjch: [],
        zjbj: [],
        lvbg: [],
        lixichanghuanArray: [],
        zjywjnjl: [],
        record: {
          date: '',
          amount: '',
          editing: true
        },
        lvrecord: {
          date: '',
          rate: 0,
          editing: true
        },
        lxKeyMap: {
          "按月偿还": 1,
          "按季度偿还": 3,
          "按半年偿还": 6,
          "按年偿还": 12
        },
        bjKeyMap: {
          "半年偿还": 6,
          "季度偿还": 3,
          "按年偿还": 12,
          "到期还本": 0,
        },
        repaymentPlanTable: [],
        huanbenjintongshihuanlixi: false,
        upload: {
          open: false,
          template_excel: process.env.VUE_APP_BASE_API + '/profile/upload/2024/04/13/还款明细模板.xlsx'
        },
        temp_header: {},
        excel_data: {},
        textarea_bjch: "",
        dialogbjchVisible: false
      }
    },
    watch: {
      huankuanmingxi2List: {
        handler(newVal) {
          if (newVal.length !== 0) {
            //删除手续费缴纳记录，手续费没有qishu  .filter(item => item.qishu !== null)
            //此数据是在父组件单独接口请求过来的所以，需要绑定监控
            this.repaymentPlanTable = this.huankuanmingxi2List;
          }
        },
        deep: true
      },
      //   'form.lilvbiangeng': {
      //     handler(newVal) {
      //       if (newVal) {
      //         this.lvbg = JSON.parse(newVal);
      //       }
      //     },
      //     deep: true,
      //     immediate: true
      //   },
      //   'form.lixichanghuan': {
      //     handler(newVal) {
      //       if (newVal) {
      //         this.lixichanghuanArray = JSON.parse(newVal);
      //       }
      //     },
      //     deep: true,
      //     immediate: true
      //   },
      "bjch": {
        handler(newVal) {
          if (newVal) {
            // console.log(newVal);
            this.form.repaidAmount = newVal.reduce((acc, item) => acc + item.amount, 0);
            // this.form.changhuanbenjin = JSON.parse(newVal);
          }
        },
        deep: true,
        immediate: false
      },
      'zjbj': {
        handler(newVal) {
          if (newVal) {
            this.form.financingAmount = newVal.reduce((acc, item) => acc + item.amount, 0);
            // this.form.tiqubenjin = JSON.parse(newVal);
          }
        },
        deep: true,
        immediate: false
      },
      'zjywjnjl': {
        handler(newVal) {
          if (newVal) {
            this.form.shouxufei = newVal.reduce((acc, item) => acc + item.amount, 0);
            // this.form.tiqubenjin = JSON.parse(newVal);
          }
        },
        deep: true,
        immediate: false
      },
    },
    computed: {
      filteredRepaymentPlanTable() {
        return this.repaymentPlanTable.filter(item => item.qishu !== null && item.qishu !== undefined);
      }
    },
    beforeMount() {
      this.temp_header = this.hkjh_repaymentPlanClearingTableColumn.reduce((acc, e) => {
        acc[e.label] = e.prop;
        return acc;
      }, {});
    },
    mounted() {

      this.zjbj = JSON.parse(this.form.tiqubenjin);
      this.bjch = JSON.parse(this.form.changhuanbenjin);
      this.lixichanghuanArray = JSON.parse(this.form.lixichanghuan);
      this.lvbg = JSON.parse(this.form.lilvbiangeng);

      this.zjywjnjl = JSON.parse(this.form.zjywjnjl);
      // this.repaymentPlanTable = this.huankuanmingxi2List;

    },
    methods: {
      handlePaste() {
        // 通过换行符分割数据
        let lines = this.textarea_bjch.split('\n');
        // 存储分割后的数据
        this.bjch = [];
        // 遍历分割后的行数据
        lines.forEach(line => {
          // 通过制表符分割每一行数据
          let parts = line.split('\t');
          // 创建record对象并存入this.bjch list
          this.bjch.push({
            date: parts[0],
            amount: Number(parts[1]),
            editing: true
          });
        });

        this.dialogbjchVisible = false

      },
      init(type) {
        this.$msgbox({
          title: '重要提示',
          message: '根据上面输入的项目时间、金额等信息，生成 "' + type + '" 初始信息, 是否继续?',
          showCancelButton: true,
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          cancelButtonClass: "btn-custom-cancel",
          customClass: 'custom-msgbox',
        }).then(() => {

          if (type == '提款信息输入区') {
            this.generateBjZjData();
          } else if (type == '本金偿还信息输入区') {
            this.generateBjChTable();
          } else if (type == '年利率信息输入区') {
            this.generateLvData();
          }
          this.$modal.msgSuccess("已生成!");

        }).catch((e) => {
          // console.log(e);
          this.$modal.msgError("已取消");

        });
      },

      hkjh() {
        this.generateLvData();
        this.generateBjZjData();
        this.generateBjChTable();
      },

      // 初始生成lx数据
      generateLxData() {
        //console.log("生成lx数据", this.form.firstRepaymentDate, this.form.dueDate, this.lxKeyMap[this.form.interestRepaymentMethod]);
        this.lixichanghuanArray = getDatesBasedOnStartDate(this.form.firstRepaymentDate, this.form.dueDate, this
          .lxKeyMap[this.form.interestRepaymentMethod]);
      },

      // 初始生成lv数据
      generateLvData() {
        //console.log("生成默认lv数据");
        //只能创建一条默认的利率数据
        const data = JSON.parse(JSON.stringify(this.lvrecord));
        data.date = this.form.loanDate;
        data.rate = 0;
        if (this.form.rateType == "固定") {
          data.rate = (Number(this.form.rate)).toFixed(2)
        }

        this.$set(this, "lvbg", JSON.parse(JSON.stringify([data])))
      },

      // 初始生成增加bj数据
      generateBjZjData() {
        this.zjbj = []
        const data = JSON.parse(JSON.stringify(this.record));
        data.date = this.form.loanDate;
        data.amount = Number(this.form.financingAmount) * 10000
        this.$set(this, "zjbj", JSON.parse(JSON.stringify([data])))
      },


      // 初始生成本金偿还率表格
      generateBjChTable() {
        // //console.log("生成本金偿还率表格");
        this.bjch = [];
        let formattedArray = [];
        if (this.form.principalRepaymentMethod === '到期还本') {
          const data = JSON.parse(JSON.stringify(this.record));
          data.date = this.form.dueDate;
          data.amount = Number(this.form.financingAmount) * 10000;
          formattedArray = [data]
          // this.addRow('bjch', data)
        } else {
          let benjinzengjia = getDatesBasedOnStartDate(this.form.loanDate, this.form.dueDate, this.bjKeyMap[this.form
            .principalRepaymentMethod]);
          // 转换为指定的对象数组格式
          formattedArray = benjinzengjia.map(date => ({
            date: date,
            amount: 0,
            editing: true
          }));
          // formattedArray.forEach(item => {
          //   this.addRow('bjch', item)
          // })
        }
        this.$set(this, "bjch", JSON.parse(JSON.stringify(formattedArray)))
      },



      // 事件委托
      addType(e, type) {
        try {
          if (e.target.id === 'add-btn' || e.target.innerText == '新增一行') {
            this.addRow(type)
          } else if (e.target.id === 'sort-btn' || e.target.innerText == '排序') {
            this.sortRow(type)
          }
        } catch (error) {}
      },
      // 新增一行数据
      addRow(refCode) {
        console.log(refCode, refCode == 'zjywjnjl');
        if (this[refCode] == undefined) {
          //防止出现不是数组
          this[refCode] = []
        }

        if (refCode == 'lvbg') {
          this[refCode].push(JSON.parse(JSON.stringify(this.lvrecord)))

        } else {
          //本金偿还和本金增加模板一致
          this[refCode].push(JSON.parse(JSON.stringify(this.record)))

        }
      },
      // 排序方法
      sortRow(refCode) {
        this.$set(this, refCode, JSON.parse(JSON.stringify(sortTimeLineByDate(this[refCode]))))
      },
      // 删除数据方法
      remove(data, refCode) {
        // 通过下标删除数组中指定的数据
        this[refCode].splice(data.rowIndex, 1)
        //console.log(data, refCode);
      },
      renderInput,
      renderDate,
      renderRate,
      // 生成需要渲染的代码数据
      handleGenerate() {
        this.$msgbox({
          title: '重要提示',
          message: '根据上面录入的信息生成还款计划明细, 是否继续?',
          showCancelButton: true,
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          cancelButtonClass: "btn-custom-cancel",
          customClass: 'custom-msgbox',
        }).then(() => {
          this.handleGenerate_()
          this.$modal.msgSuccess("已生成!");

        }).catch((e) => {
          console.log(e);
          this.$modal.msgError("已取消");

        });

      },
      handleGenerate_() {
        this.generateLxData();
        this.repaymentPlanTable = [];
        //timeline要保证事件加入的顺序是按照,提取本金,偿还本金,利息偿还,利率变更,这样即使同一天发生了所有的事件,生成的还款明细才不会出错

        let datas = [
          ...addEventsToTimeline('提取本金', this.zjbj, e => e),
          ...addEventsToTimeline('偿还本金', this.bjch, e => e),
          ...addEventsToTimeline('利息偿还', this.lixichanghuanArray, e => ({
            date: e
          })),
          ...addEventsToTimeline('利率变更', this.lvbg, e => e)
        ];

        // ...addEventsToTimeline('中间业务收入缴纳记录', this.zjywjnjl, e => e)

        datas = sortTimeLineByDate(datas)
        // console.log("datas2", datas);
        this.repaymentPlanTable = generateRepaymentPlan(datas, this.huanbenjintongshihuanlixi)
        // console.log("datas1", JSON.stringify(this.repaymentPlanTable));



        //将手续费塞入还款数组
        this.zjywjnjl.forEach((sxf) => {
          this.repaymentPlanTable.push({
            "riqi": sxf.date,
            "huankuanjine": (sxf.amount).toFixed(2),
            "shouxufei": (sxf.amount).toFixed(2)

          })
        })

        this.repaymentPlanTable.forEach((plan) => {
          //添加借款信息
          plan.borrowingUnit = this.form.borrowingUnit
          plan.financialInstitution = this.form.financialInstitution
          plan.daikuanyongtu = this.form.daikuanyongtu
        });
      },
      // 数组清空
      clearHkjhList() {
        this.bjch = [];
        this.zjbj = [];
        this.lvbg = [];
        this.zjywjnjl = [];
        this.lixichanghuanArray = [];
        this.repaymentPlanTable = [];
      },
      /* 计算合计 */
      getSummaries(param) {
        const {
          columns,
          data
        } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if (column.label.includes('日期')) {
            sums[index] = '/';
            return;
          }

          if (column.label.includes('利率')) {
            sums[index] = '/';
            return;
          }
          if (column.label.includes('本金剩余')) {
            sums[index] = '/';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          // console.log(column,values);
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              if (!isNaN(curr)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0).toFixed(2);
            sums[index];
          } else {
            sums[index] = 0;
          }
        });

        return sums;
      },
      /** 导入按钮操作 */
      handleImport() {

        this.$msgbox({
          title: '手动导入还款计划明细重要提示',
          message: '手动导入还款计划明细前,请确保已经完成录入“手续费缴纳记录”;如果修改“手续费缴纳记录”,也必须重新导入还款计划明细',
          showCancelButton: true,
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          cancelButtonClass: "btn-custom-cancel",
          customClass: 'custom-msgbox',
        }).then(() => {

          this.upload.title = "导入还款计划明细";
          this.upload.open = true;

        }).catch((e) => {
          // console.log(e);
          this.$modal.msgError("已取消");

        });

      },

      // 提交上传文件
      submitFileForm() {
        // 遍历excel_data中的每个对象
        const keys = Object.keys(this.temp_header);
        const newObjectList = this.excel_data.map(item => {
          const newObj = {};
          for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            if (key in item) {
              if (key == "日期") {
                newObj[this.temp_header[key]] = moment(item[key]).format('YYYY-MM-DD');
              } else if (key == "期数") {
                newObj[this.temp_header[key]] = item[key];
              } else {
                newObj[this.temp_header[key]] = (item[key]).toFixed(2);
              }
            }
          }
          return newObj;
        });

        this.huankuanmingxiFromExcel(newObjectList)
        this.upload.open = false;
      },
      async uploadOnChange(file) {
        /**
         * 1. 使用原生api去读取好的文件
         * */
        // console.log("原始上传的文件", file);
        // 读取文件不是立马能够读取到的，所以是异步的，使用Promise
        let dataBinary = await new Promise((resolve) => {
          // Web API构造函数FileReader，可实例化对象，去调用其身上方法，去读取解析文件信息
          let reader = new FileReader(); // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
          // console.log("实例化对象有各种方法", reader);
          reader.readAsBinaryString(file.raw); // 读取raw的File文件
          reader.onload = (ev) => {
            // console.log("文件解析流程进度事件", ev);
            resolve(ev.target.result); // 将解析好的结果扔出去，以供使用
          };
        });
        // console.log("读取出的流文件", dataBinary);

        /**
         * 2. 使用xlsx插件去解析已经读取好的二进制excel流文件
         * */
        let workBook = xlsx.read(dataBinary, {
          type: "binary",
          cellDates: true
        });
        // excel中有很多的sheet，这里取了第一个sheet：workBook.SheetNames[0]
        let firstWorkSheet = workBook.Sheets[workBook.SheetNames[0]];
        // 分为第一行的数据，和第一行下方的数据
        const header = this.getHeaderRow(firstWorkSheet);
        // console.log("读取的excel表头数据（第一行）", header);
        // 使用for循环

        const keys = Object.keys(this.temp_header);

        for (let i = 0; i < header.length; i++) {
          if (header[i] != keys[i]) {
            this.$msgbox({
              title: '严重错误',
              message: '您传入的数据表,与模板不一致,请使用模板重新上传!',
              confirmButtonText: '确定',
              cancelButtonClass: "btn-custom-cancel",
              customClass: 'custom-msgbox',
            }).then(() => {

            }).catch((e) => {

            });
            this.upload.open = false;
            return
          }
        }

        this.excel_data = xlsx.utils.sheet_to_json(firstWorkSheet);
        // console.log("读取所有excel数据", this.excel_data);
      },
      getHeaderRow(sheet) {
        const headers = []; // 定义数组，用于存放解析好的数据
        const range = xlsx.utils.decode_range(sheet["!ref"]); // 读取sheet的单元格数据
        let C;
        const R = range.s.r;
        /* start in the first row */
        for (C = range.s.c; C <= range.e.c; ++C) {
          /* walk every column in the range */
          const cell = sheet[xlsx.utils.encode_cell({
            c: C,
            r: R
          })];
          /* find the cell in the first row */
          let hdr = "UNKNOWN " + C; // <-- replace with your desired default
          if (cell && cell.t) hdr = xlsx.utils.format_cell(cell);
          headers.push(hdr);
        }
        return headers; // 经过上方一波操作遍历，得到最终的第一行头数据
      },

      huankuanmingxiFromExcel(newObjectList) {
        this.repaymentPlanTable = newObjectList

        //将手续费塞入还款数组
        this.zjywjnjl.forEach((sxf) => {
          this.repaymentPlanTable.push({
            "riqi": sxf.date,
            "huankuanjine": (sxf.amount).toFixed(2),
            "shouxufei": (sxf.amount).toFixed(2)

          })
        })


        this.repaymentPlanTable.forEach((plan) => {
          //添加借款信息
          plan.borrowingUnit = this.form.borrowingUnit
          plan.financialInstitution = this.form.financialInstitution
          plan.daikuanyongtu = this.form.daikuanyongtu
        });
      },
      //导出Excel
      exportToExcel() {
        //第二种方式

        // 获取表格数据
        const tableData = this.repaymentPlanTable;

        // 构建 Excel 文件内容
        let excelContent = `<html><head><meta charset="UTF-8"></head><body><table border="1">`;

        // 添加表头
        excelContent += '<tr>';
        for (const column of this.$refs.tableRef.columns) {
          if (column.property) {
            excelContent += `<th>${column.label}</th>`;
          }
        }
        excelContent += '</tr>';

        // 添加表格数据
        for (const row of tableData) {
          excelContent += '<tr>';
          for (const column of this.$refs.tableRef.columns) {
            if (column.property) {
              excelContent += `<td>${row[column.property]}</td>`;
            }
          }
          excelContent += '</tr>';
        }

        // 构建完整的 Excel 文件内容
        excelContent += '</table></body></html>';
        // console.log(excelContent);
        // 创建 Blob 对象
        const blob = new Blob([excelContent], {
          type: 'application/vnd.ms-excel'
        });

        // 创建链接并触发下载
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = '还款计划明细.xlsx'; // 设置默认文件名
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(link.href);
      },

    }
  }
</script>

<style lang="scss" scoped>
  .required::before {
    content: '*';
    color: #F56C6C;
    margin-right: 4px;
  }

  ::v-deep .el-form-item__label {
    width: 100%;
  }

  .reset-total-btn {}
</style>
