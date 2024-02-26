<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="商业承兑管理编号" prop="managementId">
        <el-input
          v-model="queryParams.managementId"
          placeholder="请输入商业承兑管理编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审核id" prop="auditId">
        <el-input
          v-model="queryParams.auditId"
          placeholder="请输入审核id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="付款人" prop="payer">
        <el-select v-model="queryParams.payer" placeholder="请选择付款人" clearable>
          <el-option
            v-for="dict in dict.type.sys_1757235323403763700"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="收款人" prop="payee">
        <el-select v-model="queryParams.payee" placeholder="请选择收款人" clearable>
          <el-option
            v-for="dict in dict.type.sys_1757235466651828200"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="出票金额" prop="invoiceAmount">
        <el-input
          v-model="queryParams.invoiceAmount"
          placeholder="请输入出票金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
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
      <el-form-item label="到期日" prop="dueDate">
        <el-date-picker clearable
          v-model="queryParams.dueDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择到期日">
        </el-date-picker>
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
      <el-form-item label="合同号码" prop="contractNumber">
        <el-input
          v-model="queryParams.contractNumber"
          placeholder="请输入合同号码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="金融机构" prop="financialInstitution">
        <el-select v-model="queryParams.financialInstitution" placeholder="请选择金融机构" clearable>
          <el-option
            v-for="dict in dict.type.sys_acceptor"
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
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['business:bill:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['business:bill:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['business:bill:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['business:bill:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="billList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="商业承兑管理编号" align="center" prop="managementId" />
      <el-table-column label="数据唯一编号" align="center" prop="scrUuid" />
      <el-table-column label="审核id" align="center" prop="auditId" />
      <el-table-column label="付款人" align="center" prop="payer">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1757235323403763700" :value="scope.row.payer"/>
        </template>
      </el-table-column>
      <el-table-column label="收款人" align="center" prop="payee">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1757235466651828200" :value="scope.row.payee"/>
        </template>
      </el-table-column>
      <el-table-column label="出票金额" align="center" prop="invoiceAmount" />
      <el-table-column label="出票日期" align="center" prop="draftDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.draftDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="到期日" align="center" prop="dueDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dueDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="到期提醒" align="center" prop="remark">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_maturity" :value="scope.row.remark"/>
        </template>
      </el-table-column>
      <el-table-column label="合同号码" align="center" prop="contractNumber" />
      <el-table-column label="金融机构" align="center" prop="financialInstitution">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_acceptor" :value="scope.row.financialInstitution"/>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="comment" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['business:bill:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['business:bill:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改商业承兑汇票对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="商业承兑管理编号" prop="managementId">
          <el-input v-model="form.managementId" placeholder="请输入商业承兑管理编号" />
        </el-form-item>
        <el-form-item label="审核id" prop="auditId">
          <el-input v-model="form.auditId" placeholder="请输入审核id" />
        </el-form-item>
        <el-form-item label="付款人" prop="payer">
          <el-select v-model="form.payer" placeholder="请选择付款人">
            <el-option
              v-for="dict in dict.type.sys_1757235323403763700"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收款人" prop="payee">
          <el-select v-model="form.payee" placeholder="请选择收款人">
            <el-option
              v-for="dict in dict.type.sys_1757235466651828200"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出票金额" prop="invoiceAmount">
          <el-input v-model="form.invoiceAmount" placeholder="请输入出票金额" />
        </el-form-item>
        <el-form-item label="出票日期" prop="draftDate">
          <el-date-picker clearable
            v-model="form.draftDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择出票日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="到期日" prop="dueDate">
          <el-date-picker clearable
            v-model="form.dueDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择到期日">
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="到期提醒" prop="remark">
          <el-select v-model="form.remark" placeholder="请选择到期提醒">
            <el-option
              v-for="dict in dict.type.sys_maturity"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="合同号码" prop="contractNumber">
          <el-input v-model="form.contractNumber" placeholder="请输入合同号码" />
        </el-form-item>
        <el-form-item label="金融机构" prop="financialInstitution">
          <el-select v-model="form.financialInstitution" placeholder="请选择金融机构">
            <el-option
              v-for="dict in dict.type.sys_acceptor"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="comment">
          <el-input v-model="form.comment" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="附件" prop="scrUuid">
          <file-upload v-model="form.scrUuid" :managementId="form.managementId" @input="upload_completed"/>
        </el-form-item>
        <!-- <el-divider content-position="center">附件表信息</el-divider>
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
        </el-table> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listBill, getBill, delBill, addBill, updateBill } from "@/api/business/bill";
import { listList, getList, delList, addList, updateList } from "@/api/rzauditlist/list";
import { mapGetters } from 'vuex';
import { SnowflakeIdGenerator } from '@/utils/index'

export default {
  name: "Bill",
  dicts: ['sys_1757235323403763700', 'sys_1757235466651828200', 'sys_acceptor'],
  data() {
    return {
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
      // 商业承兑汇票表格数据
      billList: [],
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
        payer: null,
        payee: null,
        invoiceAmount: null,
        draftDate: null,
        dueDate: null,
        remark: null,
        contractNumber: null,
        financialInstitution: null,
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
          { required: true, message: "商业承兑管理编号不能为空", trigger: "blur" }
        ],
        scrUuid: [
          { required: true, message: "数据唯一编号不能为空", trigger: "blur" }
        ],
        auditId: [
          { required: true, message: "审核id不能为空", trigger: "blur" }
        ],
        payer: [
          { required: true, message: "付款人不能为空", trigger: "change" }
        ],
        payee: [
          { required: true, message: "收款人不能为空", trigger: "change" }
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
        contractNumber: [
          { required: true, message: "合同号码不能为空", trigger: "blur" }
        ],
        financialInstitution: [
          { required: true, message: "金融机构不能为空", trigger: "change" }
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
  },
  methods: {
    /** 查询商业承兑汇票列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeDraftDate && '' != this.daterangeDraftDate) {
        this.queryParams.params["beginDraftDate"] = this.daterangeDraftDate[0];
        this.queryParams.params["endDraftDate"] = this.daterangeDraftDate[1];
      }
      listBill(this.queryParams).then(response => {
        this.billList = response.rows;
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
        payer: null,
        payee: null,
        invoiceAmount: null,
        draftDate: null,
        dueDate: null,
        remark: null,
        contractNumber: null,
        financialInstitution: null,
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
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加商业承兑汇票";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getBill(id).then(response => {

        /* str 需要赋值粘贴到的 */
        this.scrUuid = response.data.scrUuid;
        this.form = response.data;
        this.form.scrUuid = response.data.rzsrc2List.map(i => i.url)
        /* end */
        
        this.form = response.data;
        this.rzsrc2List = response.data.rzsrc2List;
        this.open = true;
        this.title = "修改商业承兑汇票";
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
            console.log(JSON.stringify(data));
            updateBill(data).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            // addBill(this.form).then(response => {
            //   this.$modal.msgSuccess("新增成功");
            //   this.open = false;
            //   this.getList();
            // });
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
                  "tableName": "rz_business_accept_bill",
                  "auditState": "1759514891045044200"
              }


            addList(rzaudit_data).then(res => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;

            })
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除商业承兑汇票编号为"' + ids + '"的数据项？').then(function() {
        return delBill(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
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
      this.download('business/bill/export', {
        ...this.queryParams
      }, `bill_${new Date().getTime()}.xlsx`)
    },
    /* 上传完成的回调 */
    upload_completed(url_string) {
      console.log(url_string);
      const url_list = url_string.split(',')
      url_list.forEach(url_i => {
        let obj = {
          url: url_i,
          projectManagementId: this.form.managementId,
          type: "rz_business_accept_bill"
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
