const moment = require('moment');

export function getDatesBasedOnStartDate(startDate, endDate, intervalMonths) {
	const start = moment(startDate);
	const end = moment(endDate);
	let multiplier = 0;
	let dates = []; // 初始化一个空数组来存放时间点

	// 计算每个时间点，直到大于等于结束date
	while (true) {
		// 在开始date的基础上增加固定月份数的倍数
		let current = start.clone().add(intervalMonths * multiplier, 'months');
		console.log(current, end, multiplier);
		// 如果当前计算的时间点大于等于结束date，则添加结束date并结束循环
		if (current.isSameOrAfter(end)) {
			dates.push(end.format('YYYY-MM-DD')); // 添加结束date到数组
			break;
		} else {
			// 否则，添加当前时间点到数组
			dates.push(current.format('YYYY-MM-DD'));
			// 准备计算下一个时间点
			multiplier++;
		}
	}

	return dates; // 返回包含所有时间点的数组
}

// 利息偿还时间点计算
let lxStartDate = "2023/9/21"; // 开始时间，他输入的 第1期开始日期
let lxEndDate = "2052/12/24"; //结束时间默认是本金变为0的时间
let lxIntervalMonths = 3; //利息偿还方式 月间隔，1个月 ,1季度3个月，半年6个月，年12个月
let lixichanghuanArray = getDatesBasedOnStartDate(lxStartDate, lxEndDate, lxIntervalMonths);

// console.log(lixichanghuanArray); // 输出时间点数组
//[ "2023-01-31", "2023-04-30", "2023-07-31", "2023-10-31", "2024-01-31", "2024-04-30", "2024-07-31", "2024-10-31", "2025-01-31", "2025-03-13" ]

// 本金偿还时间点计算,如果选择 到期还本 不用计算，直接生成一个到期时间的数据 const bjch = [{"date": "2024-07-12","amount": 100000000}]
let bjStartDate = "2023/6/29"; // 开始时间，就是借款时间
let BJEndDate = "2052/12/24"; //结束时间默认是到期日期
let bjIntervalMonths = 6; // 本金偿还方式 月间隔，1个月 ,1季度3个月，半年6个月，年12个月
let benjinchanghuanArray = getDatesBasedOnStartDate(bjStartDate, BJEndDate, bjIntervalMonths);

// console.log(benjinchanghuanArray); // 输出时间点数组

// [ "2022-07-20", "2023-01-20", "2023-07-20", "2024-01-20", "2024-07-20", "2025-01-20", "2025-03-13" ]

//生成默认时间，删除第一个"2022-07-20"，时间他可以调，金额他自己写
// 最小时间不能小于借款时间，可以自由添加改动
const bjch = [{
	"date": "2025/4/1",
	"amount": 1680000
}, {
	"date": "2025/12/1",
	"amount": 1680000
}, {
	"date": "2026/4/1",
	"amount": 3360000
}, {
	"date": "2026/12/1",
	"amount": 3360000
}, {
	"date": "2027/4/1",
	"amount": 3360000
}, {
	"date": "2027/12/1",
	"amount": 3360000
}]

//默认时间，默认添加一个数据 借款时间 和 借款金额[{"date": "2022-07-20","amount": 89000}]
// 最小时间不能小于借款时间，可以自由添加改动
const zjbj = [{
	"date": "2023/6/29",
	"amount": 300000000
}]

//默认时间，默认添加一个数据 借款时间 [{"date": "2022-07-20","rate": 0}]
// 最小时间不能小于借款时间，自由添加改动
const lvbg = [{
	"date": "2023/6/29",
	"rate": 3.75
}]



//--------------------以下是根据上面调整好的数据，计算还款计划数据--------------------------------


// 初始化时间线数组
let timeline = [];

bjch.forEach(e => {
	timeline.push({
		event: '偿还本金',
		...e
	});
});
lixichanghuanArray.forEach(e => {
	timeline.push({
		event: '利息偿还',
		date: e
	});
});


