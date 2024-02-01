<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="银行承兑管理编号" prop="bankManagementNumber">
        <el-input
          v-model="queryParams.bankManagementNumber"
          placeholder="请输入银行承兑管理编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="金融机构" prop="bankFinancialInstitution">
        <el-input
          v-model="queryParams.bankFinancialInstitution"
          placeholder="请输入金融机构"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="出票日期" prop="bankDraftDate">
        <el-date-picker clearable
          v-model="queryParams.bankDraftDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择出票日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="汇票到期日" prop="bankDueDate">
        <el-date-picker clearable
          v-model="queryParams.bankDueDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择汇票到期日">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="项目名称" prop="bankEntryName">
        <el-input
          v-model="queryParams.bankEntryName"
          placeholder="请输入项目名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['bankaccept:bank:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['bankaccept:bank:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['bankaccept:bank:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['bankaccept:bank:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="bankList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="银行承兑id主键" align="center" prop="bankId" />
      <el-table-column label="银行承兑管理编号" align="center" prop="bankManagementNumber" />
      <el-table-column label="出票人" align="center" prop="drawer" />
      <el-table-column label="收票人" align="center" prop="bankPayee" />
      <el-table-column label="金融机构" align="center" prop="bankFinancialInstitution" />
      <el-table-column label="出票金额" align="center" prop="invoiceAmount" />
      <el-table-column label="出票日期" align="center" prop="bankDraftDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.bankDraftDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="汇票到期日" align="center" prop="bankDueDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.bankDueDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="到期提醒" align="center" prop="bankRemark" />
      <el-table-column label="协议编号" align="center" prop="acceptAgreementId" />
      <el-table-column label="项目名称" align="center" prop="bankEntryName" />
      <el-table-column label="" align="center" prop="bankNotes" />
      <el-table-column label="创建时间" align="center" prop="bankCreateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.bankCreateTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" align="center" prop="bankCreateBy" />
      <el-table-column label="更新时间" align="center" prop="bankUpdateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.bankUpdateTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新人" align="center" prop="bankUpdateBy" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['bankaccept:bank:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['bankaccept:bank:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改银行承兑汇票对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="银行承兑管理编号" prop="bankManagementNumber">
          <el-input v-model="form.bankManagementNumber" placeholder="请输入银行承兑管理编号" />
        </el-form-item>
        <el-form-item label="金融机构" prop="bankFinancialInstitution">
          <el-input v-model="form.bankFinancialInstitution" placeholder="请输入金融机构" />
        </el-form-item>
        <el-form-item label="出票金额" prop="invoiceAmount">
          <el-input v-model="form.invoiceAmount" placeholder="请输入出票金额" />
        </el-form-item>
        <el-form-item label="出票日期" prop="bankDraftDate">
          <el-date-picker clearable
            v-model="form.bankDraftDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择出票日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="汇票到期日" prop="bankDueDate">
          <el-date-picker clearable
            v-model="form.bankDueDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择汇票到期日">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="协议编号" prop="acceptAgreementId">
          <el-input v-model="form.acceptAgreementId" placeholder="请输入协议编号" />
        </el-form-item>
        <el-form-item label="项目名称" prop="bankEntryName">
          <el-input v-model="form.bankEntryName" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="" prop="bankNotes">
          <el-input v-model="form.bankNotes" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="创建时间" prop="bankCreateTime">
          <el-date-picker clearable
            v-model="form.bankCreateTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="创建人" prop="bankCreateBy">
          <el-input v-model="form.bankCreateBy" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="更新时间" prop="bankUpdateTime">
          <el-date-picker clearable
            v-model="form.bankUpdateTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择更新时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="更新人" prop="bankUpdateBy">
          <el-input v-model="form.bankUpdateBy" placeholder="请输入更新人" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listBank, getBank, delBank, addBank, updateBank } from "@/api/bankaccept/bank";

export default {
  name: "Bank",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
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
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        bankManagementNumber: null,
        drawer: null,
        bankPayee: null,
        bankFinancialInstitution: null,
        bankDraftDate: null,
        bankDueDate: null,
        bankRemark: null,
        bankEntryName: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        bankManagementNumber: [
          { required: true, message: "银行承兑管理编号不能为空", trigger: "blur" }
        ],
        drawer: [
          { required: true, message: "出票人不能为空", trigger: "change" }
        ],
        bankPayee: [
          { required: true, message: "收票人不能为空", trigger: "change" }
        ],
        bankFinancialInstitution: [
          { required: true, message: "金融机构不能为空", trigger: "blur" }
        ],
        bankDraftDate: [
          { required: true, message: "出票日期不能为空", trigger: "blur" }
        ],
        bankDueDate: [
          { required: true, message: "汇票到期日不能为空", trigger: "blur" }
        ],
        bankRemark: [
          { required: true, message: "到期提醒不能为空", trigger: "change" }
        ],
        bankEntryName: [
          { required: true, message: "项目名称不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询银行承兑汇票列表 */
    getList() {
      this.loading = true;
      listBank(this.queryParams).then(response => {
        this.bankList = response.rows;
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
        bankId: null,
        bankManagementNumber: null,
        drawer: null,
        bankPayee: null,
        bankFinancialInstitution: null,
        invoiceAmount: null,
        bankDraftDate: null,
        bankDueDate: null,
        bankRemark: null,
        acceptAgreementId: null,
        bankEntryName: null,
        bankNotes: null,
        bankCreateTime: null,
        bankCreateBy: null,
        bankUpdateTime: null,
        bankUpdateBy: null
      };
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
      this.ids = selection.map(item => item.bankId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加银行承兑汇票";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const bankId = row.bankId || this.ids
      getBank(bankId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改银行承兑汇票";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.bankId != null) {
            updateBank(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addBank(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const bankIds = row.bankId || this.ids;
      this.$modal.confirm('是否确认删除银行承兑汇票编号为"' + bankIds + '"的数据项？').then(function() {
        return delBank(bankIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('bankaccept/bank/export', {
        ...this.queryParams
      }, `bank_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
