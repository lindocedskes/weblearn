(function($){
    /**
     * 插件入口
     * @param id        要显示位置的id
     * @param year      年的标记
     * @param month     月的标记
     * @param day       日的标记
     * @param hour      小时的标记
     * @param minute    分钟的标记
     * @param second    秒的标记
     * @param week      星期的标记
     */
	$.fn.showTime = function(id,year,month,day,hour,minute,second,week){
		if(!id){
            alert("您还没有设置id哦~~");
            return;
        }
        /**
         * 每隔一秒循环一次
         */
        window.setInterval("$.fn.realTimeHtml('"+id+","+year+","+month+","+day+","+hour+","+minute+","+second+","+week+"')",1000);
	};


    /**
     * 将处理好的字符串显示到页面上
     * @param domId  调用方法传入的id
     */
    $.fn.realTimeHtml = function(id){
        var params = id.split(",");
        if(!document.getElementById(params[0])){
            alert("您设置的id有错哦~~");
            return;
        }
		document.getElementById(params[0]).innerHTML=showLocale(params);
	};
    function judgeNull(item){
        if(item =="undefined" ||item =="null" || item ==null || item ==undefined){
            return true;
        }else{
            return false;
        }

    }
    /**
     * 处理时间的主方法
     * @returns {string}  返回拼装好的字符串
     */
	function showLocale(params){
        if(judgeNull(params[1])){
            params[1] = "/";
        }
        if(judgeNull(params[2])){
            params[2] = "/";
        }
        if(judgeNull(params[3])){
            params[3] = "";
        }
        if(judgeNull(params[4])){
            params[4] = ":";
        }
        if(judgeNull(params[5])){
            params[5] = ":";
        }
        if(judgeNull(params[6])){
            params[6] = "";
        }
        if(judgeNull(params[7])){
            params[7] = "";
        }
		var objD = new Date();
		var str,colorhead,colorfoot;
	        var yy = objD.getYear();  
	            if(yy<1900) yy = yy+1900;  
	        var MM = objD.getMonth()+1;  
	            if(MM<10) MM = '0' + MM;  
	        var dd = objD.getDate();  
	            if(dd<10) dd = '0' + dd;  
	        var hh = objD.getHours();  
	            if(hh<10) hh = '0' + hh;  
	        var mm = objD.getMinutes();  
	            if(mm<10) mm = '0' + mm;  
	        var ss = objD.getSeconds();  
	            if(ss<10) ss = '0' + ss;  
	        var ww = objD.getDay();  
	            if ( ww==0 ) colorhead="<span color=\"#FF0000\">";
	            if ( ww > 0 && ww < 6 ) colorhead="<span color=\"#373737\">";
	            if ( ww==6 ) colorhead="<span color=\"#008000\">";
                if(params[7] =="chinese"){
                    if (ww==0) ww="星期日";
                    if (ww==1) ww="星期一";
                    if (ww==2) ww="星期二";
                    if (ww==3) ww="星期三";
                    if (ww==4) ww="星期四";
                    if (ww==5) ww="星期五";
                    if (ww==6) ww="星期六";
                }else if(params[7] =="english"){
                    if (ww==0) ww="Sunday";
                    if (ww==1) ww="Monday";
                    if (ww==2) ww="Tuesday";
                    if (ww==3) ww="Wendsday";
                    if (ww==4) ww="Thursday";
                    if (ww==5) ww="Friday";
                    if (ww==6) ww="Satuarday";
                }else{
                    ww ="";
                }
	            colorfoot="</span>";
	            str = colorhead + yy + params[1] + MM + params[2] + dd + params[3]+" " + hh + params[4] + mm + params[5] + ss + params[6]+" " +ww + colorfoot;
        console.log(str);
        return(str);
	};
})(jQuery);
/**
 * jquery 时间模拟器插件，
 *
 *
 * 		1.首先将标志都置成全局变量，然后再所有的方法中通用，但在多次调用的时候，全局变量被置为同一个值，无法进行多样化操作，舍之~~
 * 	    2.将每个标志都写在每个方法的参数中，但在调用setInterval的时候，由于传入的方法必须加引号，所有的字符串连成了一个字符串，无法继续，舍之~~
 * 	    3.将所有的字符串合成一个字符串，然后用","隔开，在最后一个字符串中进行拼装。最后挨个从其中解析出来分别填入相应位置
 *
 * 	    用法：
 * 	    1.必须传入一个id，用来显示时间
 * 	    2.一共有7个参数，如果需要修改格式，则7个参数都需要传，没有的可以传入null,或""
 * 	    3.默认情况下，显示格式为
 *          2014/11/03 22:23:42
 *       三种调用方法：
 *                  $.fn.showTime("realTime");
 *                  $.fn.showTime("realTime2","年","月","日","时","分","秒","chinese");
 <                      2014年11月03日 22时23分42秒 星期一
 *                  $.fn.showTime("realTime3","年","月","日","时","分","秒","english");
 <                      2014年11月03日 22时23分42秒 Monday
 **/
