<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="queryParams.title" placeholder="请输入标题" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="备注" prop="comment">
        <el-input v-model="queryParams.comment" placeholder="请输入备注" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['appendix:atta:add']">新增</el-button>
      </el-col>
      <!--      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['appendix:atta:edit']">修改</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['appendix:atta:remove']">删除</el-button>
      </el-col>

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="attaList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="标题" align="center" prop="title" />
      <el-table-column label="备注" align="center" prop="comment" />
      <el-table-column show-overflow-tooltip label="文件名" align="center" prop="url" min-width="180">
        <template slot-scope="scope">
          {{ extractAndCleanFileName(scope.row.url) }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" align="center" prop="createBy" />
      <el-table-column label="操作" align="center" class-name="''">
        <template slot-scope="scope">
          <el-button v-if="scope.row.createBy == name" size="mini" type="text" icon="el-icon-edit"
            @click="handleUpdate(scope.row)" v-hasPermi="['appendix:atta:edit']">修改</el-button>

          <el-link style="margin-left: 30px;" :href="`${baseUrl}${scope.row.url}`" :underline="false" target="_blank">
            <span class="el-icon-document"> 下 载 </span>
          </el-link>
        </template>

      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改附件表对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="备注" prop="comment">
          <el-input v-model="form.comment" placeholder="请输入备注" />
        </el-form-item>

        <el-form-item label="附件" prop="scrUuid">
          <div class="p20 appendix">
            <file-upload v-model="form.url" managementId='占位' :fileSize="10000" :limit="1" :isShowTip="false" />
          </div>
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
  import {
    listAtta,
    getAtta,
    delAtta,
    addAtta,
    updateAtta
  } from "@/api/appendix/atta";
  import {
    mapGetters
  } from 'vuex';
  import moment from 'moment';
  export default {
    name: "Atta",
    data() {
      return {
        baseUrl: process.env.VUE_APP_BASE_API,
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
        // 附件表表格数据
        attaList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 100,
          title: null,
          comment: null,
          scrUuid: null,
          projectManagementId: null,
          type: null,
          createBy: null
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {}
      };
    },
    computed: {
      ...mapGetters([
        'name', 'avatar'
      ]),
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询附件表列表 */
      getList() {
        this.loading = true;
        this.queryParams['orderByColumn'] = 'id'
        listAtta(this.queryParams).then(response => {
          this.attaList = response.rows;
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
          title: null,
          comment: null,
          url: null,
          scrUuid: null,
          projectManagementId: null,
          type: null,
          createTime: null,
          createBy: null
        };
        this.resetForm("form");
      },
      // 分割文件的名称
      extractAndCleanFileName(path) {
        // 使用split方法按'/'分割路径
        const parts = path.split('/');
        // 使用pop方法获取数组的最后一个元素，即文件名
        let fileName = parts.pop();
        // 使用正则表达式去除文件名末尾的日期时间标记和可能的序列号
        // 此正则表达式匹配以下模式：
        // - 一串数字开始（可能的日期时间标记），后接_
        // - 可能的另一串数字（可能的另一个日期时间标记），后接_
        // - 可能的字母和数字的组合（可能的序列号），后接.
        // - 文件扩展名（任意字符）
        // fileName = fileName.replace(/(_\d+)*(_[A-Za-z0-9]+)?\.[^.]+$/, '');
        // 假设你想保留原始的文件扩展名，你可以在这里添加它回来
        // 例如：fileName += '.xls'; // 如果你知道原始的扩展名是.xls
        return fileName;
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
        this.open = true;
        this.title = "添加附件表";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getAtta(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改附件表";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.form.createBy = this.name
            if (this.form.id != null) {
              updateAtta(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addAtta(this.form).then(response => {
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
        this.$modal.confirm('是否确认删除附件表编号为"' + ids + '"的数据项？').then(function() {
          return delAtta(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('appendix/atta/export', {
          ...this.queryParams
        }, `atta_${new Date().getTime()}.xlsx`)
      }
    }
  };
</script>
