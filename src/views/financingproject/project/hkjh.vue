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
            <el-form-item>
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
    </div>
</template>

<script>
import { Grid as TinyGrid, GridColumn as TinyGridColumn, Input, DatePicker as TinyDatePicker } from '@opentiny/vue'
// import { iconPlus as TinyIconPlus, iconDel as TinyIconDel } from '@opentiny/vue-icon'
import { getDatesBasedOnStartDate } from './hkjh'
import {renderInput, renderDate} from './form'
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
            bjch: [],
            zjbj: [],
            lvbg: [],
            tableData: [],
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
            }
        }
    },
    watch: {
        // zjbj: {
        //     handler(newVal, oldVal) {
        //         console.log(newVal);
        //     },
        //     deep: true
        // },
        // form: {
        //     handler(newVal, oldVal) {
        //         console.log(newVal);
        //     },
        //     deep: true
        // },
        isZjbjShow(n, o) {
            // 如果这个值为true的需要调用一个方法
            if (n) {
                const data = JSON.parse(JSON.stringify(this.record));
                data.date = this.form.loanDate;
                data.amount = this.form.financingAmount
                this.addRow('zjbj', data)
            }
        },
        isLvShow(n, o) {
            // 如果值是 false的话代表是浮动利率，可以创建多个利率信息
            if (n) {
                // 清空之前的数据
                this.lvbg = []
            }
            if (n && this.isLvShow) {
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
                console.log(lixichanghuanArray);

                // 转换为指定的对象数组格式
                const formattedArray = dates.map(date => ({
                    date: date,
                    rate: 0,
                    editing: true
                }));
            }
        }
    },
    computed: {
        // 计算当form中的开始时间和结束时间加上金额都不为空的情况下显示提款信息输入区
        isZjbjShow() {
            const empty = [null, undefined, '']
            if (!empty.includes(this.form.loanDate) && !empty.includes(this.form.dueDate) && !empty.includes(this.form.financingAmount)) {
                return true
            } return false
        },
        // 计算form中开始时间结束时间，第一期开始时间，利息偿还方式 在都不为空的情况下显示年利率信息输入区
        isLvbgShow() {
            const empty = [null, undefined, '']
            if (!empty.includes(this.form.loanDate) && !empty.includes(this.form.dueDate) && !empty.includes(this.form.firstRepaymentDate) && !empty.includes(this.form.interestRepaymentMethod)) {
                return true
            } return false
        },
        // 计算当form中的是否固定利率 如果选择了固定在不能创建利率的数据信息，如果选择了浮动则可以创建多条利率信息,依照disabled的方式
        isLvShow() {
            if (this.form.rateType === '固定') {
                return true
            } return false
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
        renderDate
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