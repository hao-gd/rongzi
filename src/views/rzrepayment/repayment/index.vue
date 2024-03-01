<template>
  <div class="app-container">
    <!-- <el-form label-position="left" :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="还款计划管理编号" prop="managementId">
        <el-input v-model="queryParams.managementId" placeholder="请输入还款计划管理编号" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="数据唯一编号" prop="scrUuid">
        <el-input v-model="queryParams.scrUuid" placeholder="请输入数据唯一编号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="借款单位" prop="borrowingUnit">
        <el-select v-model="queryParams.borrowingUnit" placeholder="请选择借款单位" clearable>
          <el-option v-for="dict in dict.type.sys_1759464239669444600" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="金融机构" prop="financialInstitution">
        <el-select v-model="queryParams.financialInstitution" placeholder="请选择金融机构" clearable>
          <el-option v-for="dict in dict.type.sys_acceptor" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="出资机构" prop="fundingInstitution">
        <el-select v-model="queryParams.fundingInstitution" placeholder="请选择出资机构" clearable>
          <el-option v-for="dict in dict.type.sys_1759533269293990000" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="借款用途：流贷贷款、并购贷、反向保理、商业承兑、银行承兑" prop="loanUse">
        <el-select v-model="queryParams.loanUse" placeholder="请选择借款用途：流贷贷款、并购贷、反向保理、商业承兑、银行承兑" clearable>
          <el-option v-for="dict in dict.type.sys_1759501814702538800" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="增信措施：固定融资、固定资产" prop="creditEnhancementMeasures">
        <el-select v-model="queryParams.creditEnhancementMeasures" placeholder="请选择增信措施：固定融资、固定资产" clearable>
          <el-option v-for="dict in dict.type.sys_1759533566884053000" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="借款金额" prop="loanAmount">
        <el-input v-model="queryParams.loanAmount" placeholder="请输入借款金额" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="手续费" prop="commission">
        <el-input v-model="queryParams.commission" placeholder="请输入手续费" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="保证金" prop="margin">
        <el-input v-model="queryParams.margin" placeholder="请输入保证金" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="利率" prop="rate">
        <el-input v-model="queryParams.rate" placeholder="请输入利率" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="借款日期" prop="loanDate">
        <el-date-picker clearable v-model="queryParams.loanDate" type="date" value-format="yyyy-MM-dd"
          placeholder="请选择借款日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="到期日期" prop="dueDate">
        <el-date-picker clearable v-model="queryParams.dueDate" type="date" value-format="yyyy-MM-dd"
          placeholder="请选择到期日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="到期提醒" prop="remark">
        <el-select v-model="queryParams.remark" placeholder="请选择到期提醒" clearable>
          <el-option v-for="dict in dict.type.sys_maturity" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="借款期限" prop="loanTerm">
        <el-input v-model="queryParams.loanTerm" placeholder="请输入借款期限" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="本金偿还方式：先息后本" prop="principalRepaymentMethod">
        <el-select v-model="queryParams.principalRepaymentMethod" placeholder="请选择本金偿还方式：先息后本" clearable>
          <el-option v-for="dict in dict.type.sys_1759533864251818000" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="利息偿还方式：先息后本" prop="interestRepaymentMethod">
        <el-select v-model="queryParams.interestRepaymentMethod" placeholder="请选择利息偿还方式：先息后本" clearable>
          <el-option v-for="dict in dict.type.sys_1759533864251818000" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="还款账户" prop="repaymentAccount">
        <el-input v-model="queryParams.repaymentAccount" placeholder="请输入还款账户" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="uuid" prop="uuid">
        <el-input v-model="queryParams.uuid" placeholder="请输入uuid" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form> -->

    <search-panel HeaderIcon="repaymentplan" title="还款计划">
      <el-form label-position="left" :model="queryParams" ref="queryForm" size="small" :inline="false" v-show="showSearch"
        label-width="68px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="管理编号" prop="managementId">
              <el-input v-model="queryParams.managementId" placeholder="请输入管理编号" clearable
                @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="到期日期" prop="dueDate">
              <!-- <el-date-picker clearable v-model="queryParams.dueDate" type="date" value-format="yyyy-MM-dd"
                placeholder="请选择到期日期">
              </el-date-picker> -->
              <el-date-picker v-model="daterangeDueDate" clearable value-format="yyyy-MM-dd" type="daterange"
                range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="金融机构" prop="financialInstitution">
              <el-select v-model="queryParams.financialInstitution" placeholder="请选择金融机构" clearable>
                <el-option v-for="dict in dict.type.sys_acceptor" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="借款单位" prop="borrowingUnit">
              <el-select v-model="queryParams.borrowingUnit" placeholder="请选择借款单位" clearable>
                <el-option v-for="dict in dict.type.sys_1759464239669444600" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item class="flex" style="display: flex; justify-content: flex-end;">
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">查 询</el-button>
              <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </search-panel>


    <el-divider class="mt20 mb20"></el-divider>
    <el-row type="flex" :gutter="10" class="mb8" justify="end">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['rzrepayment:repayment:add']">新 建</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['rzrepayment:repayment:edit']">修改</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['rzrepayment:repayment:remove']">删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['rzrepayment:repayment:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="repaymentList" @selection-change="handleSelectionChange"
      :header-cell-style="header_cell_style" show-overflow-tooltip>
      <el-table-column show-overflow-tooltip fixed="left" type="selection" width="55" align="center" />
      <!-- <el-table-column show-overflow-tooltip label="主键id" align="center" prop="id" /> -->
      <el-table-column show-overflow-tooltip label="管理编号" align="center" prop="managementId" />
      <!-- <el-table-column show-overflow-tooltip label="数据唯一编号" align="center" prop="scrUuid" /> -->
      <el-table-column show-overflow-tooltip label="借款单位" align="center" prop="borrowingUnit" width="120">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1759464239669444600" :value="scope.row.borrowingUnit" />
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="金融机构" align="center" prop="financialInstitution" width="120">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_acceptor" :value="scope.row.financialInstitution" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="出资机构" align="center" prop="fundingInstitution" width="120">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1759533269293990000" :value="scope.row.fundingInstitution" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="借款用途" align="center" prop="loanUse">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1759501814702538800" :value="scope.row.loanUse" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="增信措施" align="center" prop="creditEnhancementMeasures">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1759533566884053000" :value="scope.row.creditEnhancementMeasures" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="借款金额（万元）" align="center" prop="loanAmount" width="180" />
      <el-table-column show-overflow-tooltip label="手续费（万元）" align="center" prop="commission" width="180" />
      <el-table-column show-overflow-tooltip label="保证金（万元）" align="center" prop="margin" width="180" />
      <el-table-column show-overflow-tooltip label="利率" align="center" prop="rate" />
      <el-table-column show-overflow-tooltip label="借款日期" align="center" prop="loanDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.loanDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="到期日期" align="center" prop="dueDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dueDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="到期提醒" align="center" prop="remark">
        <template slot-scope="scope">
          <!-- <dict-tag :options="dict.type.sys_maturity" :value="scope.row.remark" /> -->
          <el-tag effect="plain" :hit="true" :class="checkDueReminderWithConfig(scope.row.dueDate).color">
            {{ checkDueReminderWithConfig(scope.row.dueDate).message }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="借款期限" align="center" prop="loanTerm" />
      <el-table-column show-overflow-tooltip label="本金偿还方式" align="center" prop="principalRepaymentMethod" width="120">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1759533864251818000" :value="scope.row.principalRepaymentMethod" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="利息偿还方式" align="center" prop="interestRepaymentMethod" width="120">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1759533864251818000" :value="scope.row.interestRepaymentMethod" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="还款账户" align="center" prop="repaymentAccount" />
      <!-- <el-table-column show-overflow-tooltip label="uuid" align="center" prop="uuid" /> -->
      <el-table-column show-overflow-tooltip fixed="right" label="操作" align="center"
        class-name="small-padding fixed-width">
        <template slot-scope="scope">

          <el-button size="mini" type="text" @click="handleUpdate(scope.row)"
            v-hasPermi="['rzrepayment:repayment:edit']">查 看</el-button>

          <!-- <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['rzrepayment:repayment:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['rzrepayment:repayment:remove']">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改还款计划对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="60%" append-to-body>
      <!-- <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="top">
        <el-form-item label="还款计划管理编号" prop="managementId">
          <el-input v-model="form.managementId" placeholder="请输入还款计划管理编号" />
        </el-form-item>
        <el-form-item label="数据唯一编号" prop="scrUuid">
          <el-input v-model="form.scrUuid" placeholder="请输入数据唯一编号" />
        </el-form-item>
        <el-form-item label="借款单位" prop="borrowingUnit">
          <el-select v-model="form.borrowingUnit" placeholder="请选择借款单位">
            <el-option v-for="dict in dict.type.sys_1759464239669444600" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金融机构" prop="financialInstitution">
          <el-select v-model="form.financialInstitution" placeholder="请选择金融机构">
            <el-option v-for="dict in dict.type.sys_acceptor" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出资机构" prop="fundingInstitution">
          <el-select v-model="form.fundingInstitution" placeholder="请选择出资机构">
            <el-option v-for="dict in dict.type.sys_1759533269293990000" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="借款用途：流贷贷款、并购贷、反向保理、商业承兑、银行承兑" prop="loanUse">
          <el-select v-model="form.loanUse" placeholder="请选择借款用途：流贷贷款、并购贷、反向保理、商业承兑、银行承兑">
            <el-option v-for="dict in dict.type.sys_1759501814702538800" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="增信措施：固定融资、固定资产" prop="creditEnhancementMeasures">
          <el-select v-model="form.creditEnhancementMeasures" placeholder="请选择增信措施：固定融资、固定资产">
            <el-option v-for="dict in dict.type.sys_1759533566884053000" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="借款金额" prop="loanAmount">
          <el-input v-model="form.loanAmount" placeholder="请输入借款金额" />
        </el-form-item>
        <el-form-item label="手续费" prop="commission">
          <el-input v-model="form.commission" placeholder="请输入手续费" />
        </el-form-item>
        <el-form-item label="保证金" prop="margin">
          <el-input v-model="form.margin" placeholder="请输入保证金" />
        </el-form-item>
        <el-form-item label="利率" prop="rate">
          <el-input v-model="form.rate" placeholder="请输入利率" />
        </el-form-item>
        <el-form-item label="借款日期" prop="loanDate">
          <el-date-picker clearable v-model="form.loanDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择借款日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="到期日期" prop="dueDate">
          <el-date-picker clearable v-model="form.dueDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择到期日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="到期提醒" prop="remark">
          <el-select v-model="form.remark" placeholder="请选择到期提醒">
            <el-option v-for="dict in dict.type.sys_maturity" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="借款期限" prop="loanTerm">
          <el-input v-model="form.loanTerm" placeholder="请输入借款期限" />
        </el-form-item>
        <el-form-item label="本金偿还方式：先息后本" prop="principalRepaymentMethod">
          <el-select v-model="form.principalRepaymentMethod" placeholder="请选择本金偿还方式：先息后本">
            <el-option v-for="dict in dict.type.sys_1759533864251818000" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="利息偿还方式：先息后本" prop="interestRepaymentMethod">
          <el-select v-model="form.interestRepaymentMethod" placeholder="请选择利息偿还方式：先息后本">
            <el-option v-for="dict in dict.type.sys_1759533864251818000" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="还款账户" prop="repaymentAccount">
          <el-input v-model="form.repaymentAccount" placeholder="请输入还款账户" />
        </el-form-item>
        <el-form-item label="uuid" prop="uuid">
          <el-input v-model="form.uuid" placeholder="请输入uuid" />
        </el-form-item>
      </el-form> -->



      <el-divider class="no_mt mb20"></el-divider>

      <div v-if="created_successfully == false">
        <div v-if="title === '修改还款计划'" class="modeify-btn" style="display: flex; justify-content: end;">
          <el-button type="primary" @click="toggleEdit">编 辑</el-button>
          <el-button @click="cancel">删 除</el-button>
        </div>

        <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="top">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="管理编号" prop="managementId">
                <el-input :readonly="!isEditable" v-model="form.managementId" placeholder="请输入管理编号" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="借款单位" prop="borrowingUnit">
                <el-select :disabled="!isEditable" v-model="form.borrowingUnit" placeholder="请选择借款单位">
                  <el-option v-for="dict in dict.type.sys_1759464239669444600" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="金融机构" prop="financialInstitution">
                <el-select :disabled="!isEditable" v-model="form.financialInstitution" placeholder="请选择金融机构">
                  <el-option v-for="dict in dict.type.sys_acceptor" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="出资机构" prop="fundingInstitution">
                <el-select :disabled="!isEditable" v-model="form.fundingInstitution" placeholder="请选择出资机构">
                  <el-option v-for="dict in dict.type.sys_1759533269293990000" :key="dict.value" :label="dict.label"
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
              <el-form-item label="增信措施" prop="creditEnhancementMeasures">
                <el-select :disabled="!isEditable" v-model="form.creditEnhancementMeasures" placeholder="请选择增信措施">
                  <el-option v-for="dict in dict.type.sys_1759533566884053000" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="借款金额（万元）" prop="loanAmount">
                <el-input :readonly="!isEditable" v-model="form.loanAmount" placeholder="请输入借款金额" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手续费（万元）" prop="commission">
                <el-input :readonly="!isEditable" v-model="form.commission" placeholder="请输入手续费" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="保证金（万元）" prop="margin">
                <el-input :readonly="!isEditable" v-model="form.margin" placeholder="请输入保证金" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="利率" prop="rate">
                <el-input :readonly="!isEditable" v-model="form.rate" placeholder="请输入利率" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="借款日期" prop="loanDate">
                <el-date-picker :disabled="!isEditable" clearable v-model="form.loanDate" type="date"
                  value-format="yyyy-MM-dd" placeholder="请选择借款日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="到期日期" prop="dueDate">
                <el-date-picker :disabled="!isEditable" clearable v-model="form.dueDate" type="date"
                  value-format="yyyy-MM-dd" placeholder="请选择到期日期">
                </el-date-picker>
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
              <el-form-item label="本金偿还方式" prop="principalRepaymentMethod">
                <el-select :disabled="!isEditable" v-model="form.principalRepaymentMethod" placeholder="请选择本金偿还方式">
                  <el-option v-for="dict in dict.type.sys_1759533864251818000" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="利息偿还方式" prop="interestRepaymentMethod">
                <el-select :disabled="!isEditable" v-model="form.interestRepaymentMethod" placeholder="请选择利息偿还方式">
                  <el-option v-for="dict in dict.type.sys_1759533864251818000" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="还款账户" prop="repaymentAccount">
                <el-input :readonly="!isEditable" v-model="form.repaymentAccount" placeholder="请输入还款账户" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <div slot="footer" class="dialog-footer" style="display: flex; justify-content: center;">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </div>

      <div v-else class="flex">
        <CreateSuccess @close-dialog="closeDialog" @create-again="create_again"></CreateSuccess>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import { listRepayment, getRepayment, delRepayment, addRepayment, updateRepayment } from "@/api/rzrepayment/repayment";

import { SnowflakeIdGenerator } from '@/utils/index'
import { listList, getList, delList, addList, updateList } from "@/api/rzauditlist/list";
import { mapGetters } from 'vuex';
import moment from 'moment'
import CreateSuccess from '@/components/createSuccess/index.vue'
import SearchPanel from '@/components/SearchPanel/index.vue'

import { checkDueReminderWithConfig } from '@/utils/expirationreminder';
import { reminderConfig } from '@/config/expirationreminder'

export default {
  name: "Repayment",
  dicts: ['sys_1759464239669444600', 'sys_1759533269293990000', 'sys_1759501814702538800', 'sys_acceptor', 'sys_1759533566884053000', 'sys_1759533864251818000'],
  components: {
    CreateSuccess,
    SearchPanel
  },
  data() {
    return {
      reminderConfig: reminderConfig.slice(1),
      checkDueReminderWithConfig: checkDueReminderWithConfig,
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
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 还款计划表格数据
      repaymentList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 开始时间范围
      daterangeLoanDate: [],
      // 到期时间范围
      daterangeDueDate: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        managementId: null,
        scrUuid: null,
        borrowingUnit: null,
        financialInstitution: null,
        fundingInstitution: null,
        loanUse: null,
        creditEnhancementMeasures: null,
        loanAmount: null,
        commission: null,
        margin: null,
        rate: null,
        loanDate: null,
        dueDate: null,
        remark: null,
        loanTerm: null,
        principalRepaymentMethod: null,

        interestRepaymentMethod: null,
        repaymentAccount: null,
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
          { required: true, message: "还款计划管理编号不能为空", trigger: "blur" }
        ],
        scrUuid: [
          { required: true, message: "数据唯一编号不能为空", trigger: "blur" }
        ],
        borrowingUnit: [
          { required: true, message: "借款单位不能为空", trigger: "change" }
        ],
        financialInstitution: [
          { required: true, message: "金融机构不能为空", trigger: "change" }
        ],
        fundingInstitution: [
          { required: true, message: "出资机构不能为空", trigger: "change" }
        ],
        loanUse: [
          { required: true, message: "借款用途：流贷贷款、并购贷、反向保理、商业承兑、银行承兑不能为空", trigger: "change" }
        ],
        creditEnhancementMeasures: [
          { required: true, message: "增信措施：固定融资、固定资产不能为空", trigger: "change" }
        ],
        loanAmount: [
          { required: true, message: "借款金额不能为空", trigger: "blur" }
        ],
        commission: [
          { required: true, message: "手续费不能为空", trigger: "blur" }
        ],
        margin: [
          { required: true, message: "保证金不能为空", trigger: "blur" }
        ],
        rate: [
          { required: true, message: "利率不能为空", trigger: "blur" }
        ],
        loanDate: [
          { required: true, message: "借款日期不能为空", trigger: "blur" }
        ],
        dueDate: [
          { required: true, message: "到期日期不能为空", trigger: "blur" }
        ],
        remark: [
          { required: true, message: "到期提醒不能为空", trigger: "change" }
        ],
        loanTerm: [
          { required: true, message: "借款期限不能为空", trigger: "blur" }
        ],
        principalRepaymentMethod: [
          { required: true, message: "本金偿还方式：先息后本不能为空", trigger: "change" }
        ],

        interestRepaymentMethod: [
          { required: true, message: "利息偿还方式：先息后本不能为空", trigger: "change" }
        ],
        repaymentAccount: [
          { required: true, message: "还款账户不能为空", trigger: "blur" }
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
    /** 查询还款计划列表 */
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
      listRepayment(this.queryParams).then(response => {
        this.repaymentList = response.rows;
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
        borrowingUnit: null,
        financialInstitution: null,
        fundingInstitution: null,
        loanUse: null,
        creditEnhancementMeasures: null,
        loanAmount: null,
        commission: null,
        margin: null,
        rate: null,
        loanDate: null,
        dueDate: null,
        remark: null,
        loanTerm: null,
        principalRepaymentMethod: null,

        interestRepaymentMethod: null,
        repaymentAccount: null,
        createTime: null,
        createBy: null,
        updateTime: null,
        updateBy: null,
        uuid: null
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
      this.daterangeLoanDate = [];
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
      this.title = "添加还款计划";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.isEditable = false;
      this.reset();
      const id = row.id || this.ids
      getRepayment(id).then(response => {

        this.form = response.data;
        this.open = true;
        this.title = "修改还款计划";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.form))

          if (this.form.id != null) {
            updateRepayment(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            // addRepayment(this.form).then(response => {
            //   this.$modal.msgSuccess("新增成功");
            //   this.open = false;
            //   this.getList();
            // });
            const generator = new SnowflakeIdGenerator();

            data.createBy = this.name;


            const rzaudit_data = {
              "id": null,
              "auditId": String(generator.nextId()).substring(0, 6),
              "scrUuid": null,
              "createBy": this.name,
              "createTime": null,
              "dataJson": JSON.stringify(data),
              "tableName": "rz_repayment",
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
      this.$modal.confirm('是否确认删除还款计划编号为"' + ids + '"的数据项？').then(function () {
        return delRepayment(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('rzrepayment/repayment/export', {
        ...this.queryParams
      }, `repayment_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
