<template>
    <div class="details-content">
        <el-form ref="form" :model="form" label-width="100%" label-position="top">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="管理编号" prop="managementId">
                        <el-input :readonly="true" v-model="form.managementId" placeholder="请输入管理编号" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="借款人" prop="borrowingUnit">
                        <el-select :disabled="true" v-model="form.borrowingUnit" filterable placeholder="请选择借款人">
                            <!-- <el-option v-for="dict in dict.type.sys_1767154968256577500" :key="dict.value"
                                :label="dict.label" :value="dict.label"></el-option> -->
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="债权人" prop="financialInstitution">
                        <el-select :disabled="true" v-model="form.financialInstitution" filterable placeholder="请选择债权人">
                            <!-- <el-option v-for="dict in dict.type.sys_1757271666666242000" :key="dict.value"
                                :label="dict.label" :value="dict.label"></el-option> -->
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="融资类型" prop="financingType">
                        <el-select :disabled="true" v-model="form.financingType" filterable placeholder="请选择融资类型">
                            <!-- <el-option v-for="dict in dict.type.sys_1759508335389835300" :key="dict.value"
                                :label="dict.label" :value="dict.label"></el-option> -->
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="贷款用途" prop="daikuanyongtu">
                        <el-input :readonly="true" type="textarea" maxlength="10" show-word-limit
                            v-model="form.daikuanyongtu" placeholder="请输入贷款用途" />
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="担保措施" prop="danbaocuoshi">
                        <el-input :readonly="true" type="textarea" maxlength="30" show-word-limit
                            v-model="form.danbaocuoshi" placeholder="请输入担保措施" />
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="授信金额" prop="shouxinjine">
                        <el-input-number class="w" :controls="false" :precision="2" :disabled="true" :readonly="true"
                            type="number" v-model.trim="form.shouxinjine" placeholder="请输入授信金额" />
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="融资金额（万元）" prop="financingAmount">
                        <el-input-number class="w" :controls="false" :precision="2" :disabled="true" type="number"
                            v-model.trim="form.financingAmount" placeholder="请输入融资金额" />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="放款日" prop="loanDate">
                        <el-date-picker format='yyyy/MM/dd'  :disabled="true" clearable
                            v-model="form.loanDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择放款日" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="到期日" prop="dueDate">
                        <el-date-picker format='yyyy/MM/dd'  :disabled="true" clearable
                            v-model="form.dueDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择到期日" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="借款期限（月）" prop="loanTerm">
                        <el-input :disabled="true" :readonly="true" v-model="creditCycle" placeholder="请输入借款期限" />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">

                <el-col :span="8">
                    <el-form-item label="年利率" prop="rate">
                        <el-input :readonly="true" v-model="rate" placeholder="请输入年利率" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="已还金额（万元）" prop="repaidAmount">
                        <el-input-number class="w" :controls="false" :precision="2" :disabled="true" type="number"
                            v-model.trim="form.repaidAmount" placeholder="请输入已还金额" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="融资余额（万元）" prop="remainingAmount">
                        <el-input-number class="w" :controls="false" :precision="2" :readonly="true" :disabled="true"
                            type="number" v-model="remainingCreditAmount" placeholder="请输入融资余额" />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="保证金（万元）" prop="baozhengjin">
                        <el-input-number :disabled="true" class="w" :controls="false" :precision="2" :readonly="true"
                            v-model="form.baozhengjin" placeholder="请输入保证金" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="手续费（万元）" prop="shouxufei">
                        <el-input-number :disabled="true" class="w" :controls="false" :precision="2" :readonly="true"
                            v-model="form.shouxufei" placeholder="请输入手续费" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="债务状态" prop="loanState">
                        <el-select :disabled="true" v-model="form.loanState" filterable placeholder="请选择债务状态">
                            <!-- <el-option v-for="dict in dict.type.sys_1759509599150407700" :key="dict.value"
                                :label="dict.label" :value="dict.label"></el-option> -->
                        </el-select>
                    </el-form-item>
                </el-col>

            </el-row>

            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="还贷账户名称" prop="hdzhanghumingcheng">
                        <el-input :disabled="true" v-model="form.hdzhanghumingcheng" placeholder="请输入还贷账户名称" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="还贷账号" prop="hdzhanghao">
                        <el-input :disabled="true" v-model="form.hdzhanghao" placeholder="请输入还贷账号" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="还贷开户行" prop="hdkaihuhang">
                        <el-input :disabled="true" v-model="form.hdkaihuhang" placeholder="请输入还贷开户行" />
                    </el-form-item>
                </el-col>

            </el-row>

            <el-divider class="no_mt mb20"></el-divider>

            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="本金偿还方式" prop="principalRepaymentMethod">
                        <el-select :disabled="true" v-model="form.principalRepaymentMethod" filterable
                            placeholder="请选择本金偿还方式">
                            <!-- <el-option v-for="dict in dict.type.sys_1772148848135766000" :key="dict.value"
                                :label="dict.label" :value="dict.label"></el-option> -->
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="利息偿还方式" prop="interestRepaymentMethod">
                        <el-select :disabled="true" v-model="form.interestRepaymentMethod" filterable
                            placeholder="请选择利息偿还方式">
                            <!-- <el-option v-for="dict in dict.type.sys_1772149063001571300" :key="dict.value"
                                :label="dict.label" :value="dict.label"></el-option> -->
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否固定利率" prop="rateType">
                        <el-select :disabled="true" v-model="form.rateType" filterable placeholder="请选择是否固定利率">
                            <!-- <el-option v-for="dict in dict.type.sys_1772149405672013800" :key="dict.value"
                                :label="dict.label" :value="dict.label"></el-option> -->
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="第1期开始时间" prop="firstRepaymentDate">
                        <el-date-picker format='yyyy/MM/dd' :disabled="true" clearable  
                            v-model="form.firstRepaymentDate" type="date" value-format="yyyy-MM-dd"
                            placeholder="请选择第1期开始时间">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否有还款计划" prop="hasRepaymentPlan">
                        <el-select :disabled="true" v-model="form.hasRepaymentPlan" filterable placeholder="请选择是否有还款计划">
                            <!-- <el-option v-for="dict in dict.type.sys_1772149579718852600" :key="dict.value"
                                :label="dict.label" :value="dict.label"></el-option> -->
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item label="备注" prop="comment">
                        <el-input :readonly="true" v-model="form.comment" show-word-limit maxlength="200" type="textarea"
                            :rows="4" placeholder="请输入备注信息，最多不超过200字" />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item label="附件" prop="scrUuid">
                        <div class="p20 appendix">
                            <file-upload :disabled="true" v-model="form.scrUuid" :managementId="form.managementId"
                                 :fileSize="10000" :limit="1000" :isShowTip="false" />
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-divider></el-divider>
            <el-row v-if="this.form.hasRepaymentPlan === '有'">
                <hkjh-panel ref="hkjhPanel" :form="form" :isEditable="false"
                    :huankuanmingxi2List="EchoHuankuanmingxi2List"></hkjh-panel>
            </el-row>
        </el-form>

        <div slot="footer" class="dialog-footer" style="display: flex; justify-content: center;">
            <el-button type="primary" @click="closeDialog">关 闭</el-button>
            <!-- <el-button @click="closeDialog">取 消</el-button> -->
        </div>
    </div>
