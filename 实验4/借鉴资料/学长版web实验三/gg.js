window.onload = function(){
     var oCarList = document.getElementById('carList');
            // var oSubPrice = oCarList.nextElementSibling;
            // console.log(oCarList.nextElementSibling);
            var btnClear = document.getElementById('btnClear');
            var carList;
            var cookies = document.cookie.split('; ');
            for (var i = 0; i < cookies.length; i++) {
                var arr = cookies[i].split('=');
                if (arr[0] === 'carlist') {
                    console.log(JSON.parse(arr[1]));
                    carList = JSON.parse(arr[1]);
                }
            }

            var subPrice = 0;

            if (carList) {
                // var ul = document.document.createElement('tr');
                for (var i = 0; i < carList.length; i++) {
                    var li = document.createElement('tr');
                    // 给每个li添加data-guid属性
                    li.className = 'trclass';
                    li.setAttribute('data-guid', carList[i].guid);

                    // 序号
                    var newxuhao = document.createElement('td');
                    newxuhao.className = 'tdone xuhao';
                    newxuhao.innerHTML = i;
                    // 商品名
                    var title = document.createElement('td');
                    title.className = 'tdtwo';
                    title.innerHTML = carList[i].name;
                    // 数量
                    var goodNum = document.createElement('td');
                    goodNum.className = 'tdthree';
                    goodNum.innerHTML = carList[i].qty;
                    // 商品价格
                    var price = document.createElement('td');
                    price.className = 'tdfour';
                    price.innerHTML = "单价：" + carList[i].price;
                    // 小计
                    var xiaoji = document.createElement('td');
                    xiaoji.className = 'tdfive';
                    xiaoji.innerText = carList[i].qty * carList[i].price;

                    // 添加删除按钮
                    var closebtn = document.createElement('button');
                    var btnClose = document.createElement('td');
                    btnClose.className = 'tdsix';

                    closebtn.innerHTML = '&times;';
                    closebtn.className = 'btn-close';
                    btnClose.appendChild(closebtn);

                    // 计算总价
                    subPrice += carList[i].price * carList[i].qty;

                    li.appendChild(newxuhao);
                    li.appendChild(title);
                    li.appendChild(goodNum);
                    li.appendChild(price);
                    li.appendChild(xiaoji);
                    li.appendChild(btnClose);

                    oCarList.appendChild(li);
                }

                // 写入总价
                var li = document.createElement('tr');
                var li_tr = document.createElement('td');
                li_tr.className = 'talast';
                li_tr.colSpan = '6';
                li_tr.innerText = "总价：" + subPrice;
                li.appendChild(li_tr);
                oCarList.appendChild(li);
                // toFixed(n)获取小数点后n位（自动四舍五入，Number类型的方法）
                // oSubPrice.innerHTML = '<span class="price">' + subPrice.toFixed(2) + '</span>';
            }


            // 删除商品
            oCarList.onclick = function (e) {
                e = e || window.event;
                var target = e.target || e.srcElement;

                // 是否点击了删除按钮
                if (target.className === 'btn-close') {
                    var currentLi = target.parentElement.parentElement;
                    console.log(currentLi.parentElement.parentElement);

                    // 获取当前guid
                    var currentGUID = currentLi.getAttribute('data-guid');
                    

                    // 删除cookie中对应的商品
                    // 根据guid取对比
                    for (var i = 0; i < carList.length; i++) {
                        // 找出要删除的商品
                        if (carList[i].guid === currentGUID) {
                            console.log(currentGUID);
                            var sumprice = currentLi.parentElement.children[carList.length];
                            console.log(sumprice.children[0]);
                            
                            var nextsumprise = (sumprice.innerText.substring(3, sumprice.innerText.length)) - (carList[i].price * carList[i].qty);
                            console.log(nextsumprise);

                            sumprice.children[0].className = 'talast';
                            sumprice.children[0].colSpan = '6';
                            sumprice.children[0].innerText = "总价：" + nextsumprise;
                            
                            carList.splice(i, 1);
                            break;
                        }
                    }

                    // 更新cookie
                    document.cookie = 'carlist=' + JSON.stringify(carList);
                    console.log(document.cookie);

                    // 删除li节点
                    currentLi.parentElement.removeChild(currentLi);
                }
            }

            // 清空购物车
            // 1、删除DOM节点
            // 2、删除cookie
            btnClear.onclick = function () {
                oCarList.innerHTML = '';
                // oSubPrice.innerHTML = '';

                // 利用设置有效期位过期事件来达到删除cookie的效果
                var now = new Date();
                now.setDate(now.getDate() - 7);
                document.cookie = 'carlist=xx;expires=' + now;
            }
 }