<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="借款金额" prop="loanAmount">
        <el-input
          v-model="queryParams.loanAmount"
          placeholder="请输入借款金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="借款方" prop="borrower">
        <el-input
          v-model="queryParams.borrower"
          placeholder="请输入借款方"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收款方" prop="payee">
        <el-input
          v-model="queryParams.payee"
          placeholder="请输入收款方"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="借款日期">
        <el-date-picker
          v-model="daterangeLoanDate"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="到期日期">
        <el-date-picker
          v-model="daterangeDueDate"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="借款期限" prop="loanTerm">
        <el-input
          v-model="queryParams.loanTerm"
          placeholder="请输入借款期限"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="利率" prop="rate">
        <el-input
          v-model="queryParams.rate"
          placeholder="请输入利率"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同编号" prop="contractId">
        <el-input
          v-model="queryParams.contractId"
          placeholder="请输入合同编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="还款方式：先息后本" prop="repaymentMethod">
        <el-input
          v-model="queryParams.repaymentMethod"
          placeholder="请输入还款方式：先息后本"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="借款用途：保交楼、城中村改造" prop="loanUse">
        <el-input
          v-model="queryParams.loanUse"
          placeholder="请输入借款用途：保交楼、城中村改造"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="uuid" prop="uuid">
        <el-input
          v-model="queryParams.uuid"
          placeholder="请输入uuid"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="专项借款管理编号" prop="managementId">
        <el-input
          v-model="queryParams.managementId"
          placeholder="请输入专项借款管理编号"
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
          v-hasPermi="['rzspecialloans:special:add']"
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
          v-hasPermi="['rzspecialloans:special:edit']"
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
          v-hasPermi="['rzspecialloans:special:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['rzspecialloans:special:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="specialList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键id" align="center" prop="id" />
      <el-table-column label="数据唯一编号" align="center" prop="scrUuid" />
      <el-table-column label="借款金额" align="center" prop="loanAmount" />
      <el-table-column label="借款方" align="center" prop="borrower">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1759501577938272300" :value="scope.row.borrower"/>
        </template>
      </el-table-column>
      <el-table-column label="收款方" align="center" prop="payee">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1759501640206909400" :value="scope.row.payee"/>
        </template>
      </el-table-column>
      <el-table-column label="借款日期" align="center" prop="loanDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.loanDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="到期日期" align="center" prop="dueDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dueDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="借款期限" align="center" prop="loanTerm" />
      <el-table-column label="利率" align="center" prop="rate" />
      <el-table-column label="合同编号" align="center" prop="contractId" />
      <el-table-column label="还款方式：先息后本" align="center" prop="repaymentMethod">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1759501742422098000" :value="scope.row.repaymentMethod"/>
        </template>
      </el-table-column>
      <el-table-column label="借款用途：保交楼、城中村改造" align="center" prop="loanUse">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1759501814702538800" :value="scope.row.loanUse"/>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="comment" />
      <el-table-column label="uuid" align="center" prop="uuid" />
      <el-table-column label="专项借款管理编号" align="center" prop="managementId" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['rzspecialloans:special:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['rzspecialloans:special:remove']"
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

    <!-- 添加或修改专项借款对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="数据唯一编号" prop="scrUuid">
          <file-upload v-model="form.scrUuid"/>
        </el-form-item>
        <el-form-item label="借款金额" prop="loanAmount">
          <el-input v-model="form.loanAmount" placeholder="请输入借款金额" />
        </el-form-item>
        <el-form-item label="借款方" prop="borrower">
          <el-input v-model="form.borrower" placeholder="请输入借款方" />
        </el-form-item>
        <el-form-item label="收款方" prop="payee">
          <el-input v-model="form.payee" placeholder="请输入收款方" />
        </el-form-item>
        <el-form-item label="借款日期" prop="loanDate">
          <el-date-picker clearable
            v-model="form.loanDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择借款日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="到期日期" prop="dueDate">
          <el-date-picker clearable
            v-model="form.dueDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择到期日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="借款期限" prop="loanTerm">
          <el-input v-model="form.loanTerm" placeholder="请输入借款期限" />
        </el-form-item>
        <el-form-item label="利率" prop="rate">
          <el-input v-model="form.rate" placeholder="请输入利率" />
        </el-form-item>
        <el-form-item label="合同编号" prop="contractId">
          <el-input v-model="form.contractId" placeholder="请输入合同编号" />
        </el-form-item>
        <el-form-item label="还款方式：先息后本" prop="repaymentMethod">
          <el-input v-model="form.repaymentMethod" placeholder="请输入还款方式：先息后本" />
        </el-form-item>
        <el-form-item label="借款用途：保交楼、城中村改造" prop="loanUse">
          <el-input v-model="form.loanUse" placeholder="请输入借款用途：保交楼、城中村改造" />
        </el-form-item>
        <el-form-item label="备注" prop="comment">
          <el-input v-model="form.comment" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="uuid" prop="uuid">
          <el-input v-model="form.uuid" placeholder="请输入uuid" />
        </el-form-item>
        <el-form-item label="专项借款管理编号" prop="managementId">
          <el-input v-model="form.managementId" placeholder="请输入专项借款管理编号" />
        </el-form-item>
        <el-divider content-position="center">附件表信息</el-divider>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddrzsrc2">添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleterzsrc2">删除</el-button>
          </el-col>
        </el-row>
        <el-table :data="rzsrc2List" :row-class-name="rowrzsrc2Index" @selection-change="handlerzsrc2SelectionChange" ref="rzsrc2">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="序号" align="center" prop="index" width="50"/>
          <el-table-column label="url地址" prop="url" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.url" placeholder="请输入url地址" />
            </template>
          </el-table-column>
          <el-table-column label="各个项目管理编号" prop="projectManagementId" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.projectManagementId" placeholder="请输入各个项目管理编号" />
            </template>
          </el-table-column>
          <el-table-column label="种类筛选：下拉" prop="type" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.type" placeholder="请输入种类筛选：下拉" />
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listSpecial, getSpecial, delSpecial, addSpecial, updateSpecial } from "@/api/rzspecialloans/special";

