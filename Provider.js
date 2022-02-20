async function scheduleHtmlProvider() {
	await loadTool("AIScheduleTools")
	await AIScheduleAlert("请务必打开'课程信息'页后 再执行导入操作 若还未开学或者临近期末 可能无法正确处理单双周课程")
	let userid
	let str
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
		console.error(error)
		await AIScheduleAlert(error.message)
		return "do not continue"
	}

	let handleTime = (time) => {
		if (time < 10) {
			return "0" + time
		} else {
			return time
		}
	}
	let handleDate = () => {
		let date_1 = new Date()
		let nowTime = date_1.getTime()
		let oneWeek = 24 * 60 * 60 * 1000 * 7
		let date_2 = new Date(nowTime + oneWeek)
		let formatted_date = []

		let dateStr_1 =
			date_1.getFullYear() +
			"-" +
			handleTime(date_1.getMonth() + 1) +
			"-" +
			handleTime(date_1.getDate())

		let dateStr_2 =
			date_2.getFullYear() +
			"-" +
			handleTime(date_2.getMonth() + 1) +
			"-" +
			handleTime(date_2.getDate())

		formatted_date = [dateStr_1, dateStr_2]
		return formatted_date
	}

	console.log(handleDate())

	let result = []
	body =
		"userName=" +
		parseInt(userid) +
		"&currentTime=" +
		handleDate()[0] +
		"&role=1"

	console.log(body)
	url = "http://microapp.zzuli.edu.cn/microapplication/app/course/getCourse"
	try {
		const res = await fetch(url, {
			method: "POST",
			body: body,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
			},
			credentials: "include",
		})
			.then((response) => response.json())
			.then((data) => {
				// if (!data.success) {
				// 	AIScheduleAlert(
				// 		"还没开学？无法获取这周课表。可能无法正确导入单双周课程。"
				// 	)
				// }
				// str = JSON.stringify(data)

				result.push(data)
			})
	} catch (error) {
		console.error(error)
		await AIScheduleAlert(error.message)
		return "do not continue"
	}

	body =
		"userName=" +
		parseInt(userid) +
		"&currentTime=" +
		handleDate()[1] +
		"&role=1"

	console.log(body)
	url = "http://microapp.zzuli.edu.cn/microapplication/app/course/getCourse"
	try {
		const res = await fetch(url, {
			method: "POST",
			body: body,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
			},
			credentials: "include",
		})
			.then((response) => response.json())
			.then((data) => {
				// if (!data.success) {
				// 	AIScheduleAlert(
				// 		"快期末了？无法获取下周课表。可能无法正确导入单双周课程。"
				// 	)
				// }
				// str = JSON.stringify(data)

				result.push(data)
			})
	} catch (error) {
		console.error(error)
		await AIScheduleAlert(error.message)
		return "do not continue"
	}

	return JSON.stringify(result)
}
