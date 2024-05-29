<template>
  <div class="app-container">
    <!-- <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="反向保理管理编号" prop="managementId">
        <el-input v-model="queryParams.managementId" placeholder="请输入反向保理管理编号" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="审核id" prop="auditId">
        <el-input v-model="queryParams.auditId" placeholder="请输入审核id" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="债权人" prop="creditor">
        <el-select filterable v-model="queryParams.creditor" placeholder="请选择债权人" clearable>
          <el-option v-for="dict in dict.type.sys_1757271666666242000" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="保理商" prop="factor">
        <el-select filterable v-model="queryParams.factor" placeholder="请选择保理商" clearable>
          <el-option v-for="dict in dict.type.sys_1757288852172570600" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="金融机构" prop="financialInstitution">
        <el-select filterable v-model="queryParams.financialInstitution" placeholder="请选择金融机构" clearable>
          <el-option v-for="dict in dict.type.sys_acceptor" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="放贷金额" prop="loanAmount">
        <el-input v-model="queryParams.loanAmount" placeholder="请输入放贷金额" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="开始日期" prop="startDate">
        <el-date-picker clearable v-model="queryParams.startDate" type="date" value-format="yyyy-MM-dd"
          placeholder="请选择开始日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束日期" prop="deadline">
        <el-date-picker clearable v-model="queryParams.deadline" type="date" value-format="yyyy-MM-dd"
          placeholder="请选择结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="项目名称" prop="entryName">
        <el-input v-model="queryParams.entryName" placeholder="请输入项目名称" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="到期提醒" prop="remark">
        <el-select filterable v-model="queryParams.remark" placeholder="请选择到期提醒" clearable>
          <el-option v-for="dict in dict.type.sys_maturity" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="回款账户" prop="collectionAccount">
        <el-input v-model="queryParams.collectionAccount" placeholder="请输入回款账户" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form> -->
    <search-panel HeaderIcon="reverse" title="反向保理">
      <el-form label-position="left" :model="queryParams" ref="queryForm" size="small" :inline="false" v-show="showSearch"
        label-width="100px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="管理编号" prop="managementId">
              <el-input v-model="queryParams.managementId" placeholder="请输入反向保理管理编号" clearable
                @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="债权人名称" prop="creditor">
              <el-select filterable v-model="queryParams.creditor" placeholder="请选择债权人（供应商）名称" clearable>
                <el-option v-for="dict in dict.type.sys_1757271666666242000" :key="dict.value" :label="dict.label"
                  :value="dict.label" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="保理商" prop="factor">
              <el-select filterable v-model="queryParams.factor" placeholder="请选择保理商" clearable>
                <el-option v-for="dict in dict.type.sys_1757288852172570600" :key="dict.value" :label="dict.label"
                  :value="dict.label" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="金融机构" prop="financialInstitution">
              <el-select filterable v-model="queryParams.financialInstitution" placeholder="请选择金融机构" clearable>
                <el-option v-for="dict in dict.type.sys_acceptor" :key="dict.value" :label="dict.label"
                  :value="dict.label" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="起止日期" :error="error1">
              <!-- <el-date-picker clearable v-model="queryParams.startDate" type="date" value-format="yyyy-MM-dd"
              placeholder="请选择开始日期"></el-date-picker> -->
                <el-row>
                  <el-col :span="11">
                    <el-date-picker :picker-options="pickerOptions3" format='yyyy/MM/dd' clearable v-model="daterangeStartDate1" value-format="yyyy-MM-dd" type="date" placeholder="请选择起始日"></el-date-picker>
                  </el-col>
                  <el-col :span="2" class="flex fjc">-</el-col>
                  <el-col :span="11">
                    <el-date-picker :picker-options="pickerOptions4" format='yyyy/MM/dd' clearable v-model="daterangeDeadline2" value-format="yyyy-MM-dd" type="date" placeholder="请选择到期日"></el-date-picker>
                  </el-col>
                </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目名称" prop="entryName">
              <el-input v-model="queryParams.entryName" placeholder="请输入项目名称" clearable
                @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
         
          <el-col :span="8">
            <el-form-item label="回款账户" prop="collectionAccount">
              <el-input v-model="queryParams.collectionAccount" placeholder="请输入回款账户" clearable
                @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item class="flex" style="display: flex; justify-content: flex-end;">
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
              <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </search-panel>


    <el-divider class="mt20 mb20"></el-divider>
    <el-row type="flex" :gutter="10" class="mb8" justify="end">
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['reverse:factoring:export']">导 出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['reverse:factoring:add']">新 建</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['reverse:factoring:edit']">修改</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['reverse:factoring:remove']">删 除</el-button>
      </el-col>
      <!-- 
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table :summary-method="(param) => getSummaries(param, totalKeys)" show-summary v-loading="loading" :data="factoringList" @selection-change="handleSelectionChange"
      :header-cell-style="header_cell_style">
      <el-table-column show-overflow-tooltip fixed="left" type="selection" min-width="60" width="60" align="center" />
      <el-table-column show-overflow-tooltip label="管理编号" align="center" prop="managementId" min-width="100" />
      <!-- <el-table-column label="数据唯一编号" align="center" prop="scrUuid" />
      <el-table-column label="审核id" align="center" prop="auditId" /> -->
      <el-table-column show-overflow-tooltip label="债权人（供应商）名称" align="center" prop="creditor" min-width="160">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1757271666666242000" :value="scope.row.creditor" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="保理商名称" align="center" prop="factor" min-width="130">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1757288852172570600" :value="scope.row.factor" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="金融机构" align="center" prop="financialInstitution" min-width="130">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_acceptor" :value="scope.row.financialInstitution" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="放贷金额（万元）" align="center" prop="loanAmount" min-width="160">
        <template slot-scope="scope">
          <span>{{ formatNumberAsRMB(scope.row.loanAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="开始日期" align="center" prop="startDate" min-width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="结束日期" align="center" prop="deadline" min-width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.deadline, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="项目名称" align="center" prop="entryName" min-width="120" />
      <el-table-column show-overflow-tooltip label="到期提醒" align="center" prop="remark" min-width="100">
        <template slot-scope="scope">
          <el-tag effect="plain" :hit="true" :class="checkDueReminderWithConfig(scope.row.deadline).color">
            {{ checkDueReminderWithConfig(scope.row.deadline).message }}
          </el-tag>
          <!-- <dict-tag :options="dict.type.sys_maturity" :value="scope.row.remark" /> -->
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="回款账户" align="center" prop="collectionAccount" min-width="180" />
      <el-table-column show-overflow-tooltip label="备注" align="center" prop="comment" min-width="200" />
      <!-- <el-table-column label="ID" align="center" prop="id" /> -->
      <el-table-column fixed="right" label="操作" align="center" class-name="''">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleUpdate(scope.row)" v-hasPermi="['reverse:factoring:edit']">查
            看</el-button>
          <!-- <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['reverse:factoring:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['reverse:factoring:remove']">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改反向保理对话框 -->
    <el-dialog :title="title" :visible.sync="open" min-width="60%" append-to-body>
      <el-divider class="no_mt mb20"></el-divider>

      <div v-if="created_successfully == false">
        <div v-if="title === '修改反向保理'" class="modeify-btn" style="display: flex; justify-content: end;">
          <el-button type="primary" v-if="!this.isEditable" @click="toggleEdit">编 辑</el-button>
          <el-button type="warning" v-else @click="toggleEdit">取消编辑</el-button>
          <el-button type="danger" plain @click="handleDelete(form)">删 除</el-button>
        </div>
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="top">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="管理编号" prop="managementId">
                <el-input :readonly="title === '修改反向保理'" v-model="form.managementId" placeholder="请输入反向保理管理编号" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="债权人（供应商）名称" prop="creditor">
                <el-select filterable :disabled="!isEditable" v-model="form.creditor" placeholder="请选择债权人">
                  <el-option v-for="dict in dict.type.sys_1757271666666242000" :key="dict.value" :label="dict.label"
                    :value="dict.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="保理商名称" prop="factor">
                <el-select filterable :disabled="!isEditable" v-model="form.factor" placeholder="请选择保理商">
                  <el-option v-for="dict in dict.type.sys_1757288852172570600" :key="dict.value" :label="dict.label"
                    :value="dict.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="金融机构" prop="financialInstitution">
                <el-select filterable :disabled="!isEditable" v-model="form.financialInstitution" placeholder="请选择金融机构">
                  <el-option v-for="dict in dict.type.sys_acceptor" :key="dict.value" :label="dict.label"
                    :value="dict.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="放贷金额（万元）" prop="loanAmount">
                <el-input-number :disabled="!isEditable" class="w" :controls="false" :precision="2" :readonly="!isEditable" type="number"
                  v-model.trim="form.loanAmount" placeholder="请输入放贷金额" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目名称" prop="entryName">
                <el-input :readonly="!isEditable" v-model="form.entryName" placeholder="请输入项目名称" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="开始日期" prop="startDate">
                <el-date-picker format='yyyy/MM/dd' :picker-options="pickerOptions1" :disabled="!isEditable" clearable
                  v-model="form.startDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择开始日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结束日期" prop="deadline">
                <el-date-picker format='yyyy/MM/dd' :picker-options="pickerOptions2" :disabled="!isEditable" clearable v-model="form.deadline"
                  type="date" value-format="yyyy-MM-dd" placeholder="请选择结束日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="回款账户" prop="collectionAccount">
                <el-input :readonly="!isEditable" v-model="form.collectionAccount" placeholder="请输入回款账户" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 备注占一行 -->
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="备注" prop="comment">
                <el-input :readonly="!isEditable" v-model="form.comment" show-word-limit maxlength="200" type="textarea"
                  :rows="4" placeholder="请输入备注信息，最多不超过200字" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 附件占一行 -->
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
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
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
import { listFactoring, getFactoring, delFactoring, addFactoring, updateFactoring } from "@/api/reverse/factoring";
import { listList, getList, delList, addList, updateList } from "@/api/rzauditlist/list";
import { mapGetters } from 'vuex';
import { SnowflakeIdGenerator } from '@/utils/index';

import moment from 'moment'
import CreateSuccess from '@/components/createSuccess/index.vue'
import SearchPanel from '@/components/SearchPanel/index.vue'

import { checkDueReminderWithConfig } from '@/utils/expirationreminder';
import { reminderConfig } from '@/config/expirationreminder'
export default {
  name: "Factoring",
  dicts: ['sys_acceptor', 'sys_1757288852172570600', 'sys_1757271666666242000'],
  components: {
    CreateSuccess,
    SearchPanel
  },
  data() {
    return {
      pickerOptions1: {
        // 禁用开始日期中，所有大于结束日期的日期
        disabledDate: (date) => {
          if (this.form.deadline) {
            return date.getTime() > new Date(this.form.deadline).getTime();
          }
        }
      },
      pickerOptions2: {
        // 禁用结束日期中，所有小于开始日期的日期
        disabledDate: (date) => {
          if (this.form.startDate) {
            // 一天的毫秒数
            var oneDayInMilliseconds = 24 * 60 * 60 * 1000;
            return date.getTime() < new Date(this.form.startDate).getTime() - oneDayInMilliseconds;
          }
        }
      },
      pickerOptions3: {
        // 禁用开始日期中，所有大于结束日期的日期
        disabledDate: (date) => {
          if (this.daterangeDeadline2) {
            return date.getTime() > new Date(this.daterangeDeadline2).getTime();
          }
        }
      },
      pickerOptions4: {
        // 禁用结束日期中，所有小于开始日期的日期
        disabledDate: (date) => {
          if (this.daterangeStartDate1) {
            // 一天的毫秒数
            var oneDayInMilliseconds = 24 * 60 * 60 * 1000;
            return date.getTime() < new Date(this.daterangeStartDate1).getTime() - oneDayInMilliseconds;
          }
        }
      },
      isSuccess: true,
      isTitle: true,
      isMessage: true,
      ctitle: '',
      isEdit: false,
      rzaudit_data: null,

      reminderConfig: reminderConfig.slice(1),
      checkDueReminderWithConfig: checkDueReminderWithConfig,
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
      // 反向保理表格数据
      factoringList: [],
      // 附件表表格数据
      rzsrc2List: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 开始时间范围
      daterangeStartDate: [],
      // 结束时间范围
      daterangeDeadline: [],
      daterangeStartDate1: '',
      daterangeDeadline2: '',
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 100,
        managementId: null,
        scrUuid: null,
        auditId: null,
        creditor: null,
        factor: null,
        financialInstitution: null,
        loanAmount: null,
        startDate: null,
        deadline: null,
        entryName: null,
        remark: null,
        collectionAccount: null,
        comment: null,
      },
      /* str 需要添加的 */
      scrUuid: null,
      /* end */
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        managementId: [
          { required: true, message: "反向保理管理编号不能为空", trigger: "blur" }
        ],
        scrUuid: [
          { required: false, message: "附件不能为空", trigger: "blur" }
        ],
        auditId: [
          { required: true, message: "审核id不能为空", trigger: "blur" }
        ],
        creditor: [
          { required: true, message: "债权人不能为空", trigger: "change" }
        ],
        factor: [
          { required: true, message: "保理商不能为空", trigger: "change" }
        ],
        financialInstitution: [
          { required: true, message: "金融机构不能为空", trigger: "change" }
        ],
        loanAmount: [
          { required: true, message: "放贷金额不能为空", trigger: "blur" }
        ],
        startDate: [
          { required: true, message: "开始日期不能为空", trigger: "blur" }
        ],
        deadline: [
          { required: true, message: "结束日期不能为空", trigger: "blur" }
        ],
        entryName: [
          { required: true, message: "项目名称不能为空", trigger: "blur" }
        ],
        collectionAccount: [
          { required: true, message: "回款账户不能为空", trigger: "blur" }
        ],
      },
      error1: '',
      totalKeys: [
        '放贷金额（万元）',
      ]
    };
  },
  watch: {
    open(n, o) {
      if (n == false) {
        this.created_successfully = false;
        this.isEditable = true;
      }
    },
    daterangeStartDate1(n, o) {
      if (n !== '' && n !== null) {
        if (this.daterangeDeadline2 === '' || this.daterangeDeadline2 === null) {
          this.error1 = '到期日不能为空';
        } else {
          this.error1 = ''; // 清空错误信息
        }
      } else if (this.daterangeDeadline2 === '' || this.daterangeDeadline2 === null) {
        this.error1 = ''; // 两个日期都为空时，清空错误信息
      } else {
        this.error1 = '起始日不能为空';
      }
    },
    daterangeDeadline2(n, o) {
      if (n !== '' && n !== null) {
        if (this.daterangeStartDate1 === '' || this.daterangeStartDate1 === null) {
          this.error1 = '起始日不能为空';
        } else {
          this.error1 = ''; // 清空错误信息
        }
      } else if (this.daterangeStartDate1 === '' || this.daterangeStartDate1 === null) {
        this.error1 = ''; // 两个日期都为空时，清空错误信息
      } else {
        this.error1 = '到期日不能为空';
      }
    },
  },
  computed: {
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
    /** 查询反向保理列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      // if (null != this.daterangeStartDate && '' != this.daterangeStartDate) {
      //   this.queryParams.params["beginStartDate"] = this.daterangeStartDate[0];
      //   this.queryParams.params["endStartDate"] = this.daterangeStartDate[1];
      // }
      // if (null != this.daterangeDeadline && '' != this.daterangeDeadline) {
      //   this.queryParams.params["beginDeadline"] = this.daterangeDeadline[0];
      //   this.queryParams.params["endDeadline"] = this.daterangeDeadline[1];
      // }

      if (![null, undefined, ''].includes(this.daterangeStartDate1) && ![null, undefined, ''].includes(this.daterangeDeadline2)) {
        this.queryParams.params["beginStartDate"] = this.daterangeStartDate1;
        this.queryParams.params["endStartDate"] = this.daterangeDeadline2;

        this.queryParams.params["beginDeadline"] = this.daterangeStartDate1;
        this.queryParams.params["endDeadline"] = this.daterangeDeadline2;
      }

      this.queryParams['orderByColumn'] = 'id'
      listFactoring(this.queryParams).then(response => {
        this.factoringList = response.rows;
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
        managementId: null,
        scrUuid: null,
        auditId: null,
        creditor: null,
        factor: null,
        financialInstitution: null,
        loanAmount: null,
        startDate: null,
        deadline: null,
        entryName: null,
        remark: null,
        collectionAccount: null,
        comment: null,
        createTime: null,
        createBy: null,
        updateTime: null,
        updateBy: null,
        id: null
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
      // this.daterangeStartDate = [];
      // this.daterangeDeadline = [];

      this.daterangeStartDate1 = '';
      this.daterangeDeadline2 = '';
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
      this.open = true;
      this.created_successfully = false;
      this.isEditable = true;
      this.title = "添加反向保理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.isEditable = false;
      this.reset();
      const id = row.id || this.ids
      getFactoring(id).then(response => {
        /* str 需要赋值粘贴到的 */
        response.data.rzsrc2List.forEach(i => {
          i.id = null;
        })
        // 金额需要 / 10000
        response.data.loanAmount = Number(response.data.loanAmount) / 10000;
        this.scrUuid = response.data.scrUuid;
        this.form = response.data;
        this.form.scrUuid = response.data.rzsrc2List.map(i => i.url)
        /* end */
        this.rzsrc2List = response.data.rzsrc2List;
        this.open = true;
        this.title = "修改反向保理";
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
            this.rzaudit_data = {
              "auditId": data.id,
              "scrUuid": data.scrUuid,
              "createBy": this.name,
              "createTime": null,
              "dataJson": JSON.stringify(data),
              "tableName": "rz_reverse_factoring",
              "auditState": "1759514891045044200",
              "uuid": data.uuid
            }
            if (this.title === '修改反向保理' && this.created_successfully === false && this.isEditable === true) {
              this.created_successfully = true;
              this.isSuccess = false;
              this.isTitle = true;
              this.isMessage = false;
              this.ctitle = '确定修改反向保理信息吗？';
              this.isEdit = true;
              return;
            }
          } else {
            const generator = new SnowflakeIdGenerator();
            data.scrUuid = generator.nextId();
            data.rzsrc2List = this.rzsrc2List;

            data.createBy = this.name;
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
              "tableName": "rz_reverse_factoring",
              "auditState": "1759514891045044200",
              "uuid": uuid,
              "managementId": data.managementId
            }
          }
          this.handleaddList();
        }
      });
    },
    async handleaddList() {
      // 检验上一个数据步骤有没有审批通过
      await this.inspectionPendingReview(this.rzaudit_data)

      addList(this.rzaudit_data).then(res => {
        this.created_successfully = true;
        if (this.title === '修改反向保理' && this.isEditable) {
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
      // this.$modal.confirm('是否确认删除反向保理编号为"' + ids + '"的数据项？').then(function () {
      //   return delFactoring(ids);
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
          }, '确定删除选中的反向保理吗？'),
        ]),
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        cancelButtonClass: "btn-custom-cancel",
        customClass: 'custom-msgbox',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            delFactoring(ids).then(res => {
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
      obj.type = "rz_reverse_factoring";
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
      this.download('reverse/factoring/export', {
        ...this.queryParams
      }, `factoring_${new Date().getTime()}.xlsx`)
    },
    /* 上传完成的回调 */
    upload_completed(url_string) {
      const url_list = url_string.split(',')
      url_list.forEach(url_i => {
        let obj = {
          url: url_i,
          projectManagementId: this.form.managementId,
          type: "rz_reverse_factoring"
          , createBy: this.name,
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
