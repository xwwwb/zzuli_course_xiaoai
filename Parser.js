getDay = (day) => {
	if (day === "一") {
		return 1
	} else if (day === "二") {
		return 2
	} else if (day === "三") {
		return 3
	} else if (day === "四") {
		return 4
	} else if (day === "五") {
		return 5
	} else if (day === "六") {
		return 6
	} else {
		return 7
	}
}
getSections = (sections) => {
	let arr = sections.split("-")
	let num_arr = []
	arr.map((item) => {
		num_arr.push(parseInt(item))
	})
	let new_arr = []
	for (let i = num_arr[0]; i <= num_arr[1]; i++) {
		new_arr.push(i)
	}
	return new_arr
}
getName = (name) => {
	if (name == null) {
		return "未知"
	} else {
		return name
	}
}
getWeeks = (weeks, isSingleWeek) => {
	let num_arr = []
	let new_arr = []
	let arr = weeks.split("-")
	arr.map((item) => {
		num_arr.push(parseInt(item))
	})
	if (isSingleWeek === 0) {
		for (let i = num_arr[0]; i <= num_arr[1]; i++) {
			new_arr.push(i)
		}
	} else if (isSingleWeek === 1) {
		for (let i = num_arr[0]; i <= num_arr[1]; i++) {
			if (i % 2 == 1) {
				new_arr.push(i)
			}
		}
	} else if (isSingleWeek === 2) {
		for (let i = num_arr[0]; i <= num_arr[1]; i++) {
			if (i % 2 == 0) {
				new_arr.push(i)
			}
		}
	}
	return new_arr
}

// 以下三个开发暂未完成
getWeeksSpec = (weeks, isSingleWeek) => {
	let _arr = weeks.split(",")
	let new_arr = []
	_arr.map((weeks) => {
		new_arr = new_arr.concat(getWeeks(weeks,isSingleWeek))
	})
	return new_arr
}

function scheduleHtmlParser(html) {
	let result = [] //结果
	let duplicate = [] //查重用
	let data = JSON.parse(html)
	data.map((data) => {
		if (data.success === true && data.obj !== null) {
			let obj = data.obj
			obj.map((item) => {
				let weeks
				// 长度小于5 说明是正常的周
				if (item.courseWeekly.length <= 5) {
					console.log("正常周")
					weeks = getWeeks(
						item.courseWeekly,
						parseInt(item.courseSingleDoubleWeek)
					)
				} else {
					// 长度大于5 特殊周
					console.log("特殊周")
					weeks = getWeeksSpec(
						item.courseWeekly,
						parseInt(item.courseSingleDoubleWeek)
					)
					console.log(item.courseName)
				}
				let course = {
					name: getName(item.courseName), // 课程名称
					position: getName(item.courseClassRoomName), // 上课地点
					teacher: getName(item.teacherName), // 教师名称
					weeks, // 周数
					day: getDay(item.courseDate), // 星期
					sections: getSections(item.courseSection), // 节次
				}
				if (!duplicate.includes(JSON.stringify(course))) {
					result.push(course)
					duplicate.push(JSON.stringify(course))
				}
			})
		} else {
			console.log("导入失败")
		}
	})

	return result
}
