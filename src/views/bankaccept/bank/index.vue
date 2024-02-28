<template>
  <div class="app-container">
    <!-- <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="管理编号" prop="managementId">
        <el-input
          v-model="queryParams.managementId"
          placeholder="请输入管理编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="出票人" prop="drawer">
        <el-select v-model="queryParams.drawer" placeholder="请选择出票人" clearable>
          <el-option
            v-for="dict in dict.type.sys_drawer"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="收票人" prop="payee">
        <el-select v-model="queryParams.payee" placeholder="请选择收票人" clearable>
          <el-option
            v-for="dict in dict.type.sys_1754491769220759600"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="承兑人" prop="financialInstitution">
        <el-select v-model="queryParams.financialInstitution" placeholder="请选择承兑人（金融机构）" clearable>
          <el-option
            v-for="dict in dict.type.sys_acceptor"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="出票日期">
        <el-date-picker
          v-model="daterangeDraftDate"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="汇票到期日" prop="dueDate">
        <el-date-picker clearable
          v-model="queryParams.dueDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择汇票到期日">
        </el-date-picker>
      </el-form-item>
      
      <el-form-item label="项目名称" prop="entryName">
        <el-input
          v-model="queryParams.entryName"
          placeholder="请输入项目名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="到期提醒" prop="remark">
        <el-select v-model="queryParams.remark" placeholder="请选择到期提醒" clearable>
          <el-option
            v-for="dict in dict.type.sys_maturity"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form> -->
    <search-panel HeaderIcon="bank" title="银行承兑汇票">

      <el-form :model="queryParams" ref="queryForm" size="small" v-show="showSearch" label-width="100px">
        <!-- 第一组表单项 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="管理编号" prop="managementId">
              <el-input v-model="queryParams.managementId" placeholder="请输入管理编号" clearable
                @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出票人" prop="drawer">
              <el-select v-model="queryParams.drawer" placeholder="请选择出票人" clearable>
                <el-option v-for="dict in dict.type.sys_drawer" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收票人" prop="payee">
              <el-select v-model="queryParams.payee" placeholder="请选择收票人" clearable>
                <el-option v-for="dict in dict.type.sys_1754491769220759600" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第二组表单项 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="承兑人" prop="financialInstitution">
              <el-select v-model="queryParams.financialInstitution" placeholder="请选择承兑人（金融机构）" clearable>
                <el-option v-for="dict in dict.type.sys_acceptor" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出票日期">
              <el-date-picker v-model="daterangeDraftDate" style="width: 100%" value-format="yyyy-MM-dd" type="daterange"
                range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="汇票到期日" prop="dueDate">
              <el-date-picker clearable v-model="queryParams.dueDate" type="date" value-format="yyyy-MM-dd"
                placeholder="请选择汇票到期日"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第三组表单项 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="项目名称" prop="entryName">
              <el-input v-model="queryParams.entryName" placeholder="请输入项目名称" clearable
                @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="到期提醒" prop="remark">
              <el-select v-model="queryParams.remark" placeholder="请选择到期提醒" clearable>
                <el-option v-for="dict in dict.type.sys_maturity" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="flex" style="display: flex; justify-content: flex-end;">
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">查 询</el-button>
              <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
            <!-- 如果这一行只有两个表单项，您可以选择添加一个空的 el-col 作为占位，或者不添加，让这两个表单项各占一半宽度 -->
            <!-- 搜索和重置按钮可以单独占据一行 -->
          </el-col>
        </el-row>

        <!-- 搜索和重置按钮 -->
        <!-- <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row> -->
      </el-form>
    </search-panel>
    <el-divider class="mt20 mb20"></el-divider>
    <el-row type="flex" :gutter="10" class="mb8" justify="end">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['bankaccept:bank:add']">新 建</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['bankaccept:bank:edit']">修改</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['bankaccept:bank:remove']">删 除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['bankaccept:bank:export']">导出</el-button>
      </el-col> -->
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="bankList" @selection-change="handleSelectionChange"
      :header-cell-style="header_cell_style">
      <el-table-column fixed="left" type="selection" width="55" align="center" />
      <el-table-column label="管理编号" align="center" prop="managementId" />
      <!-- <el-table-column label="数据唯一编号" align="center" prop="scrUuid" /> -->
      <!-- <el-table-column label="审核id" align="center" prop="auditId" /> -->
      <el-table-column label="出票人" align="center" prop="drawer">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_drawer" :value="scope.row.drawer" />
        </template>
      </el-table-column>
      <el-table-column label="收票人" align="center" prop="payee">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1754491769220759600" :value="scope.row.payee" />
        </template>
      </el-table-column>
      <el-table-column label="承兑人(金融机构)" width="180" align="center" prop="financialInstitution">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_acceptor" :value="scope.row.financialInstitution" />
        </template>
      </el-table-column>
      <el-table-column label="出票金额(万元)" width="180" align="center" prop="invoiceAmount" />
      <el-table-column label="出票日期" align="center" prop="draftDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.draftDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="汇票到期日" align="center" prop="dueDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dueDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="汇票到期提醒" width="180" align="center" prop="remark">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_maturity" :value="scope.row.remark" />
        </template>
      </el-table-column>
      <el-table-column label="承兑协议编号" width="180" align="center" prop="acceptAgreementId" />
      <el-table-column label="项目名称" align="center" prop="entryName" />
      <el-table-column label="备注" align="center" prop="comment" />
      <!-- <el-table-column label="ID" align="center" prop="id" /> -->
      <el-table-column fixed="right" label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['bankaccept:bank:edit']">查看</el-button>
          <!-- <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['bankaccept:bank:remove']">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改银行承兑汇票对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="60%" append-to-body>
      <!-- <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="管理编号" prop="managementId">
          <el-input v-model="form.managementId" placeholder="请输入银行承兑管理编号" />
        </el-form-item>
        <el-form-item label="审核id" prop="auditId">
          <el-input v-model="form.auditId" placeholder="请输入审核id" />
        </el-form-item>
        <el-form-item label="出票人" prop="drawer">
          <el-select v-model="form.drawer" placeholder="请选择出票人">
            <el-option v-for="dict in dict.type.sys_drawer" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收票人" prop="payee">
          <el-select v-model="form.payee" placeholder="请选择收票人">
            <el-option v-for="dict in dict.type.sys_1754491769220759600" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金融机构" prop="financialInstitution">
          <el-select v-model="form.financialInstitution" placeholder="请选择金融机构">
            <el-option v-for="dict in dict.type.sys_acceptor" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出票金额" prop="invoiceAmount">
          <el-input v-model="form.invoiceAmount" placeholder="请输入出票金额" />
        </el-form-item>
        <el-form-item label="出票日期" prop="draftDate">
          <el-date-picker clearable v-model="form.draftDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择出票日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="到期日" prop="dueDate">
          <el-date-picker clearable v-model="form.dueDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择到期日">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="到期提醒" prop="remark">
          <el-select v-model="form.remark" placeholder="请选择到期提醒">
            <el-option
              v-for="dict in dict.type.sys_maturity"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="协议编号" prop="acceptAgreementId">
          <el-input v-model="form.acceptAgreementId" placeholder="请输入协议编号" />
        </el-form-item>
        <el-form-item label="项目名称" prop="entryName">
          <el-input v-model="form.entryName" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="备注" prop="comment">
          <el-input v-model="form.comment" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="附件" prop="scrUuid">
          <file-upload v-model="form.scrUuid" :managementId="form.managementId" @input="upload_completed" />
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
        <el-table :data="rzsrc2List" :row-class-name="rowrzsrc2Index" @selection-change="handlerzsrc2SelectionChange" ref="rzsrc2">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="序号" align="center" prop="index" width="50"/>
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
        <div v-if="title === '修改银行承兑汇票'" class="modeify-btn" style="display: flex; justify-content: end;">
          <el-button type="primary" @click="toggleEdit">编 辑</el-button>
          <el-button @click="cancel">删 除</el-button>
        </div>

        <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="top">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="管理编号" prop="managementId">
                <el-input :readonly="!isEditable" v-model="form.managementId" placeholder="请输入银行承兑管理编号" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出票人" prop="drawer">
                <el-select :disabled="!isEditable" v-model="form.drawer" placeholder="请选择出票人">
                  <el-option v-for="dict in dict.type.sys_drawer" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收票人" prop="payee">
                <el-select :disabled="!isEditable" v-model="form.payee" placeholder="请选择收票人">
                  <el-option v-for="dict in dict.type.sys_1754491769220759600" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">

            <el-col :span="8">
              <el-form-item label="金融机构" prop="financialInstitution">
                <el-select :disabled="!isEditable" v-model="form.financialInstitution" placeholder="请选择金融机构">
                  <el-option v-for="dict in dict.type.sys_acceptor" :key="dict.value" :label="dict.label"
                    :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出票金额" prop="invoiceAmount">
                <el-input :readonly="!isEditable" v-model="form.invoiceAmount" placeholder="请输入出票金额" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出票日期" prop="draftDate">
                <el-date-picker :disabled="!isEditable" clearable v-model="form.draftDate" type="date"
                  value-format="yyyy-MM-dd" placeholder="请选择出票日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">

            <el-col :span="8">
              <el-form-item label="到期日" prop="dueDate">
                <el-date-picker :disabled="!isEditable" clearable v-model="form.dueDate" type="date"
                  value-format="yyyy-MM-dd" placeholder="请选择到期日">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="协议编号" prop="acceptAgreementId">
                <el-input :readonly="!isEditable" v-model="form.acceptAgreementId" placeholder="请输入协议编号" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目名称" prop="entryName">
                <el-input :readonly="!isEditable" v-model="form.entryName" placeholder="请输入项目名称" />
              </el-form-item>
            </el-col>
          </el-row>


          <el-row>
            <el-col :span="24">
              <el-form-item label="备注" prop="comment">
                <el-input :readonly="!isEditable" v-model="form.comment" maxlength="200" type="textarea" :rows="4"
                  placeholder="请输入备注信息，最多不超过200字" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
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
        <CreateSuccess @close-dialog="data => open = data" @create-again="create_again"></CreateSuccess>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import { listBank, getBank, delBank, addBank, updateBank } from "@/api/bankaccept/bank";
