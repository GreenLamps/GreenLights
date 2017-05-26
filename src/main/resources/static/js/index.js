var docEl = document.documentElement,
	    //当设备的方向变化（设备横向持或纵向持）此事件被触发。绑定此事件时，
	    //注意现在当浏览器不支持orientationChange事件的时候我们绑定了resize 事件。
	    //总来的来就是监听当然窗口的变化，一旦有变化就需要重新设置根字体的值
	    resizeEvt = 'onorientationchange' in window ? 'orientationchange' : 'resize',
	    recalc = function() {
	        //设置根字体大小
            var str = location.href;
            alert(str);
            docEl.style.fontSize = 20 * (docEl.clientWidth / 320) + 'px';
	    };

	//绑定浏览器缩放与加载时间
	window.addEventListener(resizeEvt, recalc, false);
	document.addEventListener('DOMContentLoaded', recalc, false);


/*轮播图*/
// 获取所有的li，轮播的元素
		var lis = document.getElementById('fenggouyi').children[0].children;
		console.log(lis);

		// 获取所有的数字li
		var num_lis = document.getElementById('num_list').children[0].children;
		// console.log(num_lis);

		// lis 长度为6，下标从0开始

		// 设置i下标，表示第几张图片
		var i = 0;

		// 设置轮播图是否已启动的标志
		var run = null;

		// 设置定时器函数
		function autoRun(){
			run = setInterval(function(){
				// 当前显示的图片要隐藏
				lis[i].removeAttribute('class');

				// 当前显示激活的数字的背景要被移除
				num_lis[i].children[0].removeAttribute('class');

				// children[0]  === firstElementChild

				// i 下标，自增，表示下一张
				i++;

				// 如果循环到了最后一张图片
				if(i==lis.length){
					i=0;
				}

				// 下一张显示
				lis[i].className = 'active';
				// 下一个数字的背景设置为激活
				num_lis[i].children[0].className = 'active_num';
			},3000);
		}


		// 第一次进入该页面，调用轮播函数
		autoRun();

		// 给每一张图都设置鼠标进入、移出的事件
		for(var j=0;j<lis.length;j++){
			// 当鼠标进入到轮播图时，停止
			lis[j].onmouseover = function(){
				// 停止计时器
				clearInterval(run);
			}

			// 鼠标离开继续开始
			lis[j].onmouseout = function(){
				// 再次调用轮播函数
				autoRun();
			}
		}

		// 给每一个数字都设置鼠标的移入、移出事件
		for(var k=0;k<num_lis.length;k++){
			// 将数字对应的下标绑定到每一个span中
			num_lis[k].firstElementChild.setAttribute('num',k);

			// 移入事件
			num_lis[k].onmouseover = function(){
				// 停止计时器
				clearInterval(run);

				// 移出之前的元素的 ---> i 图片
				lis[i].className = '';
				// 数字列表位置的背景移除
				num_lis[i].firstElementChild.className = '';

				// 上面的图片对应的当前的数字进行显示
				i = this.firstElementChild.getAttribute('num');
				// alert(i);
				// 当前图
				lis[i].className = 'active';
				// 当前数字
				num_lis[i].firstElementChild.className = 'active_num';
			}

			// 移除
			num_lis[k].onmouseout = function(){
				// 重新启动定时器
				autoRun();
			}
		}

		// 当鼠标移入、移除 num_list div时相应的停止、开始
		num_list.onmouseover = function(){
			// 停止
			clearInterval(run);
		}

		num_list.onmouseout = function(){
			// 先清除，再调用
			clearInterval(run);

			// 调用函数
			autoRun();
		}
		window.onscroll=function(){
 			var a=document.documentElement.scrollTop+document.body.scrollTop;

 			if(a>300){
 				document.getElementById("di").style.display="block";
 			}else{
 				 document.getElementById("di").style.display="none";

 			}
		}


