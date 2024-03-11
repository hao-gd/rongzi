<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="对外担保管理编号" prop="managementId">
        <el-input
          v-model="queryParams.managementId"
          placeholder="请输入对外担保管理编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="担保合同编号" prop="contractId">
        <el-input
          v-model="queryParams.contractId"
          placeholder="请输入担保合同编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="借款人" prop="creditor">
        <el-select v-model="queryParams.creditor" placeholder="请选择借款人" clearable>
          <el-option
            v-for="dict in dict.type.sys_1767154968256577500"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="担保人" prop="guarantor">
        <el-select v-model="queryParams.guarantor" placeholder="请选择担保人" clearable>
          <el-option
            v-for="dict in dict.type.sys_1767155091485229000"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="金融机构" prop="financialInstitution">
        <el-select v-model="queryParams.financialInstitution" placeholder="请选择金融机构" clearable>
          <el-option
            v-for="dict in dict.type.sys_acceptor"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="业务类型：股东借款、固定资产贷款、流贷贷款、银行借款、授信流资" prop="businessType">
        <el-select v-model="queryParams.businessType" placeholder="请选择业务类型：股东借款、固定资产贷款、流贷贷款、银行借款、授信流资" clearable>
          <el-option
            v-for="dict in dict.type.sys_1767155302261588000"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="担保金额" prop="guaranteeAmount">
        <el-input
          v-model="queryParams.guaranteeAmount"
          placeholder="请输入担保金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="担保余额" prop="guaranteeBalance">
        <el-input
          v-model="queryParams.guaranteeBalance"
          placeholder="请输入担保余额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开始日期">
        <el-date-picker
          v-model="daterangeStartDate"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="截止日期">
        <el-date-picker
          v-model="daterangeDeadline"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="保证方式：连带责任保证、某某责任保证、有追责权、意外责任、兼容责任" prop="guaranteeMethod">
        <el-select v-model="queryParams.guaranteeMethod" placeholder="请选择保证方式：连带责任保证、某某责任保证、有追责权、意外责任、兼容责任" clearable>
          <el-option
            v-for="dict in dict.type.sys_1767155825266131000"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否上征信：是、否" prop="isCreditInvestigation">
        <el-select v-model="queryParams.isCreditInvestigation" placeholder="请选择是否上征信：是、否" clearable>
          <el-option
            v-for="dict in dict.type.sys_1767156259322069000"
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
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['glforeign:foreign:add']"
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
          v-hasPermi="['glforeign:foreign:edit']"
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
          v-hasPermi="['glforeign:foreign:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['glforeign:foreign:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="foreignList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键id" align="center" prop="id" />
      <el-table-column label="对外担保管理编号" align="center" prop="managementId" />
      <el-table-column label="担保合同编号" align="center" prop="contractId" />
      <el-table-column label="数据唯一编号" align="center" prop="scrUuid" />
      <el-table-column label="借款人" align="center" prop="creditor">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1767154968256577500" :value="scope.row.creditor"/>
        </template>
      </el-table-column>
      <el-table-column label="担保人" align="center" prop="guarantor">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1767155091485229000" :value="scope.row.guarantor"/>
        </template>
      </el-table-column>
      <el-table-column label="金融机构" align="center" prop="financialInstitution">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_acceptor" :value="scope.row.financialInstitution"/>
        </template>
      </el-table-column>
      <el-table-column label="业务类型：股东借款、固定资产贷款、流贷贷款、银行借款、授信流资" align="center" prop="businessType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1767155302261588000" :value="scope.row.businessType"/>
        </template>
      </el-table-column>
      <el-table-column label="担保金额" align="center" prop="guaranteeAmount" />
      <el-table-column label="担保余额" align="center" prop="guaranteeBalance" />
      <el-table-column label="开始日期" align="center" prop="startDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="截止日期" align="center" prop="deadline" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.deadline, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="保证方式：连带责任保证、某某责任保证、有追责权、意外责任、兼容责任" align="center" prop="guaranteeMethod">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1767155825266131000" :value="scope.row.guaranteeMethod"/>
        </template>
      </el-table-column>
      <el-table-column label="是否上征信：是、否" align="center" prop="isCreditInvestigation">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1767156259322069000" :value="scope.row.isCreditInvestigation"/>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="comment" />
      <el-table-column label="uuid" align="center" prop="uuid" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['glforeign:foreign:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['glforeign:foreign:remove']"
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

    <!-- 添加或修改对外担保台账对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="对外担保管理编号" prop="managementId">
          <el-input v-model="form.managementId" placeholder="请输入对外担保管理编号" />
        </el-form-item>
        <el-form-item label="担保合同编号" prop="contractId">
          <el-input v-model="form.contractId" placeholder="请输入担保合同编号" />
        </el-form-item>
        <el-form-item label="数据唯一编号" prop="scrUuid">
          <div class="p20 appendix">
                  <file-upload v-model="form.scrUuid" :managementId="form.managementId"
                    @input="upload_completed" :fileSize="10000" :limit="1000" :isShowTip="false" />
                </div>
        </el-form-item>
        <el-form-item label="借款人" prop="creditor">
          <el-select v-model="form.creditor" placeholder="请选择借款人">
            <el-option
              v-for="dict in dict.type.sys_1767154968256577500"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="担保人" prop="guarantor">
          <el-select v-model="form.guarantor" placeholder="请选择担保人">
            <el-option
              v-for="dict in dict.type.sys_1767155091485229000"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金融机构" prop="financialInstitution">
          <el-select v-model="form.financialInstitution" placeholder="请选择金融机构">
            <el-option
              v-for="dict in dict.type.sys_acceptor"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务类型：股东借款、固定资产贷款、流贷贷款、银行借款、授信流资" prop="businessType">
          <el-select v-model="form.businessType" placeholder="请选择业务类型：股东借款、固定资产贷款、流贷贷款、银行借款、授信流资">
            <el-option
              v-for="dict in dict.type.sys_1767155302261588000"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="担保金额" prop="guaranteeAmount">
          <el-input v-model="form.guaranteeAmount" placeholder="请输入担保金额" />
        </el-form-item>
        <el-form-item label="担保余额" prop="guaranteeBalance">
          <el-input v-model="form.guaranteeBalance" placeholder="请输入担保余额" />
        </el-form-item>
        <el-form-item label="开始日期" prop="startDate">
          <el-date-picker clearable
            v-model="form.startDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="截止日期" prop="deadline">
          <el-date-picker clearable
            v-model="form.deadline"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择截止日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="保证方式：连带责任保证、某某责任保证、有追责权、意外责任、兼容责任" prop="guaranteeMethod">
          <el-select v-model="form.guaranteeMethod" placeholder="请选择保证方式：连带责任保证、某某责任保证、有追责权、意外责任、兼容责任">
            <el-option
              v-for="dict in dict.type.sys_1767155825266131000"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否上征信：是、否" prop="isCreditInvestigation">
          <el-select v-model="form.isCreditInvestigation" placeholder="请选择是否上征信：是、否">
            <el-option
              v-for="dict in dict.type.sys_1767156259322069000"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="comment">
          <el-input v-model="form.comment" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="uuid" prop="uuid">
          <el-input v-model="form.uuid" placeholder="请输入uuid" />
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
import { listForeign, getForeign, delForeign, addForeign, updateForeign } from "@/api/glforeign/foreign";

export default {
  name: "Foreign",
  dicts: ['sys_1767156259322069000', 'sys_1767154968256577500', 'sys_1767155091485229000', 'sys_acceptor', 'sys_1767155302261588000', 'sys_1767155825266131000'],
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
      // 对外担保台账表格数据
      foreignList: [],
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
      // 创建人时间范围
      daterangeCreateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        managementId: null,
        contractId: null,
        scrUuid: null,
        creditor: null,
        guarantor: null,
        financialInstitution: null,
        businessType: null,
        guaranteeAmount: null,
        guaranteeBalance: null,
        startDate: null,
        deadline: null,
        guaranteeMethod: null,
        isCreditInvestigation: null,
        comment: null,
        uuid: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        managementId: [
          { required: true, message: "对外担保管理编号不能为空", trigger: "blur" }
        ],
        contractId: [
          { required: true, message: "担保合同编号不能为空", trigger: "blur" }
        ],
        scrUuid: [
          { required: true, message: "数据唯一编号不能为空", trigger: "blur" }
        ],
        creditor: [
          { required: true, message: "借款人不能为空", trigger: "change" }
        ],
        guarantor: [
          { required: true, message: "担保人不能为空", trigger: "change" }
        ],
        financialInstitution: [
          { required: true, message: "金融机构不能为空", trigger: "change" }
        ],
        businessType: [
          { required: true, message: "业务类型：股东借款、固定资产贷款、流贷贷款、银行借款、授信流资不能为空", trigger: "change" }
        ],
        guaranteeAmount: [
          { required: true, message: "担保金额不能为空", trigger: "blur" }
        ],
        guaranteeBalance: [
          { required: true, message: "担保余额不能为空", trigger: "blur" }
        ],
        startDate: [
          { required: true, message: "开始日期不能为空", trigger: "blur" }
        ],
        deadline: [
          { required: true, message: "截止日期不能为空", trigger: "blur" }
        ],
        guaranteeMethod: [
          { required: true, message: "保证方式：连带责任保证、某某责任保证、有追责权、意外责任、兼容责任不能为空", trigger: "change" }
        ],
        isCreditInvestigation: [
          { required: true, message: "是否上征信：是、否不能为空", trigger: "change" }
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
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询对外担保台账列表 */
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
      if (null != this.daterangeCreateTime && '' != this.daterangeCreateTime) {
        this.queryParams.params["beginCreateTime"] = this.daterangeCreateTime[0];
        this.queryParams.params["endCreateTime"] = this.daterangeCreateTime[1];
      }
      listForeign(this.queryParams).then(response => {
        this.foreignList = response.rows;
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
        contractId: null,
        scrUuid: null,
        creditor: null,
        guarantor: null,
        financialInstitution: null,
        businessType: null,
        guaranteeAmount: null,
        guaranteeBalance: null,
        startDate: null,
        deadline: null,
        guaranteeMethod: null,
        isCreditInvestigation: null,
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
      this.daterangeCreateTime = [];
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
      this.title = "添加对外担保台账";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getForeign(id).then(response => {
        this.form = response.data;
        this.rzsrc2List = response.data.rzsrc2List;
        this.open = true;
        this.title = "修改对外担保台账";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.rzsrc2List = this.rzsrc2List;
          if (this.form.id != null) {
            updateForeign(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addForeign(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除对外担保台账编号为"' + ids + '"的数据项？').then(function() {
        return delForeign(ids);
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
      this.download('glforeign/foreign/export', {
        ...this.queryParams
      }, `foreign_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