zjbj.forEach(e => {
	timeline.push({
		event: '提取本金',
		...e
	});
});
lvbg.forEach(e => {
	timeline.push({
		event: '利率变更',
		...e
	});
});
export function addEventsToTimeline(eventName, eventsArray, extraDataHandler) {
	let timeline = [];
	eventsArray.forEach(event => {
		const timelineEvent = {
			event: eventName,
			...extraDataHandler(event)
		};
		timeline.push(timelineEvent);
	});
	return timeline;
}
console.log(timeline);

timeline.sort((a, b) => {
	const dateA = moment(a.date, 'YYYY-MM-DD');
	const dateB = moment(b.date, 'YYYY-MM-DD');

	if (dateA.isBefore(dateB)) {
		return -1;
	} else if (dateA.isAfter(dateB)) {
		return 1;
	} else {
		return 0;
	}
});

export function sortTimeLineByDate(timeline) {
	return timeline.sort((a, b) => {
		const dateA = moment(a.date, 'YYYY-MM-DD');
		const dateB = moment(b.date, 'YYYY-MM-DD');

		if (dateA.isBefore(dateB)) {
			return -1;
		} else if (dateA.isAfter(dateB)) {
			return 1;
		} else {
			return 0;
		}
	});
}

// console.log(timeline);





// timeline.forEach(event => {
// 	const currentDate = moment(event.date, "YYYY-MM-DD");
// 	let accrued = 0;
// 	if (lastDate != null && principal > 0) {
// 		days = currentDate.diff(lastDate, 'days');
// 		accrued = principal * (rate / 360 / 100) * days;
// 		interestAccrued += accrued;
// 	}

// 	event = {
// 		...event,
// 		"本阶段计息本金": principal,
// 		"使用利率": rate,
// 		"计息天数": days,
// 		"阶段利息": (accrued).toFixed(2),
// 	}
// 	switch (event.event) {
// 		case '提取本金':
// 			if (principal == 0 && changhuanindex == 0) {

// 				zuizhongjihua.push({
// 					"期数": changhuanindex,
// 					"日期": currentDate.format("YYYY-MM-DD"),
// 					"还款金额": 0,
// 					"偿还本金": 0,
// 					"支付利息": 0,
// 					"本金剩余": event.amount,
// 					"利率": 0,
// 					"备注": ""
// 				})

// 				// console.log({
// 				// 	"期数": changhuanindex,
// 				// 	"日期": currentDate.format("YYYY-MM-DD"),
// 				// 	"还款金额": 0,
// 				// 	"偿还本金": 0,
// 				// 	"支付利息": 0,
// 				// 	"本金剩余": event.amount,
// 				// 	"利率": 0,
// 				// 	"备注": ""
// 				// });
// 			}
// 			principal += event.amount;
// 			break;
// 		case '偿还本金':
// 			principal -= event.amount;
// 			changhuanjine += event.amount

// 			changhuanindex += 1;
// 			zuizhongjihua.push({
// 				"期数": changhuanindex,
// 				"日期": currentDate.format("YYYY-MM-DD"),
// 				"还款金额": changhuanjine,
// 				"偿还本金": changhuanjine,
// 				"支付利息": 0,
// 				"本金剩余": principal,
// 				"利率": rate,
// 				"备注": ""
// 			})
// 			// console.log({
// 			// 	"期数": changhuanindex,
// 			// 	"日期": currentDate.format("YYYY-MM-DD"),
// 			// 	"还款金额": changhuanjine,
// 			// 	"偿还本金": changhuanjine,
// 			// 	"支付利息": 0,
// 			// 	"本金剩余": principal,
// 			// 	"利率": rate,
// 			// 	"备注": ""
// 			// });

// 			break;
// 		case '利率变更':
// 			rate = event.rate;
// 			break;
// 		case '利息偿还':
// 			changhuanindex += 1;
// 			zuizhongjihua.push({
// 				"期数": changhuanindex,
// 				"日期": currentDate.format("YYYY-MM-DD"),
// 				"还款金额": (interestAccrued).toFixed(2),
// 				"偿还本金": changhuanjine,
// 				"支付利息": (interestAccrued).toFixed(2),
// 				"本金剩余": principal,
// 				"利率": rate,
// 				"备注": ""
// 			})
// 			// console.log({
// 			// 	"期数": changhuanindex,
// 			// 	"日期": currentDate.format("YYYY-MM-DD"),
// 			// 	"还款金额": (interestAccrued).toFixed(2),
// 			// 	"偿还本金": changhuanjine,
// 			// 	"支付利息": (interestAccrued).toFixed(2),
// 			// 	"本金剩余": principal,
// 			// 	"利率": rate,
// 			// 	"备注": ""
// 			// });
// 			interestAccrued = 0;
// 			changhuanjine = 0;
// 			break;
// 	}
// 	event = {
// 		...event,
// 		"本金剩余": principal,
// 	}
// 	// console.log(event)
// 	lastDate = currentDate;
// });

