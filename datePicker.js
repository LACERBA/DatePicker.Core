/**
 * @homepage https://github.com/LACERBA
 * (c) 2014, Charles Huang. 
 */
define(function (require, exports, module) {
    var DatePicker = {};

    /**
     * [DayModel 日期对象]
     * @param {[type]}  year         [description]
     * @param {[type]}  month        [description]
     * @param {[type]}  week         [description]
     * @param {[type]}  day          [description]
     * @param {Boolean} isTody       [description]
     * @param {Boolean} isCheck      [description]
     * @param {Boolean} isCurrSelect [description]
     */
    var DayModel = function (year, month, week, day, isTody, isCheck, isCurrSelect) {
        this.year = year;
        this.week = week;
        this.day = day;
        this.month = month;
        this.isTody = isTody;
        this.isCheck = isCheck;
        this.isCurrSelect = isCurrSelect;
    };

    /**
     * [getDate 获取时间对象]
     * @return {[type]} [description]
     */
    DayModel.prototype.getDate = function () {
        return DatePicker.newDate(this.year, this.month, this.day);
    };

    /**
     * [newDate 创建一个时间]
     * @param  {[type]} year  [description]
     * @param  {[type]} month [description]
     * @param  {[type]} day   [description]
     * @return {[type]}       [description]
     */
    DatePicker.newDate = function (year, month, day) {
        return new Date(Date.parse((year + '-' + month + '-' + day).replace(/-/g, "/")));
    };

    /**
     * [getLastDay 获取最后一天]
     * @param  {[type]} year  [description]
     * @param  {[type]} month [description]
     * @return {[type]}       [description]
     */
    DatePicker.getLastDay = function (year, month) {
        var new_year = year; //取当前的年份
        var new_month = month++; //取下一个月的第一天，方便计算（最后一天不固定）
        if (month > 12) //如果当前大于12月，则年份转到下一年
        {
            new_month -= 12; //月份减
            new_year++; //年份增
        }
        var new_date = new Date(new_year, new_month, 1); //取当年当月中的第一天
        return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate(); //获取当月最后一天日期
    };

    /**
     * [init 初始化入口]
     * @return {[type]} [description]
     */
    DatePicker.init = function () {

    };

    /**
     * [createDayArr 创建月份时间数组]
     * @param  {[type]} year  [description]
     * @param  {[type]} month [description]
     * @return {[type]}       [description]
     */
    DatePicker.createDayArr = function (year, month) {
        var resultDayArr = [];
        //7*6时间组合
        var day = 1, //时间增量
            startWeek = 0, //0（周日） 到 6（周六）
            lastDay = DatePicker.getLastDay(year, month);

        //计算第一天开始位置
        startWeek = DatePicker.newDate(year, month, 1).getDay();

        for (var i = 0; i < 6; i++) {
            var tmpDays = []; //每行数据
            for (var j = 0; j < 7; j++) {

                if (day > lastDay) {
                    tmpDays.push(0);
                    continue;
                } //时间增加超过最后一天，跳出循环

                if (i == 0) { //如果是第一行，必须等开始位置才进行时间构造
                    if (j < startWeek) {
                        tmpDays.push(0);
                        continue;
                    } //还未到达
                }

                var
                    addDay = day++, //添加时间
                    toDay = new Date();
                tmpDays.push(new DayModel(
                    year,
                    month,
                    j,
                    addDay,
                    (toDay.getDate() == addDay && (toDay.getMonth() + 1) == month && toDay.getFullYear() == year) ? true : false,
                    0,
                    0
                ));
            };
            resultDayArr.push(tmpDays.slice(0));
        };

        return resultDayArr;
    };

    return DatePicker;
});