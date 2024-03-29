<template>
  <div class="app-container">

    <search-panel HeaderIcon="bank" title="银行承兑汇票">

      <el-form label-position="left" :model="queryParams" ref="queryForm" size="small" v-show="showSearch"
        label-width="100px">
        <!-- 第一组表单项 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="管理编号" prop="managementId">
              <el-input v-model="queryParams.managementId" placeholder="请输入管理编号" clearable
                @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出票人" prop="drawer">
              <el-select filterable v-model="queryParams.drawer" placeholder="请选择出票人" clearable>
                <el-option v-for="dict in dict.type.sys_drawer" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收票人" prop="payee">
              <el-select filterable v-model="queryParams.payee" placeholder="请选择收票人" clearable>
                <el-option v-for="dict in dict.type.sys_1754491769220759600" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第二组表单项 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="承兑人" prop="financialInstitution">
              <el-select filterable v-model="queryParams.financialInstitution" placeholder="请选择承兑人（金融机构）" clearable>
                <el-option v-for="dict in dict.type.sys_acceptor" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出票日期">
              <el-date-picker v-model="daterangeDraftDate" style="width: 100%" value-format="yyyy-MM-dd" type="daterange"
                range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="汇票到期日">
              <!-- <el-date-picker clearable v-model="daterangeDueDate1" type="date" value-format="yyyy-MM-dd"
                placeholder="请选择汇票到期日"></el-date-picker> -->

              <el-date-picker clearable v-model="daterangeDueDate1" type="daterange" style="width: 100%"
                value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第三组表单项 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="项目名称" prop="entryName">
              <el-input v-model="queryParams.entryName" placeholder="请输入项目名称" clearable
                @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="到期提醒">
              <el-select filterable v-model="queryParams.remark" clearable placeholder="请选择到期提醒" @change="handleSelect">
                <el-option v-for="dict in reminderConfig" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="flex" style="display: flex; justify-content: flex-end;">
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">查 询</el-button>
              <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>


      </el-form>
    </search-panel>
    <el-divider class="mt20 mb20"></el-divider>
    <el-row type="flex" :gutter="10" class="mb8" justify="end">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['bankaccept:bank:add']">新 建</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['bankaccept:bank:edit']">修改</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['bankaccept:bank:remove']">删 除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['bankaccept:bank:export']">导出</el-button>
      </el-col> -->
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="bankList" @selection-change="handleSelectionChange"
      :header-cell-style="header_cell_style">
      <el-table-column show-overflow-tooltip fixed="left" type="selection" min-width="50" align="center" />
      <el-table-column show-overflow-tooltip label="管理编号" align="center" prop="managementId" min-width="100" />
      <!-- <el-table-column label="数据唯一编号" align="center" prop="scrUuid" /> -->
      <!-- <el-table-column label="审核id" align="center" prop="auditId" /> -->
      <el-table-column show-overflow-tooltip label="出票人" align="center" min-width="260" prop="drawer">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_drawer" :value="scope.row.drawer" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="收票人"  min-width="260" align="center" prop="payee">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1754491769220759600" :value="scope.row.payee" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="承兑人(金融机构)"  min-width="260" align="center" prop="financialInstitution">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_acceptor" :value="scope.row.financialInstitution" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="出票金额(万元)" min-width="160" align="center" prop="invoiceAmount">
        <template slot-scope="scope">
          <span>{{ formatNumberAsRMB(scope.row.invoiceAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="出票日期" align="center" prop="draftDate" min-width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.draftDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="汇票到期日" align="center" prop="dueDate" min-width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dueDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="汇票到期提醒" min-width="120" align="center" prop="remark">
        <template slot-scope="scope">
          <el-tag effect="plain" :hit="true" :class="checkDueReminderWithConfig(scope.row.dueDate).color">
            {{ checkDueReminderWithConfig(scope.row.dueDate).message }}
          </el-tag>
          <!-- <dict-tag :options="reminderConfig" :value="checkDueReminderWithConfig(scope.row.draftDate, scope.row.dueDate)" /> -->
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="承兑协议编号" min-width="180" align="center" prop="acceptAgreementId" />
      <el-table-column show-overflow-tooltip label="项目名称" align="center" min-width="180" prop="entryName" />
      <el-table-column show-overflow-tooltip label="备注" align="center"  min-width="200" prop="comment" />
      <!-- <el-table-column label="ID" align="center" prop="id" /> -->
      <el-table-column fixed="right" label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleUpdate(scope.row)" v-hasPermi="['bankaccept:bank:edit']">查
            看</el-button>
          <!-- <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['bankaccept:bank:remove']">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改银行承兑汇票对话框 -->
    <el-dialog :title="title" :visible.sync="open" min-width="60%" append-to-body>

      <el-divider class="no_mt mb20"></el-divider>
      <div v-if="created_successfully == false">
        <div v-if="title === '修改银行承兑汇票'" class="modeify-btn" style="display: flex; justify-content: end;">
          <el-button type="primary" v-if="!this.isEditable" @click="toggleEdit">编 辑</el-button>
          <el-button type="warning" v-else @click="toggleEdit">取消编辑</el-button>
          <el-button type="danger" plain @click="handleDelete(form)">删 除</el-button>
        </div>

        <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="top">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="管理编号" prop="managementId">
                <el-input :readonly="title === '修改银行承兑汇票'" v-model="form.managementId" placeholder="请输入银行承兑管理编号" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出票人" prop="drawer">
                <el-select filterable :disabled="!isEditable" v-model="form.drawer" placeholder="请选择出票人">
                  <el-option v-for="dict in dict.type.sys_drawer" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收票人" prop="payee">
                <el-select filterable :disabled="!isEditable" v-model="form.payee" placeholder="请选择收票人">
                  <el-option v-for="dict in dict.type.sys_1754491769220759600" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">

            <el-col :span="8">
              <el-form-item label="金融机构" prop="financialInstitution">
                <el-select filterable :disabled="!isEditable" v-model="form.financialInstitution" placeholder="请选择金融机构">
                  <el-option v-for="dict in dict.type.sys_acceptor" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出票金额（万元）" prop="invoiceAmount">
                <el-input :readonly="!isEditable" @keydown.native="amountLimitMethod" type="number" v-model.number.trim="form.invoiceAmount" placeholder="请输入出票金额" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出票日期" prop="draftDate">
                <el-date-picker :disabled="!isEditable" clearable v-model="form.draftDate" type="date"
                  value-format="yyyy-MM-dd" placeholder="请选择出票日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">

            <el-col :span="8">
              <el-form-item label="到期日" prop="dueDate">
                <el-date-picker :disabled="!isEditable" clearable v-model="form.dueDate" type="date"
                  value-format="yyyy-MM-dd" placeholder="请选择到期日">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="协议编号" prop="acceptAgreementId">
                <el-input :readonly="!isEditable" v-model="form.acceptAgreementId" placeholder="请输入协议编号" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目名称" prop="entryName">
                <el-input :readonly="!isEditable" v-model="form.entryName" placeholder="请输入项目名称" />
              </el-form-item>
            </el-col>
          </el-row>


          <el-row>
            <el-col :span="24">
              <el-form-item label="备注" prop="comment">
                <el-input :readonly="!isEditable" v-model="form.comment" show-word-limit maxlength="200" type="textarea"
                  :rows="4" placeholder="请输入备注信息，最多不超过200字" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
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
        <CreateSuccess @close-dialog="closeDialog" @create-again="create_again" :isSuccess="isSuccess" :isTitle="isTitle"
          :isMessage="isMessage" :title="ctitle" :isEdit="isEdit" @confirm="handleaddList" @cancel="cancel">
        </CreateSuccess>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import { listBank, getBank, delBank, addBank, updateBank } from "@/api/bankaccept/bank";
import { SnowflakeIdGenerator } from '@/utils/index'
import { listList, getList, delList, addList, updateList } from "@/api/rzauditlist/list";
import { mapGetters } from 'vuex';
import moment from 'moment'
import CreateSuccess from '@/components/createSuccess/index.vue'
import SearchPanel from '@/components/SearchPanel/index.vue'
import { checkDueReminderWithConfig } from '@/utils/expirationreminder';
import { reminderConfig } from '@/config/expirationreminder'

export default {
  name: "Bank",
  dicts: ['sys_1754491769220759600', 'sys_drawer', 'sys_acceptor'],
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
      // 银行承兑汇票表格数据
      bankList: [],
      // 附件表表格数据
      rzsrc2List: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 创建人时间范围
      daterangeDraftDate: [],
      daterangeDueDate1: [],
      // 到期提醒
      daterangeDueDate: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        managementId: null,
        scrUuid: null,
        auditId: null,
        drawer: null,
        payee: null,
        financialInstitution: null,
        invoiceAmount: null,
        draftDate: null,
        dueDate: null,
        remark: null,
        acceptAgreementId: null,
        entryName: null,
        comment: null,
        createTime: null
      },
      /* str 需要添加的 */
      scrUuid: null,
      /* end */

      // 表单参数
      form: {},
      // 表单校验
      rules: {
        managementId: [
          { required: true, message: "银行承兑管理编号不能为空", trigger: "blur" }
        ],
        scrUuid: [
          { required: true, message: "数据唯一编号不能为空", trigger: "blur" }
        ],
        auditId: [
          { required: true, message: "审核id不能为空", trigger: "blur" }
        ],
        drawer: [
          { required: true, message: "出票人不能为空", trigger: "change" }
        ],
        payee: [
          { required: true, message: "收票人不能为空", trigger: "change" }
        ],
        financialInstitution: [
          { required: true, message: "金融机构不能为空", trigger: "change" }
        ],
        invoiceAmount: [
          { required: true, message: "出票金额不能为空", trigger: "blur" }
        ],
        draftDate: [
          { required: true, message: "出票日期不能为空", trigger: "blur" }
        ],
        dueDate: [
          { required: true, message: "到期日不能为空", trigger: "blur" }
        ],
        remark: [
          { required: true, message: "到期提醒不能为空", trigger: "change" }
        ],
        acceptAgreementId: [
          { required: true, message: "协议编号不能为空", trigger: "blur" }
        ],
        entryName: [
          { required: true, message: "项目名称不能为空", trigger: "blur" }
        ],
      },
    };
  },
  watch: {
    open(n, o) {
      if (n == false) {
        this.created_successfully = false;
        this.isEditable = true;
      }
    }
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
  mounted() {
  },
  methods: {
    /* 到期提醒选择 */
    handleSelect(val) {
      // this.queryParams.remark = null;
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
    /** 查询银行承兑汇票列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeDraftDate && '' != this.daterangeDraftDate) {
        this.queryParams.params["beginDraftDate"] = this.daterangeDraftDate[0];
        this.queryParams.params["endDraftDate"] = this.daterangeDraftDate[1];
      }
      if (null != this.daterangeDueDate && '' != this.daterangeDueDate) {
        this.queryParams.params["beginDueDate"] = this.daterangeDueDate[0];
        this.queryParams.params["endDueDate"] = this.daterangeDueDate[1];
      }

      if (null != this.daterangeDueDate1 && '' != this.daterangeDueDate1) {
        this.queryParams.params["beginDueDate"] = this.daterangeDueDate1[0];
        this.queryParams.params["endDueDate"] = this.daterangeDueDate1[1];
      }

      const searchData = JSON.parse(JSON.stringify(this.queryParams));
      searchData.remark = null;
      this.queryParams['orderByColumn'] = 'id'
      listBank(searchData).then(response => {
        this.bankList = response.rows;
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
        drawer: null,
        payee: null,
        financialInstitution: null,
        invoiceAmount: null,
        draftDate: null,
        dueDate: null,
        remark: null,
        acceptAgreementId: null,
        entryName: null,
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
      this.daterangeDraftDate = [];
      this.daterangeDueDate = [];
      this.daterangeDueDate1 = [];
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
      this.title = "新建银行承兑汇票";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.isEditable = false;
      this.reset();
      const id = row.id || this.ids
      getBank(id).then(response => {
        /* str 需要赋值粘贴到的 */
        response.data.rzsrc2List.forEach(i => {
          i.id = null;
        })
        // 金额需要 / 10000
        response.data.invoiceAmount = Number(response.data.invoiceAmount) / 10000;
        this.scrUuid = response.data.scrUuid;
        this.form = response.data;
        this.form.scrUuid = response.data.rzsrc2List.map(i => i.url)
        /* end */

        this.rzsrc2List = response.data.rzsrc2List;
        this.open = true;
        this.title = "修改银行承兑汇票";
      });
    },
    /** 提交按钮 */
    submitForm() {
      /* str 需要赋值粘贴到的 需要修改请求的接口 */
      this.$refs["form"].validate(valid => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.form))
          this.form.rzsrc2List = this.rzsrc2List;
          this.rzaudit_data = null;

          // 金额需要 * 10000
          data.invoiceAmount = Number(data.invoiceAmount) * 10000;
          if (this.form.id != null) {
            data.scrUuid = Number(this.scrUuid);
            this.rzaudit_data = {
              "auditId": data.id,
              "scrUuid": data.scrUuid,
              "createBy": this.name,
              "createTime": null,
              "dataJson": JSON.stringify(data),
              "tableName": "rz_bank_accept_bill",
              "auditState": "1759514891045044200",
              "uuid": data.uuid
            }
            if (this.title === '修改银行承兑汇票' && this.created_successfully === false && this.isEditable === true) {
              this.created_successfully = true;
              this.isSuccess = false;
              this.isTitle = true;
              this.isMessage = false;
              this.ctitle = '确定修改银行承兑汇票信息吗？';
              this.isEdit = true;
              return;
            }
          } else {
            // 生成一个 uuid
            const generator = new SnowflakeIdGenerator();

            // start
            const uuid = String(generator.nextId())
            data.uuid = uuid;
            // end
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
              "tableName": "rz_bank_accept_bill",
              "auditState": "1759514891045044200",
              "uuid": uuid,
              "managementId": data.managementId
            }
          }
          this.handleaddList();
        }
      });
      /* end */
    },
    async handleaddList() {
      // 检验上一个数据步骤有没有审批通过
      await this.inspectionPendingReview(this.rzaudit_data)

      addList(this.rzaudit_data).then(res => {
        this.created_successfully = true;
        if (this.title === '修改银行承兑汇票' && this.isEditable) {
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
      // this.$modal.confirm('是否确认删除银行承兑汇票编号为"' + ids + '"的数据项？').then(function () {
      //   return delBank(ids);
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
          }, '确定删除选中的银行承兑汇票吗？'),
        ]),
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        cancelButtonClass: "btn-custom-cancel",
        customClass: 'custom-msgbox',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            delBank(ids).then(res => {
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
      obj.type = "rz_bank_accept_bill";
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
      this.download('bankaccept/bank/export', {
        ...this.queryParams
      }, `bank_${new Date().getTime()}.xlsx`)
    },
    /* 上传完成的回调 */
    upload_completed(url_string) {
      const url_list = url_string.split(',')
      url_list.forEach(url_i => {
        let obj = {
          url: url_i,
          projectManagementId: this.form.managementId,
          type: "rz_bank_accept_bill",
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
<style lang="scss" scoped></style>
