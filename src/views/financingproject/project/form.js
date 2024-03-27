import { Input, DatePicker as TinyDatePicker } from '@opentiny/vue'
// import { ElDatePicker } from 'element-ui'

export const resetForm = {
    id: null,
    managementId: null,
    scrUuid: null,
    borrowingUnit: null,
    financialInstitution: null,
    financingAmount: null,
    financingType: null,
    contractId: null,
    contractSigningDate: null,
    loanDate: null,
    dueDate: null,
    rate: null,
    loanTerm: null,
    creditEnhancementMeasures: null,
    repaidAmount: null,
    remainingAmount: null,
    loanState: null,
    comment: null,
    createTime: null,
    createBy: null,
    updateTime: null,
    updateBy: null,
    uuid: null,
    principalRepaymentMethod: null,
    interestRepaymentMethod: null,
    rateType: null,
    firstRepaymentDate: null,
    hasRepaymentPlan: null,
    tiqubenjin: null,
    changhuanbenjin: null,
    lilvbiangeng: null,
    lixichanghuan: null,
    huankuanmingxi2List: null
}

export const queryParams = {
    pageNum: 1,
    pageSize: 10,
    managementId: null,
    scrUuid: null,
    borrowingUnit: null,
    financialInstitution: null,
    financingAmount: null,
    financingType: null,
    contractId: null,
    contractSigningDate: null,
    loanDate: null,
    dueDate: null,
    rate: null,
    loanTerm: null,
    creditEnhancementMeasures: null,
    repaidAmount: null,
    remainingAmount: null,
    loanState: null,
    comment: null,
    createBy: null,
    updateBy: null,
    uuid: null,
    principalRepaymentMethod: null,
    interestRepaymentMethod: null,
    rateType: null,
    firstRepaymentDate: null,
    hasRepaymentPlan: null,
}

export const rules = {
    managementId: [
        { required: true, message: "贷后项目管理编号不能为空", trigger: "blur" }
    ],
    scrUuid: [
        { required: true, message: "数据唯一编号不能为空", trigger: "blur" }
    ],
    borrowingUnit: [
        { required: true, message: "借款人不能为空", trigger: "change" }
    ],
    financialInstitution: [
        { required: true, message: "债权人不能为空", trigger: "change" }
    ],
    financingAmount: [
        { required: true, message: "融资金额不能为空", trigger: "blur" }
    ],
    financingType: [
        { required: true, message: "融资类型不能为空", trigger: "change" }
    ],
    contractId: [
        { required: true, message: "资金用途不能为空", trigger: "blur" }
    ],
    contractSigningDate: [
        { required: true, message: "合同签订日期不能为空", trigger: "blur" }
    ],
    loanDate: [
        { required: true, message: "放款日不能为空", trigger: "blur" }
    ],
    dueDate: [
        { required: true, message: "到期日不能为空", trigger: "blur" }
    ],
    rate: [
        { required: false, message: "年利率不能为空", trigger: "blur" }
    ],
    loanTerm: [
        { required: true, message: "借款期限不能为空", trigger: "blur" }
    ],
    creditEnhancementMeasures: [
        { required: true, message: "增信措施不能为空", trigger: "blur" }
    ],
    repaidAmount: [
        { required: true, message: "已还金额不能为空", trigger: "blur" }
    ],
    remainingAmount: [
        { required: true, message: "融资余额不能为空", trigger: "blur" }
    ],
    loanState: [
        { required: true, message: "债务状态不能为空", trigger: "change" }
    ],
    principalRepaymentMethod: [
        { required: true, message: "本金偿还方式不能为空", trigger: "change" }
    ],
    interestRepaymentMethod: [
        { required: true, message: "利息偿还方式不能为空", trigger: "change" }
    ],
    rateType: [
        { required: true, message: "是否固定利率不能为空", trigger: "change" }
    ],
    firstRepaymentDate: [
        { required: true, message: "第1期开始时间不能为空", trigger: "blur" }
    ],
    hasRepaymentPlan: [
        { required: true, message: "是否有还款计划不能为空", trigger: "change" }
    ],
    tiqubenjin: [
        { required: true, message: "提取本金不能为空", trigger: "blur" }
    ],
    changhuanbenjin: [
        { required: true, message: "偿还本金不能为空", trigger: "blur" }
    ],
    lilvbiangeng: [
        { required: true, message: "利率变更不能为空", trigger: "blur" }
    ],
    lixichanghuan: [
        { required: true, message: "利息偿还不能为空", trigger: "blur" }
    ],
}

// 生成 还款计划的edit 组件
export function renderInput(field) {
    return (h, { row }) =>
        row.editing
            ? h('el-input', {
                props: { value: row[field], type: 'number' },
                on: { 'input': (value) => (row[field] = Number(value)) }
            })
            : h('span', row[field])
}
export function renderDate(field) {
    return (h, { row }) =>
        row.editing
            ? h("el-date-picker", {
                props: { value: row[field], format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd', type: "date" },
                on: { 'input': (value) => (row[field] = value) }
            })
            : h('span', row[field])
}
export const hkjh_repaymentPlanClearingTableColumn = [
    {
        label: '期数',
        prop: '期数',
        width: '',
        minWidth: '100',
    },
    {
        label: '日期',
        prop: '日期',
        width: '',
        minWidth: '100',
    },
    {
        label: '还款金额',
        prop: '还款金额',
        width: '',
        minWidth: '100',
    },
    {
        label: '偿还本金',
        prop: '偿还本金',
        width: '',
        minWidth: '100',
    },
    {
        label: '支付利息',
        prop: '支付利息',
        width: '',
        minWidth: '100',
    },
    {
        label: '本金剩余',
        prop: '本金剩余',
        width: '',
        minWidth: '100',
    },
    {
        label: '利率',
        prop: '利率',
        width: '',
        minWidth: '100',
    },
    // {
    //     label: '备注',
    //     prop: '备注',
    //     width: '',
    //     minWidth: '100',
    // }
]

export function multiplySelectedFields(list, multiplier, fields) {
    return list.map(item => {
        let newItem = { ...item };
        fields.forEach(field => {
            if (newItem.hasOwnProperty(field)) {
                newItem[field] = newItem[field] * multiplier;
            }
        });
        return newItem;
    });
}


// 定义一个映射关系
const fieldMapping = {
    "期数": "qishu",
    "日期": "riqi",
    "还款金额": "huankuanjine",
    "偿还本金": "changhuanben",
    "支付利息": "zhifulixi",
    "本金剩余": "benjinshengyu",
    "备注": "remark"
};
// 替换 JSON 数据中的 key
export function replaceKeys(jsonArray) {
    // 创建一个新数组来存放替换 key 后的对象
    const replacedArray = jsonArray.map(item => {
        const newItem = {};
        // 遍历每个对象的 key
        for (const key in item) {
            // 查找映射关系中的中文字段名
            const foundKey = Object.keys(mappifieldMappingng).find(chineseKey => fieldMapping[chineseKey] === key);
            // 如果找到了对应的中文字段名，则使用该中文字段名作为新的 key
            // 否则，保持原有的 key 不变
            newItem[foundKey || key] = item[key];
        }
        return newItem;
    });
    return replacedArray;
}