</template>

<script>
import hkjhPanel from '@/views/financingproject/project/hkjh.vue'
export default {
    props: {
        form: {
            type: Object,
            default: () => {
                return {}
            }
        },
        EchoHuankuanmingxi2List: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    components: {
        hkjhPanel
    },
    data() {
        return {
            isAutoCalculated: false
        }
    },
    computed: {
        remainingCreditAmount: {
            set(val) { },
            get() {
                // 确保值为数值类型，避免NaN
                const creditAmount = Number(this.form.financingAmount) || 0;
                const usedCreditAmount = Number(this.form.repaidAmount) || 0;
                const residue = creditAmount - usedCreditAmount;
                if (residue < 0) {
                    this.$modal.msgError("您的输入出现问题,导致融资余额为负数了");
                }
                this.form.remainingAmount = residue;
                return residue;
            }
        },
        /* 计算周期，开始时间减去结束时间 */
        creditCycle: {
            get() {
                // 如果是自动计算的，直接返回计算结果加"天"，否则返回当前值
                if (this.isAutoCalculated) {
                    return this.form.loanTerm ? `${this.form.loanTerm}月` : '';
                } else {
                    return this.form.loanTerm ? `${this.form.loanTerm}月` : '';
                }
            },
            set(value) {
                this.isAutoCalculated = false; // 用户手动输入，更改标志状态
                if (typeof value === 'string' && value.includes('月')) {
                    this.form.loanTerm = parseInt(value.replace('月', ''), 10);
                } else if (!isNaN(value)) {
                    this.form.loanTerm = parseInt(value, 10);
                }
            }
        },
        rate: {
            get() {
                if (this.form.rate) {
                    // 当读取值时，添加百分号
                    return this.form.rate + (this.form.rate ? '%' : '');
                } else {
                    return this.form.rate;
                }
            },
            set(value) {
                this.form.rate = value.replace(/%/g, '');
            }
        },
    },
    methods: {
        closeDialog() {
            this.$emit('closeDialog', false)
        }
    }
}
</script>

<style></style>