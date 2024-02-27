<template>
  <div class="app-container">
    <!-- <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="管理编号" prop="managementId">
        <el-input v-model="queryParams.managementId" placeholder="请输入贷后项目管理编号" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="金融机构" prop="financialInstitution">
        <el-select v-model="queryParams.financialInstitution" placeholder="请选择金融机构" clearable>
          <el-option v-for="dict in dict.type.sys_acceptor" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="借款金额" prop="loanAmount">
        <el-input v-model="queryParams.loanAmount" placeholder="请输入借款金额" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="借款单位" prop="borrowingUnit">
        <el-select v-model="queryParams.borrowingUnit" placeholder="请选择借款单位" clearable>
          <el-option v-for="dict in dict.type.sys_1759464239669444600" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="借款期限" prop="loanTerm">
        <el-input v-model="queryParams.loanTerm" placeholder="请输入借款期限" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="贷后状态跟踪：未完结、已完结" prop="afterLoanState">
        <el-select v-model="queryParams.afterLoanState" placeholder="请选择贷后状态跟踪：未完结、已完结" clearable>
          <el-option v-for="dict in dict.type.sys_1759464706814247000" :key="dict.value" :label="dict.label"
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

    <el-form label-position="left" :model="queryParams" ref="queryForm" size="small" :inline="false" v-show="showSearch" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="管理编号" prop="managementId">
            <el-input v-model="queryParams.managementId" placeholder="请输入贷后项目管理编号" clearable
              @keyup.enter.native="handleQuery" />
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
        <el-col :span="8">
          <el-form-item label="借款单位" prop="borrowingUnit">
            <el-select v-model="queryParams.borrowingUnit" placeholder="请选择借款单位" clearable>
              <el-option v-for="dict in dict.type.sys_1759464239669444600" :key="dict.value" :label="dict.label"
                :value="dict.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="借款期限" prop="loanTerm">
            <el-input v-model="queryParams.loanTerm" placeholder="请输入借款期限" clearable @keyup.enter.native="handleQuery" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="贷后状态跟踪" prop="afterLoanState">
            <el-select v-model="queryParams.afterLoanState" placeholder="请选择贷后状态跟踪：未完结、已完结" clearable>
              <el-option v-for="dict in dict.type.sys_1759464706814247000" :key="dict.value" :label="dict.label"
                :value="dict.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="flex" style="display: flex; justify-content: flex-end;">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">查 询</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>


    <el-divider class="mt20 mb20"></el-divider>
    <el-row type="flex" :gutter="10" class="mb8" justify="end">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['rzafterloan:loan:add']">新 建</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['rzafterloan:loan:edit']">修改</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['rzafterloan:loan:remove']">删 除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['rzafterloan:loan:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="loanList" @selection-change="handleSelectionChange"
    :header-cell-style="header_cell_style">
      <el-table-column fixed="left" type="selection" width="55" align="center" />
      <!-- <el-table-column label="主键id" align="center" prop="id" /> -->
      <el-table-column label="管理编号" align="center" prop="managementId" />
      <!-- <el-table-column label="数据唯一编号" align="center" prop="scrUuid" /> -->
      <el-table-column label="金融机构" align="center" prop="financialInstitution">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_acceptor" :value="scope.row.financialInstitution" />
        </template>
      </el-table-column>
      <el-table-column label="借款金额（万元）" align="center" prop="loanAmount" />
      <el-table-column label="借款单位" align="center" prop="borrowingUnit">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1759464239669444600" :value="scope.row.borrowingUnit" />
        </template>
      </el-table-column>

      <el-table-column label="量化目标" align="center" prop="loanAmount" />
      <el-table-column label="当前实现" align="center" prop="loanAmount" />
      <el-table-column label="剩余实现" align="center" prop="loanAmount" />


      <el-table-column label="借款期限" align="center" prop="loanTerm" />
      <el-table-column label="贷后状态跟踪" align="center" prop="afterLoanState">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_1759464706814247000" :value="scope.row.afterLoanState" />
        </template>
      </el-table-column>
      <!-- <el-table-column label="进度说明" align="center" prop="progressDescription" /> -->
      <el-table-column label="备注" align="center" prop="comment" />
      <!-- <el-table-column label="uuid" align="center" prop="uuid" /> -->
      <el-table-column fixed="right" label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleUpdate(scope.row)"
            v-hasPermi="['rzafterloan:loan:edit']">查 看</el-button>
          <!-- <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['rzafterloan:loan:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['rzafterloan:loan:remove']">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改贷后管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="60%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="贷后项目管理编号" prop="managementId">
          <el-input v-model="form.managementId" placeholder="请输入贷后项目管理编号" />
        </el-form-item>
        <el-form-item label="附件" prop="scrUuid">
          <file-upload v-model="form.scrUuid" :managementId="form.managementId" @input="upload_completed" />
        </el-form-item>
        <el-form-item label="金融机构" prop="financialInstitution">
          <el-select v-model="form.financialInstitution" placeholder="请选择金融机构">
            <el-option v-for="dict in dict.type.sys_acceptor" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="借款金额" prop="loanAmount">
          <el-input v-model="form.loanAmount" placeholder="请输入借款金额" />
        </el-form-item>
        <el-form-item label="借款单位" prop="borrowingUnit">
          <el-select v-model="form.borrowingUnit" placeholder="请选择借款单位">
            <el-option v-for="dict in dict.type.sys_1759464239669444600" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="借款期限" prop="loanTerm">
          <el-input v-model="form.loanTerm" placeholder="请输入借款期限" />
        </el-form-item>
        <el-form-item label="贷后状态跟踪：未完结、已完结" prop="afterLoanState">
          <el-select v-model="form.afterLoanState" placeholder="请选择贷后状态跟踪：未完结、已完结">
            <el-option v-for="dict in dict.type.sys_1759464706814247000" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="进度说明" prop="progressDescription">
          <el-input v-model="form.progressDescription" type="textarea" placeholder="请输入内容" />
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listLoan, getLoan, delLoan, addLoan, updateLoan } from "@/api/rzafterloan/loan";
import { SnowflakeIdGenerator } from '@/utils/index'