import { SnowflakeIdGenerator } from '@/utils/index'
import { listList, getList, delList, addList, updateList } from "@/api/rzauditlist/list";
import { mapGetters } from 'vuex';
import moment from 'moment'
import CreateSuccess from '@/components/createSuccess/index.vue'
import SearchPanel from '@/components/SearchPanel/index.vue'

export default {
  name: "Bank",
  dicts: ['sys_1754491769220759600', 'sys_drawer', 'sys_acceptor'],
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
      // 银行承兑汇票表格数据
      bankList: [],
      // 附件表表格数据
      rzsrc2List: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 创建人时间范围
      daterangeDraftDate: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        managementId: null,
        scrUuid: null,
        auditId: null,
        drawer: null,
        payee: null,
        financialInstitution: null,
        invoiceAmount: null,
        draftDate: null,
        dueDate: null,
        remark: null,
        acceptAgreementId: null,
        entryName: null,
        comment: null,
      },
      /* str 需要添加的 */
      scrUuid: null,
      /* end */

      // 表单参数
      form: {},
      // 表单校验
      rules: {
        managementId: [
          { required: true, message: "银行承兑管理编号不能为空", trigger: "blur" }
        ],
        scrUuid: [
          { required: true, message: "数据唯一编号不能为空", trigger: "blur" }
        ],
        auditId: [
          { required: true, message: "审核id不能为空", trigger: "blur" }
        ],
        drawer: [
          { required: true, message: "出票人不能为空", trigger: "change" }
        ],
        payee: [
          { required: true, message: "收票人不能为空", trigger: "change" }
        ],
        financialInstitution: [
          { required: true, message: "金融机构不能为空", trigger: "change" }
        ],
        invoiceAmount: [
          { required: true, message: "出票金额不能为空", trigger: "blur" }
        ],
        draftDate: [
          { required: true, message: "出票日期不能为空", trigger: "blur" }
        ],
        dueDate: [
          { required: true, message: "到期日不能为空", trigger: "blur" }
        ],
        remark: [
          { required: true, message: "到期提醒不能为空", trigger: "change" }
        ],
        acceptAgreementId: [
          { required: true, message: "协议编号不能为空", trigger: "blur" }
        ],
        entryName: [
          { required: true, message: "项目名称不能为空", trigger: "blur" }
        ],
      },
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
  mounted() {
    console.log(this.name, this.avatar);
  },
  methods: {
    /* 再次创建 */
    create_again() {
      this.reset();
      this.created_successfully = false;
    },
    toggleEdit() {
      this.isEditable = !this.isEditable;
    },
    /** 查询银行承兑汇票列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeDraftDate && '' != this.daterangeDraftDate) {
        this.queryParams.params["beginDraftDate"] = this.daterangeDraftDate[0];
        this.queryParams.params["endDraftDate"] = this.daterangeDraftDate[1];
      }
      listBank(this.queryParams).then(response => {
        this.bankList = response.rows;
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
        managementId: null,
        scrUuid: null,
        auditId: null,
        drawer: null,
        payee: null,
        financialInstitution: null,
        invoiceAmount: null,
        draftDate: null,
        dueDate: null,
        remark: null,
        acceptAgreementId: null,
        entryName: null,
        comment: null,
        createTime: null,
        createBy: null,
        updateTime: null,
        updateBy: null,
        id: null
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
      this.daterangeDraftDate = [];
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
      this.created_successfully = false;
      this.isEditable = true;
      this.title = "新建银行承兑汇票";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.isEditable = false;
      this.reset();
      const id = row.id || this.ids
      getBank(id).then(response => {
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
        this.title = "修改银行承兑汇票";
        console.log(this.form);
      });
    },
    /** 提交按钮 */
    submitForm() {
      /* str 需要赋值粘贴到的 需要修改请求的接口 */
      this.$refs["form"].validate(valid => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.form))
          this.form.rzsrc2List = this.rzsrc2List;

          if (this.form.id != null) {
            data.scrUuid = Number(this.scrUuid);
            console.log(JSON.stringify(data));
            // return false;
            updateBank(data).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            // 生成一个 uuid
            const generator = new SnowflakeIdGenerator();
            data.scrUuid = generator.nextId();
            data.rzsrc2List = this.rzsrc2List;

            data.createBy = this.name;
            // addBank(data).then(response => {
            //   this.$modal.msgSuccess("新增成功");
            //   this.open = false;
            //   this.getList();
            // });


            const rzaudit_data = {
              "id": null,
              "auditId": String(generator.nextId()).substring(0, 6),
              "scrUuid": data.scrUuid,
              "createBy": this.name,
              "createTime": null,
              "dataJson": JSON.stringify(data),
              "tableName": "rz_bank_accept_bill",
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
      /* end */
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除银行承兑汇票编号为"' + ids + '"的数据项？').then(function () {
        return delBank(ids);
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
      obj.type = "rz_bank_accept_bill";
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
      this.download('bankaccept/bank/export', {
        ...this.queryParams
      }, `bank_${new Date().getTime()}.xlsx`)
    },
    /* 上传完成的回调 */
    upload_completed(url_string) {
      console.log(url_string);
      const url_list = url_string.split(',')
      url_list.forEach(url_i => {
        let obj = {
          url: url_i,
          projectManagementId: this.form.managementId,
          type: "rz_bank_accept_bill",
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