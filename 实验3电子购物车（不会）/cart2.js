

function addItem( name, price ) {
    alert("1");
    var i = 1;  
    //遍历cookie中所有名称的cookie值，直到找到为空的cookie值    
    for( ; getCookieValue( "item" + i ) != "" ; i++);  
    //将物品的名称和价格一起放入cookie中  
    document.cookie = "item" + i + "=" + name +"," + price;
    //设置当前cookie中的items属性，每次写入货物都自动加1
    document.cookie = "items=" + i;
    }
    
    //获取指定名称的cookie值，注意在这里name也是指cookie名称而不是商品名称
    //返回值为包含物品名称和价格的一条cookie信息
    function getCookieValue( name ){
         //提取出cookie中的字符串值
    var c = document.cookie;
    
    //提取名称为name的cookie
    var begin = c.indexOf( name );
    if( begin < 0 ) return( "" );
    begin += name.length + 1;
    var end = c.indexOf( ";", begin );
    if( end == -1 ) end = c.length;
    return( c.slice( begin, end ) );
    }



function removeItem( name )
    {
      document.cookie = name + "='';";
       //以下语句为刷新屏幕，功能同history.go(0)
      document.location = document.location;
    }

//通过cookie名称获取cookie值
    function getCookieValue( name )
    {
       var c = document.cookie;
       var begin = c.indexOf( name );
       if( begin < 0 ) return( "" );
       begin += name.length + 1;
       var end = c.indexOf( ";", begin );
       if( end == -1 ) end = c.length;
       return( c.slice( begin, end ) );
    }
//通过cookie名称获取物品名称
     function getItemName( item )
     {
       var c = getCookieValue( item );
       if( c )
       {
          return( c.split( ",")[0] );
       }
       else return( "" );
       }

//通过cookie名称获取物品价格

    function getItemPrice( item ) {
            var c = getCookieValue( item);
            if( c )
          {
             return( c.split("," )[1] );
           }
           else return( "" );
        }


//购物车增加数量
function add(btn) {
    //数量*价格
    //1、获取到当前input框数值，并更新input框
    //parentElement:获取父节点	children:获取子节点
    var num=btn.parentElement.children[0].value;   
    //数字加一
    btn.parentElement.children[0].value=++num;

    //2、获取单价,字符串
    //previousElementSibling：获取哥哥节点
    var proce=btn.parentElement.previousElementSibling.innerText;
    //3、计算小计，并更新渲染
    var total=parseFloat(proce)*num;
    //parentElement:获取父节点		nextElementSibling：获取弟弟节点
    btn.parentElement.nextElementSibling.innerText=total;

    //总计
    calSum();
}

//购物车减少数量

function minus(btn){
    var num=btn.parentElement.children[0].value;
    //设置不能减到负数，到0就不能减
    if(num==0){
        return;
    }
    btn.parentElement.children[0].value=--num;
    //2、获取单价,字符串
    var price=btn.parentElement.previousElementSibling.innerText;
    //3、计算小计，并更新渲染
    var total=parseFloat(price)*num;
    btn.parentElement.nextElementSibling.innerText=total;

    //总计
     calSum();
}
//总计
function  calSum(){
    var sum=0;		
    //newBoxes:指被选中的按钮
    // tag：俩按钮
    var newBoxes=Array.from(_boxes).filter(function(tag){
        return tag.checked==true;
    })
    
    //tag:被选中的按钮
    newBoxes.forEach(function(tag){
        sum+=parseFloat(tag.parentElement.parentElement.children[4].innerText)
    })
    
    _sum.innerText=sum;

}


var minus=document.getElementsByName("jian");
