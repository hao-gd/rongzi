<template>
    <div class="w">
        <el-row>
            <transition name="el-fade-in-linear">
                <el-form-item v-if="zjbj">
                    <div class="w flex fjb" slot="label" @click.prevent.stop="addType($event, 'zjbj')">
                        <span class="required">提款信息输入区</span>
                        <div>
                            <el-button size="mini" class="reset-total-btn" id="sort-btn">排序</el-button>
                            <el-button type="primary" size="mini" class="reset-total-btn" id="add-btn">新增一行</el-button>
                        </div>
                    </div>

                    <tiny-grid align="center" ref="zjbj" :data="zjbj" height="300" :optimization="optimizationData">
                        <tiny-grid-column type="index" width="60" title="序号"></tiny-grid-column>
                        <tiny-grid-column field="date" title="日期" :renderer="renderDate('date')"></tiny-grid-column>
                        <tiny-grid-column field="amount" title="提款金额" :renderer="renderInput('amount')"></tiny-grid-column>
                        <tiny-grid-column width="100">
                            <template #default="data">
                                <div class="f16 tc">
                                    <!-- <el-button icon="el-icon-plus" type="text" @click="$refs.insertGrid.insertAt(record, data.row)"></el-button> -->
                                    <el-button icon="el-icon-minus" type="text" @click="remove(data, 'zjbj')"></el-button>
                                </div>
                            </template>
                        </tiny-grid-column>
                    </tiny-grid>
                </el-form-item>
            </transition>

        </el-row>

        <el-row>
            <el-form-item v-if="bjch">
                <div class="w flex fjb" slot="label" @click.prevent.stop="addType($event, 'bjch')">
                    <span class="required">本金偿还信息输入区</span>
                    <div>
                        <el-button size="mini" class="reset-total-btn" id="sort-btn">排序</el-button>
                        <el-button type="primary" size="mini" class="reset-total-btn" id="add-btn">新增一行</el-button>
                    </div>
                </div>

                <tiny-grid align="center" ref="bjch" :data="bjch" height="300" :optimization="optimizationData">
                    <tiny-grid-column type="index" width="60" title="序号"></tiny-grid-column>
                    <tiny-grid-column field="createdDate" title="日期" :renderer="renderDate('date')"></tiny-grid-column>
                    <tiny-grid-column field="amount" title="偿还本金" :renderer="renderInput('amount')"></tiny-grid-column>
                    <tiny-grid-column width="100">
                        <template #default="data">
                            <div class="f16 tc">
                                <!-- <el-button icon="el-icon-plus" type="text" @click="$refs.insertGrid2.insertAt(record, data.row)"></el-button> -->
                                <el-button icon="el-icon-minus" type="text" @click="remove(data, 'bjch')"></el-button>
                            </div>
                        </template>
                    </tiny-grid-column>
                </tiny-grid>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item v-if="lvbg">
                <div class="w flex fjb" slot="label" @click.prevent.stop="addType($event, 'lvbg')">
                    <span class="required">年利率信息输入区（固定利率只写一个）</span>
                    <div>
                        <el-button size="mini" class="reset-total-btn" id="sort-btn">排序</el-button>
                        <el-button type="primary" size="mini" class="reset-total-btn" id="add-btn"
                            :disabled="form.rateType === '固定'">
                            新增一行</el-button>
                    </div>
                </div>

                <tiny-grid align="center" ref="lvbg" :data="lvbg" height="300" :optimization="optimizationData">
                    <tiny-grid-column type="index" width="60" title="序号"></tiny-grid-column>
                    <tiny-grid-column field="createdDate" title="日期" :renderer="renderDate('date')"></tiny-grid-column>
                    <tiny-grid-column field="rate" title="利率" :renderer="renderInput('rate')"></tiny-grid-column>
                    <tiny-grid-column width="100">
                        <template #default="data">
                            <div class="f16 tc">
                                <!-- <el-button icon="el-icon-plus" type="text" @click="$refs.insertGrid3.insertAt(record, data.row)"></el-button> -->
                                <el-button icon="el-icon-minus" type="text" @click="remove(data, 'lvbg')"></el-button>
                            </div>
                        </template>
                    </tiny-grid-column>
                </tiny-grid>
            </el-form-item>
        </el-row>

        <div class="flex fje mb20">
            <el-button v-if="bjch || lvbg || lvbg" type="primary" class="reset-total-btn" @click="handleGenerate">
                生成还款计划明细</el-button>
        </div>

        <el-row v-if="repaymentPlanTable.length !== 0" class="mb20">
            <el-divider class="no_mt mb20"></el-divider>

            <h2 class="tc 20 mb10">还款计划清单页面</h2>
            <el-table border :data="repaymentPlanTable" style="width: 100%">
                <el-table-column v-for="(item, index) in hkjh_repaymentPlanClearingTableColumn" :key="index"
                    :prop="item.prop" :label="item.label" :width="item.width" :min-width="item.minWidth" align="center"
                    header-align="center">
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>
<script>
import {
    Grid as TinyGrid,
    GridColumn as TinyGridColumn,
    Input,
    DatePicker as TinyDatePicker
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
    hkjh_repaymentPlanClearingTableColumn
} from './form'
export default {
    name: 'hkjhPanel',
    components: {
        TinyGrid,
        TinyGridColumn,
    },
    props: {
        form: {
            type: Object,
            default: () => { }
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
            record: {
                date: '',
                amount: '',
                editing: true
            },
            lvrecord: {
                date: '',
                rate: '',
                editing: true
            },
            lvKeyMap: {
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
        }
    },
    watch: {
        huankuanmingxi2List: {
            handler(newVal) {
                if (newVal.length !== 0) {
                    this.repaymentPlanTable = newVal;
                }
            },
            deep: true
        },
        'form.lilvbiangeng': {
            handler(newVal) {
                if (newVal) {
                    this.lixichanghuanArray = JSON.parse(newVal);
                }
            },
            deep: true,
            immediate: true
        },
        'form.lixichanghuan': {
            handler(newVal) {
                if (newVal) {
                    this.lvbg = JSON.parse(newVal);
                }
            },
            deep: true,
            immediate: true
        },
        "form.changhuanbenjin": {
            handler(newVal) {
                if (newVal) {
                    this.bjch = JSON.parse(newVal);
                }
            },
            deep: true,
            immediate: true
        },
        'form.tiqubenjin': {
            handler(newVal) {
                if (newVal) {
                    this.zjbj = JSON.parse(newVal);
                }
            },
            deep: true,
            immediate: true
        },
    },
    methods: {
        hkjh() {
            this.generateLvData();
            this.generateBjZjData();
            this.generateBjChTable();
        },

        // 增加bj数据
        generateBjZjData() {
            console.log("增加bj数据");
            this.zjbj = []
            const data = JSON.parse(JSON.stringify(this.record));
            data.date = this.form.loanDate;
            data.amount = this.form.financingAmount
            this.$set(this, "zjbj", JSON.parse(JSON.stringify([data])))
        },

        // 生成本金偿还率表格
        generateBjChTable() {
            console.log("生成本金偿还率表格");
            this.bjch = [];
            let formattedArray = [];
            if (this.form.principalRepaymentMethod === '到期还本') {
                const data = JSON.parse(JSON.stringify(this.record));
                data.date = this.form.dueDate;
                data.amount = this.form.financingAmount;
                formattedArray = [data]
                // this.addRow('bjch', data)
            } else {
                const lxStartDate = this.form.firstRepaymentDate;
                const lxEndDate = this.form.dueDate;
                const lxIntervalMonths = this.bjKeyMap[this.form.principalRepaymentMethod];
                let lixichanghuanArray = getDatesBasedOnStartDate(lxStartDate, lxEndDate, lxIntervalMonths);
                console.log(lixichanghuanArray);
                // 转换为指定的对象数组格式
                formattedArray = lixichanghuanArray.map(date => ({
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
        // 生成lv数据
        generateLvData() {
            console.log("生成lv数据");
            this.lvbg = [];
            let formattedArray = [];
            if (this.form.rateType === '固定') {
                // 固定利率只能创建一条指定的利率数据
                const data = JSON.parse(JSON.stringify(this.lvrecord));
                data.date = this.form.firstRepaymentDate;
                data.rate = 0;
                formattedArray = [data]
                // this.addRow('lvbg', data)
            } else {
                // 浮动生成方式
                const lxStartDate = this.form.firstRepaymentDate;
                const lxEndDate = this.form.dueDate;
                const lxIntervalMonths = this.lvKeyMap[this.form.interestRepaymentMethod];
                let lixichanghuanArray = getDatesBasedOnStartDate(lxStartDate, lxEndDate, lxIntervalMonths);
                this.lixichanghuanArray = lixichanghuanArray;
                console.log(lixichanghuanArray);

                // 转换为指定的对象数组格式
                formattedArray = lixichanghuanArray.map(date => ({
                    date: date,
                    rate: 0,
                    editing: true
                }));

            }
            this.$set(this, "lvbg", JSON.parse(JSON.stringify(formattedArray)))
        },

        // 事件委托
        addType(e, type) {
            try {
                if (e.target.id === 'add-btn' || e.target.innerText == '新增一行') {
                    this.addRow(type)
                } else if (e.target.id === 'sort-btn' || e.target.innerText == '排序') {
                    this.sortRow(type)
                }
            } catch (error) { }
        },
        // 新增一行数据
        addRow(refCode, record = this.record) {
            this[refCode].push(JSON.parse(JSON.stringify(record)))
        },
        // 排序方法
        sortRow(refCode) {
            this.$set(this, refCode, JSON.parse(JSON.stringify(sortTimeLineByDate(this[refCode]))))
        },
        // 删除数据方法
        remove(data, refCode) {
            // 通过下标删除数组中指定的数据
            this[refCode].splice(data.rowIndex, 1)
            console.log(data, refCode);
        },
        renderInput,
        renderDate,
        // 生成需要渲染的代码数据
        handleGenerate() {
            console.log(this.lvbg);
            this.repaymentPlanTable = [];
            const datas = [
                ...addEventsToTimeline('偿还本金', this.bjch, e => e),
                ...addEventsToTimeline('利息偿还', this.lixichanghuanArray, e => ({
                    date: e
                })),
                ...addEventsToTimeline('提取本金', this.zjbj, e => e),
                ...addEventsToTimeline('利率变更', this.lvbg, e => e)
            ];
            console.log(datas);
            this.repaymentPlanTable = generateRepaymentPlan(datas)
            // 数据回传到父组件
            this.$emit('getRepaymentPlan', {
                bjch: this.bjch,
                zjbj: this.zjbj,
                lvbg: this.lvbg,
                lixichanghuanArray: this.lixichanghuanArray,
                repaymentPlanTable: this.repaymentPlanTable
            })
        },
        // 数组清空
        clearHkjhList() {
            this.bjch = [];
            this.zjbj = [];
            this.lvbg = [];
            this.lixichanghuanArray = [];
            this.repaymentPlanTable = [];
        }
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