export default {
  name: "Special",
  data() {
    return {
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
      // 专项借款表格数据
      specialList: [],
      // 附件表表格数据
      rzsrc2List: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 创建人时间范围
      daterangeLoanDate: [],
      // 创建人时间范围
      daterangeDueDate: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        scrUuid: null,
        loanAmount: null,
        borrower: null,
        payee: null,
        loanDate: null,
        dueDate: null,
        loanTerm: null,
        rate: null,
        contractId: null,
        repaymentMethod: null,
        loanUse: null,
        comment: null,
        uuid: null,
        managementId: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询专项借款列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeLoanDate && '' != this.daterangeLoanDate) {
        this.queryParams.params["beginLoanDate"] = this.daterangeLoanDate[0];
        this.queryParams.params["endLoanDate"] = this.daterangeLoanDate[1];
      }
      if (null != this.daterangeDueDate && '' != this.daterangeDueDate) {
        this.queryParams.params["beginDueDate"] = this.daterangeDueDate[0];
        this.queryParams.params["endDueDate"] = this.daterangeDueDate[1];
      }
      listSpecial(this.queryParams).then(response => {
        this.specialList = response.rows;
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
        scrUuid: null,
        loanAmount: null,
        borrower: null,
        payee: null,
        loanDate: null,
        dueDate: null,
        loanTerm: null,
        rate: null,
        contractId: null,
        repaymentMethod: null,
        loanUse: null,
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
      this.daterangeLoanDate = [];
      this.daterangeDueDate = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加专项借款";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getSpecial(id).then(response => {
        this.form = response.data;
        this.rzsrc2List = response.data.rzsrc2List;
        this.open = true;
        this.title = "修改专项借款";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.rzsrc2List = this.rzsrc2List;
          if (this.form.id != null) {
            updateSpecial(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSpecial(this.form).then(response => {
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
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除专项借款编号为"' + ids + '"的数据项？').then(function() {
        return delSpecial(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
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
      obj.type = "";
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
      this.download('rzspecialloans/special/export', {
        ...this.queryParams
      }, `special_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
