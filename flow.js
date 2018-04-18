var arr , count , flows;
// 定义一下(真实开发需要从后台获取,角色信息)
var roles = {boss:1,manager:2,worker:3};
function getTotal(){
	//后续需要去重
	//先获取arr数组
	flows = [];
	arr = [];
	count = 0;
	$('svg g').each(function(){
		var classStr = $(this).attr('class');
		console.log(classStr);
		var temp = classStr.split("|");
		arr.push([temp[0],temp[1]]);
	});
	
	getTotalMsg('0start','');
	console.log(flows);
}

function getTotalMsg(temp,flow) {
	flow += ('-'+(roles[temp.replace(/\d/g,'')]||''));//拼接流程//直接把角色描述替换成角色id
	if(temp == "1end") {
		//计数加1
		count ++ ;
		//将流程放入定义好的流程数组中
		flows.push(flow.substring(1).replace(/^[-]|[-]$/g,''));
		return;
	}
	for(var i in arr) {
		if(arr[i][0] == temp) {
			getTotalMsg(arr[i][1],flow);
		}
	}
}
$(function(){
	$('#btn').click(function(){
		getTotal();
	})
});

/**

<g class="0start","2manager">
<g class="0start","5manager">
<g class="0start","3boss">
<g class="2manager","6worker">
<g class="2manager","5manager">
<g class="3boss","4boss">
<g class="4boss","1end">
<g class="5manager","7boss">
<g class="6worker","7boss">
<g class="7boss","1end">

*/