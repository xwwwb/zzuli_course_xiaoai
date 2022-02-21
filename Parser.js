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
getWeeks = (weeks) => {
	let arr = weeks.split("-")
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
handleSingleWeeks = (weeks) => {
	let arr = weeks.split("-")
	let num_arr = []
	arr.map((item) => {
		num_arr.push(parseInt(item))
	})
	let new_arr = []
	for (let i = num_arr[0]; i <= num_arr[1]; i++) {
		if (i % 2 == 1) {
			new_arr.push(i)
		}
	}
	return new_arr
}
handleDoubleWeeks = (weeks) => {
	let arr = weeks.split("-")
	let num_arr = []
	arr.map((item) => {
		num_arr.push(parseInt(item))
	})
	let new_arr = []
	for (let i = num_arr[0]; i <= num_arr[1]; i++) {
		if (i % 2 == 0) {
			new_arr.push(i)
		}
	}
	return new_arr
}

// 以下三个开发暂未完成
getWeeksSpec = (weeks) => {
	let arr = weeks.split("-")
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
handleSingleWeeksSpec = (weeks) => {
	let arr = weeks.split("-")
	let num_arr = []
	arr.map((item) => {
		num_arr.push(parseInt(item))
	})
	let new_arr = []
	for (let i = num_arr[0]; i <= num_arr[1]; i++) {
		if (i % 2 == 1) {
			new_arr.push(i)
		}
	}
	return new_arr
}
handleDoubleWeeksSpec = (weeks) => {
	let arr = weeks.split("-")
	let num_arr = []
	arr.map((item) => {
		num_arr.push(parseInt(item))
	})
	let new_arr = []
	for (let i = num_arr[0]; i <= num_arr[1]; i++) {
		if (i % 2 == 0) {
			new_arr.push(i)
		}
	}
	return new_arr
}


function scheduleHtmlParser(html) {
	let result = [] //结果
	let duplicate = [] //查重用
	let data = JSON.parse(html)
	data.map((data) => {
		if (data.success) {
			let obj = data.obj
			obj.map((item) => {
				let weeks
				// 长度小于5 说明是正常的周
				if (item.courseWeekly.length < 5) {
					if (item.courseSingleDoubleWeek == "0") {
						weeks = getWeeks(item.courseWeekly)
						console.log("不存在单双周问题")
					} else if (item.courseSingleDoubleWeek == "1") {
						weeks = handleSingleWeeks(item.courseWeekly)
						console.log("此为单周课")
					} else if (item.courseSingleDoubleWeek == "2") {
						weeks = handleDoubleWeeks(item.courseWeekly)
						console.log("此为双周课")
					}
				} else {
					// 长度大于5 特殊周
					if (item.courseSingleDoubleWeek == "0") {
						weeks = getWeeksSpec(item.courseWeekly)
						console.log("不存在单双周问题")
					} else if (item.courseSingleDoubleWeek == "1") {
						weeks = handleSingleWeeksSpec(item.courseWeekly)
						console.log("此为单周课")
					} else if (item.courseSingleDoubleWeek == "2") {
						weeks = handleDoubleWeeksSpec(item.courseWeekly)
						console.log("此为双周课")
					}
				}
				let course = {
					name: getName(item.courseName), // 课程名称
					position: getName(item.courseClassRoomName), // 上课地点
					teacher: getName(item.teacherName), // 教师名称
					weeks, // 周数
					day: getDay(item.courseDate), // 星期
					sections: getSections(item.courseSection), // 节次
				}
				if (!duplicate.includes(item)) {
					result.push(course)
					duplicate.push(item)
				}
			})
		} else {
			console.log("导入失败")
		}
	})

	return result
}
