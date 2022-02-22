let handleTime = (time) => {
	if (time < 10) {
		return "0" + time
	} else {
		return time
	}
}
// 生成18个日期 获取整个学期课表 防止遗漏
let handleDate = () => {
	let date_now = new Date(2022, 2, 22)
	let nowTime = date_now.getTime()
	let oneWeek = 24 * 60 * 60 * 1000 * 7
	let formatted_date = []
	for (let i = 0; i < 18; i++) {
		let date = new Date(nowTime + oneWeek * i)
		let dateStr =
			date.getFullYear() +
			"-" +
			handleTime(date.getMonth() + 1) +
			"-" +
			handleTime(date.getDate())

		formatted_date.push(dateStr)
	}

	return formatted_date
}
async function scheduleHtmlProvider() {
	await loadTool("AIScheduleTools")
	const userConfrim = await AIScheduleConfirm({
		titleText: "提示", // 标题内容，字体比较大，超过10个字不给显示的喔，也可以不传就不显示
		contentText: "请务必打开'课程信息'页后 再执行导入操作", // 提示信息，字体稍小，支持使用``达到换行效果，具体使用效果建议真机测试，为必传，不传显示版本号
		cancelText: "我不在'课程信息'页", // 取消按钮文字，可不传默认为取消
		confirmText: "我在'课程信息'页", // 确认按钮文字，可不传默认为确认
	})
	if (userConfrim) {
		await AIScheduleAlert("导入过程时间较长 请耐心等待")
		let userid
		let str
		// 获取到学号
		try {
			const res = await fetch(
				"http://iapp.zzuli.edu.cn/portal/app/casMember/getMemberByUsername",
				{
					method: "POST",
					credentials: "include",
				}
			)
				.then((response) => response.json())
				.then((data) => {
					console.log(data)
					userid = data.attributes.modules.memberId
				})
		} catch (error) {
			await AIScheduleAlert("请务必打开'课程信息'页后 再执行导入操作 ")
			return "do not continue"
		}

		let formatted_date = handleDate()

		let body = []
		for (let i = 0; i < 18; i++) {
			let _body =
				"userName=" +
				parseInt(userid) +
				"&currentTime=" +
				formatted_date[i] +
				"&role=1"

			body.push(_body)
		}

		let result = []
		url = "http://microapp.zzuli.edu.cn/microapplication/app/course/getCourse"

		for (let i = 0; i < 18; i++) {
			try {
				const res = await fetch(url, {
					method: "POST",
					body: body[i],
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
					credentials: "include",
				})
					.then((response) => response.json())
					.then((data) => {
						// console.log(data)
						result.push(data)
					})
			} catch (error) {
				console.log(error)
				result.push({ success: false, obj: null })
			}
		}

		return JSON.stringify(result)
	} else {
		return "do not continue"
	}
}
