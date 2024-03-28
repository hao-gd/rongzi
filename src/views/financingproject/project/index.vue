<template>
  <div class="app-container">

    <search-panel HeaderIcon="financingprojectSvg" title="融资项目">
      <el-form label-position="left" :model="queryParams" ref="queryForm" size="small" :inline="false"
        v-show="showSearch" label-width="130px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="管理编号" prop="managementId">
              <el-input v-model="queryParams.managementId" placeholder="请输入管理编号" clearable
                @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="融资项目" prop="managementId">
              <el-input v-model="queryParams.managementId" placeholder="请输入融资项目" clearable
                @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="债权人" prop="financialInstitution">
              <el-select v-model="queryParams.financialInstitution" placeholder="请选择债权人" filterable clearable>
                <el-option v-for="dict in dict.type.sys_1757271666666242000" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="借款人" prop="borrowingUnit">
              <el-select v-model="queryParams.borrowingUnit" placeholder="请选择借款人" filterable clearable>
                <el-option v-for="dict in dict.type.sys_1767154968256577500" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="融资金额（万元）" :precision="2" prop="financingAmount">
              <el-input v-model.number.trim="queryParams.financingAmount" type="number" placeholder="请输入融资金额" clearable
                @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="融资类型" prop="financingType">
              <el-select v-model="queryParams.financingType" placeholder="请选择融资类型" filterable clearable>
                <el-option v-for="dict in dict.type.sys_1759508335389835300" :key="dict.value" :label="dict.label"
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
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['financingproject:project:export']">导 出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['financingproject:project:add']">新 建</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['financingproject:project:edit']">修改</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['financingproject:project:remove']">删 除</el-button>
      </el-col>
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="projectList" @selection-change="handleSelectionChange"
      :header-cell-style="header_cell_style">
      <el-table-column show-overflow-tooltip fixed="left" type="selection" width="55" align="center" />
      <!-- <el-table-column label="主键id" align="center" prop="id" /> -->
      <el-table-column show-overflow-tooltip label="管理编号" align="center" prop="managementId" min-width="100" />
      <!-- <el-table-column label="数据唯一编号" align="center" prop="scrUuid" /> -->
      <el-table-column show-overflow-tooltip label="借款人" align="center" prop="borrowingUnit" min-width="120">
        <!-- <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1767154968256577500" :value="scope.row.borrowingUnit" />
        </template> -->
      </el-table-column>
      <el-table-column show-overflow-tooltip label="债权人" align="center" prop="financialInstitution" min-width="120">
        <!-- <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1757271666666242000" :value="scope.row.financialInstitution" />
        </template> -->
      </el-table-column>
      <el-table-column show-overflow-tooltip label="融资类型" align="center" prop="financingType" min-width="120">
        <!-- <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1759508335389835300" :value="scope.row.financingType" />
        </template> -->
      </el-table-column>
      <el-table-column show-overflow-tooltip label="融资金额（万元）" align="center" prop="financingAmount" width="180">
        <template slot-scope="scope">
          <span>{{ formatNumberAsRMB(scope.row.financingAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="期限" align="center" prop="loanTerm" min-width="140">
        <template slot-scope="scope">
          <span>{{ appendUnit(scope.row.loanTerm, '天') }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="资金用途" align="center" prop="contractId" /> -->
      <!-- <el-table-column show-overflow-tooltip label="资金用途" align="center" prop="contractId" min-width="120"/> -->
      <!-- <el-table-column label="合同签订日期" align="center" prop="contractSigningDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.contractSigningDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column show-overflow-tooltip label="放款日" align="center" prop="loanDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.loanDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="到期日" align="center" prop="dueDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dueDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="年利率" align="center" prop="rate" min-width="120">
        <template slot-scope="scope">
          <span>{{ appendUnit(scope.row.rate, '%') }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="增信措施" align="center" prop="creditEnhancementMeasures" /> -->
      <!-- <el-table-column label="已还金额（万元）" align="center" prop="repaidAmount" width="160">
         <template slot-scope="scope">
          <span>{{ formatNumberAsRMB(scope.row.repaidAmount) }}</span>
        </template>
      </el-table-column> -->
      
      
      <el-table-column show-overflow-tooltip label="还款计划" align="center" prop="hasRepaymentPlan" min-width="100">
        <!-- <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1759508335389835300" :value="scope.row.financingType" />
        </template> -->
      </el-table-column>
     
      
      <el-table-column label="融资余额（万元）" align="center" prop="remainingAmount" width="160">
        <template slot-scope="scope">
          <span>{{ formatNumberAsRMB(scope.row.remainingAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="债务状态" align="center" prop="loanState" width="120">
        <template slot-scope="scope">
          <svg-icon class="mr5" :icon-class="scope.row.loanState"></svg-icon>
          {{ scope.row.loanState }}
          <!-- <dict-tag style="display: inline-block;" :options="dict.type.sys_1759509599150407700"
            :value="scope.row.loanState" /> -->
          <!-- <dict-tag :options="dict.type.sys_1759509599150407700" :value="scope.row.loanState" /> -->
        </template>
      </el-table-column>
      <!-- <el-table-column show-overflow-tooltip label="备注" align="center" prop="comment" min-width="120" /> -->
      <!-- <el-table-column label="uuid" align="center" prop="uuid" /> -->
      <el-table-column show-overflow-tooltip fixed="right" label="操作" align="center"
        class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleUpdate(scope.row)"
            v-hasPermi="['financingproject:project:edit']">查 看</el-button>
          <!-- <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['financingproject:project:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['financingproject:project:remove']">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改融资项目对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="60%" append-to-body>

      <el-divider class="no_mt mb20"><div style="color: red;">所有修改都需要提交审核，同一项目只能同时提交一个待审核</div></el-divider>

      <div v-if="created_successfully == false">
        <div v-if="title === '修改融资项目'" class="modeify-btn" style="display: flex; justify-content: end;">
          <el-button type="primary" v-if="!this.isEditable" @click="toggleEdit">编 辑</el-button>
          <el-button type="warning" v-else @click="toggleEdit">取消编辑</el-button>
          <el-button type="danger" plain @click="handleDelete(form)">删 除</el-button>
        </div>

        <!-- <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="top">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="管理编号" prop="managementId">
                <el-input :readonly="title === '修改融资项目'" v-model="form.managementId" placeholder="请输入管理编号" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="借款人" prop="borrowingUnit">
                <el-select :disabled="!isEditable" v-model="form.borrowingUnit" filterable placeholder="请选择借款人">
                  <el-option v-for="dict in dict.type.sys_1767154968256577500" :key="dict.value" :label="dict.label"
                    :value="dict.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="债权人" prop="financialInstitution">
                <el-select :disabled="!isEditable" v-model="form.financialInstitution" filterable placeholder="请选择债权人">
                  <el-option v-for="dict in dict.type.sys_1757271666666242000" :key="dict.value" :label="dict.label"
                    :value="dict.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="融资类型" prop="financingType">
                <el-select :disabled="!isEditable" v-model="form.financingType" filterable placeholder="请选择融资类型">
                  <el-option v-for="dict in dict.type.sys_1759508335389835300" :key="dict.value" :label="dict.label"
                    :value="dict.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="融资金额（万元）" prop="financingAmount">
                <el-input :readonly="!isEditable" @keydown.native="amountLimitMethod" type="number"
                  v-model.number.trim="form.financingAmount" placeholder="请输入融资金额" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资金用途" prop="contractId">
                <el-input :readonly="!isEditable" v-model="form.contractId" placeholder="请输入资金用途" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="放款日" prop="loanDate">
                <el-date-picker :disabled="!isEditable" clearable v-model="form.loanDate" type="date"
                  value-format="yyyy-MM-dd" placeholder="请选择放款日" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="到期日" prop="dueDate">
                <el-date-picker :disabled="!isEditable" clearable v-model="form.dueDate" type="date"
                  value-format="yyyy-MM-dd" placeholder="请选择到期日" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="借款期限（月）" prop="loanTerm">
                <el-input :readonly="!isEditable" v-model="creditCycle" placeholder="请输入借款期限" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">

            <el-col :span="8">
              <el-form-item label="年利率" prop="rate">
                <el-input :readonly="!isEditable" v-model="rate" placeholder="请输入年利率" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="已还金额（万元）" prop="repaidAmount">
                <el-input :readonly="!isEditable" @keydown.native="amountLimitMethod" type="number"
                  v-model.number.trim="form.repaidAmount" placeholder="请输入已还金额" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="融资余额（万元）" prop="remainingAmount">
                <el-input ::readonly="true" :disabled="true" @keydown.native="amountLimitMethod" type="number"
                  v-model.number.trim="remainingCreditAmount" placeholder="请输入融资余额" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="债务状态" prop="loanState">
                <el-select :disabled="true" v-model="form.loanState" filterable placeholder="请选择债务状态">
                  <el-option v-for="dict in dict.type.sys_1759509599150407700" :key="dict.value" :label="dict.label"
                    :value="dict.label"></el-option>
                </el-select>
              </el-form-item>
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
        </el-form> -->

        <el-form ref="form" :model="form" :rules="rules" label-width="100%" label-position="top">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="管理编号" prop="managementId">
                <el-input :readonly="title === '修改融资项目'" v-model="form.managementId" placeholder="请输入管理编号" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="借款人" prop="borrowingUnit">
                <el-select :disabled="!isEditable" v-model="form.borrowingUnit" filterable placeholder="请选择借款人">
                  <el-option v-for="dict in dict.type.sys_1767154968256577500" :key="dict.value" :label="dict.label"
                    :value="dict.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="债权人" prop="financialInstitution">
                <el-select :disabled="!isEditable" v-model="form.financialInstitution" filterable placeholder="请选择债权人">
                  <el-option v-for="dict in dict.type.sys_1757271666666242000" :key="dict.value" :label="dict.label"
                    :value="dict.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="融资类型" prop="financingType">
                <el-select :disabled="!isEditable" v-model="form.financingType" filterable placeholder="请选择融资类型">
                  <el-option v-for="dict in dict.type.sys_1759508335389835300" :key="dict.value" :label="dict.label"
                    :value="dict.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="融资金额（万元）" prop="financingAmount">
                <el-input :readonly="!isEditable" @keydown.native="amountLimitMethod" type="number"
                  v-model.number.trim="form.financingAmount" placeholder="请输入融资金额" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资金用途" prop="contractId">
                <el-input :readonly="!isEditable" v-model="form.contractId" placeholder="请输入资金用途" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <!-- <el-col :span="8">
              <el-form-item label="合同签订日期" prop="contractSigningDate">
                <el-date-picker :disabled="!isEditable" clearable v-model="form.contractSigningDate" type="date"
                  value-format="yyyy-MM-dd" placeholder="请选择合同签订日期" />
              </el-form-item>
            </el-col> -->
            <el-col :span="8">
              <el-form-item label="放款日" prop="loanDate">
                <el-date-picker :picker-options="pickerOptions1" :disabled="!isEditable" clearable
                  v-model="form.loanDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择放款日" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="到期日" prop="dueDate">
                <el-date-picker :picker-options="pickerOptions2" :disabled="!isEditable" clearable
                  v-model="form.dueDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择到期日" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="借款期限（月）" prop="loanTerm">
                <el-input :readonly="!isEditable" v-model="creditCycle" placeholder="请输入借款期限" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">

            <el-col :span="8">
              <el-form-item label="年利率" prop="rate">
                <el-input :readonly="true" :disabled="true" v-model="rate" placeholder="请输入年利率" />
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="增信措施" prop="creditEnhancementMeasures">
                <el-input :readonly="!isEditable" v-model="form.creditEnhancementMeasures" placeholder="请输入增信措施" />
              </el-form-item>
            </el-col> -->
            <el-col :span="8">
              <el-form-item label="已还金额（万元）" prop="repaidAmount">
                <el-input :readonly="!isEditable" @keydown.native="amountLimitMethod" type="number"
                  v-model.number.trim="form.repaidAmount" placeholder="请输入已还金额" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="融资余额（万元）" prop="remainingAmount">
                <el-input :readonly="true" :disabled="true" @keydown.native="amountLimitMethod" type="number"
                  v-model.number.trim="remainingCreditAmount" placeholder="请输入融资余额" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="债务状态" prop="loanState">
                <el-select :disabled="true" v-model="form.loanState" filterable placeholder="请选择债务状态">
                  <el-option v-for="dict in dict.type.sys_1759509599150407700" :key="dict.value" :label="dict.label"
                    :value="dict.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-divider class="no_mt mb20"></el-divider>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="本金偿还方式" prop="principalRepaymentMethod">
                <el-select :disabled="!isEditable" v-model="form.principalRepaymentMethod" filterable
                  placeholder="请选择本金偿还方式">
                  <el-option v-for="dict in dict.type.sys_1772148848135766000" :key="dict.value" :label="dict.label"
                    :value="dict.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="利息偿还方式" prop="interestRepaymentMethod">
                <el-select :disabled="!isEditable" v-model="form.interestRepaymentMethod" filterable
                  placeholder="请选择利息偿还方式">
                  <el-option v-for="dict in dict.type.sys_1772149063001571300" :key="dict.value" :label="dict.label"
                    :value="dict.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否固定利率" prop="rateType">
                <el-select :disabled="!isEditable" v-model="form.rateType" filterable placeholder="请选择是否固定利率">
                  <el-option v-for="dict in dict.type.sys_1772149405672013800" :key="dict.value" :label="dict.label"
                    :value="dict.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="第1期开始时间" prop="firstRepaymentDate">
                <el-date-picker :disabled="!isEditable" :picker-options="pickerOptions3" clearable
                  v-model="form.firstRepaymentDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择第1期开始时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否有还款计划" prop="hasRepaymentPlan">
                <el-select :disabled="!isEditable" v-model="form.hasRepaymentPlan" filterable placeholder="请选择是否有还款计划">
                  <el-option v-for="dict in dict.type.sys_1772149579718852600" :key="dict.value" :label="dict.label"
                    :value="dict.label"></el-option>
                </el-select>
              </el-form-item>
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

          <el-divider></el-divider>

          <!--          <div v-show="(!empty.includes(this.form.loanDate) &&
          !empty.includes(this.form.dueDate) &&
          !empty.includes(this.form.firstRepaymentDate) &&
          !empty.includes(this.form.rateType) &&
          !empty.includes(this.form.interestRepaymentMethod) &&
          !empty.includes(this.form.financingAmount))" style="display: flex; justify-content: center;">
            <el-button type="primary" @click="callChildMethod">
              创建还款计划</el-button>
          </div> -->
          <el-row v-if="(!empty.includes(this.form.loanDate) &&
          !empty.includes(this.form.dueDate) &&
          !empty.includes(this.form.firstRepaymentDate) &&
          !empty.includes(this.form.rateType) &&
          !empty.includes(this.form.interestRepaymentMethod) &&
          !empty.includes(this.form.financingAmount))">
            <hkjh-panel ref="hkjhPanel" :form="form" :isEditable="isEditable"
              :huankuanmingxi2List="EchoHuankuanmingxi2List" @getRepaymentPlan="ReturnGetRepaymentPlan"></hkjh-panel>
          </el-row>
        </el-form>

        <div slot="footer" class="dialog-footer" style="display: flex; justify-content: center;">
          <el-button type="primary" @click="submitForm">提交审核</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </div>
      <div v-else class="flex">
        <CreateSuccess @close-dialog="closeDialog" @create-again="create_again" :isSuccess="isSuccess"
          :isTitle="isTitle" :isMessage="isMessage" :title="ctitle" :isEdit="isEdit" @confirm="handleaddList"
          @cancel="cancel">
        </CreateSuccess>
      </div>


    </el-dialog>
  </div>
</template>

<script>
  import {
    listProject,
    getProject,
    delProject,
    addProject,
    updateProject,
    getRepaymentPlan
  } from "@/api/financingproject/project";
  import {
    SnowflakeIdGenerator
  } from '@/utils/index'
  import {
    listList,
    getList,
    delList,
    addList,
    updateList
  } from "@/api/rzauditlist/list";

  import {
    resetForm,
    rules,
    queryParams,
    multiplySelectedFields
  } from './form'

  import {
    mapGetters
  } from 'vuex';
  import moment from 'moment'
  import CreateSuccess from '@/components/createSuccess/index.vue'
  import SearchPanel from '@/components/SearchPanel/index.vue'
  import hkjhPanel from './hkjh.vue'

  export default {
    name: "Project",
    dicts: ['sys_1767154968256577500', 'sys_1759508335389835300', 'sys_1759509599150407700', 'sys_1757271666666242000',
      "sys_1772148848135766000", "sys_1772149063001571300", "sys_1772149405672013800", "sys_1772149579718852600"
    ],
    components: {
      CreateSuccess,
      SearchPanel,
      hkjhPanel
    },
    data() {
      return {
        empty: [null, undefined, ''],
        isSuccess: true,
        isTitle: true,
        isMessage: true,
        ctitle: '',
        isEdit: false,
        rzaudit_data: null,

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
        // 融资项目表格数据
        projectList: [],
        // 附件表表格数据
        rzsrc2List: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 创建人时间范围
        daterangeContractSigningDate: [],
        // 查询参数
        queryParams: queryParams,
        /* str 需要添加的 */
        scrUuid: null,
        /* end */

        // 表单参数
        form: {
          loanDate: null,
          dueDate: null
        },
        // 表单校验
        rules: rules,
        isAutoCalculated: false, // 是否自动计算的标志
        pickerOptions1: {
          // 禁用开始日期中，所有大于结束日期的日期
          disabledDate: (date) => {
            if (this.form.dueDate) {
              return date.getTime() > new Date(this.form.dueDate).getTime();
            }
          }
        },
        pickerOptions2: {
          // 禁用结束日期中，所有小于开始日期的日期
          disabledDate: (date) => {
            if (this.form.loanDate) {
              return date.getTime() < new Date(this.form.loanDate).getTime();
            }
          }
        },
        pickerOptions3: {
          disabledDate: (date) => {
            const start = new Date(this.form.loanDate).getTime();
            const end = new Date(this.form.dueDate).getTime();
            // 禁用不在开始和结束日期范围内的所有日期
            return date.getTime() < start || date.getTime() > end;
          }
        },
        EchoHuankuanmingxi2List: []
      };
    },
    watch: {
      open(n, o) {
        if (n == false) {
          this.created_successfully = false;
          this.isEditable = true;
        }
      },
      // 观察开始和结束日期的变化，自动重新计算天数
      'form.loanDate': function(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.calculateLoanTerm();
        }
      },
      'form.dueDate': function(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.calculateLoanTerm();
        }
      },
      'form.remainingAmount'(n, o) {
        if (n === 0) {
          this.form.loanState = '已结清'
        } else {
          this.form.loanState = '未结清'
        }
      }
    },
    computed: {
      ...mapGetters([
        'name', 'avatar'
      ]),
      remainingCreditAmount() {
        // 确保值为数值类型，避免NaN
        const creditAmount = Number(this.form.financingAmount) || 0;
        const usedCreditAmount = Number(this.form.repaidAmount) || 0;

        const residue = creditAmount - usedCreditAmount;
        this.form.remainingAmount = residue;
        return residue;
      },
      /* 计算周期，开始时间减去结束时间 */
      creditCycle: {
        get() {
          // 如果是自动计算的，直接返回计算结果加"天"，否则返回当前值
          if (this.isAutoCalculated) {
            return this.form.loanTerm ? `${this.form.loanTerm}天` : '';
          } else {
            return this.form.loanTerm ? `${this.form.loanTerm}天` : '';
          }
        },
        set(value) {
          this.isAutoCalculated = false; // 用户手动输入，更改标志状态
          if (typeof value === 'string' && value.includes('天')) {
            this.form.loanTerm = parseInt(value.replace('天', ''), 10);
          } else if (!isNaN(value)) {
            this.form.loanTerm = parseInt(value, 10);
          }
        }
      },
      rate: {
        get() {
          if (this.form.rate) {
            // 当读取值时，添加百分号
            return this.form.rate + (this.form.rate ? '%' : '');
          } else {
            return this.form.rate;
          }
        },
        set(value) {
          this.form.rate = value.replace(/%/g, '');
        }
      },
    },
    created() {
      this.getList();

      this.created_successfully = false;
      this.isEditable = true;
    },
    methods: {
      calculateLoanTerm() {
        if (this.form.loanDate && this.form.dueDate) {
          const start = moment(this.form.loanDate);
          const end = moment(this.form.dueDate);

          const days = end.diff(start, 'days') + 1; // 直接计算天数，并加1表示至少一天

          this.form.loanTerm = days;
          this.isAutoCalculated = true; // 标记为自动计算
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
      /** 查询融资项目列表 */
      getList() {
        this.loading = true;

        this.queryParams.params = {};
        this.queryParams['orderByColumn'] = 'id'
        if (null != this.daterangeContractSigningDate && '' != this.daterangeContractSigningDate) {
          this.queryParams.params["beginContractSigningDate"] = this.daterangeContractSigningDate[0];
          this.queryParams.params["endContractSigningDate"] = this.daterangeContractSigningDate[1];
        }
        const search = JSON.parse(JSON.stringify(this.queryParams))
        if (![null, '', undefined].includes(search.financingAmount)) {
          search.financingAmount = Number(search.financingAmount) * 10000
        }
        listProject(search).then(response => {
          this.projectList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
      getRepaymentPlanlsit() {
        const search = {
          managerId: this.form.managementId
        };
        getRepaymentPlan(search).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.EchoHuankuanmingxi2List = res.rows;


            console.log(this.EchoHuankuanmingxi2List);
          }
        })
      },
      // 取消按钮
      cancel() {
        this.$refs.hkjhPanel.clearHkjhList();
        this.open = false;
        this.created_successfully = false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.form = resetForm;
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
        this.daterangeContractSigningDate = [];
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
        this.title = "添加融资项目";
        // this.$refs.hkjhPanel.clearHkjhList();
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.isEditable = false;
        this.reset();
        const id = row.id || this.ids
        getProject(id).then(response => {
          /* str 需要赋值粘贴到的 */
          response.data.rzsrc2List.forEach(i => {
            i.id = null;
          })


          // 金额 / 10000
          response.data.financingAmount = Number(response.data.financingAmount) / 10000;
          response.data.repaidAmount = Number(response.data.repaidAmount) / 10000;
          response.data.remainingAmount = Number(response.data.remainingAmount) / 10000;

          this.scrUuid = response.data.scrUuid;
          this.form = response.data;
          this.getRepaymentPlanlsit();


          // this.bjch, this.zjbj, this.lvbg, this.lixichanghuanArray, this.repaymentPlanTable

          this.form.scrUuid = response.data.rzsrc2List.map(i => i.url)
          /* end */
          this.rzsrc2List = response.data.rzsrc2List;
          this.open = true;
          this.title = "修改融资项目";
        });
      },
      callChildMethod() {
        this.$refs.hkjhPanel.hkjh();
      },
      // 还款计划生成的数据返回
      ReturnGetRepaymentPlan(data) {
        const {
          bjch,
          zjbj,
          lvbg,
          lixichanghuanArray,
          repaymentPlanTable
        } = data;
        this.form.tiqubenjin = JSON.stringify(zjbj);
        this.form.changhuanbenjin = JSON.stringify(bjch);
        this.form.lilvbiangeng = JSON.stringify(lixichanghuanArray);
        this.form.lixichanghuan = JSON.stringify(lvbg);
        console.log(repaymentPlanTable);
        // 生成好的还款计划，里面的利率字段需要同步到备注里面
        const huankuanmingxi2List = repaymentPlanTable.map(i => {
          i['备注'] = i['利率'];
          return i;
        })
        this.form.huankuanmingxi2List = huankuanmingxi2List;
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            const data = JSON.parse(JSON.stringify(this.form))
            this.form.rzsrc2List = this.rzsrc2List;
            this.rzaudit_data = null;

            // 金额 * 10000
            data.financingAmount = data.financingAmount * 10000;
            data.repaidAmount = data.repaidAmount * 10000;
            data.remainingAmount = data.remainingAmount * 10000;
            // 利率
            const lvlist = JSON.parse(data.lixichanghuan);
            data.rate = lvlist[lvlist.length - 1].rate;

            if (this.form.id != null) {
              data.scrUuid = Number(this.scrUuid);

              // 计算周期，开始时间减去结束时间
              let loanTermStr = data.loanTerm.toString();
              loanTermStr = loanTermStr.replace(/天$/, '');

              data.loanTerm = loanTermStr
              // data.rate =  data.rate ? data.rate.replace(/%/g, '') : data.rate; // 替换掉所有的百分号
              this.rzaudit_data = {
                "auditId": data.id,
                "scrUuid": data.scrUuid,
                "createBy": this.name,
                "createTime": null,
                "dataJson": JSON.stringify(data),
                "tableName": "rz_financing_project",
                "auditState": "1759514891045044200",
                "uuid": data.uuid
              }
              if (this.title === '修改融资项目' && this.created_successfully === false && this.isEditable === true) {
                this.created_successfully = true;
                this.isSuccess = false;
                this.isTitle = true;
                this.isMessage = false;
                this.ctitle = '确定修改融资项目信息吗？';
                this.isEdit = true;
                return;
              }
            } else {
              // 生成一个 uuid
              const generator = new SnowflakeIdGenerator();
              data.scrUuid = generator.nextId();
              data.rzsrc2List = this.rzsrc2List;

              data.createBy = this.name;
              // start
              const uuid = String(generator.nextId())
              data.uuid = uuid;
              // end
              // 计算周期，开始时间减去结束时间
              let loanTermStr = data.loanTerm.toString();
              loanTermStr = loanTermStr.replace(/天$/, '');

              data.loanTerm = loanTermStr
              // data.rate =  data.rate ? data.rate.replace(/%/g, '') : data.rate; // 替换掉所有的百分号
              this.rzaudit_data = {
                "id": null,
                "auditId": null,
                "scrUuid": data.scrUuid,
                "createBy": this.name,
                "createTime": null,
                "dataJson": JSON.stringify(data),
                "tableName": "rz_financing_project",
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
          if (this.title === '修改融资项目' && this.isEditable) {
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
        }).catch(err => {

        })
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const ids = row.id || this.ids;
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('div', null, [
            h('el-divider', {
              class: {
                "no_mt": true,
                "mb20": true
              },
              attrs: {
                "data-role": 'el-divider'
              }
            }, ''),
            h('p', {
              class: 'tc w mb20',
              style: {
                'font-size': '24px',
                'color': '#000000',
                'font-weight': 'bold'
              }
            }, '确定删除选中的融资项目吗？'),
          ]),
          showCancelButton: true,
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          cancelButtonClass: "btn-custom-cancel",
          customClass: 'custom-msgbox',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              delProject(ids).then(res => {
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
      rowrzsrc2Index({
        row,
        rowIndex
      }) {
        row.index = rowIndex + 1;
      },
      /** 附件表添加按钮操作 */
      handleAddrzsrc2() {
        let obj = {};
        obj.url = "";
        obj.projectManagementId = "";
        obj.type = "rz_financing_project";
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
        this.download('financingproject/project/export', {
          ...this.queryParams
        }, `project_${new Date().getTime()}.xlsx`)
      },
      /* 上传完成的回调 */
      upload_completed(url_string) {
        const url_list = url_string.split(',')
        url_list.forEach(url_i => {
          let obj = {
            url: url_i,
            projectManagementId: this.form.managementId,
            type: "rz_financing_project",
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
<style lang="scss" scoped></style>
