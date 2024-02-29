<template>
  <div class="app-container">
    <!-- <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="内部借款管理编号" prop="managementId">
        <el-input v-model="queryParams.managementId" placeholder="请输入内部借款管理编号" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="借款金额" prop="loanAmount">
        <el-input v-model="queryParams.loanAmount" placeholder="请输入借款金额" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="借款方" prop="borrower">
        <el-select v-model="queryParams.borrower" placeholder="请选择借款方" clearable>
          <el-option v-for="dict in dict.type.sys_1759501577938272300" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="收款方" prop="payee">
        <el-select v-model="queryParams.payee" placeholder="请选择收款方" clearable>
          <el-option v-for="dict in dict.type.sys_1759501640206909400" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="借款日期">
        <el-date-picker v-model="daterangeBorrowDate" style="width: 240px" value-format="yyyy-MM-dd" type="daterange"
          range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="到期日期">
        <el-date-picker v-model="daterangeDueDate" style="width: 240px" value-format="yyyy-MM-dd" type="daterange"
          range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="借款期限" prop="loanTerm">
        <el-input v-model="queryParams.loanTerm" placeholder="请输入借款期限" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="利率" prop="rate">
        <el-input v-model="queryParams.rate" placeholder="请输入利率" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="合同编号" prop="contractId">
        <el-input v-model="queryParams.contractId" placeholder="请输入合同编号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="还款方式：先息后本" prop="repaymentMethod">
        <el-select v-model="queryParams.repaymentMethod" placeholder="请选择还款方式：先息后本" clearable>
          <el-option v-for="dict in dict.type.sys_1759501742422098000" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="借款用途：保交楼、城中村改造" prop="loanUse">
        <el-select v-model="queryParams.loanUse" placeholder="请选择借款用途：保交楼、城中村改造" clearable>
          <el-option v-for="dict in dict.type.sys_1759501814702538800" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="uuid" prop="uuid">
        <el-input v-model="queryParams.uuid" placeholder="请输入uuid" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form> -->

    <search-panel HeaderIcon="bank" title="内部借款">
      <el-form :model="queryParams" ref="queryForm" label-position="left" size="small" :inline="false" v-show="showSearch"
        label-width="68px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="管理编号" prop="managementId">
              <el-input v-model="queryParams.managementId" placeholder="请输入管理编号" clearable
                @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="借款金额" prop="loanAmount">
              <el-input v-model="queryParams.loanAmount" placeholder="请输入借款金额" clearable
                @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="借款方" prop="borrower">
              <el-select v-model="queryParams.borrower" placeholder="请选择借款方" clearable>
                <el-option v-for="dict in dict.type.sys_1759501577938272300" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="收款方" prop="payee">
              <el-select v-model="queryParams.payee" placeholder="请选择收款方" clearable>
                <el-option v-for="dict in dict.type.sys_1759501640206909400" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="借款期限" prop="loanTerm">
              <el-input v-model="queryParams.loanTerm" placeholder="请输入借款期限" clearable
                @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="利率" prop="rate">
              <el-input v-model="queryParams.rate" placeholder="请输入利率" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="合同编号" prop="contractId">
              <el-input v-model="queryParams.contractId" placeholder="请输入合同编号" clearable
                @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="还款方式" prop="repaymentMethod">
              <el-select v-model="queryParams.repaymentMethod" placeholder="请选择还款方式" clearable>
                <el-option v-for="dict in dict.type.sys_1759501742422098000" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="借款用途" prop="loanUse">
              <el-select v-model="queryParams.loanUse" placeholder="请选择借款用途" clearable>
                <el-option v-for="dict in dict.type.sys_1759501814702538800" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item class="flex" style="display: flex; justify-content: flex-end;">
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">查 询</el-button>
              <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重 置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </search-panel>

    <el-divider class="mt20 mb20"></el-divider>
    <el-row type="flex" :gutter="10" class="mb8" justify="end">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['rzinternalborrowing:borrowing:add']">新增</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['rzinternalborrowing:borrowing:edit']">修改</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['rzinternalborrowing:borrowing:remove']">删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['rzinternalborrowing:borrowing:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="borrowingList" @selection-change="handleSelectionChange"
      :header-cell-style="header_cell_style">
      <el-table-column fixed="left" type="selection" width="55" align="center" />
      <!-- <el-table-column label="主键id" align="center" prop="id" /> -->
      <el-table-column label="管理编号" align="center" prop="managementId" />
      <!-- <el-table-column label="数据唯一编号" align="center" prop="scrUuid" /> -->
      <el-table-column label="借款金额" align="center" prop="loanAmount" />
      <el-table-column label="借款方" align="center" prop="borrower">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1759501577938272300" :value="scope.row.borrower" />
        </template>
      </el-table-column>
      <el-table-column label="收款方" align="center" prop="payee">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1759501640206909400" :value="scope.row.payee" />
        </template>
      </el-table-column>
      <!-- <el-table-column label="借款日期" align="center" prop="borrowDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.borrowDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="到期日期" align="center" prop="dueDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dueDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="借款期限" align="center" prop="loanTerm" />
      <el-table-column label="利率" align="center" prop="rate" />
      <el-table-column label="合同编号" align="center" prop="contractId" />
      <el-table-column label="还款方式" align="center" prop="repaymentMethod">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1759501742422098000" :value="scope.row.repaymentMethod" />
        </template>
      </el-table-column>
      <el-table-column label="借款用途" align="center" prop="loanUse">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1759501814702538800" :value="scope.row.loanUse" />
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="comment" />
      <!-- <el-table-column label="uuid" align="center" prop="uuid" /> -->
      <el-table-column fixed="right" label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleUpdate(scope.row)"
            v-hasPermi="['rzinternalborrowing:borrowing:edit']">查 看</el-button>
          <!-- <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['rzinternalborrowing:borrowing:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['rzinternalborrowing:borrowing:remove']">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改内部借款对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="60%" append-to-body>
      <!-- <el-form ref="form" :model="form" label-position="top" :rules="rules" label-width="80px">
        <el-form-item label="内部借款管理编号" prop="managementId">
          <el-input v-model="form.managementId" placeholder="请输入内部借款管理编号" />
        </el-form-item>
        <el-form-item label="数据唯一编号" prop="scrUuid">
          <div class="p20 appendix">
            <file-upload v-model="form.scrUuid" :managementId="form.managementId" @input="upload_completed"
              :fileSize="10000" :limit="1000" :isShowTip="false" />
          </div>
        </el-form-item>
        <el-form-item label="借款金额" prop="loanAmount">
          <el-input v-model="form.loanAmount" placeholder="请输入借款金额" />
        </el-form-item>
        <el-form-item label="借款方" prop="borrower">
          <el-select v-model="form.borrower" placeholder="请选择借款方">
            <el-option v-for="dict in dict.type.sys_1759501577938272300" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收款方" prop="payee">
          <el-select v-model="form.payee" placeholder="请选择收款方">
            <el-option v-for="dict in dict.type.sys_1759501640206909400" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="借款日期" prop="borrowDate">
          <el-date-picker clearable v-model="form.borrowDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择借款日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="到期日期" prop="dueDate">
          <el-date-picker clearable v-model="form.dueDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择到期日期">
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
          <el-select v-model="form.repaymentMethod" placeholder="请选择还款方式：先息后本">
            <el-option v-for="dict in dict.type.sys_1759501742422098000" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="借款用途：保交楼、城中村改造" prop="loanUse">
          <el-select v-model="form.loanUse" placeholder="请选择借款用途：保交楼、城中村改造">
            <el-option v-for="dict in dict.type.sys_1759501814702538800" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
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
        <el-table :data="rzsrc2List" :row-class-name="rowrzsrc2Index" @selection-change="handlerzsrc2SelectionChange"
          ref="rzsrc2">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="序号" align="center" prop="index" width="50" />
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
      </el-form> -->

      <div v-if="created_successfully == false">
        <div v-if="title === '修改内部借款'" class="modeify-btn" style="display: flex; justify-content: end;">
          <el-button type="primary" @click="toggleEdit">编 辑</el-button>
          <el-button @click="cancel">删 除</el-button>
        </div>

        <el-form ref="form" :model="form" label-position="top" :rules="rules" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="管理编号" prop="managementId">
                <el-input :readonly="!isEditable" v-model="form.managementId" placeholder="请输入管理编号" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="借款金额（万元）" prop="loanAmount">
                <el-input :readonly="!isEditable" v-model="form.loanAmount" placeholder="请输入借款金额" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="借款方" prop="borrower">
                <el-select :disabled="!isEditable" v-model="form.borrower" placeholder="请选择借款方">
                  <el-option v-for="dict in dict.type.sys_1759501577938272300" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="收款方" prop="payee">
                <el-select :disabled="!isEditable" v-model="form.payee" placeholder="请选择收款方">
                  <el-option v-for="dict in dict.type.sys_1759501640206909400" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="借款日期" prop="borrowDate">
                <el-date-picker :disabled="!isEditable" clearable v-model="form.borrowDate" type="date" value-format="yyyy-MM-dd"
                  placeholder="请选择借款日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="到期日期" prop="dueDate">
                <el-date-picker :disabled="!isEditable" clearable v-model="form.dueDate" type="date" value-format="yyyy-MM-dd"
                  placeholder="请选择到期日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="借款期限" prop="loanTerm">
                <el-input :readonly="!isEditable" v-model="form.loanTerm" placeholder="请输入借款期限" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="利率" prop="rate">
                <el-input :readonly="!isEditable" v-model="form.rate" placeholder="请输入利率" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同编号" prop="contractId">
                <el-input :readonly="!isEditable" v-model="form.contractId" placeholder="请输入合同编号" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="还款方式" prop="repaymentMethod">
                <el-select :disabled="!isEditable" v-model="form.repaymentMethod" placeholder="请选择还款方式">
                  <el-option v-for="dict in dict.type.sys_1759501742422098000" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="借款用途" prop="loanUse">
                <el-select :disabled="!isEditable" v-model="form.loanUse" placeholder="请选择借款用途">
                  <el-option v-for="dict in dict.type.sys_1759501814702538800" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!-- 留空或用于未来表单项 -->
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="备注" prop="comment">
                <el-input :readonly="!isEditable" v-model="form.comment" maxlength="200" type="textarea" :rows="4"
                  placeholder="请输入备注信息，最多不超过200字" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="附件" prop="scrUuid">
                <div class="p20 appendix">
                  <file-upload :disabled="!isEditable" v-model="form.scrUuid" :managementId="form.managementId" @input="upload_completed"
                    :fileSize="10000" :limit="1000" :isShowTip="false" />
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
        <CreateSuccess @close-dialog="closeDialog" @create-again="create_again"></CreateSuccess>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listBorrowing, getBorrowing, delBorrowing, addBorrowing, updateBorrowing } from "@/api/rzinternalborrowing/borrowing";

