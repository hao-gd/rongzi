<template>
    <div class="w">
        <el-row>
            <transition name="el-fade-in-linear">
                <el-form-item v-if="isZjbjShow">
                    <div class="w flex fjb" slot="label" @click.prevent.stop="addType($event, 'zjbj')">
                        <span class="required">提款信息输入区</span>
                        <el-button type="primary" size="mini" class="w100 reset-total-btn" id="add-btn">新增一行</el-button>
                    </div>

                    <tiny-grid align="center" ref="zjbj" :data="zjbj"
                        :edit-config="{ trigger: 'manual', mode: 'row', showStatus: true }">
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
            <el-form-item v-if="isBjchShow">
                <div class="w flex fjb" slot="label" @click.prevent.stop="addType($event, 'bjch')">
                    <span class="required">本金偿还信息输入区</span>
                    <el-button type="primary" size="mini" class="reset-total-btn" id="add-btn">新增一行</el-button>
                </div>

                <tiny-grid align="center" ref="bjch" :data="bjch">
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
            <el-form-item v-if="isLvbgShow">
                <div class="w flex fjb" slot="label" @click.prevent.stop="addType($event, 'lvbg')">
                    <span class="required">年利率信息输入区（固定利率请勿填写）</span>
                    <el-button type="primary" size="mini" class="reset-total-btn" id="add-btn"
                        :disabled="isLvShow">新增一行</el-button>
                </div>

                <tiny-grid align="center" ref="lvbg" :data="lvbg">
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
            <el-button v-if="isZjbjShow || isLvbgShow || isBjchShow" type="primary" size="mini" class="reset-total-btn"
                @click="handleGenerate">生 成</el-button>
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
import { Grid as TinyGrid, GridColumn as TinyGridColumn, Input, DatePicker as TinyDatePicker } from '@opentiny/vue'
// import { iconPlus as TinyIconPlus, iconDel as TinyIconDel } from '@opentiny/vue-icon'
import { getDatesBasedOnStartDate, addEventsToTimeline, generateRepaymentPlan } from './hkjh'
import { renderInput, renderDate, hkjh_repaymentPlanClearingTableColumn } from './form'
export default {
    name: 'hkjhPanel',
    components: {
        TinyGrid,
        TinyGridColumn,
        // TinyIconPlus,
        // TinyIconDel
    },
    props: {
        form: {
            type: Object,
            default: () => { }
        }
    },
    data() {
        return {
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
                "按季偿还": 3,
                "按半年偿还": 6,
                "按年偿还": 12
            },
            bjKeyMap: {
                "半年偿还": 6,
                "季度偿还": 3,
                "按年偿还": 12,
                "到期还本": 0,
            },
            repaymentPlanTable: []
        }
    },
    watch: {
        isZjbjShow(n, o) {
            // 如果这个值为true的需要调用一个方法
            if (n) {
                setTimeout(() => {
                    this.zjbj = []
                    const data = JSON.parse(JSON.stringify(this.record));
                    data.date = this.form.loanDate;
                    data.amount = this.form.financingAmount
                    this.addRow('zjbj', data)
                }, 50);
            }
        },
        // "form.rateType"(n, o) {
        //     // 如果值是 false的话代表是浮动利率，可以创建多个利率信息
        //     if (n && this.isLvbgShow) {
        //         this.generateLvData(n);
        //     } else {
        //         this.$modal.msgError("请继续填写数据");
        //     }
        // },
        "form.principalRepaymentMethod"(n, o) {
            if (n && this.isBjchShow) {
                this.generateBjTable(n)
            } else {
                this.$modal.msgError("请继续填写数据");
            }
        }
    },
    computed: {
        // 计算当form中的开始时间和结束时间加上金额都不为空的情况下显示提款信息输入区
        isZjbjShow() {
            const empty = [null, undefined, '']
            if (!empty.includes(this.form.loanDate)
                && !empty.includes(this.form.dueDate)
                && !empty.includes(this.form.financingAmount)) {
                return true
            } return false
        },
        // 计算form中开始时间结束时间，第一期开始时间，利息偿还方式 在都不为空的情况下显示年利率信息输入区
        isLvbgShow() {
            const empty = [null, undefined, '']
            if (!empty.includes(this.form.loanDate)
                && !empty.includes(this.form.dueDate)
                && !empty.includes(this.form.firstRepaymentDate)
                && !empty.includes(this.form.rateType)
                && !empty.includes(this.form.interestRepaymentMethod)) {
                this.generateLvData(this.form.rateType);
                return true;
            } return false
        },
        // 计算当form中的是否固定利率 如果选择了固定在不能创建利率的数据信息，如果选择了浮动则可以创建多条利率信息,依照disabled的方式
        isLvShow() {
            if (this.form.rateType === '固定') {
                return true
            } return false
        },
        // 计算当 form 中的开始事件结束事件，第一期开始事件，本金偿还方式，融资金额都不为空的情况下才显示本金偿还信息输入区
        isBjchShow() {
            const empty = [null, undefined, '']
            if (!empty.includes(this.form.loanDate)
                && !empty.includes(this.form.dueDate)
                && !empty.includes(this.form.firstRepaymentDate)
                && !empty.includes(this.form.financingAmount)
                && !empty.includes(this.form.principalRepaymentMethod)) {
                return true
            } return false
        },
        // 计算数据本金偿还方式 是不是 到期还本
        isPrincipalRepaymentMethod() {
            return this.form.principalRepaymentMethod === '到期还本'
        },
    },
    methods: {
        // 事件委托
        addType(e, type) {
            try {
                if (e.target.id === 'add-btn' || e.target.innerText == '新增一行') {
                    this.addRow(type)
                }
            } catch (error) { }
        },
        // 新增一行数据
        addRow(refCode, record = this.record) {
            this[refCode].push(JSON.parse(JSON.stringify(record)))
        },
        // 删除数据方法
        remove(data, refCode) {
            // 通过下标删除数组中指定的数据
            this[refCode].splice(data.rowIndex, 1)
            console.log(data, refCode);
        },
        renderInput,
        renderDate,

        // 生成lv数据
        generateLvData(lvType) {
            this.lvbg = [];
            if (lvType === '固定') {
                // 固定利率只能创建一条指定的利率数据
                const data = JSON.parse(JSON.stringify(this.lvrecord));
                data.date = this.form.firstRepaymentDate;
                data.rate = 0;
                this.addRow('lvbg', data)
            } else {
                // 浮动生成方式
                const lxStartDate = this.form.firstRepaymentDate;
                const lxEndDate = this.form.dueDate;
                const lxIntervalMonths = this.lvKeyMap[this.form.interestRepaymentMethod];
                let lixichanghuanArray = getDatesBasedOnStartDate(lxStartDate, lxEndDate, lxIntervalMonths);
                this.lixichanghuanArray = lixichanghuanArray;
                console.log(lixichanghuanArray);

                // 转换为指定的对象数组格式
                const formattedArray = lixichanghuanArray.map(date => ({
                    date: date,
                    rate: 0,
                    editing: true
                }));

                formattedArray.forEach(item => {
                    this.addRow('lvbg', item)
                })
            }
        },

        // 生成本金偿还率表格
        generateBjTable(lvType) {
            this.bjch = [];
            if (lvType === '到期还本') {
                const data = JSON.parse(JSON.stringify(this.record));
                data.date = this.form.dueDate;
                data.amount = this.form.financingAmount;
                this.addRow('bjch', data)
            } else {
                const lxStartDate = this.form.firstRepaymentDate;
                const lxEndDate = this.form.dueDate;
                const lxIntervalMonths = this.bjKeyMap[this.form.principalRepaymentMethod];
                let lixichanghuanArray = getDatesBasedOnStartDate(lxStartDate, lxEndDate, lxIntervalMonths);
                console.log(lixichanghuanArray);
                // 转换为指定的对象数组格式
                const formattedArray = lixichanghuanArray.map(date => ({
                    date: date,
                    amount: 0,
                    editing: true
                }));
                formattedArray.forEach(item => {
                    this.addRow('bjch', item)
                })
            }
        },

        // 生成需要渲染的代码数据
        handleGenerate() {
            // const datas = []
            // const bjch = addEventsToTimeline('偿还本金', this.bjch, e => e);
            // const lcch = addEventsToTimeline('利息偿还', this.lixichanghuanArray, e => ({ date: e }));
            // const zjbj = addEventsToTimeline('提取本金', this.zjbj, e => e);
            // const lvbg = addEventsToTimeline('利率变更', this.lvbg, e => e);
            // console.log(bjch, lcch, zjbj, lvbg);
            this.repaymentPlanTable = [];
            const datas = [
                ...addEventsToTimeline('偿还本金', this.bjch, e => e),
                ...addEventsToTimeline('利息偿还', this.lixichanghuanArray, e => ({ date: e })),
                ...addEventsToTimeline('提取本金', this.zjbj, e => e),
                ...addEventsToTimeline('利率变更', this.lvbg, e => e)
            ];
            console.log(datas, '1');

            this.repaymentPlanTable = generateRepaymentPlan(datas)
            console.log(this.repaymentPlanTable, '1');
        },
        getDatas() {
            return {
                bjch: this.bjch,
                zjbj: this.zjbj,
                lvbg: this.lvbg,
                lixichanghuanArray: this.lixichanghuanArray,
                repaymentPlanTable: this.repaymentPlanTable
            }
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