function gundongA(){
var speed=30; //数字越大速度越慢
var tab=document.getElementById("demo");
var tab1=document.getElementById("demo1");
var tab2=document.getElementById("demo2");
tab2.innerHTML=tab1.innerHTML;
function Marquee(){
if(tab2.offsetWidth-tab.scrollLeft<=0)
tab.scrollLeft-=tab1.offsetWidth
else{
tab.scrollLeft++;
}
}
var MyMar=setInterval(Marquee,speed);
tab.onmouseover=function() {clearInterval(MyMar)};
tab.onmouseout=function() {MyMar=setInterval(Marquee,speed)};
}
 gundongA();



 // 获取所有的li，轮播的元素
		var lis1 = document.getElementById('fenggouyi1').children[0].children;
		console.log(lis1);

		// 获取所有的数字li
		var num_lis1 = document.getElementById('num_list1').children[0].children;
		// console.log(num_lis);

		// lis 长度为6，下标从0开始

		// 设置i下标，表示第几张图片
		var a = 0;

		// 设置轮播图是否已启动的标志
		var run1 = null;

		// 设置定时器函数
		function autoRun1(){
			run1 = setInterval(function(){
				// 当前显示的图片要隐藏
				lis1[a].removeAttribute('class');

				// 当前显示激活的数字的背景要被移除
				num_lis1[a].children[0].removeAttribute('class');

				// children[0]  === firstElementChild

				// i 下标，自增，表示下一张
				a++;

				// 如果循环到了最后一张图片
				if(a==lis1.length){
					a=0;
				}

				// 下一张显示
				lis1[a].className = 'active1';
				// 下一个数字的背景设置为激活
				num_lis1[a].children[0].className = 'active_num1';
			},3000);
		}


		// 第一次进入该页面，调用轮播函数
		autoRun1();

		// 给每一张图都设置鼠标进入、移出的事件
		for(var p=0;p<lis1.length;p++){
			// 当鼠标进入到轮播图时，停止
			lis1[p].onmouseover = function(){
				// 停止计时器
				clearInterval(run1);
			}

			// 鼠标离开继续开始
			lis1[p].onmouseout = function(){
				// 再次调用轮播函数
				autoRun1();
			}
		}

		// 给每一个数字都设置鼠标的移入、移出事件
		for(var g=0;g<num_lis1.length;g++){
			// 将数字对应的下标绑定到每一个span中
			num_lis1[g].firstElementChild.setAttribute('num',g);

			// 移入事件
			num_lis1[g].onmouseover = function(){
				// 停止计时器
				clearInterval(run1);

				// 移出之前的元素的 ---> i 图片
				lis1[a].className = '';
				// 数字列表位置的背景移除
				num_lis1[a].firstElementChild.className = '';

				// 上面的图片对应的当前的数字进行显示
				a = this.firstElementChild.getAttribute('num');
				// alert(i);
				// 当前图
				lis1[a].className = 'active1';
				// 当前数字
				num_lis1[a].firstElementChild.className = 'active_num1';
			}

			// 移除
			num_lis1[g].onmouseout = function(){
				// 重新启动定时器
				autoRun1();
			}
		}

		// 当鼠标移入、移除 num_list div时相应的停止、开始
		num_list1.onmouseover = function(){
			// 停止
			clearInterval(run1);
		}

		num_list1.onmouseout = function(){
			// 先清除，再调用
			clearInterval(run1);

			// 调用函数
			autoRun1();
		}

function gundongAA(){
var speedA=30; //数字越大速度越慢
var tabA=document.getElementById("demoA");
var tab1A=document.getElementById("demo1A");
var tab2A=document.getElementById("demo2A");
tab2A.innerHTML=tab1A.innerHTML;
function MarqueeA(){
if(tab2A.offsetWidth-tabA.scrollLeft<=0)
tabA.scrollLeft-=tab1A.offsetWidth
else{
tabA.scrollLeft++;
}
}
var MyMarA=setInterval(MarqueeA,speedA);
tabA.onmouseover=function() {clearInterval(MyMarA)};
tabA.onmouseout=function() {MyMarA=setInterval(MarqueeA,speedA)};
}
 gundongAA();


