<template>
  <div class="app-container">
    <search-panel HeaderIcon="government" title="政府专项债">
      <el-form :model="queryParams" ref="queryForm" size="small" label-width="160px" label-position="left"
        v-show="showSearch">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="管理编号" prop="managementId">
              <el-input v-model="queryParams.managementId" placeholder="请输入管理编号" clearable
                @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="债券名称" prop="bondName">
              <el-input v-model="queryParams.bondName" placeholder="请输入债券名称" clearable
                @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="债券发行规模" prop="bondSize">
              <el-select filterable v-model="queryParams.bondSize" placeholder="请选择债券发行规模" clearable>
                <el-option v-for="dict in dict.type.sys_1762824645385388000" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="8">
            <el-form-item label="债券利率" prop="rate">
              <el-select filterable v-model="queryParams.rate" placeholder="请选择利率" clearable>
                <el-option v-for="dict in dict.type.sys_1762824761903153200" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item label="偿还方式" prop="repaymentMethod">
              <el-select filterable v-model="queryParams.repaymentMethod" placeholder="请选择偿还方式" clearable>
                <el-option v-for="dict in dict.type.sys_1759533864251818000" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">

          <!-- <el-col :span="8">
            <el-form-item label="债券发行期限" prop="bondDuration">
              <el-select filterable v-model="queryParams.bondDuration" placeholder="请选择债券发行期限" clearable>
                <el-option v-for="dict in dict.type.sys_1762824852571422700" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="8">
            <el-form-item label="偿还方式" prop="repaymentMethod">
              <el-select filterable v-model="queryParams.repaymentMethod" placeholder="请选择偿还方式" clearable>
                <el-option v-for="dict in dict.type.sys_1759533864251818000" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="8">
            <el-form-item label="累计到账金额（万元）" prop="accumulatedAmountReceived">
              <el-input-number class="w" :controls="false" :precision="2"
                v-model.trim="queryParams.accumulatedAmountReceived" placeholder="请输入累计到账金额" clearable
                @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item label="发行主体" prop="issuingEntity">
              <el-select filterable v-model="queryParams.issuingEntity" placeholder="请选择发行主体" clearable>
                <el-option v-for="dict in dict.type.sys_1762824996528324600" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item class="flex" style="display: flex; justify-content: flex-end;">
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">查 询</el-button>
              <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重 置</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </search-panel>



    <el-divider class="mt20 mb20"></el-divider>
    <el-row type="flex" :gutter="10" class="mb8" justify="end">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['government:bonds:add']">新 建</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['government:bonds:edit']">修改</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['government:bonds:remove']">删 除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['government:bonds:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="bondsList" @selection-change="handleSelectionChange"
      :header-cell-style="header_cell_style">
      <el-table-column show-overflow-tooltip fixed="left" type="selection" min-width="50" align="center" />
      <!-- <el-table-column label="主键id" align="center" prop="id" /> -->
      <el-table-column show-overflow-tooltip label="管理编号" align="center" prop="managementId" min-width="100" />
      <!-- <el-table-column label="数据唯一编号" align="center" prop="scrUuid" /> -->
      <el-table-column show-overflow-tooltip label="债券名称" align="center" prop="bondName" min-width="130" />
      <el-table-column show-overflow-tooltip label="规模（万元）" align="center" prop="bondSize" min-width="120">
        <template slot-scope="scope">
          <!-- <dict-tag :options="dict.type.sys_1762824645385388000" :value="scope.row.bondSize" /> -->
          {{ formatNumberAsRMB(scope.row.bondSize) }}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="利率" align="center" prop="rate" min-width="80">
        <template slot-scope="scope">
          <!-- <dict-tag :options="dict.type.sys_1762824761903153200" :value="scope.row.rate" /> -->
          <span>{{ appendUnit(scope.row.rate, '%') }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="期限（月）" align="center" prop="bondDuration" min-width="100">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1762824852571422700" :value="scope.row.bondDuration" />
          <!-- <span>{{ creditCycleFN(scope.row.loanDate, scope.row.dueDate) }}</span> -->
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="偿还方式" align="center" prop="repaymentMethod" min-width="80">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1759533864251818000" :value="scope.row.repaymentMethod" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip min-width="160" label="专项批复金额（万元）" align="center" prop="approvedAmount">
        <template slot-scope="scope">
          <span>{{ formatNumberAsRMB(scope.row.approvedAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="累计到账金额（万元）" align="center" prop="accumulatedAmountReceived"
        min-width="160">
        <template slot-scope="scope">
          <span>{{ formatNumberAsRMB(scope.row.accumulatedAmountReceived) }}</span>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip min-width="140" label="已还金额（万元）" align="center" prop="repaidAmount">
        <template slot-scope="scope">
          <span>{{ formatNumberAsRMB(scope.row.repaidAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip min-width="140" label="待还金额（万元）" align="center" prop="remainingAmount">
        <template slot-scope="scope">
          <span>{{ formatNumberAsRMB(scope.row.remainingAmount) }}</span>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip label="发行主体" align="center" prop="issuingEntity" min-width="130">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1762824996528324600" :value="scope.row.issuingEntity" />
        </template>
      </el-table-column>

      <el-table-column label="起始日" align="center" prop="loanDate" min-width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.loanDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="到期日" align="center" prop="dueDate" min-width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dueDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="备注" align="center" prop="comment" /> -->
      <!-- <el-table-column label="创建时间" align="center" prop="createTime" min-width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="uuid" align="center" prop="uuid" /> -->
      <el-table-column show-overflow-tooltip fixed="right" label="操作" align="center"
        class-name="''">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleUpdate(scope.row)" v-hasPermi="['government:bonds:edit']">查
            看</el-button>
          <!-- <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['government:bonds:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['government:bonds:remove']">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改政府专项债对话框 -->
    <el-dialog :title="title" :visible.sync="open" min-width="60%" append-to-body>
      <el-divider class="no_mt mb20"></el-divider>

      <div v-if="created_successfully == false">
        <div v-if="title === '修改政府专项债'" class="modeify-btn" style="display: flex; justify-content: end;">
          <el-button type="primary" v-if="!this.isEditable" @click="toggleEdit">编 辑</el-button>
          <el-button type="warning" v-else @click="toggleEdit">取消编辑</el-button>
          <el-button type="danger" plain @click="handleDelete(form)">删 除</el-button>
        </div>

        <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="top">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="管理编号" prop="managementId">
                <el-input :readonly="title === '修改政府专项债'" v-model="form.managementId" placeholder="请输入管理编号" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="债券名称" prop="bondName">
                <el-input :readonly="!isEditable" v-model="form.bondName" placeholder="请输入债券名称" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="规模（万元）" prop="bondSize">
                <!-- <el-select filterable :disabled="!isEditable" v-model="form.bondSize" placeholder="请选择债券发行规模">
                  <el-option v-for="dict in dict.type.sys_1762824645385388000" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select> -->
                <el-input-number :disabled="!isEditable" class="w" :controls="false" :precision="2" :readonly="!isEditable" type="number"
                  v-model.trim="form.bondSize" placeholder="请输入规模（万元）" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="债券利率" prop="rate">
                <!-- <el-select filterable :disabled="!isEditable" v-model="form.rate" placeholder="请选择利率">
                  <el-option v-for="dict in dict.type.sys_1762824761903153200" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select> -->
                <el-input :readonly="!isEditable" v-model="rate" placeholder="请输入利率" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="债券发行期限（月）" prop="bondDuration">
                <!-- <el-select filterable :disabled="!isEditable" v-model="form.bondDuration" placeholder="请选择债券发行期限">
                  <el-option v-for="dict in dict.type.sys_1762824852571422700" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select> -->
                <!-- <el-input-number class="w" :controls="false" v-model="form.bondDuration" :precision="2" placeholder="请输入债券发行期限"></el-input-number> -->
                <el-input :disabled="true" :readonly="true" v-model="creditCycle" placeholder="请输入借款期限" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="偿还方式" prop="repaymentMethod">
                <el-select filterable :disabled="!isEditable" v-model="form.repaymentMethod" placeholder="请选择偿还方式：先息后本">
                  <el-option v-for="dict in dict.type.sys_1759533864251818000" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="专项批复金额（万元）" prop="approvedAmount">
                <el-input-number :disabled="!isEditable" class="w" :controls="false" :precision="2" :readonly="!isEditable" type="number"
                  v-model.trim="form.approvedAmount" placeholder="请输入专项批复金额" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="累计到账金额（万元）" prop="accumulatedAmountReceived">
                <el-input-number :disabled="!isEditable" class="w" :controls="false" :precision="2" :readonly="!isEditable" type="number"
                  v-model.trim="form.accumulatedAmountReceived" placeholder="请输入累计到账金额" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="已还金额（万元）" prop="repaidAmount">
                <el-input-number :disabled="!isEditable" class="w" :controls="false" :precision="2" :readonly="!isEditable" type="number"
                  v-model.trim="form.repaidAmount" placeholder="请输入已还金额" />
              </el-form-item>
            </el-col>

          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="待还金额（万元）" prop="remainingAmount">
                <el-input-number :disabled="!isEditable" class="w" :controls="false" :precision="2" :readonly="!isEditable" type="number"
                  v-model.trim="remainingCreditAmount" placeholder="请输入待还金额" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="起始日" prop="loanDate">
                 <el-date-picker format='yyyy/MM/dd' clearable :disabled="!isEditable" v-model="form.loanDate" type="date" value-format="yyyy-MM-dd"
                   placeholder="请选择起始日">
                 </el-date-picker>
               </el-form-item>

            </el-col>
            <el-col :span="8">
              <el-form-item label="到期日" prop="dueDate">
                <el-date-picker format='yyyy/MM/dd' clearable :disabled="!isEditable" v-model="form.dueDate" type="date" value-format="yyyy-MM-dd"
                  placeholder="请选择到期日">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发行主体" prop="issuingEntity">
                <el-select filterable :disabled="!isEditable" v-model="form.issuingEntity" placeholder="请选择发行主体">
                  <el-option v-for="dict in dict.type.sys_1762824996528324600" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="发行主体" prop="issuingEntity">
                <el-select filterable :disabled="!isEditable" v-model="form.issuingEntity" placeholder="请选择发行主体">
                  <el-option v-for="dict in dict.type.sys_1762824996528324600" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="备注" prop="comment">
                <el-input :readonly="!isEditable" v-model="form.comment" show-word-limit maxlength="200" type="textarea"
                  :rows="4" placeholder="请输入备注信息，最多不超过200字" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="附件" prop="scrUuid">
                <div class="p20 appendix">
                  <file-upload :disabled="!isEditable" v-model="form.scrUuid" :managementId="form.managementId"
                    @input="upload_completed" :fileSize="10000" :limit="1000" :isShowTip="false" />
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>


        <div slot="footer" class="dialog-footer" style="display: flex; justify-content: center;">
          <el-button type="primary" @click="submitForm">保 存</el-button>
          <el-button @click="cancel">重 置</el-button>
        </div>
      </div>
      <div v-else class="flex">
        <CreateSuccess @close-dialog="closeDialog" @create-again="create_again" :isSuccess="isSuccess"
          :isTitle="isTitle" :isMessage="isMessage" :title="ctitle" :isEdit="isEdit" @confirm="handleaddList"
          @cancel="cancel">
        </CreateSuccess>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    listBonds,
    getBonds,
    delBonds,
    addBonds,
    updateBonds
  } from "@/api/government/bonds";

  import {
    SnowflakeIdGenerator
  } from '@/utils/index'
  import {
    listList,
    getList,
    delList,
    addList,
    updateList
  } from "@/api/rzauditlist/list";
  import {
    mapGetters
  } from 'vuex';
  import moment from 'moment'
  import CreateSuccess from '@/components/createSuccess/index.vue'
  import SearchPanel from '@/components/SearchPanel/index.vue'
  export default {
    name: "Bonds",
    dicts: ['sys_1762824996528324600', 'sys_1762824645385388000', 'sys_1762824852571422700', 'sys_1762824761903153200',
      'sys_1759533864251818000'
    ],
    components: {
      CreateSuccess,
      SearchPanel
    },
    data() {
      return {

        isSuccess: true,
        isTitle: true,
        isMessage: true,
        ctitle: '',
        isEdit: false,
        rzaudit_data: null,

        created_successfully: true,
        isEditable: false,
        header_cell_style: {
          backgroundColor: '#f2f4f5',
          color: '#000000',
          fontSize: '14px',
          fontWeight: 'bold',
        },
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        // 子表选中数据
        checkedrzsrc2: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 显示搜索条件
        showSearch: true,
        // 总条数
        total: 0,
        // 政府专项债表格数据
        bondsList: [],
        // 附件表表格数据
        rzsrc2List: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 100,
          scrUuid: null,
          bondName: null,
          bondSize: null,
          rate: null,
          bondDuration: null,
          repaymentMethod: null,
          approvedAmount: null,
          accumulatedAmountReceived: null,
          repaidAmount: null,
          remainingAmount: null,
          issuingEntity: null,
          comment: null,
          uuid: null,
          managementId: null
        },
        /* str 需要添加的 */
        scrUuid: null,
        /* end */

        // 表单参数
        form: {},
        // 表单校验
        rules: {
          scrUuid: [{
            required: false,
            message: "附件不能为空",
            trigger: "blur"
          }],
          bondName: [{
            required: true,
            message: "债券名称不能为空",
            trigger: "blur"
          }],
          bondSize: [{
            required: true,
            message: "规模不能为空",
            trigger: "change"
          }],
          rate: [{
            required: true,
            message: "利率不能为空",
            trigger: "change"
          }],
          bondDuration: [{
            required: true,
            message: "债券发行期限不能为空",
            trigger: "change"
          }],
          repaymentMethod: [{
            required: true,
            message: "偿还方式不能为空",
            trigger: "change"
          }],
          approvedAmount: [{
            required: true,
            message: "专项批复金额不能为空",
            trigger: "blur"
          }],
          accumulatedAmountReceived: [{
            required: true,
            message: "累计到账金额不能为空",
            trigger: "blur"
          }],
          repaidAmount: [{
            required: true,
            message: "已还金额不能为空",
            trigger: "blur"
          }],
          remainingAmount: [{
            required: true,
            message: "待还金额不能为空",
            trigger: "blur"
          }],
          issuingEntity: [{
            required: true,
            message: "发行主体不能为空",
            trigger: "change"
          }],
          managementId: [{
            required: true,
            message: "政府专项债管理编号不能为空",
            trigger: "blur"
          }]
        },
        isAutoCalculated: false
      };
    },
    watch: {
      open(n, o) {
        if (n == false) {
          this.created_successfully = false;
          this.isEditable = true;
        }
      },
      // 观察开始和结束日期的变化，自动重新计算天数
      'form.loanDate': function(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.calculateLoanTerm();
        }
      },
      'form.dueDate': function(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.calculateLoanTerm();
        }
      },
    },
    computed: {
      /* 计算周期，开始时间减去结束时间 */
      creditCycle: {
        get() {
          // 如果是自动计算的，直接返回计算结果加"天"，否则返回当前值
          if (this.isAutoCalculated) {
            return this.form.bondDuration ? `${this.form.bondDuration}月` : '';
          } else {
            return this.form.bondDuration ? `${this.form.bondDuration}月` : '';
          }
        },
        set(value) {
          this.isAutoCalculated = false; // 用户手动输入，更改标志状态
          if (typeof value === 'string' && value.includes('月')) {
            this.form.bondDuration = parseInt(value.replace('月', ''), 10);
          } else if (!isNaN(value)) {
            this.form.bondDuration = parseInt(value, 10);
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
      remainingCreditAmount: {
        set(val) {},
        get() {
        // 确保值为数值类型，避免NaN
        const creditAmount = Number(this.form.approvedAmount) || 0;
        const usedCreditAmount = Number(this.form.repaidAmount) || 0;

        const residue = creditAmount - usedCreditAmount;
        this.form.remainingAmount = residue;
        return residue;}
      },
      ...mapGetters([
        'name', 'avatar'
      ]),
      ...mapGetters([
        'name', 'avatar'
      ])
    },
    created() {
      this.getList();
      this.created_successfully = false;
      this.isEditable = true;
    },
    methods: {
      calculateLoanTerm() {
        if (this.form.loanDate && this.form.dueDate) {
          const start = moment(this.form.loanDate);
          const end = moment(this.form.dueDate);

          // const days = end.diff(start, 'days') + 1; // 直接计算天数，并加1表示至少一天
          let creditCycle = moment(end).diff(moment(start), 'month', true)
          // return (creditCycle).toFixed(2);

          this.form.bondDuration = (creditCycle).toFixed(2);
          this.isAutoCalculated = true; // 标记为自动计算
        }
      },
      /* 创建成功关闭弹窗 */
      closeDialog() {
        this.open = false;
        this.created_successfully = false;
      },
      /* 再次创建 */
      create_again() {
        this.reset();
        this.created_successfully = false;
      },
      toggleEdit() {
        this.isEditable = !this.isEditable;
      },
      /** 查询政府专项债列表 */
      getList() {
        this.loading = true;
        this.queryParams['orderByColumn'] = 'id'

        const search = JSON.parse(JSON.stringify(this.queryParams))
        if (![null, '', undefined].includes(search.accumulatedAmountReceived)) {
          search.accumulatedAmountReceived = Number(search.accumulatedAmountReceived) * 10000
        }


        listBonds(search).then(response => {
          this.bondsList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.created_successfully = false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.form = {
          id: null,
          scrUuid: null,
          bondName: null,
          bondSize: null,
          rate: null,
          bondDuration: null,
          repaymentMethod: null,
          approvedAmount: null,
          accumulatedAmountReceived: null,
          repaidAmount: null,
          remainingAmount: null,
          issuingEntity: null,
          comment: null,
          createTime: null,
          createBy: null,
          updateTime: null,
          updateBy: null,
          uuid: null,
          managementId: null
        };
        this.rzsrc2List = [];
        this.resetForm("form");
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.handleQuery();
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.id)
        this.single = selection.length !== 1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.created_successfully = false;
        this.isEditable = true;
        this.open = true;
        this.title = "添加政府专项债";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.isEditable = false;
        this.reset();
        const id = row.id || this.ids
        getBonds(id).then(response => {
          /* str 需要赋值粘贴到的 */
          response.data.rzsrc2List.forEach(i => {
            i.id = null;
          })

          // 金额数据 / 10000
          response.data.approvedAmount = Number(response.data.approvedAmount) / 10000;
          response.data.accumulatedAmountReceived = Number(response.data.accumulatedAmountReceived) / 10000;
          response.data.repaidAmount = Number(response.data.repaidAmount) / 10000;
          response.data.remainingAmount = Number(response.data.remainingAmount) / 10000;
          response.data.bondSize = Number(response.data.bondSize) / 10000;

          this.scrUuid = response.data.scrUuid;
          this.form = response.data;
          this.form.scrUuid = response.data.rzsrc2List.map(i => i.url)
          /* end */

          this.rzsrc2List = response.data.rzsrc2List;
          this.open = true;
          this.title = "修改政府专项债";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            const data = JSON.parse(JSON.stringify(this.form))
            this.form.rzsrc2List = this.rzsrc2List;
            this.rzaudit_data = null;

            // 金额数据 * 10000
            data.approvedAmount = data.approvedAmount * 10000;
            data.accumulatedAmountReceived = data.accumulatedAmountReceived * 10000;
            data.repaidAmount = data.repaidAmount * 10000;
            data.remainingAmount = data.remainingAmount * 10000;
            data.bondSize = data.bondSize * 10000;

            if (this.form.id != null) {
              data.scrUuid = Number(this.scrUuid);

              // 计算周期，开始时间减去结束时间
              let loanTermStr = data.bondDuration.toString();
              loanTermStr = loanTermStr.replace(/月$/, '');

              data.bondDuration = loanTermStr

              this.rzaudit_data = {
                "auditId": data.id,
                "scrUuid": data.scrUuid,
                "createBy": this.name,
                "createTime": null,
                "dataJson": JSON.stringify(data),
                "tableName": "rz_government_special_bonds",
                "auditState": "1759514891045044200",
                "uuid": data.uuid
              }
              if (this.title === '修改政府专项债' && this.created_successfully === false && this.isEditable === true) {
                this.created_successfully = true;
                this.isSuccess = false;
                this.isTitle = true;
                this.isMessage = false;
                this.ctitle = '确定修改政府专项债信息吗？';
                this.isEdit = true;
                return;
              }
            } else {
              // 生成一个 uuid
              const generator = new SnowflakeIdGenerator();
              data.scrUuid = generator.nextId();
              data.rzsrc2List = this.rzsrc2List;

              data.createBy = this.name;

              // 计算周期，开始时间减去结束时间
              let loanTermStr = data.bondDuration.toString();
              loanTermStr = loanTermStr.replace(/月$/, '');

              data.bondDuration = loanTermStr

              // start
              const uuid = String(generator.nextId())
              data.uuid = uuid;
              // end
              this.rzaudit_data = {
                "id": null,
                "auditId": null,
                "scrUuid": data.scrUuid,
                "createBy": this.name,
                "createTime": null,
                "dataJson": JSON.stringify(data),
                "tableName": "rz_government_special_bonds",
                "auditState": "1759514891045044200",
                "uuid": uuid,
                "managementId": data.managementId
              }
            }
            // addList(rzaudit_data).then(res => {
            //   this.created_successfully = true;
            // })
            this.handleaddList();
          }
        });
      },
      async handleaddList() {

        // 检验上一个数据步骤有没有审批通过
        await this.inspectionPendingReview(this.rzaudit_data)

        addList(this.rzaudit_data).then(res => {
          this.created_successfully = true;
          if (this.title === '修改政府专项债' && this.isEditable) {
            this.isSuccess = true;
            this.isTitle = true;
            this.isMessage = true;
            this.ctitle = this.isEdit ? '修改提交成功' : '提交成功';
            this.isEdit = false;
          } else {
            this.ctitle = '提交成功';
            this.isMessage = true;
            this.isEdit = false;
          }
        })
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const ids = row.id || this.ids;
        // this.$modal.confirm('是否确认删除政府专项债编号为"' + ids + '"的数据项？').then(function () {
        //   return delBonds(ids);
        // }).then(() => {
        //   this.cancel();
        //   this.getList();
        //   this.$modal.msgSuccess("删除成功");
        // }).catch(() => { });


        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('div', null, [
            h('el-divider', {
              class: {
                "no_mt": true,
                "mb20": true
              },
              attrs: {
                "data-role": 'el-divider'
              }
            }, ''),
            h('p', {
              class: 'tc w mb20',
              style: {
                'font-size': '24px',
                'color': '#000000',
                'font-weight': 'bold'
              }
            }, '确定删除选中的政府专项债吗？'),
          ]),
          showCancelButton: true,
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          cancelButtonClass: "btn-custom-cancel",
          customClass: 'custom-msgbox',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              delBonds(ids).then(res => {
                done();
              });
            } else {
              done();
            }
          }
        }).then(action => {
          this.cancel();
          this.getList();
          this.$modal.msgSuccess("删除成功");
        });
      },
      /** 附件表序号 */
      rowrzsrc2Index({
        row,
        rowIndex
      }) {
        row.index = rowIndex + 1;
      },
      /** 附件表添加按钮操作 */
      handleAddrzsrc2() {
        let obj = {};
        obj.url = "";
        obj.projectManagementId = "";
        obj.type = "rz_government_special_bonds";
        this.rzsrc2List.push(obj);
      },
      /** 附件表删除按钮操作 */
      handleDeleterzsrc2() {
        if (this.checkedrzsrc2.length == 0) {
          this.$modal.msgError("请先选择要删除的附件表数据");
        } else {
          const rzsrc2List = this.rzsrc2List;
          const checkedrzsrc2 = this.checkedrzsrc2;
          this.rzsrc2List = rzsrc2List.filter(function(item) {
            return checkedrzsrc2.indexOf(item.index) == -1
          });
        }
      },
      /** 复选框选中数据 */
      handlerzsrc2SelectionChange(selection) {
        this.checkedrzsrc2 = selection.map(item => item.index)
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('government/bonds/export', {
          ...this.queryParams
        }, `bonds_${new Date().getTime()}.xlsx`)
      },
      /* 上传完成的回调 */
      upload_completed(url_string) {
        const url_list = url_string.split(',')
        url_list.forEach(url_i => {
          let obj = {
            url: url_i,
            projectManagementId: this.form.managementId,
            type: "rz_government_special_bonds",
            createBy: this.name,
            createTime: moment().format("YYYY-MM-DD HH:mm:ss"),
          };

          // 检查this.rzsrc2List中是否已经存在具有相同url的对象
          if (!this.rzsrc2List.some(item => item.url === obj.url)) {
            this.rzsrc2List.push(obj);
          }
        });

      }
    }
  };
</script>
