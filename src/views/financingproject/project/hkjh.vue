<template>
    <div class="w">
        <el-row>
            <el-form-item>
                <div class="w flex fjb" slot="label" @click.prevent.stop="addType($event, 'zjbj')">
                    <span class="required">提款信息输入区</span>
                    <el-button type="primary" size="mini" class="w100 reset-total-btn" id="add-btn">新增一行</el-button>
                </div>

                <tiny-grid align="center" ref="zjbj" :data="zjbj"
                    :edit-config="{ trigger: 'manual', mode: 'row', showStatus: true }">
                    <tiny-grid-column type="index" width="60" title="序号"></tiny-grid-column>
                    <tiny-grid-column field="date" title="日期"
                        :editor="{ component: 'input', autoselect: true }"></tiny-grid-column>
                    <tiny-grid-column field="amount" title="提款金额" :renderer="renderInput('amount')"></tiny-grid-column>
                    <tiny-grid-column width="100">
                        <template #default="data">
                            <div class="f16 tl">
                                <!-- <el-button icon="el-icon-plus" type="text" @click="$refs.insertGrid.insertAt(record, data.row)"></el-button> -->
                                <el-button icon="el-icon-minus" type="text"
                                    @click="$refs.zjbj.remove(data.row)"></el-button>
                            </div>
                        </template>
                    </tiny-grid-column>
                </tiny-grid>
            </el-form-item>
        </el-row>

        <el-row>
            <el-form-item>
                <div class="w flex fjb" slot="label" @click.prevent.stop="addType($event, 'bjch')">
                    <span class="required">本金偿还信息输入区</span>
                    <el-button type="primary" size="mini" class="reset-total-btn" id="add-btn">新增一行</el-button>
                </div>

                <tiny-grid align="center" ref="bjch" :data="bjch">
                    <tiny-grid-column type="index" width="60" title="序号"></tiny-grid-column>
                    <tiny-grid-column field="createdDate" title="日期"></tiny-grid-column>
                    <tiny-grid-column field="amount" title="偿还本金" :renderer="renderInput('amount')"></tiny-grid-column>
                    <tiny-grid-column width="100">
                        <template #default="data">
                            <div class="f16 tl">
                                <!-- <el-button icon="el-icon-plus" type="text" @click="$refs.insertGrid2.insertAt(record, data.row)"></el-button> -->
                                <el-button icon="el-icon-minus" type="text"
                                    @click="$refs.bjch.remove(data.row)"></el-button>
                            </div>
                        </template>
                    </tiny-grid-column>
                </tiny-grid>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item>
                <div class="w flex fjb" slot="label" @click.prevent.stop="addType($event, 'lvbg')">
                    <span class="required">年利率信息输入区（固定利率请勿填写）</span>
                    <el-button type="primary" size="mini" class="reset-total-btn" id="add-btn">新增一行</el-button>
                </div>

                <tiny-grid align="center" ref="lvbg" :data="lvbg">
                    <tiny-grid-column type="index" width="60" title="序号"></tiny-grid-column>
                    <tiny-grid-column field="createdDate" title="日期"></tiny-grid-column>
                    <tiny-grid-column field="rate" title="利率" :renderer="renderInput('amount')"></tiny-grid-column>
                    <tiny-grid-column width="100">
                        <template #default="data">
                            <div class="f16 tl">
                                <!-- <el-button icon="el-icon-plus" type="text" @click="$refs.insertGrid3.insertAt(record, data.row)"></el-button> -->
                                <el-button icon="el-icon-minus" type="text"
                                    @click="$refs.lvbg.remove(data.row)"></el-button>
                            </div>
                        </template>
                    </tiny-grid-column>
                </tiny-grid>
            </el-form-item>
        </el-row>
    </div>
</template>

<script>
import { Grid as TinyGrid, GridColumn as TinyGridColumn, Input } from '@opentiny/vue'
// import { iconPlus as TinyIconPlus, iconDel as TinyIconDel } from '@opentiny/vue-icon'
export default {
    name: 'hkjhPanel',
    components: {
        TinyGrid,
        TinyGridColumn,
        // TinyIconPlus,
        // TinyIconDel
    },
    props: {

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
            }
        }
    },
    watch: {
        zjbj: {
            handler(newVal, oldVal) {
                console.log(newVal);
            },
            deep: true
        }
    },
    methods: {
        // 事件委托
        addType(e, type) {
            try {
                if (e.target.id === 'add-btn' || e.target.innerText == '新增一行') {
                    this.addRow(type)
                } else {
                    // console.log(e.target, '点击了', e)
                }
            } catch (error) { }
        },
        // 新增一行数据
        addRow(refCode) {
            this[refCode].push(this.record)
            // this.$refs[refCode].insertAt(this.record, -1).then((res) => {
            //     // this[refCode] = [res, ...this.tableData];
            //     console.log(this[refCode]);
            // })
        },
        renderInput(field) {
            return (h, { row }) =>
                row.editing
                    ? h(Input, {
                        props: { modelValue: row[field] },
                        on: { 'update:modelValue': (value) => (row[field] = value) }
                    })
                    : h('span', row[field])
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