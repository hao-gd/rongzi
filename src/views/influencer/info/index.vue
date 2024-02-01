<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="id" prop="id">
        <el-input v-model="queryParams.id" placeholder="请输入id" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="红人编号" prop="uid">
        <el-input v-model="queryParams.uid" placeholder="请输入红人编号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="站点" prop="site">
        <el-select v-model="queryParams.site" placeholder="请选择站点" clearable>
          <el-option v-for="dict in dict.type.influencer_site" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="红人名称" prop="name">
        <el-input v-model="queryParams.name" placeholder="请输入红人名称" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="红人类型" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择红人类型" clearable>
          <el-option v-for="dict in dict.type.influencer_type" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="业务线" prop="lineOfBusiness">
        <el-select v-model="queryParams.lineOfBusiness" placeholder="请选择业务线" clearable>
          <el-option v-for="dict in dict.type.influencer_line_of_business" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker v-model="daterangeCreatTime" style="width: 240px" value-format="yyyy-MM-dd" type="daterange"
          range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="修改时间">
        <el-date-picker v-model="daterangeUpdateTime" style="width: 240px" value-format="yyyy-MM-dd" type="daterange"
          range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['influencer:info:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['influencer:info:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['influencer:info:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['influencer:info:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="infoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="红人编号" align="center" prop="uid" />
      <el-table-column label="站点" align="center" prop="site">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.influencer_site" :value="scope.row.site" />
        </template>
      </el-table-column>
      <el-table-column label="红人名称" align="center" prop="name" />
      <el-table-column label="红人类型" align="center" prop="type">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.influencer_type" :value="scope.row.type" />
        </template>
      </el-table-column>
      <el-table-column label="业务线" align="center" prop="lineOfBusiness">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.influencer_line_of_business" :value="scope.row.lineOfBusiness" />
        </template>
      </el-table-column>
      <el-table-column label="Profile Link" align="center" prop="profileLink" />
      <el-table-column label="头像" align="center" prop="avatar" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.avatar" :width="50" :height="50" />
        </template>
      </el-table-column>
      <el-table-column label="Banner" align="center" prop="banner" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.banner" :width="50" :height="50" />
        </template>
      </el-table-column>
      <el-table-column label="influencer 报价" align="center" prop="influencerCommission" />
      <el-table-column label="influencer 报价百分比" align="center" prop="influencerCommissionPercentage">
        <template slot-scope="scope">
          {{scope.row.influencerCommissionPercentage}}%
        </template>
      </el-table-column>

      <el-table-column label="版权佣金" align="center" prop="copyrightCommission" />
      <el-table-column label="版权佣金百分比" align="center" prop="copyrightCommissionPercentage">
        <template slot-scope="scope">
          {{scope.row.copyrightCommissionPercentage}}%
        </template>
      </el-table-column>
      <el-table-column label="Video 佣金" align="center" prop="vdeoCommission" />
      <el-table-column label="Video 佣金百分比" align="center" prop="vdeoCommissionPercentage">
        <template slot-scope="scope">
          {{scope.row.vdeoCommissionPercentage}}%
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="creatTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.creatTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['influencer:info:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['influencer:info:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改红人对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body width="600px">
      <el-form ref="form" :model="form" :rules="rules" label-width="160px">
        <el-form-item label="红人编号" prop="uid">
          <el-input v-model="form.uid" placeholder="请输入红人编号" />
        </el-form-item>
        <el-form-item label="站点" prop="site">
          <el-select v-model="form.site" placeholder="请选择站点">
            <el-option v-for="dict in dict.type.influencer_site" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="红人名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入红人名称" />
        </el-form-item>
        <el-form-item label="红人类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择红人类型">
            <el-option v-for="dict in dict.type.influencer_type" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务线" prop="lineOfBusiness">
          <el-select v-model="form.lineOfBusiness" placeholder="请选择业务线">
            <el-option v-for="dict in dict.type.influencer_line_of_business" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Profile Link" prop="profileLink">
          <el-input v-model="form.profileLink" placeholder="请输入Profile Link" />
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <image-upload :limit='1' v-model="form.avatar" />
        </el-form-item>
        <el-form-item label="Banner" prop="banner">
          <image-upload :limit='1' v-model="form.banner" />
        </el-form-item>
        <el-form-item label="influencer 报价" prop="influencerCommission">
          <el-input v-model="form.influencerCommission" placeholder="请输入influencer 报价" />
        </el-form-item>
        <el-form-item label="influencer 报价百分比" prop="influencerCommissionPercentage">
          <el-input v-model="form.influencerCommissionPercentage" placeholder="请输入influencer 报价百分比" />
        </el-form-item>
        <el-form-item label="版权佣金" prop="copyrightCommission">
          <el-input v-model="form.copyrightCommission" placeholder="请输入版权佣金" />
        </el-form-item>
        <el-form-item label="版权佣金百分比" prop="copyrightCommissionPercentage">
          <el-input v-model="form.copyrightCommissionPercentage" placeholder="请输入版权佣金百分比" />
        </el-form-item>
        <el-form-item label="Video 佣金" prop="vdeoCommission">
          <el-input v-model="form.vdeoCommission" placeholder="请输入Video 佣金" />
        </el-form-item>
        <el-form-item label="Video 佣金百分比" prop="vdeoCommissionPercentage">
          <el-input v-model="form.vdeoCommissionPercentage" placeholder="请输入Video 佣金百分比" />
        </el-form-item>
        <el-col :span="6" :offset="8">
          <el-tag>所有百分比直接输入数字，不用带%</el-tag>
        </el-col>

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
    listInfo,
    getInfo,
    delInfo,
    addInfo,
    updateInfo
  } from "@/api/influencer/info";

  export default {
    name: "Info",
    dicts: ['influencer_site', 'influencer_type', 'influencer_line_of_business'],
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
        // 红人表格数据
        infoList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // Video 佣金百分比时间范围
        daterangeCreatTime: [],
        // Video 佣金百分比时间范围
        daterangeUpdateTime: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          id: null,
          uid: null,
          site: null,
          name: null,
          type: null,
          lineOfBusiness: null,
          creatTime: null,
          updateTime: null
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          site: [{
            required: true,
            message: "站点不能为空",
            trigger: "change"
          }],
          name: [{
            required: true,
            message: "红人名称不能为空",
            trigger: "blur"
          }],
          lineOfBusiness: [{
            required: true,
            message: "业务线不能为空",
            trigger: "change"
          }],
          avatar: [{
            required: true,
            message: "头像不能为空",
            trigger: "blur"
          }],
          influencerCommission: [{
            required: true,
            message: "influencer 报价不能为空",
            trigger: "blur"
          }],
        }
      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询红人列表 */
      getList() {
        this.loading = true;
        this.queryParams.params = {};
        if (null != this.daterangeCreatTime && '' != this.daterangeCreatTime) {
          this.queryParams.params["beginCreatTime"] = this.daterangeCreatTime[0];
          this.queryParams.params["endCreatTime"] = this.daterangeCreatTime[1];
        }
        if (null != this.daterangeUpdateTime && '' != this.daterangeUpdateTime) {
          this.queryParams.params["beginUpdateTime"] = this.daterangeUpdateTime[0];
          this.queryParams.params["endUpdateTime"] = this.daterangeUpdateTime[1];
        }
        listInfo(this.queryParams).then(response => {
          this.infoList = response.rows;
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
          uid: null,
          site: null,
          name: null,
          type: null,
          lineOfBusiness: null,
          profileLink: null,
          avatar: null,
          banner: null,
          influencerCommission: null,
          influencerCommissionPercentage: null,
          copyrightCommission: null,
          copyrightCommissionPercentage: null,
          vdeoCommission: null,
          vdeoCommissionPercentage: null,
          creatTime: null,
          updateTime: null
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
        this.daterangeCreatTime = [];
        this.daterangeUpdateTime = [];
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
        this.title = "添加红人";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getInfo(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改红人";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateInfo(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addInfo(this.form).then(response => {
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
        this.$modal.confirm('是否确认删除红人编号为"' + ids + '"的数据项？').then(function() {
          return delInfo(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('influencer/info/export', {
          ...this.queryParams
        }, `info_${new Date().getTime()}.xlsx`)
      }
    }
  };
</script>
