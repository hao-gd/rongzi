<template>
  <div class="app-container">
    <!-- <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="对内担保管理编号" prop="managementId">
        <el-input v-model="queryParams.managementId" placeholder="请输入对内担保管理编号" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="担保合同编号" prop="contractId">
        <el-input v-model="queryParams.contractId" placeholder="请输入担保合同编号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="借款人" prop="creditor">
        <el-select filterable v-model="queryParams.creditor" placeholder="请选择借款人" clearable>
          <el-option v-for="dict in dict.type.sys_1767154968256577500" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="担保人" prop="guarantor">
        <el-select filterable v-model="queryParams.guarantor" placeholder="请选择担保人" clearable>
          <el-option v-for="dict in dict.type.sys_1767155091485229000" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="债权人" prop="financialInstitution">
        <el-select filterable v-model="queryParams.financialInstitution" placeholder="请选择债权人" clearable>
          <el-option v-for="dict in dict.type.sys_1757271666666242000" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="业务类型" prop="businessType">
        <el-select filterable v-model="queryParams.businessType" placeholder="请选择业务类型" clearable>
          <el-option v-for="dict in dict.type.sys_1767155302261588000" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="担保金额" prop="guaranteeAmount">
        <el-input v-model="queryParams.guaranteeAmount" placeholder="请输入担保金额" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="担保余额" prop="guaranteeBalance">
        <el-input v-model="queryParams.guaranteeBalance" placeholder="请输入担保余额" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="起始日">
        <el-date-picker v-model="daterangeStartDate" style="width: 240px" value-format="yyyy-MM-dd" type="daterange"
          range-separator="-" start-placeholder="起始日" end-placeholder="到期日"></el-date-picker>
      </el-form-item>
      <el-form-item label="截止日期">
        <el-date-picker v-model="daterangeDeadline" style="width: 240px" value-format="yyyy-MM-dd" type="daterange"
          range-separator="-" start-placeholder="起始日" end-placeholder="到期日"></el-date-picker>
      </el-form-item>
      <el-form-item label="保证方式" prop="guaranteeMethod">
        <el-select filterable v-model="queryParams.guaranteeMethod" placeholder="请选择保证方式" clearable>
          <el-option v-for="dict in dict.type.sys_1767155825266131000" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否上征信" prop="isCreditInvestigation">
        <el-select filterable v-model="queryParams.isCreditInvestigation" placeholder="请选择是否上征信" clearable>
          <el-option v-for="dict in dict.type.sys_1767156259322069000" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker v-model="daterangeCreateTime" style="width: 240px" value-format="yyyy-MM-dd" type="daterange"
          range-separator="-" start-placeholder="起始日" end-placeholder="到期日"></el-date-picker>
      </el-form-item>
      <el-form-item label="创建人" prop="createBy">
        <el-input v-model="queryParams.createBy" placeholder="请输入创建人" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form> -->
    <search-panel HeaderIcon="inorout" title="对内担保台账">
      <el-form :model="queryParams" ref="queryForm" size="small" label-width="140px" label-position="left">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="管理编号" prop="managementId">
              <el-input v-model="queryParams.managementId" placeholder="请输入管理编号" clearable
                @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="担保合同编号" prop="contractId">
              <el-input v-model="queryParams.contractId" placeholder="请输入担保合同编号" clearable
                @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item label="借款人" prop="creditor">
              <el-select filterable v-model="queryParams.creditor" placeholder="请选择借款人" clearable>
                <el-option v-for="dict in dict.type.sys_1767154968256577500" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="担保人" prop="guarantor">
              <el-select filterable v-model="queryParams.guarantor" placeholder="请选择担保人" clearable>
                <el-option v-for="dict in dict.type.sys_1767155091485229000" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="债权人" prop="financialInstitution">
              <el-select filterable v-model="queryParams.financialInstitution" placeholder="请选择债权人" clearable>
                <el-option v-for="dict in dict.type.sys_1757271666666242000" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务类型" prop="businessType">
              <el-select filterable v-model="queryParams.businessType" placeholder="请选择业务类型" clearable>
                <el-option v-for="dict in dict.type.sys_1767155302261588000" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="担保金额（万元）" prop="guaranteeAmount">
              <el-input-number class="w" :controls="false" :precision="2" type="number" v-model.trim="queryParams.guaranteeAmount" placeholder="请输入担保金额" clearable
                ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="担保余额（万元）" prop="guaranteeBalance">
              <el-input-number class="w" :controls="false" :precision="2" type="number" v-model.trim="queryParams.guaranteeBalance" placeholder="请输入担保余额" clearable
               ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="担保期限">
              <!-- @change="handleSearchLimitTime" -->
              <el-date-picker v-model="daterangeStartDate" style="width: 100%" value-format="yyyy-MM-dd" type="daterange"
                range-separator="-" start-placeholder="起始日" end-placeholder="到期日" ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="保证方式" prop="guaranteeMethod">
              <el-select filterable v-model="queryParams.guaranteeMethod" placeholder="请选择保证方式" clearable>
                <el-option v-for="dict in dict.type.sys_1767155825266131000" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <!-- <el-col :span="8">
            <el-form-item label="截止日期">
              <el-date-picker v-model="daterangeDeadline" style="width: 100%" value-format="yyyy-MM-dd" type="daterange"
                range-separator="-" start-placeholder="起始日" end-placeholder="到期日"></el-date-picker>
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item label="是否上征信" prop="isCreditInvestigation">
              <el-select filterable v-model="queryParams.isCreditInvestigation" placeholder="请选择是否上征信" clearable>
                <el-option v-for="dict in dict.type.sys_1767156259322069000" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="创建人" prop="createBy">
              <el-input v-model="queryParams.createBy" placeholder="请输入创建人" clearable
                @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </el-col> -->

          <el-col :span="16">
            <el-form-item class="flex" style="display: flex; justify-content: flex-end;">
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">查 询</el-button>
              <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="创建时间">
              <el-date-picker v-model="daterangeCreateTime" style="width: 100%" value-format="yyyy-MM-dd" type="daterange"
                range-separator="-" start-placeholder="起始日" end-placeholder="到期日"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>

    </search-panel>

    <el-divider class="mt20 mb20"></el-divider>
    <el-row type="flex" :gutter="10" class="mb8" justify="end">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['glinternal:internal:add']">新 建</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['glinternal:internal:edit']">修改</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['glinternal:internal:remove']">删 除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['glinternal:internal:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="internalList" @selection-change="handleSelectionChange"
      :header-cell-style="header_cell_style">
      <el-table-column show-overflow-tooltip fixed="left" type="selection" width="50" align="center" />
      <!-- <el-table-column label="主键id" align="center" prop="id" /> -->
      <!-- <el-table-column show-overflow-tooltip label="管理编号" align="center" prop="managementId" min-width="100"/> -->
      <!-- <el-table-column show-overflow-tooltip label="担保合同编号" align="center" prop="contractId" width="180" /> -->
      <!-- <el-table-column label="数据唯一编号" align="center" prop="scrUuid" /> -->
      <el-table-column show-overflow-tooltip label="担保人" align="center" prop="guarantor"  min-width="260">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1767155091485229000" :value="scope.row.guarantor" />
        </template>
      </el-table-column>
      <!-- 少一个担保类别 -->
      <el-table-column show-overflow-tooltip label="借款人" align="center" prop="creditor"  min-width="260">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1767154968256577500" :value="scope.row.creditor" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="债权人" align="center" prop="financialInstitution"  min-width="260">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1757271666666242000" :value="scope.row.financialInstitution" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="业务类型" align="center" prop="businessType" min-width="120">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1767155302261588000" :value="scope.row.businessType" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="担保金额（万元）" align="center" prop="guaranteeAmount" width="160">
        <template slot-scope="scope">
          <span>{{ formatNumberAsRMB(scope.row.guaranteeAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="担保余额（万元）" align="center" prop="guaranteeBalance" width="160">
        <template slot-scope="scope">
          <span>{{ formatNumberAsRMB(scope.row.guaranteeBalance) }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="起始日" align="center" prop="startDate" width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="到期日" align="center" prop="deadline" width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.deadline, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="保证方式" align="center" prop="guaranteeMethod" min-width="120">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1767155825266131000" :value="scope.row.guaranteeMethod" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="是否上征信" align="center" prop="isCreditInvestigation" width="100">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1767156259322069000" :value="scope.row.isCreditInvestigation" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="备注" align="center" prop="comment" min-width="200"/>
      <!-- <el-table-column show-overflow-tooltip label="创建人" align="center" prop="createBy" min-width="120"/> -->
      <!-- <el-table-column show-overflow-tooltip label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column show-overflow-tooltip fixed="right" label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['glinternal:internal:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['glinternal:internal:remove']">删除</el-button> -->
          <el-button size="mini" type="text" @click="handleUpdate(scope.row)" v-hasPermi="['glinternal:internal:edit']">查
            看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改对内担保台账对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="60%" append-to-body>
      <!-- <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="对内担保管理编号" prop="managementId">
          <el-input v-model="form.managementId" placeholder="请输入对内担保管理编号" />
        </el-form-item>
        <el-form-item label="担保合同编号" prop="contractId">
          <el-input v-model="form.contractId" placeholder="请输入担保合同编号" />
        </el-form-item>
        <el-form-item label="数据唯一编号" prop="scrUuid">
          <file-upload v-model="form.scrUuid" />
        </el-form-item>
        <el-form-item label="借款人" prop="creditor">
          <el-select filterable v-model="form.creditor" placeholder="请选择借款人">
            <el-option v-for="dict in dict.type.sys_1767154968256577500" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="担保人" prop="guarantor">
          <el-select filterable v-model="form.guarantor" placeholder="请选择担保人">
            <el-option v-for="dict in dict.type.sys_1767155091485229000" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="债权人" prop="financialInstitution">
          <el-select filterable v-model="form.financialInstitution" placeholder="请选择债权人">
            <el-option v-for="dict in dict.type.sys_1757271666666242000" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务类型" prop="businessType">
          <el-select filterable v-model="form.businessType" placeholder="请选择业务类型">
            <el-option v-for="dict in dict.type.sys_1767155302261588000" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="担保金额" prop="guaranteeAmount">
          <el-input v-model="form.guaranteeAmount" placeholder="请输入担保金额" />
        </el-form-item>
        <el-form-item label="担保余额" prop="guaranteeBalance">
          <el-input v-model="form.guaranteeBalance" placeholder="请输入担保余额" />
        </el-form-item>
        <el-form-item label="起始日" prop="startDate">
          <el-date-picker clearable v-model="form.startDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择起始日">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="截止日期" prop="deadline">
          <el-date-picker clearable v-model="form.deadline" type="date" value-format="yyyy-MM-dd" placeholder="请选择截止日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="保证方式" prop="guaranteeMethod">
          <el-select filterable v-model="form.guaranteeMethod" placeholder="请选择保证方式">
            <el-option v-for="dict in dict.type.sys_1767155825266131000" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否上征信" prop="isCreditInvestigation">
          <el-select filterable v-model="form.isCreditInvestigation" placeholder="请选择是否上征信">
            <el-option v-for="dict in dict.type.sys_1767156259322069000" :key="dict.value" :label="dict.label"
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
      <el-divider class="no_mt mb20"></el-divider>
      <div v-if="created_successfully == false">
        <div v-if="title === '修改对内担保台账'" class="modeify-btn" style="display: flex; justify-content: end;">
          <el-button type="primary" v-if="!this.isEditable" @click="toggleEdit">编 辑</el-button>
          <el-button type="warning" v-else @click="toggleEdit">取消编辑</el-button>
          <el-button type="danger" plain @click="handleDelete(form)">删 除</el-button>
        </div>

        <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="top">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="管理编号" prop="managementId">
                <el-input :readonly="title === '修改对内担保台账'" v-model="form.managementId" placeholder="请输入管理编号" />
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="担保合同编号" prop="contractId">
                <el-input :readonly="!isEditable" v-model="form.contractId" placeholder="请输入担保合同编号" />
              </el-form-item>
            </el-col> -->
            <el-col :span="8">
              <el-form-item label="借款人" prop="creditor">
                <el-select filterable :disabled="!isEditable" v-model="form.creditor" placeholder="请选择借款人">
                  <el-option v-for="dict in dict.type.sys_1767154968256577500" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="担保人" prop="guarantor">
                <el-select filterable :disabled="!isEditable" v-model="form.guarantor" placeholder="请选择担保人">
                  <el-option v-for="dict in dict.type.sys_1767155091485229000" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="债权人" prop="financialInstitution">
                <el-select filterable :disabled="!isEditable" v-model="form.financialInstitution" placeholder="请选择债权人">
                  <el-option v-for="dict in dict.type.sys_1757271666666242000" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="业务类型" prop="businessType">
                <el-select filterable :disabled="!isEditable" v-model="form.businessType" placeholder="请选择业务类型">
                  <el-option v-for="dict in dict.type.sys_1767155302261588000" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="担保金额（万元）" prop="guaranteeAmount">
                <el-input-number :disabled="!isEditable" class="w" :controls="false" :precision="2" :readonly="!isEditable" type="number" v-model.trim="form.guaranteeAmount" placeholder="请输入担保金额" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="担保余额（万元）" prop="guaranteeBalance">
                <el-input-number :disabled="!isEditable" class="w" :controls="false" :precision="2" :readonly="!isEditable" type="number" v-model.trim="form.guaranteeBalance" placeholder="请输入担保余额" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="担保期限" prop="startDate">
                <el-date-picker :disabled="!isEditable" v-model="daterangeStartDate2" style="width: 240px"
                  value-format="yyyy-MM-dd" type="daterange" range-separator="-" start-placeholder="起始日"
                  end-placeholder="到期日" @change="handleLimitChange"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="保证方式" prop="guaranteeMethod">
                <el-select filterable :disabled="!isEditable" v-model="form.guaranteeMethod" placeholder="请选择保证方式">
                  <el-option v-for="dict in dict.type.sys_1767155825266131000" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="是否上征信" prop="isCreditInvestigation">
                <el-select filterable :disabled="!isEditable" v-model="form.isCreditInvestigation" placeholder="请选择是否上征信">
                  <el-option v-for="dict in dict.type.sys_1767156259322069000" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!-- 占位置 -->
            </el-col>
            <el-col :span="8">
              <!-- 占位置 -->
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="备注" prop="comment">
                <el-input :readonly="!isEditable" v-model="form.comment" show-word-limit maxlength="200" type="textarea"
                  :rows="4" placeholder="请输入备注信息，最多不超过200字" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="附件" prop="scrUuid">
                <div class="p20 appendix">
                  <file-upload :disabled="!isEditable" v-model="form.scrUuid" :managementId="form.managementId"
                    @input="upload_completed" :fileSize="10000" :limit="1000" :isShowTip="false" />
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
        <CreateSuccess @close-dialog="closeDialog" @create-again="create_again" :isSuccess="isSuccess" :isTitle="isTitle"
          :isMessage="isMessage" :title="ctitle" :isEdit="isEdit" @confirm="handleaddList" @cancel="cancel">
        </CreateSuccess>
      </div>



    </el-dialog>
  </div>
</template>

<script>
import { listInternal, getInternal, delInternal, addInternal, updateInternal } from "@/api/glinternal/internal";
import { SnowflakeIdGenerator } from '@/utils/index'
import { listList, getList, delList, addList, updateList } from "@/api/rzauditlist/list";
import { mapGetters } from 'vuex';
import moment from 'moment'
import CreateSuccess from '@/components/createSuccess/index.vue'
import SearchPanel from '@/components/SearchPanel/index.vue'
import { checkDueReminderWithConfig } from '@/utils/expirationreminder';
import { reminderConfig } from '@/config/expirationreminder'
import { number } from 'echarts';
export default {
  name: "Internal",
  dicts: ['sys_1767156259322069000', 'sys_1767154968256577500', 'sys_1767155091485229000', 'sys_1757271666666242000', 'sys_1767155302261588000', 'sys_1767155825266131000'],
  components: {
    CreateSuccess,
    SearchPanel
  },
  data() {
    return {
      daterangeStartDate2: [],
      isSuccess: true,
      isTitle: true,
      isMessage: true,
      ctitle: '',
      isEdit: false,
      rzaudit_data: null,

      reminderConfig: reminderConfig.slice(1),
      checkDueReminderWithConfig: checkDueReminderWithConfig,
      created_successfully: false,
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
      // 对内担保台账表格数据
      internalList: [],
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
        createTime: null,
        createBy: null,
      },
      // 表单参数
      form: {},

      /* str 需要添加的 */
      scrUuid: null,
      /* end */

      // 表单校验
      rules: {
        managementId: [
          { required: true, message: "对内担保管理编号不能为空", trigger: "blur" }
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
          { required: true, message: "债权人不能为空", trigger: "change" }
        ],
        businessType: [
          { required: true, message: "业务类型不能为空", trigger: "change" }
        ],
        guaranteeAmount: [
          { required: true, message: "担保金额不能为空", trigger: "blur" }
        ],
        guaranteeBalance: [
          { required: true, message: "担保余额不能为空", trigger: "blur" }
        ],
        startDate: [
          { required: true, message: "起始日不能为空", trigger: "blur" }
        ],
        deadline: [
          { required: true, message: "到期日不能为空", trigger: "blur" }
        ],
        guaranteeMethod: [
          { required: true, message: "保证方式不能为空", trigger: "change" }
        ],
        isCreditInvestigation: [
          { required: true, message: "是否上征信不能为空", trigger: "change" }
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
  watch: {
    open(n, o) {
      if (n == false) {
        this.created_successfully = false;
        this.isEditable = true;
      }
    }
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
    /* 担保期限选择事件 */
    handleLimitChange(val) {
      if (val === '' || val.length == 0 || val == undefined || val == null) {
        this.form.startDate = '';
        this.form.deadline = '';
      }
      this.form.startDate = val[0];
      this.form.deadline = val[1];
    },
    /* 到期提醒选择 */
    handleSelect(val) {
      // this.queryParams.remark = null;
      if (val) {
        let start = moment().format("YYYY-MM-DD");
        let end = moment().add(val, 'days').format("YYYY-MM-DD");
        this.daterangeDueDate = [start, end]
      } else {
        this.daterangeDueDate = []
      }
    },
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
    /** 查询对内担保台账列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      // if (null != this.daterangeStartDate && '' != this.daterangeStartDate) {
      //   this.queryParams.params["beginStartDate"] = this.daterangeStartDate[0];
      //   this.queryParams.params["endStartDate"] = this.daterangeStartDate[1];
      // }
      // if (null != this.daterangeDeadline && '' != this.daterangeDeadline) {
      //   this.queryParams.params["beginDeadline"] = this.daterangeDeadline[0];
      //   this.queryParams.params["endDeadline"] = this.daterangeDeadline[1];
      // }
      if (null != this.daterangeStartDate && '' != this.daterangeStartDate) {
        // 直接合并 开始时间和结束时间
        this.queryParams.params["beginStartDate"] = this.daterangeStartDate[0];
        this.queryParams.params["endStartDate"] = this.daterangeStartDate[1];

        this.queryParams.params["beginDeadline"] = this.daterangeStartDate[0];
        this.queryParams.params["endDeadline"] = this.daterangeStartDate[1];

      }
      if (null != this.daterangeCreateTime && '' != this.daterangeCreateTime) {
        this.queryParams.params["beginCreateTime"] = this.daterangeCreateTime[0];
        this.queryParams.params["endCreateTime"] = this.daterangeCreateTime[1];
      }
      this.queryParams['orderByColumn'] = 'id'

      let search = JSON.parse(JSON.stringify(this.queryParams));
      if (![null, '', undefined].includes(search.guaranteeAmount)) {
        search.guaranteeAmount = Number(search.guaranteeAmount) * 10000
      }
      if (![null, '', undefined].includes(search.guaranteeBalance)) {
        search.guaranteeBalance = Number(search.guaranteeBalance) * 10000
      }
      listInternal(this.queryParams).then(response => {
        this.internalList = response.rows;
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
      this.daterangeStartDate2 = [];
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
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();

      this.created_successfully = false;
      this.isEditable = true;
      this.open = true;
      this.title = "添加对内担保台账";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.isEditable = false;

      this.reset();
      const id = row.id || this.ids
      getInternal(id).then(response => {
        /* str 需要赋值粘贴到的 */
        response.data.rzsrc2List.forEach(i => {
          i.id = null;
        })
        // 金额需要 / 10000
        response.data.guaranteeAmount = Number(response.data.guaranteeAmount) / 10000;
        response.data.guaranteeBalance = Number(response.data.guaranteeBalance) / 10000;
        this.scrUuid = response.data.scrUuid;
        this.form = response.data;
        this.daterangeStartDate2[0] = response.data.startDate;
        this.daterangeStartDate2[1] = response.data.deadline;
        this.form.scrUuid = response.data.rzsrc2List.map(i => i.url)
        /* end */
        this.rzsrc2List = response.data.rzsrc2List;
        this.open = true;
        this.title = "修改对内担保台账";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.form))
          this.form.rzsrc2List = this.rzsrc2List;
          this.rzaudit_data = null;
          // 金额需要 * 10000
          data.guaranteeAmount = Number(data.guaranteeAmount) * 10000;
          data.guaranteeBalance = Number(data.guaranteeBalance) * 10000;
          if (this.form.id != null) {
            // updateInternal(this.form).then(response => {
            //   this.$modal.msgSuccess("修改成功");
            //   this.open = false;
            //   this.getList();
            // });
            data.scrUuid = Number(this.scrUuid);
            this.rzaudit_data = {
              "auditId": data.id,
              "scrUuid": data.scrUuid,
              "createBy": this.name,
              "createTime": null,
              "dataJson": JSON.stringify(data),
              "tableName": "rz_gl_internal",
              "auditState": "1759514891045044200",
              "uuid": data.uuid
            }
            if (this.title === '修改对内担保台账' && this.created_successfully === false && this.isEditable === true) {
              this.created_successfully = true;
              this.isSuccess = false;
              this.isTitle = true;
              this.isMessage = false;
              this.ctitle = '确定修改对内担保台账信息吗？';
              this.isEdit = true;
              return;
            }
          } else {
            // addInternal(this.form).then(response => {
            //   this.$modal.msgSuccess("新增成功");
            //   this.open = false;
            //   this.getList();
            // });
            // 生成一个 uuid
            const generator = new SnowflakeIdGenerator();

            // start
            const uuid = String(generator.nextId())
            data.uuid = uuid;
            // end
            data.scrUuid = generator.nextId();
            data.rzsrc2List = this.rzsrc2List;
            data.createBy = this.name;
            this.rzaudit_data = {
              "id": null,
              "auditId": null,
              "scrUuid": data.scrUuid,
              "createBy": this.name,
              "createTime": null,
              "dataJson": JSON.stringify(data),
              "tableName": "rz_gl_internal",
              "auditState": "1759514891045044200",
              "uuid": uuid,
              "managementId": data.managementId
            }
          }
          this.handleaddList();

        }
      });
    },
    async handleaddList() {
      // 检验上一个数据步骤有没有审批通过
      await this.inspectionPendingReview(this.rzaudit_data)

      addList(this.rzaudit_data).then(res => {
        this.created_successfully = true;
        if (this.title === '修改对内担保台账' && this.isEditable) {
          this.isSuccess = true;
          this.isTitle = true;
          this.isMessage = true;
          this.ctitle = this.isEdit ? '修改提交成功' : '提交成功';
          this.isEdit = false;
        } else {
          this.ctitle = '提交成功';
          this.isMessage = true;
          this.isEdit = false;
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      // this.$modal.confirm('是否确认删除对内担保台账编号为"' + ids + '"的数据项？').then(function () {
      //   return delInternal(ids);
      // }).then(() => {
      //   this.getList();
      //   this.$modal.msgSuccess("删除成功");
      // }).catch(() => { });
      const h = this.$createElement;
      this.$msgbox({
        title: '提示',
        message: h('div', null, [
          h('el-divider', {
            class: {
              "no_mt": true,
              "mb20": true
            },
            attrs: { "data-role": 'el-divider' }
          }, ''),
          h('p', {
            class: 'tc w mb20',
            style: {
              'font-size': '24px',
              'color': '#000000',
              'font-weight': 'bold'
            }
          }, '确定删除选中的对内担保台账吗？'),
        ]),
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        cancelButtonClass: "btn-custom-cancel",
        customClass: 'custom-msgbox',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            delInternal(ids).then(res => {
              done();
            });
          } else {
            done();
          }
        }
      }).then(action => {
        this.cancel();
        this.getList();
        this.$modal.msgSuccess("删除成功");
      });
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
      obj.type = "rz_gl_internal";
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
      this.download('glinternal/internal/export', {
        ...this.queryParams
      }, `internal_${new Date().getTime()}.xlsx`)
    },
    /* 上传完成的回调 */
    upload_completed(url_string) {
      const url_list = url_string.split(',')
      url_list.forEach(url_i => {
        let obj = {
          url: url_i,
          projectManagementId: this.form.managementId,
          type: "rz_gl_internal",
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
