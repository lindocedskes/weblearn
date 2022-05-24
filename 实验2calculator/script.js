// 历史输出
function getHistory(){
    // Document 接口表示任何在浏览器中载入的网页，并作为网页内容的入口
    // 返回获取id对象的“渲染”文本内容
    return document.getElementById("history-value").innerText
}
function printHistory(text){
    // 改变获取id对象的“渲染”文本内容
    document.getElementById("history-value").innerText=text;
}
// 当前输出
function getOutput(){
	return document.getElementById("output").innerText;
}
function printOutput(num){
	if(num==""){//如果是“”   getFormattedNumber会返回0
		document.getElementById("output").innerText=num;
	}
	else{
		document.getElementById("output").innerText=Number(num);
	}	
}



// 定义数字类 getElementsByClassName返回一个包含了所有指定类名的子元素的类数组对象
var number = document.getElementsByClassName("number");
for(var i =0;i<number.length;i++){
    //数字按钮点击
    number[i].addEventListener('click',function(){//同时监听所有number类按钮
        // alert(this.id);
        var output=getOutput();//
        if(output!=NaN){ //之前的输入都是数字 全局属性 NaN 的值表示不是一个数字（Not-A-Number）。
			output=output+this.id;//监听得到的值在this.id里，拼接
			printOutput(output);
		}
    });
}

// 定义操作类 getElementsByClassName返回一个包含了所有指定类名的子元素的类数组对象
var operator =document.getElementsByClassName("operator");
for(var i =0;i<operator.length;i++){
    operator[i].addEventListener('click',function(){//同时监听所有operator类按钮
        // alert(this.id)
        if(this.id=="clear"){//清空按钮
            printHistory("");
            printOutput("");
        }
        else{//按下操作符
            // alert(operator)
            var output =getOutput();//当前数字
            var history=getHistory();//之前表达式
            history=history+output;//加到历史表达式中
                if(this.id=="="){//这次按下的是=， ”=“计算 
                    var result=eval(history);//eval去‘’ 计算
                    printOutput(result);
                    printHistory("");//历史表达式清空
                }
                else if(this.id=="sin"){                
                    history='Math.sin('+history+')';//拼接
                    printHistory(history);
                    printOutput("")
                }
                else if(this.id=="cos"){              
                    history='Math.cos('+history+')';
                    printHistory(history);
                    printOutput("")
                }
                else if(this.id=="asin"){               
                    history='Math.asin('+history+')';
                    printHistory(history);
                    printOutput("")
                }
                else if(this.id=="tan"){               
                    history='Math.tan('+history+')';
                    printHistory(history);
                    printOutput("")
                }
                else if(this.id=="sqrt"){               
                    history='Math.sqrt('+history+')';
                    printHistory(history);
                    printOutput("")
                }
                else if(this.id=="1/x"){               
                    history='1/'+history;
                    printHistory(history);
                    printOutput("")
                }
                else{
                    history=history+this.id;
					printHistory(history);
					printOutput("");
                }            
        }
    });
}


