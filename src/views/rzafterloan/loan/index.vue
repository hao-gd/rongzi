<template>
  <div class="app-container">
    <search-panel HeaderIcon="Post-loan" title="贷后管理">
      <el-form :model="queryParams" label-position="left" ref="queryForm" size="small" :inline="false" v-show="showSearch"
        label-width="100px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="管理编号" prop="managementId">
              <el-input v-model="queryParams.managementId" placeholder="请输入管理编号" clearable
                @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="金融机构" prop="financialInstitution">
              <el-select filterable v-model="queryParams.financialInstitution" placeholder="请选择金融机构" clearable>
                <el-option v-for="dict in dict.type.sys_acceptor" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="借款单位" prop="borrowingUnit">
              <el-select filterable v-model="queryParams.borrowingUnit" placeholder="请选择借款单位" clearable>
                <el-option v-for="dict in dict.type.sys_1759464239669444600" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="借款期限" prop="loanTerm">
              <el-input v-model="queryParams.loanTerm" placeholder="请输入借款期限" clearable
                @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="贷后状态跟踪" prop="afterLoanState">
              <el-select filterable v-model="queryParams.afterLoanState" placeholder="请选择贷后状态跟踪" clearable>
                <el-option v-for="dict in dict.type.sys_1759464706814247000" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <!-- Placeholder for alignment, no form item here -->
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item class="flex" style="display: flex; justify-content: flex-end;">
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">查 看</el-button>
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
          v-hasPermi="['rzafterloan:loan:add']">新 建</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['rzafterloan:loan:edit']">修改</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['rzafterloan:loan:remove']">删 除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['rzafterloan:loan:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="loanList" @selection-change="handleSelectionChange"
      :header-cell-style="header_cell_style">
      <el-table-column show-overflow-tooltip fixed="left" type="selection" width="55" align="center" />
      <!-- <el-table-column label="主键id" align="center" prop="id" /> -->
      <el-table-column show-overflow-tooltip label="管理编号" align="center" prop="managementId" />
      <!-- <el-table-column label="数据唯一编号" align="center" prop="scrUuid" /> -->
      <el-table-column show-overflow-tooltip label="金融机构" align="center" prop="financialInstitution" min-width="180">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_acceptor" :value="scope.row.financialInstitution" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="借款金额（万元）" align="center" prop="loanAmount" min-width="180">
        <template slot-scope="scope">
          <span>{{ formatNumberAsRMB(scope.row.loanAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="借款单位" align="center" prop="borrowingUnit" min-width="180">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1759464239669444600" :value="scope.row.borrowingUnit" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="量化内容" align="center" prop="quantitativeContent" min-width="120" />
      <el-table-column show-overflow-tooltip label="量化目标" align="center" prop="quantitativeGoals" min-width="120" />
      <el-table-column show-overflow-tooltip label="当前实现" align="center" prop="currentImplementation" min-width="120" />
      <el-table-column show-overflow-tooltip label="剩余实现" align="center" prop="remainingQuantity" min-width="120" />
      <el-table-column show-overflow-tooltip label="借款期限" align="center" prop="loanTerm">
        <template slot-scope="scope">
          <span>{{ appendUnit(scope.row.loanTerm, '天') }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="贷后状态跟踪" align="center" prop="afterLoanState" min-width="180">
        <template slot-scope="scope">
          <!-- <dict-tag :options="dict.type.sys_1759464706814247000" :value="scope.row.afterLoanState" /> -->
          <svg-icon :icon-class="scope.row.afterLoanState"></svg-icon> <dict-tag style="display: inline-block;"
            :options="dict.type.sys_1759464706814247000" :value="scope.row.afterLoanState" />
        </template>
      </el-table-column>

      <!-- <el-table-column label="进度说明" align="center" prop="progressDescription" /> -->
      <el-table-column show-overflow-tooltip label="备注" align="center" prop="comment" />
      <!-- <el-table-column label="uuid" align="center" prop="uuid" /> -->
      <el-table-column show-overflow-tooltip label="操作" fixed="right" align="center"
        class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleUpdate(scope.row)" v-hasPermi="['rzafterloan:loan:edit']">查
            看</el-button>
          <!-- <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['rzafterloan:loan:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['rzafterloan:loan:remove']">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改贷后管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="60%" append-to-body>

      <el-divider class="no_mt mb20"></el-divider>

      <div v-if="created_successfully == false">
        <div v-if="title === '修改贷后管理'" class="modeify-btn" style="display: flex; justify-content: end;">
          <el-button type="primary" @click="toggleEdit">编 辑</el-button>
          <el-button @click="handleDelete(form)">删 除</el-button>
        </div>

        <el-form ref="form" label-position="top" :model="form" :rules="rules" label-width="80px">
          <!-- 第一行 -->
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="管理编号" prop="managementId">
                <el-input :readonly="!isEditable" v-model="form.managementId" placeholder="请输入管理编号" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="金融机构" prop="financialInstitution">
                <el-select filterable :disabled="!isEditable" v-model="form.financialInstitution" placeholder="请选择金融机构">
                  <el-option v-for="dict in dict.type.sys_acceptor" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="借款金额（万元）" prop="loanAmount">
                <el-input :readonly="!isEditable" @keydown.native="amountLimitMethod" type="number" v-model.number.trim="form.loanAmount" placeholder="请输入借款金额" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 第二行 -->
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="借款单位" prop="borrowingUnit">
                <el-select filterable :disabled="!isEditable" v-model="form.borrowingUnit" placeholder="请选择借款单位">
                  <el-option v-for="dict in dict.type.sys_1759464239669444600" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="起始日" prop="startDate">
                <el-date-picker :disabled="!isEditable" clearable v-model="form.startDate" type="date"
                  value-format="yyyy-MM-dd" placeholder="请选择起始日"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="到期日" prop="deadline">
                <el-date-picker :disabled="!isEditable" clearable v-model="form.deadline" type="date"
                  value-format="yyyy-MM-dd" placeholder="请选择到期日"></el-date-picker>
              </el-form-item>
            </el-col>

          </el-row>
          <!-- 第三行 -->
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="借款期限（月）" prop="loanTerm">
                <el-input :readonly="!isEditable" v-model="creditCycle" placeholder="请输入借款期限" />
                <!-- <el-input :readonly="!isEditable" placeholder="请输入借款期限" v-model.number.trim="form.loanTerm" type="number"
                  class="input-with-select">
                  <el-select filterable class="w150" :disabled="!isEditable" v-model="termType" slot="prepend" placeholder="选择期限类型">
                    <el-option label="年" value="年"></el-option>
                    <el-option label="月" value="月"></el-option>
                  </el-select>
                </el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="贷后状态跟踪" prop="afterLoanState">
                <el-select filterable :disabled="!isEditable" v-model="form.afterLoanState" placeholder="请选择贷后状态跟踪">
                  <el-option v-for="dict in dict.type.sys_1759464706814247000" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="量化内容" prop="quantitativeContent">
                <el-input :readonly="!isEditable" v-model.trim="form.quantitativeContent" placeholder="请输入量化内容" />
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="量化目标（数量）" prop="quantitativeGoals">
                <el-input :readonly="!isEditable" type="number" v-model.number.trim="form.quantitativeGoals"
                  placeholder="请输入量化目标" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="当前实现（数量）" prop="currentImplementation">
                <el-input :readonly="!isEditable" type="number" v-model.number.trim="form.currentImplementation"
                  placeholder="请输入当前实现" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="剩余数量（数量）" prop="remainingQuantity">
                <el-input :readonly="true" :disabled="true" :value="remainingQuantity" placeholder="请输入剩余数量" />
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8"></el-col> -->
          </el-row>
          <!-- 备注 -->
          <el-form-item label="进度说明" prop="progressDescription">
            <el-input :readonly="!isEditable" v-model="form.progressDescription" type="textarea" placeholder="请输入内容" />
          </el-form-item>
          <!-- 附件 -->
          <el-form-item label="备注" prop="comment">
            <el-input :readonly="!isEditable" v-model="form.comment" show-word-limit maxlength="200" type="textarea"
              :rows="4" placeholder="请输入备注信息，最多不超过200字" />
          </el-form-item>
          <el-form-item label="附件" prop="scrUuid">
            <div class="p20 appendix">
              <file-upload :disabled="!isEditable" v-model="form.scrUuid" :managementId="form.managementId"
                @input="upload_completed" :fileSize="10000" :limit="1000" :isShowTip="false" />
            </div>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer" style="display: flex; justify-content: center;">
          <el-button type="primary" @click="submitForm">保 存</el-button>
          <el-button @click="cancel">重 置</el-button>
        </div>
      </div>


      <div v-else class="flex">
        <CreateSuccess @close-dialog="closeDialog" @create-again="create_again" :isSuccess="isSuccess" :isTitle="isTitle"
          :isMessage="isMessage" :title="ctitle" :isEdit="isEdit" @confirm="handleaddList" @cancel="cancel">
        </CreateSuccess>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import { listLoan, getLoan, delLoan, addLoan, updateLoan } from "@/api/rzafterloan/loan";

import { SnowflakeIdGenerator } from '@/utils/index'
import { listList, getList, delList, addList, updateList } from "@/api/rzauditlist/list";
import { mapGetters } from 'vuex';
import moment from 'moment'
import CreateSuccess from '@/components/createSuccess/index.vue'
import SearchPanel from '@/components/SearchPanel/index.vue'
export default {
  name: "Loan",
  dicts: ['sys_1759464239669444600', 'sys_acceptor', 'sys_1759464706814247000'],
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

      termType: '年',
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
      // 贷后管理表格数据
      loanList: [],
      // 附件表表格数据
      rzsrc2List: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        managementId: null,
        scrUuid: null,
        financialInstitution: null,
        loanAmount: null,
        borrowingUnit: null,
        loanTerm: null,
        afterLoanState: null,
        quantitativeContent: null,
        quantitativeGoals: null,
        currentImplementation: null,
        remainingQuantity: null,
        progressDescription: null,
        comment: null,
        uuid: null,
        startDate: null,
        deadline: null,
        creditCycle: null
      },
      /* str 需要添加的 */
      scrUuid: null,
      /* end */
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        managementId: [
          { required: true, message: "贷后项目管理编号不能为空", trigger: "blur" }
        ],
        scrUuid: [
          { required: true, message: "数据唯一编号不能为空", trigger: "blur" }
        ],
        financialInstitution: [
          { required: true, message: "金融机构不能为空", trigger: "change" }
        ],
        loanAmount: [
          { required: true, message: "借款金额不能为空", trigger: "blur" }
        ],
        borrowingUnit: [
          { required: true, message: "借款单位不能为空", trigger: "change" }
        ],
        loanTerm: [
          { required: true, message: "借款期限不能为空", trigger: "blur" }
        ],
        afterLoanState: [
          { required: true, message: "贷后状态跟踪不能为空", trigger: "change" }
        ],
        quantitativeContent: [
          { required: true, message: "量化内容不能为空", trigger: "blur" }
        ],
        quantitativeGoals: [
          { required: true, message: "量化目标不能为空", trigger: "blur" }
        ],
        currentImplementation: [
          { required: true, message: "当前实现不能为空", trigger: "blur" }
        ],
        remainingQuantity: [
          { required: true, message: "剩余数量不能为空", trigger: "blur" }
        ],
        progressDescription: [
          { required: true, message: "进度说明不能为空", trigger: "blur" }
        ],
        startDate: [
          { required: true, message: "起始日不能为空", trigger: "blur" }
        ],
        deadline: [
          { required: true, message: "到期日不能为空", trigger: "blur" }
        ],
        creditCycle: [
          { required: true, message: "授信有效期不能为空", trigger: "blur" }
        ],
      },
      isAutoCalculated: false, // 是否自动计算的标志
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
    'form.startDate': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.calculateLoanTerm();
      }
    },
    'form.deadline': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.calculateLoanTerm();
      }
    }
  },
  computed: {
    ...mapGetters([
      'name', 'avatar'
    ]),
    remainingQuantity() {
      // 确保值为数值类型，避免NaN
      const quantitativeGoals = Number(this.form.quantitativeGoals) || 0;
      const currentImplementation = Number(this.form.currentImplementation) || 0;

      const residue = quantitativeGoals - currentImplementation;
      this.form.remainingQuantity = residue;
      return residue;
    },
    /* 计算周期，开始时间减去结束时间 */
    creditCycle: {
      get() {
        // 如果是自动计算的，直接返回计算结果加"天"，否则返回当前值
        if (this.isAutoCalculated) {
          return this.form.loanTerm ? `${this.form.loanTerm}天` : '';
        } else {
          return this.form.loanTerm ? `${this.form.loanTerm}天` : '';
        }
      },
      set(value) {
        this.isAutoCalculated = false; // 用户手动输入，更改标志状态
        if (typeof value === 'string' && value.includes('天')) {
          this.form.loanTerm = parseInt(value.replace('天', ''), 10);
        } else if (!isNaN(value)) {
          this.form.loanTerm = parseInt(value, 10);
        }
      }
    }
  },
  created() {
    this.getList();

    this.created_successfully = false;
    this.isEditable = true;
  },
  methods: {
    calculateLoanTerm() {
      if (this.form.startDate && this.form.deadline) {
        const start = moment(this.form.startDate);
        const end = moment(this.form.deadline);

        const days = end.diff(start, 'days') + 1; // 直接计算天数，并加1表示至少一天

        this.form.loanTerm = days;
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
    /** 查询贷后管理列表 */
    getList() {
      this.loading = true;
      this.queryParams['orderByColumn'] = 'id'
      listLoan(this.queryParams).then(response => {
        this.loanList = response.rows;
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
        managementId: null,
        scrUuid: null,
        financialInstitution: null,
        loanAmount: null,
        borrowingUnit: null,
        loanTerm: null,
        afterLoanState: null,
        quantitativeContent: null,
        quantitativeGoals: null,
        currentImplementation: null,
        remainingQuantity: null,
        progressDescription: null,
        comment: null,
        createTime: null,
        createBy: null,
        updateTime: null,
        updateBy: null,
        uuid: null,
        startDate: null,
        deadline: null,
        creditCycle: null
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
      this.title = "添加贷后管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.isEditable = false;
      this.reset();
      const id = row.id || this.ids
      getLoan(id).then(response => {
        /* str 需要赋值粘贴到的 */
        response.data.rzsrc2List.forEach(i => {
          i.id = null;
        })
        this.scrUuid = response.data.scrUuid;
        this.form = response.data;
        this.form.scrUuid = response.data.rzsrc2List.map(i => i.url)
        /* end */
        this.rzsrc2List = response.data.rzsrc2List;
        this.open = true;
        this.title = "修改贷后管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.form))
          this.form.rzsrc2List = this.rzsrc2List;
          this.rzaudit_data = null;
          
          // 金额需要 * 10000
          data.loanAmount = Number(data.loanAmount) * 10000;
          if (this.form.id != null) {
            data.scrUuid = Number(this.scrUuid);
            // 计算周期，开始时间减去结束时间
            // let creditCycle = moment(data.deadline).diff(moment(data.startDate), 'days');
            // data.loanTerm = creditCycle === 0 ? 1 : creditCycle;
            let loanTermStr = data.loanTerm.toString();
            loanTermStr = loanTermStr.replace(/天$/, '');

            data.loanTerm = loanTermStr
            data.loanTerm = data.loanTerm.replace(/天$/, '');
            this.rzaudit_data = {
              "auditId": data.id,
              "scrUuid": data.scrUuid,
              "createBy": this.name,
              "createTime": null,
              "dataJson": JSON.stringify(data),
              "tableName": "rz_after_loan",
              "auditState": "1759514891045044200",
              "uuid": data.uuid
            }
            if (this.title === '修改贷后管理' && this.created_successfully === false && this.isEditable === true) {
              this.created_successfully = true;
              this.isSuccess = false;
              this.isTitle = true;
              this.isMessage = false;
              this.ctitle = '确定修改贷后管理信息吗？';
              this.isEdit = true;
              return;
            }
          } else {
            // 生成一个 uuid
            const generator = new SnowflakeIdGenerator();

            const uuid = String(generator.nextId())
            data.scrUuid = generator.nextId();
            data.rzsrc2List = this.rzsrc2List;
            // data.loanTerm = data.loanTerm + this.termType;
            data.createBy = this.name;
            data.uuid = uuid;

            // 计算周期，开始时间减去结束时间
            // let creditCycle = moment(data.deadline).diff(moment(data.startDate), 'days');
            // data.loanTerm = creditCycle === 0 ? 1 : creditCycle;
            let loanTermStr = data.loanTerm.toString();
            loanTermStr = loanTermStr.replace(/天$/, '');

            data.loanTerm = loanTermStr
            this.rzaudit_data = {
              "id": null,
              "auditId": null,
              "scrUuid": data.scrUuid,
              "createBy": this.name,
              "createTime": null,
              "dataJson": JSON.stringify(data),
              "tableName": "rz_after_loan",
              "auditState": "1759514891045044200",
              "uuid": uuid
            }
          }
          this.handleaddList();
        }
      });
    },
    handleaddList() {
      addList(this.rzaudit_data).then(res => {
        this.created_successfully = true;
        if (this.title === '修改贷后管理' && this.isEditable) {
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
      // this.$modal.confirm('是否确认删除贷后管理编号为"' + ids + '"的数据项？').then(function () {
      //   return delLoan(ids);
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
            attrs: { "data-role": 'el-divider' }
          }, ''),
          h('p', {
            class: 'tc w mb20',
            style: {
              'font-size': '24px',
              'color': '#000000',
              'font-weight': 'bold'
            }
          }, '确定删除选中的贷后管理吗？'),
        ]),
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        cancelButtonClass: "btn-custom-cancel",
        customClass: 'custom-msgbox',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            delLoan(ids).then(res => {
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
    rowrzsrc2Index({ row, rowIndex }) {
      row.index = rowIndex + 1;
    },
    /** 附件表添加按钮操作 */
    handleAddrzsrc2() {
      let obj = {};
      obj.url = "";
      obj.projectManagementId = "";
      obj.type = "rz_after_loan";
      this.rzsrc2List.push(obj);
    },
    /** 附件表删除按钮操作 */
    handleDeleterzsrc2() {
      if (this.checkedrzsrc2.length == 0) {
        this.$modal.msgError("请先选择要删除的附件表数据");
      } else {
        const rzsrc2List = this.rzsrc2List;
        const checkedrzsrc2 = this.checkedrzsrc2;
        this.rzsrc2List = rzsrc2List.filter(function (item) {
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
      this.download('rzafterloan/loan/export', {
        ...this.queryParams
      }, `loan_${new Date().getTime()}.xlsx`)
    },
    /* 上传完成的回调 */
    upload_completed(url_string) {
      console.log(url_string);
      const url_list = url_string.split(',')
      url_list.forEach(url_i => {
        let obj = {
          url: url_i,
          projectManagementId: this.form.managementId,
          type: "rz_after_loan",
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
