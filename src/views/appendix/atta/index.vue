<template>
  <div class="app-container">
    <!-- <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="url地址" prop="url">
        <el-input
          v-model="queryParams.url"
          placeholder="请输入url地址"
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
      <el-form-item label="各个项目管理编号" prop="projectManagementId">
        <el-input
          v-model="queryParams.projectManagementId"
          placeholder="请输入各个项目管理编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="种类筛选：下拉" prop="type">
        <el-input
          v-model="queryParams.type"
          placeholder="请输入种类筛选：下拉"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form> -->


    <search-panel HeaderIcon="FundingSharing" title="融资分享区">
      <el-form :model="queryParams" ref="queryForm" size="small" label-position="left" v-show="showSearch" label-width="120px">
        <!-- 第一行：包含三个表单项 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="管理编号" prop="projectManagementId">
              <el-input v-model="queryParams.projectManagementId" placeholder="请输入各个项目管理编号" clearable
                @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关键字" prop="url">
              <el-input v-model="queryParams.url" placeholder="请输入关键字" clearable
                @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="种类" prop="type">
              <!-- <el-input v-model="queryParams.type" placeholder="请输入种类筛选：下拉" clearable
              @keyup.enter.native="handleQuery"></el-input> -->
              <el-select v-model="queryParams.type" clearable placeholder="请选择">
                <el-option v-for="item in tooGens" :key="item.tableName" :label="item.tableComment"
                  :value="item.tableName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第二行：包含搜索和重置按钮，这里使用了一个 el-col 来包裹按钮，您也可以根据需要调整按钮的布局 -->
        <el-row :gutter="20">
          <el-col :span="24">
            <div style="display: flex; justify-content: end;">
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">查 询</el-button>
              <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重 置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </search-panel>

    <el-divider class="mt20 mb20"></el-divider>

    <el-row :gutter="10" class="mb8" type="flex" justify="end">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-refresh-right" size="mini" @click="getList"
          v-hasPermi="['appendix:atta:add']">刷 新</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['appendix:atta:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['appendix:atta:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['appendix:atta:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['appendix:atta:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="attaList" @selection-change="handleSelectionChange"
      :header-cell-style="header_cell_style">
      <el-table-column fixed="left" type="selection" width="55" align="center" />
      <!-- <el-table-column label="资源id主键" align="center" prop="id" /> -->
      <!-- <el-table-column label="url地址" align="center" prop="url" /> -->
      <!-- <el-table-column label="数据唯一编号" align="center" prop="scrUuid" /> -->
      <el-table-column label="管理编号" align="center" prop="projectManagementId" />
      <el-table-column label="上传人" align="center" prop="createBy" />
      <el-table-column label="上传时间" align="center" prop="createTime" />
      <el-table-column label="种类" align="center" prop="type">
        <template slot-scope="scope">
          {{ getType(scope.row.type) }}
        </template>
      </el-table-column>
      <el-table-column label="文件名" align="center" prop="url">
        <template slot-scope="scope">
          {{ extractAndCleanFileName(scope.row.url) }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['appendix:atta:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['appendix:atta:remove']">删除</el-button> -->

          <!-- <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['appendix:atta:remove']">下载</el-button> -->

          <el-link :href="`${baseUrl}${scope.row.url}`" :underline="false" target="_blank">
            <span class="el-icon-document"> 下 载 </span>
          </el-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改附件表对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="url地址" prop="url">
          <el-input v-model="form.url" placeholder="请输入url地址" />
        </el-form-item>
        <el-form-item label="数据唯一编号" prop="scrUuid">
          <el-input v-model="form.scrUuid" placeholder="请输入数据唯一编号" />
        </el-form-item>
        <el-form-item label="各个项目管理编号" prop="projectManagementId">
          <el-input v-model="form.projectManagementId" placeholder="请输入各个项目管理编号" />
        </el-form-item>
        <el-form-item label="种类筛选：下拉" prop="type">
          <el-input v-model="form.type" placeholder="请输入种类筛选：下拉" />
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
import { listAtta, getAtta, delAtta, addAtta, updateAtta } from "@/api/appendix/atta";
import { listTable, previewTable, delTable, genCode, synchDb } from "@/api/tool/gen";
import SearchPanel from '@/components/SearchPanel/index.vue'
export default {
  name: "Atta",
  components: {
    SearchPanel
  },
  data() {
    return {
      header_cell_style: {
        backgroundColor: '#f2f4f5',
        color: '#000000',
        fontSize: '14px',
        fontWeight: 'bold',
      },
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
        pageSize: 10,
        url: null,
        scrUuid: null,
        projectManagementId: null,
        type: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      tooGens: []
    };
  },
  created() {
    this.getList();
    this.getToolGenList();
  },
  methods: {
    /** 查询表集合 */
    getToolGenList() {
      this.loading = true;
      const search = {
        pageNum: 1,
        pageSize: 10000,
      }
      listTable(this.addDateRange(search)).then(response => {
        this.tooGens = response.rows;
        // this.total = response.total;
        this.loading = false;
      }
      );
    },
    /** 查询附件表列表 */
    getList() {
      this.loading = true;
      listAtta(this.queryParams).then(response => {
        this.attaList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    // 获取种类
    getType(type) {
      const data = this.tooGens.find(i => i.tableName === type)
      if (data) {
        return data.tableComment;
      } else {
        return type;
      }
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
      fileName = fileName.replace(/(_\d+)*(_[A-Za-z0-9]+)?\.[^.]+$/, '');
      // 假设你想保留原始的文件扩展名，你可以在这里添加它回来
      // 例如：fileName += '.xls'; // 如果你知道原始的扩展名是.xls
      return fileName;
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
        url: null,
        scrUuid: null,
        projectManagementId: null,
        type: null,
        createTime: null,
        createBy: null
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
      this.$modal.confirm('是否确认删除附件表编号为"' + ids + '"的数据项？').then(function () {
        return delAtta(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
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
