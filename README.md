此为郑州轻工业大学小爱课程表适配计划仓库
现有功能：
- [x] 一键导入课程信息
- [x] 单双周识别


现有功能虽然潦草 但是能用了

单双周导入原理：

`"courseSingleDoubleWeek": "0"`  不存在单双周问题

`"courseSingleDoubleWeek": "1"`  单周

`"courseSingleDoubleWeek": "2"`  双周

获取当前日期以及七天后日期
选取`courseSingleDoubleWeek` 为0的统一整合 不为0的进行单双周处理后整合