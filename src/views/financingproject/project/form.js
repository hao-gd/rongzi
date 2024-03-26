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
        { required: true, message: "年利率不能为空", trigger: "blur" }
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