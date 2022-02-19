function scheduleHtmlParser(html) {
	let result = []
	let data_json = JSON.parse(html)
	let obj = data_json.obj
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
  getName = (name)=>{
    if(name == null){
      return "未知"
    }else{
      return name
    }
  }
	obj.map((item) => {
		getWeeks(item.courseWeekly)
		let course = {
			name: getName(item.courseName), // 课程名称
			position: getName(item.courseClassRoomName), // 上课地点
			teacher: getName(item.teacherName), // 教师名称
			weeks: getWeeks(item.courseWeekly), // 周数
			day: getDay(item.courseDate), // 星期
			sections: getWeeks(item.courseSection), // 节次
		}
    result.push(course)
		console.log(course)
	})
  return result
}
