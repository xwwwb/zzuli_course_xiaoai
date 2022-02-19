async function scheduleHtmlProvider() {
	await loadTool("AIScheduleTools")
	await AIScheduleAlert("暂时无法完美适配单双周课程 请见谅")
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

	let date = new Date()

	let handleTime = (time) => {
		if (time < 10) {
			return "0" + time
		} else {
			return time
		}
	}
	const formatDate = (current_datetime) => {
		let formatted_date =
			current_datetime.getFullYear() +
			"-" +
			handleTime(current_datetime.getMonth() + 1) +
			"-" +
			handleTime(current_datetime.getDate())

		return formatted_date
	}

	console.log(formatDate(date))

	body =
		"userName=" +
		parseInt(userid) +
		"&currentTime=" +
		formatDate(date) +
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
				str = JSON.stringify(data)
				console.log(str)
			})
		return str
	} catch (error) {
		console.error(error)
		await AIScheduleAlert(error.message)
		return "do not continue"
	}
}
