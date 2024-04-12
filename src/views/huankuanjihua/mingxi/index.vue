<template>
  <div class="app-container">
    <search-panel HeaderIcon="repaymentplan" title="还款计划明细">
      <el-form :model="queryParams" ref="queryForm" size="small" label-width="80px" label-position="left">
        <!-- Row 1 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="管理编号" prop="managerId">
              <el-input v-model="queryParams.managerId" placeholder="请输入管理编号" clearable
                @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="借款人" prop="borrowingUnit">
              <el-select v-model="queryParams.borrowingUnit" placeholder="请选择借款人" clearable filterable>
                <el-option v-for="dict in dict.type.sys_1767154968256577500" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="债权人" prop="financialInstitution">
              <el-select v-model="queryParams.financialInstitution" placeholder="请选择债权人" clearable filterable>
                <el-option v-for="dict in dict.type.sys_1757271666666242000" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- Row 2 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="起始日">
              <el-date-picker format='yyyy/MM/dd' :picker-options="pickerOptions1" v-model="daterangeRiqi1" value-format="yyyy-MM-dd"
                type="date" placeholder="请选择起始日"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="到期日">
              <el-date-picker format='yyyy/MM/dd' :picker-options="pickerOptions2" v-model="daterangeRiqi2" value-format="yyyy-MM-dd"
                type="date" placeholder="请选择到期日"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <!-- Buttons can be placed anywhere, here is an example -->
            <el-form-item class="flex" style="display: flex; justify-content: flex-end;">
              <el-button type="primary" icon="el-icon-search" @click="handleQuery">搜 索</el-button>
              <el-button icon="el-icon-refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>


      </el-form>

    </search-panel>
    <el-divider class="mt20 mb20"></el-divider>
    <el-row type="flex" :gutter="10" class="mb8" justify="end">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['huankuanjihua:mingxi:export']">导 出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="mingxiList" @selection-change="handleSelectionChange"
      :header-cell-style="header_cell_style">
      <el-table-column show-overflow-tooltip label="管理编号" align="center" prop="managerId" />
      <el-table-column label="期数" align="center" prop="qishu" min-width="80" />
      <el-table-column label="还款日期" align="center" prop="riqi" min-width="100" />
      <el-table-column show-overflow-tooltip label="借款人" align="center" prop="borrowingUnit" min-width="260">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1767154968256577500" :value="scope.row.borrowingUnit" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="债权人" align="center" prop="financialInstitution" min-width="260">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1757271666666242000" :value="scope.row.financialInstitution" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="还款金额" align="center" prop="huankuanjine" min-width="160" />
      <el-table-column show-overflow-tooltip label="偿还本金" align="center" prop="changhuanben" min-width="160" />
      <el-table-column show-overflow-tooltip label="支付利息" align="center" prop="zhifulixi" min-width="160" />
      <el-table-column show-overflow-tooltip label="本金剩余" align="center" prop="benjinshengyu" min-width="160" />
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['huankuanjihua:mingxi:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['huankuanjihua:mingxi:remove']">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改还款计划明细对话框 -->
    <el-dialog :title="title" :visible.sync="open" min-width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="还款计划对应项目的管理编号" prop="managerId">
          <el-input v-model="form.managerId" placeholder="请输入还款计划对应项目的管理编号" />
        </el-form-item>
        <el-form-item label="期数" prop="qishu">
          <el-input v-model="form.qishu" placeholder="请输入期数" />
        </el-form-item>
        <el-form-item label="日期" prop="riqi">
          <el-date-picker format='yyyy/MM/dd' clearable v-model="form.riqi" type="date" value-format="yyyy-MM-dd" placeholder="请选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="还款金额" prop="huankuanjine">
          <el-input v-model="form.huankuanjine" placeholder="请输入还款金额" />
        </el-form-item>
        <el-form-item label="偿还本金" prop="changhuanben">
          <el-input v-model="form.changhuanben" placeholder="请输入偿还本金" />
        </el-form-item>
        <el-form-item label="支付利息" prop="zhifulixi">
          <el-input v-model="form.zhifulixi" placeholder="请输入支付利息" />
        </el-form-item>
        <el-form-item label="本金剩余" prop="benjinshengyu">
          <el-input v-model="form.benjinshengyu" placeholder="请输入本金剩余" />
        </el-form-item>
        <el-form-item label="备注" prop="comment">
          <el-input v-model="form.comment" type="textarea" placeholder="请输入内容" />
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
  listMingxi,
  getMingxi,
  delMingxi,
  addMingxi,
  updateMingxi
} from "@/api/huankuanjihua/mingxi";
import SearchPanel from '@/components/SearchPanel/index.vue'

export default {
  name: "Mingxi",
  dicts: ['sys_1767154968256577500', 'sys_1757271666666242000'],
  components: {
    SearchPanel
  },
  data() {
    return {
      pickerOptions1: {
        // 禁用开始日期中，所有大于结束日期的日期
        disabledDate: (date) => {
          if (this.daterangeRiqi2) {
            return date.getTime() > new Date(this.daterangeRiqi2).getTime();
          }
        }
      },
      pickerOptions2: {
        // 禁用结束日期中，所有小于开始日期的日期
        disabledDate: (date) => {
          if (this.daterangeRiqi1) {
            // 一天的毫秒数
            var oneDayInMilliseconds = 24 * 60 * 60 * 1000;
            return date.getTime() < new Date(this.daterangeRiqi1).getTime() - oneDayInMilliseconds;
          }
        }
      },
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
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 还款计划明细表格数据
      mingxiList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 备注时间范围
      daterangeRiqi1: '',
      daterangeRiqi2: '',
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 100,
        managerId: null,
        borrowingUnit: null,
        financialInstitution: null,
        qishu: null,
        riqi: null,
        huankuanjine: null,
        changhuanben: null,
        zhifulixi: null,
        benjinshengyu: null,
        lilv: null,
        comment: null,
        createTime: null,
        createBy: null,
        updateTime: null,
        updateBy: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询还款计划明细列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      this.queryParams['orderByColumn'] = "riqi"
      this.queryParams['isAsc'] = "asc"
      if (null != this.daterangeRiqi1 && '' != this.daterangeRiqi1) {
        this.queryParams.params["beginRiqi"] = this.daterangeRiqi1;
      }

      if ('' != this.daterangeRiqi2 && null != this.daterangeRiqi2) {
        this.queryParams.params["endRiqi"] = this.daterangeRiqi2;
      }
      listMingxi(this.queryParams).then(response => {
        this.mingxiList = response.rows;
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
        managerId: null,
        qishu: null,
        riqi: null,
        huankuanjine: null,
        changhuanben: null,
        zhifulixi: null,
        benjinshengyu: null,
        comment: null,
        createTime: null,
        createBy: null,
        updateTime: null,
        updateBy: null
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
      this.daterangeRiqi1 = '';
      this.daterangeRiqi2 = '';
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
      this.title = "添加还款计划明细";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMingxi(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改还款计划明细";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMingxi(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMingxi(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除还款计划明细编号为"' + ids + '"的数据项？').then(function () {
        return delMingxi(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('huankuanjihua/mingxi/export', {
        ...this.queryParams
      }, `mingxi_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
