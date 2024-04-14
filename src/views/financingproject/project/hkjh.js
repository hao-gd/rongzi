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
  //数组时间排序
  //timeline要保证事件加入的顺序是按照,提取本金,偿还本金,利息偿还,利率变更,这样即使同一天发生了所有的事件,生成的还款明细才不会出错
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
export function generateRepaymentPlan(timeline, huanbenjintongshihuanlixi) {
  let principal = 0;
  let rate = 0;
  let lastDate = null;
  let interestAccrued = 0;
  let days = 0;

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
            "huankuanjine": (0).toFixed(2),
            "changhuanben": (0).toFixed(2),
            "zhifulixi": (0).toFixed(2),
            "benjinshengyu": (Number(event.amount)).toFixed(2),
            "lilv": rate + "%",
          })

        }
        principal += event.amount;
        break;
      case '偿还本金':
        principal -= event.amount;
        let changhuanjine = event.amount
        changhuanindex += 1;
        if (huanbenjintongshihuanlixi == true) {
          zuizhongjihua.push({
            "qishu": changhuanindex,
            "riqi": currentDate.format("YYYY-MM-DD"),
            "huankuanjine": (changhuanjine + interestAccrued).toFixed(2),
            "changhuanben": (changhuanjine).toFixed(2),
            "zhifulixi": (interestAccrued).toFixed(2),
            "benjinshengyu": (principal).toFixed(2),
            "lilv": rate + "%",
          })
          // 本期利息结清,重新计息
          interestAccrued = 0;
        } else {
          zuizhongjihua.push({
            "qishu": changhuanindex,
            "riqi": currentDate.format("YYYY-MM-DD"),
            "huankuanjine": (changhuanjine).toFixed(2),
            "changhuanben": (changhuanjine).toFixed(2),
            "zhifulixi": (0).toFixed(2),
            "benjinshengyu": (principal).toFixed(2),
            "lilv": rate + "%",
          })
        }

        break;
      case '利率变更':
        rate = event.rate;
        break;
      case '利息偿还':
        let last_data = zuizhongjihua[zuizhongjihua.length - 1]
        if (currentDate.format("YYYY-MM-DD") == last_data.riqi) {

          last_data["huankuanjine"] = (interestAccrued + Number(last_data["huankuanjine"])).toFixed(2)

          //如果勾选了还款同时还利息,那最后一期的时候,还了本金会同时写入利息信息,需要从原信息获取
          last_data["zhifulixi"] = (interestAccrued + Number(last_data["zhifulixi"])).toFixed(2)

          //利息偿还是同一时间的最后一个事件,所以同一天发生所有时间但是,在这个事件发生时,本金已经还了,也已经加了,所以在这里重新取最新的本金剩余等数据
          last_data["benjinshengyu"] = (principal).toFixed(2)
          //利率变更即使发生在这天,但是处理这个事件会在利率变更之前,所以此时的利率仍然是之前参与计算利息的利率
          last_data["lilv"] = rate + "%"

        } else {
          changhuanindex += 1;
          zuizhongjihua.push({
            "qishu": changhuanindex,
            "riqi": currentDate.format("YYYY-MM-DD"),
            "huankuanjine": (interestAccrued).toFixed(2),
            "changhuanben": (0).toFixed(2),
            "zhifulixi": (interestAccrued).toFixed(2),
            "benjinshengyu": (principal).toFixed(2),
            "lilv": rate + "%",
          })
        }
        // 本期利息结清,重新计息
        interestAccrued = 0;
        break;
    }

    lastDate = currentDate;
  });
  // console.log(zuizhongjihua)
  return zuizhongjihua
}
