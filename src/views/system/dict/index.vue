<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="信息名称" prop="dictName">
        <el-input v-model="queryParams.dictName" placeholder="请输入信息名称" clearable style="width: 240px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="信息类型" prop="dictType">
        <el-input v-model="queryParams.dictType" placeholder="请输入信息类型" clearable style="width: 240px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select filterable v-model="queryParams.status" placeholder="信息状态" clearable style="width: 240px">
          <el-option v-for="dict in dict.type.sys_normal_disable" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="起始日">
        <el-date-picker format='yyyy/MM/dd' v-model="beginTime" :picker-options="pickerOptions1" style="width: 240px"
          value-format="yyyy-MM-dd" type="date" placeholder="起始日"></el-date-picker>
      </el-form-item>
      <el-form-item label="截止日">
        <el-date-picker format='yyyy/MM/dd' v-model="endTime" :picker-options="pickerOptions2" style="width: 240px"
          value-format="yyyy-MM-dd" type="date" placeholder="截止日"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
      <!-- <h1 class="tc mt10 mb10" style="color: red;"></h1> -->
    </el-form>
    <el-alert class="tc mt10 mb10" title="基本数据在你不确定的情况下，请勿随意删除" type="warning" center effect="dark">
    </el-alert>
    <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    <el-row :gutter="10" class="mb8">
<!--      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['system:dict:add']">新增类型</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['system:dict:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['system:dict:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['system:dict:export']">导出</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-refresh" size="mini" @click="handleRefreshCache"
          v-hasPermi="['system:dict:remove']">刷新缓存</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="typeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="信息编号" align="center" prop="dictId" />
      <el-table-column label="信息名称" align="center" prop="dictName" :show-overflow-tooltip="true" />
      <el-table-column label="信息类型" align="center" :show-overflow-tooltip="true" v-if="roles.includes('admin')">
        <template slot-scope="scope">
          <router-link :to="'/system/dict-data/index/' + scope.row.dictId" class="link-type">
            <span>{{ scope.row.dictType }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <router-link :to="'/system/dict-data/index/' + scope.row.dictId" class="link-type">
            录入数据
          </router-link> -->

          <div>
            <el-button size="mini" type="text" icon="el-icon-plus" @click="handleAddInfo(scope.row)"
              v-hasPermi="['system:dict:edit']">添加数据</el-button>
            <!--   <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
              v-hasPermi="['system:dict:edit']">修改</el-button>
            <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
              v-hasPermi="['system:dict:remove']">删除</el-button> -->
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="信息名称" prop="dictName">
          <el-input v-model="form.dictName" placeholder="请输入信息名称" />
        </el-form-item>
        <!-- <el-form-item label="信息类型" prop="dictType" v-if="roles.includes('admin')">
          <el-input v-model="form.dictType" placeholder="请输入信息类型" />
        </el-form-item> -->
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio v-for="dict in dict.type.sys_normal_disable" :key="dict.value" :label="dict.value">
              {{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
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
    listType,
    getType,
    delType,
    addType,
    updateType,
    refreshCache
  } from "@/api/system/dict/type";
  import {
    mapGetters
  } from 'vuex';
  import {
    SnowflakeIdGenerator
  } from '@/utils/index'
  export default {
    name: "Dict",
    dicts: ['sys_normal_disable'],
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
        // 字典表格数据
        typeList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 日期范围
        dateRange: [],
        beginTime: '',
        endTime: '',
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 100,
          dictName: undefined,
          dictType: undefined,
          status: undefined
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          dictName: [{
            required: true,
            message: "信息名称不能为空",
            trigger: "blur"
          }],
          dictType: [{
            required: true,
            message: "信息类型不能为空",
            trigger: "blur"
          }]
        },
        pickerOptions1: {
          // 禁用开始日期中，所有大于结束日期的日期
          disabledDate: (date) => {
            if (this.endTime) {
              return date.getTime() > new Date(this.endTime).getTime();
            }
          }
        },
        pickerOptions2: {
          // 禁用结束日期中，所有小于开始日期的日期
          disabledDate: (date) => {
            if (this.beginTime) {
              // 一天的毫秒数
              var oneDayInMilliseconds = 24 * 60 * 60 * 1000;
              return date.getTime() < new Date(this.form.beginTime).getTime() - oneDayInMilliseconds;
            }
          }
        },
      };
    },
    computed: {
      ...mapGetters(['roles']),
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询字典类型列表 */
      getList() {
        this.loading = true;
        let search = this.queryParams;
        search.params = typeof(search.params) === 'object' && search.params !== null && !Array.isArray(search.params) ?
          search.params : {};

        if (![null, undefined, ''].includes(this.beginTime) && ![null, undefined, ''].includes(this.endTime)) {
          search.params['beginTime'] = this.beginTime;
          search.params['endTime'] = this.endTime;
        }
        if (this.beginTime == '') {
          search.params['beginTime'] = '';
        }

        if (this.endTime == '') {
          search.params['endTime'] = '';
        }



        listType(search).then(response => {
          this.typeList = response.rows;
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
          dictId: undefined,
          dictName: undefined,
          dictType: undefined,
          status: "0",
          remark: undefined
        };
        this.beginTime = '';
        this.endTime = '';
        this.resetForm("form");
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.beginTime = '';
        this.endTime = '';
        this.resetForm("queryForm");
        this.handleQuery();
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加信息类型";
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.dictId)
        this.single = selection.length != 1
        this.multiple = !selection.length
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const dictId = row.dictId || this.ids
        getType(dictId).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改信息类型";
        });
      },
      /* 跳转到信息数据录入页面 */
      handleAddInfo(row) {
        this.$router.push('/system/dict-data/index/' + row.dictId);
      },
      /** 提交按钮 */
      submitForm: function() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            const generator = new SnowflakeIdGenerator();
            this.form.dictType = this.form.dictType !== undefined ?
              this.form.dictType :
              'sys_' + generator.nextId()
            console.log(this.form);
            if (this.form.dictId != undefined) {
              updateType(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addType(this.form).then(response => {
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
        const dictIds = row.dictId || this.ids;
        this.$modal.confirm('是否确认删除信息编号为"' + dictIds + '"的数据项？').then(function() {
          return delType(dictIds);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('system/dict/type/export', {
          ...this.queryParams
        }, `type_${new Date().getTime()}.xlsx`)
      },
      /** 刷新缓存按钮操作 */
      handleRefreshCache() {
        refreshCache().then(() => {
          this.$modal.msgSuccess("刷新成功");
          this.$store.dispatch('dict/cleanDict');
        });
      }
    }
  };
</script>
