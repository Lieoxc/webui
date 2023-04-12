import fetch from "./fetch";
// 获取定时任务分页
export const apiCronTaskpage = (data) => {
    return fetch.request({
		url: "/api/cron/page",
		method: "get",
		params: data,
	});
};