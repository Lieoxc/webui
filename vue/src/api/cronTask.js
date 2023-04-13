import fetch from "./fetch";
// 获取定时任务分页
export const apiCronTaskpage = (data) => {
    return fetch.request({
		url: "/api/cron/page",
		method: "get",
		params: data,
	});
};
// 添加标签
export const admCronTaskAdd = (data) => {
    return fetch.request({
		url: "/adm/cron/add",
		method: "post",
		data: data,
	});
};
// 修改标签
export const admCronTaskEdit = (data) => {
	return fetch.request({
		url: "/adm/cron/edit",
		method: "post",
		data: data,
	});
};
// 通过id删除单条标签
export const admCronTaskDrop = (data) => {
	return fetch.request({
		url: "/adm/cron/drop",
		method: "post",
		data: data,
	});
};

