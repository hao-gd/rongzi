<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="审核id" prop="auditId">
        <el-input
          v-model="queryParams.auditId"
          placeholder="请输入审核id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="数据唯一编号" prop="scrUuid">
        <el-input
          v-model="queryParams.scrUuid"
          placeholder="请输入数据唯一编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建人" prop="createBy">
        <el-input
          v-model="queryParams.createBy"
          placeholder="请输入创建人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="父级表名" prop="tableName">
        <el-input
          v-model="queryParams.tableName"
          placeholder="请输入父级表名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审核状态：待审批、审批不通过、审批通过、已撤回" prop="auditState">
        <el-select v-model="queryParams.auditState" placeholder="请选择审核状态：待审批、审批不通过、审批通过、已撤回" clearable>
          <el-option
            v-for="dict in dict.type.sys_1759514730105405400"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
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
          v-hasPermi="['rzauditlist:list:add']"
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
          v-hasPermi="['rzauditlist:list:edit']"
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
          v-hasPermi="['rzauditlist:list:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['rzauditlist:list:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="listList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键id" align="center" prop="id" />
      <el-table-column label="审核id" align="center" prop="auditId" />
      <el-table-column label="数据唯一编号" align="center" prop="scrUuid" />
      <el-table-column label="创建人" align="center" prop="createBy" />
      <el-table-column label="数据json文件" align="center" prop="dataJson" />
      <el-table-column label="父级表名" align="center" prop="tableName" />
      <el-table-column label="审核状态：待审批、审批不通过、审批通过、已撤回" align="center" prop="auditState">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1759514730105405400" :value="scope.row.auditState"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['rzauditlist:list:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['rzauditlist:list:remove']"
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

    <!-- 添加或修改审核项目对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="审核id" prop="auditId">
          <el-input v-model="form.auditId" placeholder="请输入审核id" />
        </el-form-item>
        <el-form-item label="数据唯一编号" prop="scrUuid">
          <el-input v-model="form.scrUuid" placeholder="请输入数据唯一编号" />
        </el-form-item>
        <el-form-item label="数据json文件" prop="dataJson">
          <el-input v-model="form.dataJson" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="父级表名" prop="tableName">
          <el-input v-model="form.tableName" placeholder="请输入父级表名" />
        </el-form-item>
        <el-form-item label="审核状态：待审批、审批不通过、审批通过、已撤回" prop="auditState">
          <el-select v-model="form.auditState" placeholder="请选择审核状态：待审批、审批不通过、审批通过、已撤回">
            <el-option
              v-for="dict in dict.type.sys_1759514730105405400"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
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
import { listList, getList, delList, addList, updateList } from "@/api/rzauditlist/list";

export default {
  name: "List",
  dicts: ['sys_1759514730105405400'],
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
      // 审核项目表格数据
      listList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        auditId: null,
        scrUuid: null,
        createBy: null,
        dataJson: null,
        tableName: null,
        auditState: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        createBy: [
          { required: true, message: "创建人不能为空", trigger: "blur" }
        ],
        dataJson: [
          { required: true, message: "数据json文件不能为空", trigger: "blur" }
        ],
        tableName: [
          { required: true, message: "父级表名不能为空", trigger: "blur" }
        ],
        auditState: [
          { required: true, message: "审核状态：待审批、审批不通过、审批通过、已撤回不能为空", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询审核项目列表 */
    getList() {
      this.loading = true;
      listList(this.queryParams).then(response => {
        this.listList = response.rows;
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
        auditId: null,
        scrUuid: null,
        createBy: null,
        createTime: null,
        dataJson: null,
        tableName: null,
        auditState: null
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加审核项目";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getList(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改审核项目";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateList(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addList(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除审核项目编号为"' + ids + '"的数据项？').then(function() {
        return delList(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('rzauditlist/list/export', {
        ...this.queryParams
      }, `list_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
