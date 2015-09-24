var Calendar=function(){
	var today=new Date(),  
		month=today.getMonth()+1,
		year=today.getFullYear(),
		day=today.getDate(),
		year_box=document.getElementById("J_calendar_year"),
		month_box=document.getElementById("J_calendar_month"),
		day_box=document.getElementById("J_calendar_today"),
		main_box=document.getElementById("J_calendar_main");
	function getDay(year,month){
		var i,j,d,data=[];
		// 计算月的天数并添加至data
		switch(month){
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				for(i=0;i<31;i++){
					data.push(i+1);
				}
				break;
			case 4:
			case 6:
			case 9:
			case 11:
				for(i=0;i<30;i++){
					data.push(i+1); 
				}
				break;
			case 2:
				if((year%4==0&&year%100!=0)||year%400==0){
					for(i=0;i<29;i++){
						data.push(i+1);
					}
				}else{
					for(i=0;i<28;i++){
						data.push(i+1);
					}
				}
		};
		// 计算月第一天周几并添加空格到data
		d=new Date(year+"/"+month+"/1").getDay();
		for(j=0;j<d;j++){
			data.unshift("&nbsp;");
		}
		// 此处获取所有data数据
		return data;
	}	
	// 渲染
	function renderDay(data){
		var i,
			len=data.length?data.length:0,
			str="";
		for(i=0;i<len;i++){
			str+="<span class='J_calendar_cell'>"+data[i]+"</span>";
		}
		main_box.innerHTML=str;
	}
	function initYear(){
		var i,
			thisYear=today.getFullYear(),
			str="",
			str2="";
		for(i=1970;i<=thisYear;i++){
			if(i==thisYear){
				str2="<option selected='selected'>"+i+"</option>";
			}else{
				str2="<option>"+i+"</option>";
			}
			str+=str2;
		}
		year_box.innerHTML=str;
	}
	function initMonth(){
		var i,
			thisMonth=today.getMonth()+1,
			str="",
			str2="";
		for(i=1;i<=12;i++){
			if(i==thisMonth){
				str2="<option selected='selected'>"+i+"</option>";
			}else{
				str2="<option>"+i+"</option>";
			}
			str+=str2;
		}
		month_box.innerHTML=str;
	}
	function binder(el,type,handle){
		if(el.addEventListener){
			el.addEventListener(type,handle,false);
		}else if(el.attachEvent){
			el.attachEvent("on"+type,handle);
		}
	}
	return {
		init:function(){
			var data,y,m;
			initYear();
			initMonth();
			data=getDay(year,month);
			renderDay(data);
			day_box.innerHTML=year+"/"+month+"/"+day;
			binder(year_box,"change",function(){
				y=parseInt(year_box.options[year_box.options.selectedIndex].innerHTML);
				m=parseInt(month_box.options[month_box.options.selectedIndex].innerHTML);
				data=getDay(y,m);
				renderDay(data);
			});
			binder(month_box,"change",function(){
				y=parseInt(year_box.options[year_box.options.selectedIndex].innerHTML);
				m=parseInt(month_box.options[month_box.options.selectedIndex].innerHTML);
				data=getDay(y,m);
				renderDay(data);
			});
		}
	}
}();
window.Calendar=Calendar;