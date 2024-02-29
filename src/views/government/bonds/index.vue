<template>
  <div class="app-container">
    <!-- <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="政府专项债管理编号" prop="managementId">
        <el-input v-model="queryParams.managementId" placeholder="请输入政府专项债管理编号" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="债券名称" prop="bondName">
        <el-input v-model="queryParams.bondName" placeholder="请输入债券名称" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="债券发行规模" prop="bondSize">
        <el-select v-model="queryParams.bondSize" placeholder="请选择债券发行规模" clearable>
          <el-option v-for="dict in dict.type.sys_1762824645385388000" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="利率" prop="rate">
        <el-select v-model="queryParams.rate" placeholder="请选择利率" clearable>
          <el-option v-for="dict in dict.type.sys_1762824761903153200" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="债券发行期限" prop="bondDuration">
        <el-select v-model="queryParams.bondDuration" placeholder="请选择债券发行期限" clearable>
          <el-option v-for="dict in dict.type.sys_1762824852571422700" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="偿还方式：先息后本" prop="repaymentMethod">
        <el-select v-model="queryParams.repaymentMethod" placeholder="请选择偿还方式：先息后本" clearable>
          <el-option v-for="dict in dict.type.sys_1759533864251818000" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="累计到账金额" prop="accumulatedAmountReceived">
        <el-input v-model="queryParams.accumulatedAmountReceived" placeholder="请输入累计到账金额" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="发行主体" prop="issuingEntity">
        <el-select v-model="queryParams.issuingEntity" placeholder="请选择发行主体" clearable>
          <el-option v-for="dict in dict.type.sys_1762824996528324600" :key="dict.value" :label="dict.label"
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
    <search-panel HeaderIcon="government" title="政府专项债">
      <el-form :model="queryParams" ref="queryForm" size="small" label-width="120px" label-position="left" v-show="showSearch">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="管理编号" prop="managementId">
              <el-input v-model="queryParams.managementId" placeholder="请输入管理编号" clearable
                @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="债券名称" prop="bondName">
              <el-input v-model="queryParams.bondName" placeholder="请输入债券名称" clearable
                @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="债券发行规模" prop="bondSize">
              <el-select v-model="queryParams.bondSize" placeholder="请选择债券发行规模" clearable>
                <el-option v-for="dict in dict.type.sys_1762824645385388000" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="债券利率" prop="rate">
              <el-select v-model="queryParams.rate" placeholder="请选择利率" clearable>
                <el-option v-for="dict in dict.type.sys_1762824761903153200" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="债券发行期限" prop="bondDuration">
              <el-select v-model="queryParams.bondDuration" placeholder="请选择债券发行期限" clearable>
                <el-option v-for="dict in dict.type.sys_1762824852571422700" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="偿还方式" prop="repaymentMethod">
              <el-select v-model="queryParams.repaymentMethod" placeholder="请选择偿还方式" clearable>
                <el-option v-for="dict in dict.type.sys_1759533864251818000" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="累计到账金额" prop="accumulatedAmountReceived">
              <el-input v-model="queryParams.accumulatedAmountReceived" placeholder="请输入累计到账金额" clearable
                @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发行主体" prop="issuingEntity">
              <el-select v-model="queryParams.issuingEntity" placeholder="请选择发行主体" clearable>
                <el-option v-for="dict in dict.type.sys_1762824996528324600" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
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
          v-hasPermi="['government:bonds:add']">新 建</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['government:bonds:edit']">修改</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['government:bonds:remove']">删 除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['government:bonds:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="bondsList" @selection-change="handleSelectionChange"
      :header-cell-style="header_cell_style">
      <el-table-column fixed="left" type="selection" width="55" align="center" />
      <!-- <el-table-column label="主键id" align="center" prop="id" /> -->
      <el-table-column label="管理编号" align="center" prop="managementId" />
      <!-- <el-table-column label="数据唯一编号" align="center" prop="scrUuid" /> -->
      <el-table-column label="债券名称" align="center" prop="bondName" />
      <el-table-column label="债券发行规模（万元）" align="center" prop="bondSize" width="180">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1762824645385388000" :value="scope.row.bondSize" />
        </template>
      </el-table-column>
      <el-table-column label="利率" align="center" prop="rate">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1762824761903153200" :value="scope.row.rate" />
        </template>
      </el-table-column>
      <el-table-column label="债券发行期限" align="center" prop="bondDuration">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1762824852571422700" :value="scope.row.bondDuration" />
        </template>
      </el-table-column>
      <el-table-column label="偿还方式" align="center" prop="repaymentMethod">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1759533864251818000" :value="scope.row.repaymentMethod" />
        </template>
      </el-table-column>
      <el-table-column label="累计到账金额（万元）" align="center" prop="accumulatedAmountReceived" width="180" />
      <el-table-column label="发行主体" align="center" prop="issuingEntity">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1762824996528324600" :value="scope.row.issuingEntity" />
        </template>
      </el-table-column>
      <!-- <el-table-column label="备注" align="center" prop="comment" /> -->
      <!-- <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="uuid" align="center" prop="uuid" /> -->
      <el-table-column fixed="right" label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleUpdate(scope.row)" v-hasPermi="['government:bonds:edit']">查
            看</el-button>
          <!-- <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['government:bonds:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['government:bonds:remove']">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改政府专项债对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="60%" append-to-body>
      <el-divider class="no_mt mb20"></el-divider>
      <!-- <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="政府专项债管理编号" prop="managementId">
          <el-input v-model="form.managementId" placeholder="请输入政府专项债管理编号" />
        </el-form-item>
        <el-form-item label="数据唯一编号" prop="scrUuid">
          <file-upload v-model="form.scrUuid" />
        </el-form-item>
        <el-form-item label="债券名称" prop="bondName">
          <el-input v-model="form.bondName" placeholder="请输入债券名称" />
        </el-form-item>
        <el-form-item label="债券发行规模" prop="bondSize">
          <el-select v-model="form.bondSize" placeholder="请选择债券发行规模">
            <el-option v-for="dict in dict.type.sys_1762824645385388000" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="利率" prop="rate">
          <el-select v-model="form.rate" placeholder="请选择利率">
            <el-option v-for="dict in dict.type.sys_1762824761903153200" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="债券发行期限" prop="bondDuration">
          <el-select v-model="form.bondDuration" placeholder="请选择债券发行期限">
            <el-option v-for="dict in dict.type.sys_1762824852571422700" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="偿还方式：先息后本" prop="repaymentMethod">
          <el-select v-model="form.repaymentMethod" placeholder="请选择偿还方式：先息后本">
            <el-option v-for="dict in dict.type.sys_1759533864251818000" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="累计到账金额" prop="accumulatedAmountReceived">
          <el-input v-model="form.accumulatedAmountReceived" placeholder="请输入累计到账金额" />
        </el-form-item>
        <el-form-item label="发行主体" prop="issuingEntity">
          <el-select v-model="form.issuingEntity" placeholder="请选择发行主体">
            <el-option v-for="dict in dict.type.sys_1762824996528324600" :key="dict.value" :label="dict.label"
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
        <div v-if="title === '修改政府专项债'" class="modeify-btn" style="display: flex; justify-content: end;">
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
              <el-form-item label="债券名称" prop="bondName">
                <el-input :readonly="!isEditable" v-model="form.bondName" placeholder="请输入债券名称" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="债券发行规模" prop="bondSize">
                <el-select :disabled="!isEditable" v-model="form.bondSize" placeholder="请选择债券发行规模">
                  <el-option v-for="dict in dict.type.sys_1762824645385388000" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="债券利率" prop="rate">
                <el-select :disabled="!isEditable" v-model="form.rate" placeholder="请选择利率">
                  <el-option v-for="dict in dict.type.sys_1762824761903153200" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="债券发行期限" prop="bondDuration">
                <el-select :disabled="!isEditable" v-model="form.bondDuration" placeholder="请选择债券发行期限">
                  <el-option v-for="dict in dict.type.sys_1762824852571422700" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="偿还方式" prop="repaymentMethod">
                <el-select :disabled="!isEditable" v-model="form.repaymentMethod" placeholder="请选择偿还方式：先息后本">
                  <el-option v-for="dict in dict.type.sys_1759533864251818000" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="累计到账金额（万元）" prop="accumulatedAmountReceived">
                <el-input :readonly="!isEditable" v-model="form.accumulatedAmountReceived" placeholder="请输入累计到账金额" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发行主体" prop="issuingEntity">
                <el-select :disabled="!isEditable" v-model="form.issuingEntity" placeholder="请选择发行主体">
                  <el-option v-for="dict in dict.type.sys_1762824996528324600" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
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
        <CreateSuccess @close-dialog="closeDialog" @create-again="create_again"></CreateSuccess>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listBonds, getBonds, delBonds, addBonds, updateBonds } from "@/api/government/bonds";

import { SnowflakeIdGenerator } from '@/utils/index'
import { listList, getList, delList, addList, updateList } from "@/api/rzauditlist/list";
import { mapGetters } from 'vuex';
import moment from 'moment'
import CreateSuccess from '@/components/createSuccess/index.vue'
import SearchPanel from '@/components/SearchPanel/index.vue'
export default {
  name: "Bonds",
  dicts: ['sys_1762824996528324600', 'sys_1762824645385388000', 'sys_1762824852571422700', 'sys_1762824761903153200', 'sys_1759533864251818000'],
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
      // 政府专项债表格数据
      bondsList: [],
      // 附件表表格数据
      rzsrc2List: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        managementId: null,
        scrUuid: null,
        bondName: null,
        bondSize: null,
        rate: null,
        bondDuration: null,
        repaymentMethod: null,
        accumulatedAmountReceived: null,
        issuingEntity: null,
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
          { required: true, message: "政府专项债管理编号不能为空", trigger: "blur" }
        ],
        scrUuid: [
          { required: true, message: "数据唯一编号不能为空", trigger: "blur" }
        ],
        bondName: [
          { required: true, message: "债券名称不能为空", trigger: "blur" }
        ],
        bondSize: [
          { required: true, message: "债券发行规模不能为空", trigger: "change" }
        ],
        rate: [
          { required: true, message: "利率不能为空", trigger: "change" }
        ],
        bondDuration: [
          { required: true, message: "债券发行期限不能为空", trigger: "change" }
        ],
        repaymentMethod: [
          { required: true, message: "偿还方式：先息后本不能为空", trigger: "change" }
        ],
        accumulatedAmountReceived: [
          { required: true, message: "累计到账金额不能为空", trigger: "blur" }
        ],
        issuingEntity: [
          { required: true, message: "发行主体不能为空", trigger: "change" }
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
    /** 查询政府专项债列表 */
    getList() {
      this.loading = true;
      listBonds(this.queryParams).then(response => {
        this.bondsList = response.rows;
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
        bondName: null,
        bondSize: null,
        rate: null,
        bondDuration: null,
        repaymentMethod: null,
        accumulatedAmountReceived: null,
        issuingEntity: null,
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
      this.title = "添加政府专项债";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.isEditable = false;
      this.reset();
      const id = row.id || this.ids
      getBonds(id).then(response => {
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
        this.title = "修改政府专项债";
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
            updateBonds(data).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            // addBonds(this.form).then(response => {
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
              "tableName": "rz_government_special_bonds",
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
      this.$modal.confirm('是否确认删除政府专项债编号为"' + ids + '"的数据项？').then(function () {
        return delBonds(ids);
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
      this.download('government/bonds/export', {
        ...this.queryParams
      }, `bonds_${new Date().getTime()}.xlsx`)
    },
    /* 上传完成的回调 */
    upload_completed(url_string) {
      console.log(url_string);
      const url_list = url_string.split(',')
      url_list.forEach(url_i => {
        let obj = {
          url: url_i,
          projectManagementId: this.form.managementId,
          type: "rz_government_special_bonds",
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
