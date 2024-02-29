import moment from 'moment';
import { reminderConfig } from '@/config/expirationreminder'

/**
 * 检查时间到期提醒，并返回提醒信息和颜色
 * @param {string|Date} endDate 结束日期
 * @param {string|Date} [startDate] 开始日期（可选），如果未提供，则默认为今天
 * @returns {Object} 返回包含提醒信息和颜色的对象
 */
export function checkDueReminderWithConfig(endDate, startDate = moment().format("YYYY-MM-DD")) {
    const start = moment(startDate).startOf('day'); // 用户指定的开始日期或今天的开始时间
    const end = moment(endDate).startOf('day'); // 结束日期的开始时间
    const diffDays = end.diff(start, 'days');
    let reminder = { message: `${diffDays}天到期`, color: 'dayG30' }; // 默认为大于30天的情况

    // 特殊处理，如果diffDays是0或负数
    if (diffDays < 0) {
        reminder.color = 'day0';
        reminder.message = '已过期';
    } else if (diffDays === 0) {
        reminder.color = 'day7';
        reminder.message = '今天到期';
    } else {
        // 根据配置对象中的天数和颜色进行判断
        for (let config of reminderConfig) {
            if (diffDays <= config.value) {
                reminder.color = config.color;
                reminder.message = `${diffDays}天到期`;
                break;
            }
        }
    }

    return reminder;
}