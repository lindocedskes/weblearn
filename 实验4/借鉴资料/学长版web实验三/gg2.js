window.onload = function(){
    function cart(){
        this.abtn = document.querySelectorAll('input');
        this.ogood_num = document.querySelector('.goods_num');
        this.opricetal = document.querySelector('.pricetal');
        this.opricest = document.querySelector('.pricest');
        this.totalnum = 0;
    };
   // 点击“+”号按钮触发的购物车商品数量，花费，最大价格的变动
   cart.prototype.plus = function(obtn){
       var onum = obtn.parentNode.querySelector('.num');
       var n = parseInt(onum.innerHTML);
       onum.innerHTML = ++n ;
       this.totalnum++;
       var oUnit = obtn.parentNode.parentNode.parentNode.querySelector('.unit');
       var osubtotal = obtn.parentNode.parentNode.parentNode.querySelector('.subtal');
       osubtotal.innerHTML = this.getsubtotal(onum.innerHTML,oUnit.innerHTML);
       this.ogood_num.innerHTML = this.totalnum;
       this.opricetal.innerHTML = this.gettotal();
       this.opricest.innerHTML = this.compareMaxunit();
   };
   // 点击“-”号按钮触发的购物车商品数量，花费，最大价格的变动
    cart.prototype.minus = function(obtn){
       var onum = obtn.parentNode.querySelector('.num');
       if(parseInt(onum.innerHTML)>0){
           var n = parseInt(onum.innerHTML);
           onum.innerHTML = --n ;
           this.totalnum--;
           var oUnit = obtn.parentNode.parentNode.parentNode.querySelector('.unit');
           var osubtotal = obtn.parentNode.parentNode.parentNode.querySelector('.subtal');
           osubtotal.innerHTML = this.getsubtotal(onum.innerHTML,oUnit.innerHTML);
           this.ogood_num.innerHTML = this.totalnum;
           this.opricetal.innerHTML = this.gettotal();
           this.opricest.innerHTML = this.compareMaxunit();
       }  
   };
   // 绑定“+”，“-”，删除按钮的点击事件
   cart.prototype.bind = function(){
       var that = this ;
       for(var i=0;i<this.abtn.length;i++){
           if(i%2 !=0){
               this.abtn[i].onclick = function(){
                   that.plus(this);
               }
          }else{
                this.abtn[i].onclick = function(){
                  that.minus(this);
              }
          }
      };
  };
  var oCart = new cart();
  oCart.bind();
  var goods = document.getElementsByClassName('goods')[0];
            
            // 用于保存购物车商品信息
            var carList = [];

            // 先获取当前cookie
            var cookies = document.cookie.split('; ');
            for (var i = 0; i < cookies.length; i++) {
                var arr = cookies[i].split('=');
                if (arr[0] === 'carlist') {
                    carList = JSON.parse(arr[1]);
                }
            }

            // 事件委托
            goods.onclick = function (e) {
                e = e || window.event;
                var target = e.target || e.srcElement;

                // 添加到购物车
                if (target.tagName.toLowerCase() === 'button') {

                    // 获取当前li
                    var currentLi = target.parentElement.parentElement;
                    var children = currentLi.children;
                    var currentGUID = currentLi.getAttribute('data-guid');

                    // 先创建一个对象保存当前商品信息
                    var goodsObj = {};
                    goodsObj.guid = currentGUID;
                    // qty 是 数量
                    goodsObj.qty = children[2].innerText;
                    goodsObj.name = children[1].innerHTML;
                    goodsObj.price = (children[3].innerText).substring(3, (children[3].innerText).length);
                    console.log((children[3].innerText).substring(3, (children[3].innerText).length));
                    console.log(goodsObj);

                    // 如果cookie为空，则直接添加
                    if (carList.length === 0) {
                        // 添加到carList
                        carList.push(goodsObj);
                    } else {
                        // 先判断cookie中有无相同的guid商品
                        for (var i = 0; i < carList.length; i++) {
                            // 如果商品已经存在cookie中，则数量+1
                            if (carList[i].guid === currentGUID) {
                                carList[i].qty = Number(carList[i].qty) + Number(children[2].innerText);
                                break;
                            }
                        }

                        // 如果原cookie中没有当前商品
                        if (i === carList.length) {
                            // 添加到carList
                            carList.push(goodsObj);
                        }

                    }
                    console.log(carList);
                    // 存入cookie
                    // 把对象/数组转换诚json字符串：JSON.stringify()
                    document.cookie = 'carlist=' + JSON.stringify(carList);
                }

            }
}