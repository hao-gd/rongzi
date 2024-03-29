const moment = require('moment');
export function getDatesBasedOnStartDate(startDate, endDate, intervalMonths) {
	console.log(startDate, endDate, intervalMonths);
  const start = moment(startDate);
	const end = moment(endDate);
	let multiplier = 0;
	let dates = []; // 初始化一个空数组来存放时间点

	// 计算每个时间点，直到大于等于结束date
	while (true) {
		// 在开始date的基础上增加固定月份数的倍数
		let current = start.clone().add(intervalMonths * multiplier, 'months');
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


//--------------------以下是根据上面调整好的数据，计算还款计划数据--------------------------------

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
          //首次提取本金的时候，是0次信息
					zuizhongjihua.push({
						"qishu": changhuanindex,
						"riqi": currentDate.format("YYYY-MM-DD"),
						"huankuanjine": 0,
						"changhuanben": 0,
						"zhifulixi": 0,
						"benjinshengyu": event.amount,
						"lilv": rate,
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
					"qishu": changhuanindex,
					"riqi": currentDate.format("YYYY-MM-DD"),
					"huankuanjine": changhuanjine,
					"changhuanben": changhuanjine,
					"zhifulixi": 0,
					"benjinshengyu": principal,
					"lilv": rate,
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
					"qishu": changhuanindex,
					"riqi": currentDate.format("YYYY-MM-DD"),
					"huankuanjine": (interestAccrued).toFixed(2),
					"changhuanben": 0,
					"zhifulixi": (interestAccrued).toFixed(2),
					"benjinshengyu": principal,
					"lilv": rate,
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