import { listList, getList, delList, addList, updateList } from "@/api/rzauditlist/list";
import { mapGetters } from 'vuex';
import moment from 'moment'
import CreateSuccess from '@/components/createSuccess/index.vue'
export default {
  name: "Loan",
  dicts: ['sys_1759464239669444600', 'sys_acceptor', 'sys_1759464706814247000'],
  components: {
    CreateSuccess
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
      // 贷后管理表格数据
      loanList: [],
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
        financialInstitution: null,
        loanAmount: null,
        borrowingUnit: null,
        loanTerm: null,
        afterLoanState: null,
        progressDescription: null,
        comment: null,
        uuid: null
      },
      scrUuid: null,
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        managementId: [
          { required: true, message: "贷后项目管理编号不能为空", trigger: "blur" }
        ],
        scrUuid: [
          { required: true, message: "数据唯一编号不能为空", trigger: "blur" }
        ],
        financialInstitution: [
          { required: true, message: "金融机构不能为空", trigger: "change" }
        ],
        loanAmount: [
          { required: true, message: "借款金额不能为空", trigger: "blur" }
        ],
        borrowingUnit: [
          { required: true, message: "借款单位不能为空", trigger: "change" }
        ],
        loanTerm: [
          { required: true, message: "借款期限不能为空", trigger: "blur" }
        ],
        afterLoanState: [
          { required: true, message: "贷后状态跟踪：未完结、已完结不能为空", trigger: "change" }
        ],
        progressDescription: [
          { required: true, message: "进度说明不能为空", trigger: "blur" }
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
    /* 再次创建 */
    create_again() {
      this.reset();
      this.created_successfully = false;
    },
    toggleEdit() {
      this.isEditable = !this.isEditable;
    },
    /** 查询贷后管理列表 */
    getList() {
      this.loading = true;
      listLoan(this.queryParams).then(response => {
        this.loanList = response.rows;
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
        financialInstitution: null,
        loanAmount: null,
        borrowingUnit: null,
        loanTerm: null,
        afterLoanState: null,
        progressDescription: null,
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
      this.title = "添加贷后管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.isEditable = false;
      this.reset();
      const id = row.id || this.ids
      getLoan(id).then(response => {
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
        this.open = true;
        this.title = "修改贷后管理";
      });
    },
    /** 提交按钮 */
    // submitForm() {
    //   this.$refs["form"].validate(valid => {
    //     if (valid) {
    //       this.form.rzsrc2List = this.rzsrc2List;
    //       if (this.form.id != null) {
    //         updateLoan(this.form).then(response => {
    //           this.$modal.msgSuccess("修改成功");
    //           this.open = false;
    //           this.getList();
    //         });
    //       } else {
    //         addLoan(this.form).then(response => {
    //           this.$modal.msgSuccess("新增成功");
    //           this.open = false;
    //           this.getList();
    //         });
    //       }
    //     }
    //   });
    // },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.form))
          this.form.rzsrc2List = this.rzsrc2List;
          if (this.form.id != null) {
            data.scrUuid = Number(this.scrUuid);
            console.log(JSON.stringify(data));
            // return false;
            updateLoan(data).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            // // 生成一个 uuid
            // const generator = new SnowflakeIdGenerator();
            // data.scrUuid = generator.nextId();
            // data.rzsrc2List = this.rzsrc2List;
            // addLoan(data).then(response => {
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
              "tableName": "rz_back_accept_bill",
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
      this.$modal.confirm('是否确认删除贷后管理编号为"' + ids + '"的数据项？').then(function () {
        return delLoan(ids);
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
      this.download('rzafterloan/loan/export', {
        ...this.queryParams
      }, `loan_${new Date().getTime()}.xlsx`)
    },
    /* 上传完成的回调 */
    upload_completed(url_string) {
      console.log(url_string);
      const url_list = url_string.split(',')
      url_list.forEach(url_i => {
        let obj = {
          url: url_i,
          projectManagementId: this.form.managementId,
          type: "rz_after_loan",
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
