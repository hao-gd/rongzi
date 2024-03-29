<template>
  <div class="app-container">
    <!-- <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="授信管理管理编号" prop="managementId">
        <el-input
          v-model="queryParams.managementId"
          placeholder="请输入授信管理管理编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="债权人/借款人" prop="creditor">
        <el-input
          v-model="queryParams.creditor"
          placeholder="请输入债权人/借款人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="金融机构" prop="financialInstitution">
        <el-select filterable v-model="queryParams.financialInstitution" placeholder="请选择金融机构" clearable>
          <el-option
            v-for="dict in dict.type.sys_acceptor"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="授信类型" prop="creditType">
        <el-select filterable v-model="queryParams.creditType" placeholder="请选择授信类型" clearable>
          <el-option
            v-for="dict in dict.type.sys_1765001578994991000"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="授信详情" prop="creditDetail">
        <el-input
          v-model="queryParams.creditDetail"
          placeholder="请输入授信详情"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="授信金额" prop="creditAmount">
        <el-input
          v-model="queryParams.creditAmount"
          placeholder="请输入授信金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="已用授信金额" prop="usedCreditAmount">
        <el-input
          v-model="queryParams.usedCreditAmount"
          placeholder="请输入已用授信金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="剩余授信金额" prop="remainingCreditAmount">
        <el-input
          v-model="queryParams.remainingCreditAmount"
          placeholder="请输入剩余授信金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="起始日">
        <el-date-picker
          v-model="daterangeStartDate"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="起始日"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="到期日">
        <el-date-picker
          v-model="daterangeDeadline"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="起始日"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="授信有效期" prop="creditCycle">
        <el-input
          v-model="queryParams.creditCycle"
          placeholder="请输入授信有效期"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="授信状态" prop="creditState">
        <el-select filterable v-model="queryParams.creditState" placeholder="请选择授信状态" clearable>
          <el-option
            v-for="dict in dict.type.sys_1765002034026643500"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="uuid" prop="uuid">
        <el-input
          v-model="queryParams.uuid"
          placeholder="请输入uuid"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form> -->
    <search-panel HeaderIcon="Creditmanagement" title="授信管理">
      <el-form label-position="left" :model="queryParams" ref="queryForm" size="small" :inline="false" v-show="showSearch"
        label-width="100px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="授信管理编号" prop="managementId">
              <el-input v-model="queryParams.managementId" placeholder="请输入授信管理编号" clearable
                @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="借款单位" prop="creditor">
              <el-input v-model="queryParams.creditor" placeholder="请选择债权人名称" clearable
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
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="授信类型" prop="creditType">
              <el-select filterable v-model="queryParams.creditType" placeholder="请选择授信类型" clearable>
                <el-option v-for="dict in dict.type.sys_1765001578994991000" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="起始日">
              <el-date-picker v-model="daterangeStartDate" style="width: 100%" value-format="yyyy-MM-dd" type="daterange"
                range-separator="-" start-placeholder="起始日" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="到期日">
              <el-date-picker v-model="daterangeDeadline" style="width: 100%" value-format="yyyy-MM-dd" type="daterange"
                range-separator="-" start-placeholder="起始日" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="授信有效期" prop="creditCycle">
              <el-input v-model="queryParams.creditCycle" placeholder="请输入授信有效期" clearable
                @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="授信状态" prop="creditState">
              <el-select filterable v-model="queryParams.creditState" placeholder="请选择授信状态" clearable>
                <el-option v-for="dict in dict.type.sys_1765002034026643500" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="flex" style="display: flex; justify-content: flex-end;">
              <el-button type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
              <el-button icon="el-icon-refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

    </search-panel>

    <el-divider class="mt20 mb20"></el-divider>
    <el-row type="flex" :gutter="10" class="mb8" justify="end">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['creditmanagement:grant:add']">新 建</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['creditmanagement:grant:edit']">修改</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['creditmanagement:grant:remove']">删 除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['creditmanagement:grant:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="grantList" @selection-change="handleSelectionChange"
      :header-cell-style="header_cell_style">
      <el-table-column show-overflow-tooltip fixed="left" type="selection" min-width="50" align="center" />
      <!-- <el-table-column label="主键id" align="center" prop="id" /> -->
      <el-table-column show-overflow-tooltip label="管理编号" align="center" prop="managementId"   min-width="100" />
      <!-- <el-table-column label="数据唯一编号" align="center" prop="scrUuid" /> -->
      <el-table-column show-overflow-tooltip label="借款人" align="center" prop="creditor" min-width="260" />
      <el-table-column show-overflow-tooltip label="金融机构" align="center" prop="financialInstitution" min-width="260">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_acceptor" :value="scope.row.financialInstitution" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="授信类型" align="center" prop="creditType" min-width="100">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1765001578994991000" :value="scope.row.creditType" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="授信详情" align="center" prop="creditDetail" />
      <el-table-column show-overflow-tooltip label="授信金额（万元）" align="center" prop="creditAmount" min-width="160">
        <template slot-scope="scope">
          <span>{{ formatNumberAsRMB(scope.row.creditAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="已用授信金额（万元）" align="center" prop="usedCreditAmount" min-width="160">
        <template slot-scope="scope">
          <span>{{ formatNumberAsRMB(scope.row.usedCreditAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="授信余额（万元）" align="center" prop="remainingCreditAmount" min-width="160">
        <template slot-scope="scope">
          <span>{{ formatNumberAsRMB(scope.row.remainingCreditAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="起始日" align="center" prop="startDate" min-width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="到期日" align="center" prop="deadline" min-width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.deadline, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="授信有效期" align="center" prop="creditCycle" min-width="100">
        <template slot-scope="scope">
          <span>{{ appendUnit(scope.row.creditCycle, '天') }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="授信状态" align="center" prop="creditState" min-width="80" >
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1765002034026643500" :value="scope.row.creditState" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="备注" align="center" prop="comment" min-width="200" />
      <el-table-column show-overflow-tooltip label="创建人" align="center" prop="createBy" min-width="80" />
      <el-table-column show-overflow-tooltip label="创建时间" align="center" prop="createTime" min-width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="uuid" align="center" prop="uuid" /> -->
      <el-table-column show-overflow-tooltip fixed="right" label="操作" align="center"
        class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['creditmanagement:grant:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['creditmanagement:grant:remove']">删除</el-button> -->

          <el-button size="mini" type="text" @click="handleUpdate(scope.row)"
            v-hasPermi="['creditmanagement:grant:edit']">查 看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改授信管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" min-width="60%" append-to-body>
      <el-divider class="no_mt mb20"></el-divider>

      <div v-if="created_successfully == false">
        <div v-if="title === '修改授信管理'" class="modeify-btn" style="display: flex; justify-content: end;">
          <el-button type="primary" v-if="!this.isEditable" @click="toggleEdit">编 辑</el-button>
          <el-button type="warning" v-else @click="toggleEdit">取消编辑</el-button>
          <el-button type="danger" plain @click="handleDelete(form)">删 除</el-button>
        </div>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="top">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="管理编号" prop="managementId">
                <el-input :readonly="title === '修改授信管理'" v-model="form.managementId" placeholder="请输入管理编号" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="借款单位" prop="creditor">
                <el-input :readonly="!isEditable" v-model="form.creditor" placeholder="请输入借款单位" />
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
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="授信类型" prop="creditType">
                <el-select filterable :disabled="!isEditable" v-model="form.creditType" placeholder="请选择授信类型">
                  <el-option v-for="dict in dict.type.sys_1765001578994991000" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="授信详情" prop="creditDetail">
                <el-input :readonly="!isEditable" v-model="form.creditDetail" placeholder="请输入授信详情" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="授信金额（万元）" prop="creditAmount">
                <el-input :readonly="!isEditable" @keydown.native="amountLimitMethod" type="number"
                  v-model.trim="form.creditAmount" placeholder="请输入授信金额" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="已用授信金额（万元）" prop="usedCreditAmount">
                <el-input :readonly="!isEditable" @keydown.native="amountLimitMethod" type="number"
                  v-model.trim="form.usedCreditAmount" placeholder="请输入已用授信金额" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="授信余额（万元）" prop="remainingCreditAmount">
                <el-input :readonly="true" :disabled="true" @keydown.native="amountLimitMethod" type="number"
                  v-model.trim="remainingCreditAmount" placeholder="请输入剩余授信金额" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="授信状态" prop="creditState">
                <el-select filterable :disabled="!isEditable" v-model="form.creditState" placeholder="请选择授信状态">
                  <el-option v-for="dict in dict.type.sys_1765002034026643500" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
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

            <el-col :span="8">
              <el-form-item label="授信有效期" prop="creditCycle">
                <el-input :readonly="!isEditable" v-model="creditCycle" placeholder="请输入授信有效期" />
              </el-form-item>
            </el-col>


          </el-row>

          <!-- 备注和附件单独处理，不包含在三列布局中 -->
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
import { listGrant, getGrant, delGrant, addGrant, updateGrant } from "@/api/creditmanagement/grant";
import { SnowflakeIdGenerator } from '@/utils/index'
import { listList, getList, delList, addList, updateList } from "@/api/rzauditlist/list";
import { mapGetters } from 'vuex';
import moment from 'moment'
import CreateSuccess from '@/components/createSuccess/index.vue'
import SearchPanel from '@/components/SearchPanel/index.vue'
import { checkDueReminderWithConfig } from '@/utils/expirationreminder';
import { reminderConfig } from '@/config/expirationreminder'

export default {
  name: "Grant",
  dicts: ['sys_1765001578994991000', 'sys_1765002034026643500', 'sys_acceptor'],
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

      reminderConfig: reminderConfig.slice(1),
      checkDueReminderWithConfig: checkDueReminderWithConfig,
      created_successfully: false,
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
      // 授信管理表格数据
      grantList: [],
      // 附件表表格数据
      rzsrc2List: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 创建人时间范围
      daterangeStartDate: [],
      // 创建人时间范围
      daterangeDeadline: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        managementId: null,
        scrUuid: null,
        creditor: null,
        financialInstitution: null,
        creditType: null,
        creditDetail: null,
        creditAmount: null,
        usedCreditAmount: null,
        remainingCreditAmount: null,
        startDate: null,
        deadline: null,
        creditCycle: null,
        creditState: null,
        comment: null,
        uuid: null
      },
      // 表单参数
      form: {},
      /* str 需要添加的 */
      scrUuid: null,
      /* end */

      // 表单校验
      rules: {
        managementId: [
          { required: true, message: "授信管理管理编号不能为空", trigger: "blur" }
        ],
        scrUuid: [
          { required: true, message: "数据唯一编号不能为空", trigger: "blur" }
        ],
        creditor: [
          { required: true, message: "债权人/借款人不能为空", trigger: "blur" }
        ],
        financialInstitution: [
          { required: true, message: "金融机构不能为空", trigger: "change" }
        ],
        creditType: [
          { required: true, message: "授信类型不能为空", trigger: "change" }
        ],
        creditDetail: [
          { required: true, message: "授信详情不能为空", trigger: "blur" }
        ],
        creditAmount: [
          { required: true, message: "授信金额不能为空", trigger: "blur" }
        ],
        usedCreditAmount: [
          { required: true, message: "已用授信金额不能为空", trigger: "blur" }
        ],
        remainingCreditAmount: [
          { required: true, message: "剩余授信金额不能为空", trigger: "blur" }
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
        creditState: [
          { required: true, message: "授信状态不能为空", trigger: "change" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        createBy: [
          { required: true, message: "创建人不能为空", trigger: "blur" }
        ],
        uuid: [
          { required: true, message: "uuid不能为空", trigger: "blur" }
        ]
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
    remainingCreditAmount() {
      // 确保值为数值类型，避免NaN
      const creditAmount = Number(this.form.creditAmount) || 0;
      const usedCreditAmount = Number(this.form.usedCreditAmount) || 0;

      const residue = creditAmount - usedCreditAmount;
      this.form.remainingCreditAmount = residue;
      return residue;
    },
    /* 计算周期，开始时间减去结束时间 */
    creditCycle: {
      get() {
        // 如果是自动计算的，直接返回计算结果加"天"，否则返回当前值
        if (this.isAutoCalculated) {
          return this.form.creditCycle ? `${this.form.creditCycle}天` : '';
        } else {
          return this.form.creditCycle ? `${this.form.creditCycle}天` : '';
        }
      },
      set(value) {
        this.isAutoCalculated = false; // 用户手动输入，更改标志状态
        if (typeof value === 'string' && value.includes('天')) {
          this.form.creditCycle = parseInt(value.replace('天', ''), 10);
        } else if (!isNaN(value)) {
          this.form.creditCycle = parseInt(value, 10);
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

        this.form.creditCycle = days;
        this.isAutoCalculated = true; // 标记为自动计算
      }
    },
    /* 到期提醒选择 */
    handleSelect(val) {
      if (val) {
        let start = moment().format("YYYY-MM-DD");
        let end = moment().add(val, 'days').format("YYYY-MM-DD");
        this.daterangeDueDate = [start, end]
      } else {
        this.daterangeDueDate = []
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
    /** 查询授信管理列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeStartDate && '' != this.daterangeStartDate) {
        this.queryParams.params["beginStartDate"] = this.daterangeStartDate[0];
        this.queryParams.params["endStartDate"] = this.daterangeStartDate[1];
      }
      if (null != this.daterangeDeadline && '' != this.daterangeDeadline) {
        this.queryParams.params["beginDeadline"] = this.daterangeDeadline[0];
        this.queryParams.params["endDeadline"] = this.daterangeDeadline[1];
      }
      this.queryParams['orderByColumn'] = 'id'
      listGrant(this.queryParams).then(response => {
        this.grantList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        managementId: null,
        scrUuid: null,
        creditor: null,
        financialInstitution: null,
        creditType: null,
        creditDetail: null,
        creditAmount: null,
        usedCreditAmount: null,
        remainingCreditAmount: null,
        startDate: null,
        deadline: null,
        creditCycle: null,
        creditState: null,
        comment: null,
        createTime: null,
        createBy: null,
        updateTime: null,
        updateBy: null,
        uuid: null
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
      this.daterangeStartDate = [];
      this.daterangeDeadline = [];
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
      this.title = "添加授信管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.isEditable = false;
      this.reset();
      const id = row.id || this.ids
      getGrant(id).then(response => {
        /* str 需要赋值粘贴到的 */
        response.data.rzsrc2List.forEach(i => {
          i.id = null;
        })
        // 金额需要 / 10000
        response.data.creditAmount = Number(response.data.creditAmount) / 10000;
        response.data.usedCreditAmount = Number(response.data.usedCreditAmount) / 10000;
        response.data.remainingCreditAmount = Number(response.data.remainingCreditAmount) / 10000;
        this.scrUuid = response.data.scrUuid;
        this.form = response.data;
        this.form.scrUuid = response.data.rzsrc2List.map(i => i.url)
        /* end */
        this.rzsrc2List = response.data.rzsrc2List;
        this.open = true;
        this.title = "修改授信管理";
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
          data.creditAmount = Number(data.creditAmount) * 10000;
          data.usedCreditAmount = Number(data.usedCreditAmount) * 10000;
          data.remainingCreditAmount = Number(data.remainingCreditAmount) * 10000;
          if (this.form.id != null) {
            // updateGrant(this.form).then(response => {
            //   this.$modal.msgSuccess("修改成功");
            //   this.open = false;
            //   this.getList();
            // });
            data.scrUuid = Number(this.scrUuid);
            // 计算周期，开始时间减去结束时间
            // let creditCycle = moment(data.deadline).diff(moment(data.startDate), 'days');
            // data.creditCycle = creditCycle === 0 ? 1 : creditCycle;

            let loanTermStr = data.creditCycle.toString();
            loanTermStr = loanTermStr.replace(/天$/, '');

            data.creditCycle = loanTermStr
            this.rzaudit_data = {
              "auditId": data.id,
              "scrUuid": data.scrUuid,
              "createBy": this.name,
              "createTime": null,
              "dataJson": JSON.stringify(data),
              "tableName": "rz_credit_management",
              "auditState": "1759514891045044200",
              "uuid": data.uuid
            }
            if (this.title === '修改授信管理' && this.created_successfully === false && this.isEditable === true) {
              this.created_successfully = true;
              this.isSuccess = false;
              this.isTitle = true;
              this.isMessage = false;
              this.ctitle = '确定修改授信管理信息吗？';
              this.isEdit = true;
              return;
            }
          } else {
            // addGrant(this.form).then(response => {
            //   this.$modal.msgSuccess("新增成功");
            //   this.open = false;
            //   this.getList();
            // });
            // 生成一个 uuid
            const generator = new SnowflakeIdGenerator();

            // start
            const uuid = String(generator.nextId())
            data.uuid = uuid;
            // end

            // 计算周期，开始时间减去结束时间
            // let creditCycle = moment(data.deadline).diff(moment(data.startDate), 'days');
            // data.creditCycle = creditCycle === 0 ? 1 : creditCycle;
            let loanTermStr = data.creditCycle.toString();
            loanTermStr = loanTermStr.replace(/天$/, '');

            data.creditCycle = loanTermStr

            data.scrUuid = generator.nextId();
            data.rzsrc2List = this.rzsrc2List;
            data.createBy = this.name;
            this.rzaudit_data = {
              "id": null,
              "auditId": null,
              "scrUuid": data.scrUuid,
              "createBy": this.name,
              "createTime": null,
              "dataJson": JSON.stringify(data),
              "tableName": "rz_credit_management",
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
        if (this.title === '修改授信管理' && this.isEditable) {
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
      // const ids = row.id || this.ids;
      // this.$modal.confirm('是否确认删除授信管理编号为"' + ids + '"的数据项？').then(function () {
      //   return delGrant(ids);
      // }).then(() => {
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
          }, '确定删除选中的授信管理吗？'),
        ]),
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        cancelButtonClass: "btn-custom-cancel",
        customClass: 'custom-msgbox',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            delGrant(ids).then(res => {
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
      obj.type = "rz_credit_management";
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
      this.download('creditmanagement/grant/export', {
        ...this.queryParams
      }, `grant_${new Date().getTime()}.xlsx`)
    },
    /* 上传完成的回调 */
    upload_completed(url_string) {
      const url_list = url_string.split(',')
      url_list.forEach(url_i => {
        let obj = {
          url: url_i,
          projectManagementId: this.form.managementId,
          type: "rz_credit_management",
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