import { SnowflakeIdGenerator } from '@/utils/index'
import { listList, getList, delList, addList, updateList } from "@/api/rzauditlist/list";
import { mapGetters } from 'vuex';
import moment from 'moment'
import CreateSuccess from '@/components/createSuccess/index.vue'
import SearchPanel from '@/components/SearchPanel/index.vue'

export default {
  name: "Borrowing",
  dicts: ['sys_1759501742422098000', 'sys_1759501640206909400', 'sys_1759501577938272300', 'sys_1759501814702538800'],
  components: {
    CreateSuccess,
    SearchPanel
  },
  data() {
    return {
      created_successfully: true,
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
      // 内部借款表格数据
      borrowingList: [],
      // 附件表表格数据
      rzsrc2List: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 创建人时间范围
      daterangeBorrowDate: [],
      // 创建人时间范围
      daterangeDueDate: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        managementId: null,
        scrUuid: null,
        loanAmount: null,
        borrower: null,

        payee: null,
        borrowDate: null,
        dueDate: null,
        loanTerm: null,
        rate: null,
        contractId: null,
        repaymentMethod: null,
        loanUse: null,
        comment: null,
        uuid: null
      },

      /* str 需要添加的 */
      scrUuid: null,
      /* end */

      // 表单参数
      form: {},
      // 表单校验
      rules: {
        managementId: [
          { required: true, message: "内部借款管理编号不能为空", trigger: "blur" }
        ],
        scrUuid: [
          { required: true, message: "数据唯一编号不能为空", trigger: "blur" }
        ],
        loanAmount: [
          { required: true, message: "借款金额不能为空", trigger: "blur" }
        ],
        borrower: [
          { required: true, message: "借款方不能为空", trigger: "change" }
        ],

        payee: [
          { required: true, message: "收款方不能为空", trigger: "change" }
        ],
        borrowDate: [
          { required: true, message: "借款日期不能为空", trigger: "blur" }
        ],
        dueDate: [
          { required: true, message: "到期日期不能为空", trigger: "blur" }
        ],
        loanTerm: [
          { required: true, message: "借款期限不能为空", trigger: "blur" }
        ],
        rate: [
          { required: true, message: "利率不能为空", trigger: "blur" }
        ],
        contractId: [
          { required: true, message: "合同编号不能为空", trigger: "blur" }
        ],
        repaymentMethod: [
          { required: true, message: "还款方式：先息后本不能为空", trigger: "change" }
        ],
        loanUse: [
          { required: true, message: "借款用途：保交楼、城中村改造不能为空", trigger: "change" }
        ],
      }
    };
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
  methods: {
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
    /** 查询内部借款列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeBorrowDate && '' != this.daterangeBorrowDate) {
        this.queryParams.params["beginBorrowDate"] = this.daterangeBorrowDate[0];
        this.queryParams.params["endBorrowDate"] = this.daterangeBorrowDate[1];
      }
      if (null != this.daterangeDueDate && '' != this.daterangeDueDate) {
        this.queryParams.params["beginDueDate"] = this.daterangeDueDate[0];
        this.queryParams.params["endDueDate"] = this.daterangeDueDate[1];
      }
      listBorrowing(this.queryParams).then(response => {
        this.borrowingList = response.rows;
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
        scrUuid: null,
        loanAmount: null,
        borrower: null,

        payee: null,
        borrowDate: null,
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
      this.daterangeBorrowDate = [];
      this.daterangeDueDate = [];
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
      this.created_successfully = false;
      this.isEditable = true;
      this.open = true;
      this.title = "添加内部借款";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.isEditable = false;
      this.reset();
      const id = row.id || this.ids
      getBorrowing(id).then(response => {
        
        /* str 需要赋值粘贴到的 */
        response.data.rzsrc2List.forEach(i => {
          i.id = null;
        })
        this.scrUuid = response.data.scrUuid;
        this.form = response.data;
        this.form.scrUuid = response.data.rzsrc2List.map(i => i.url)
        /* end */

        this.rzsrc2List = response.data.rzsrc2List;
        this.open = true;
        this.title = "修改内部借款";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.form))
          this.form.rzsrc2List = this.rzsrc2List;
          if (this.form.id != null) {
            data.scrUuid = Number(this.scrUuid);
            updateBorrowing(data).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            // addBorrowing(this.form).then(response => {
            //   this.$modal.msgSuccess("新增成功");
            //   this.open = false;
            //   this.getList();
            // });

            // 生成一个 uuid
            const generator = new SnowflakeIdGenerator();
            data.scrUuid = generator.nextId();
            data.rzsrc2List = this.rzsrc2List;

            data.createBy = this.name;

            const rzaudit_data = {
              "id": null,
              "auditId": String(generator.nextId()).substring(0, 6),
              "scrUuid": data.scrUuid,
              "createBy": this.name,
              "createTime": null,
              "dataJson": JSON.stringify(data),
              "tableName": "rz_internal_borrowing",
              "auditState": "1759514891045044200"
            }


            addList(rzaudit_data).then(res => {
              this.created_successfully = true;
              // this.$modal.msgSuccess("新增成功");
              // this.open = false;

            })
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除内部借款编号为"' + ids + '"的数据项？').then(function () {
        return delBorrowing(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
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
      this.download('rzinternalborrowing/borrowing/export', {
        ...this.queryParams
      }, `borrowing_${new Date().getTime()}.xlsx`)
    },
    /* 上传完成的回调 */
    upload_completed(url_string) {
      console.log(url_string);
      const url_list = url_string.split(',')
      url_list.forEach(url_i => {
        let obj = {
          url: url_i,
          projectManagementId: this.form.managementId,
          type: "rz_internal_borrowing",
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