export function generateRepaymentPlan(timeline) {
	let principal = 0;
	let rate = 0;
	let lastDate = null;
	let interestAccrued = 0;
	let days = 0;

	let changhuanjine = 0;

	let changhuanindex = 0;


	let zuizhongjihua = []
	timeline.forEach(event => {
		const currentDate = moment(event.date, "YYYY-MM-DD");
		let accrued = 0;
		if (lastDate != null && principal > 0) {
			days = currentDate.diff(lastDate, 'days');
			accrued = principal * (rate / 360 / 100) * days;
			interestAccrued += accrued;
		}

		event = {
			...event,
			"本阶段计息本金": principal,
			"使用利率": rate,
			"计息天数": days,
			"阶段利息": (accrued).toFixed(2),
		}
		switch (event.event) {
			case '提取本金':
				if (principal == 0 && changhuanindex == 0) {

					zuizhongjihua.push({
						"期数": changhuanindex,
						"日期": currentDate.format("YYYY-MM-DD"),
						"还款金额": 0,
						"偿还本金": 0,
						"支付利息": 0,
						"本金剩余": event.amount,
						"利率": 0,
						"备注": ""
					})

					// console.log({
					// 	"期数": changhuanindex,
					// 	"日期": currentDate.format("YYYY-MM-DD"),
					// 	"还款金额": 0,
					// 	"偿还本金": 0,
					// 	"支付利息": 0,
					// 	"本金剩余": event.amount,
					// 	"利率": 0,
					// 	"备注": ""
					// });
				}
				principal += event.amount;
				break;
			case '偿还本金':
				principal -= event.amount;
				changhuanjine += event.amount

				changhuanindex += 1;
				zuizhongjihua.push({
					"期数": changhuanindex,
					"日期": currentDate.format("YYYY-MM-DD"),
					"还款金额": changhuanjine,
					"偿还本金": changhuanjine,
					"支付利息": 0,
					"本金剩余": principal,
					"利率": rate,
					"备注": ""
				})
				// console.log({
				// 	"期数": changhuanindex,
				// 	"日期": currentDate.format("YYYY-MM-DD"),
				// 	"还款金额": changhuanjine,
				// 	"偿还本金": changhuanjine,
				// 	"支付利息": 0,
				// 	"本金剩余": principal,
				// 	"利率": rate,
				// 	"备注": ""
				// });

				break;
			case '利率变更':
				rate = event.rate;
				break;
			case '利息偿还':
				changhuanindex += 1;
				zuizhongjihua.push({
					"期数": changhuanindex,
					"日期": currentDate.format("YYYY-MM-DD"),
					"还款金额": (interestAccrued).toFixed(2),
					"偿还本金": changhuanjine,
					"支付利息": (interestAccrued).toFixed(2),
					"本金剩余": principal,
					"利率": rate,
					"备注": ""
				})
				// console.log({
				// 	"期数": changhuanindex,
				// 	"日期": currentDate.format("YYYY-MM-DD"),
				// 	"还款金额": (interestAccrued).toFixed(2),
				// 	"偿还本金": changhuanjine,
				// 	"支付利息": (interestAccrued).toFixed(2),
				// 	"本金剩余": principal,
				// 	"利率": rate,
				// 	"备注": ""
				// });
				interestAccrued = 0;
				changhuanjine = 0;
				break;
		}
		event = {
			...event,
			"本金剩余": principal,
		}
		// console.log(event)
		lastDate = currentDate;
	});
	return zuizhongjihua
}

const a = generateRepaymentPlan(timeline)
console.log(a);
