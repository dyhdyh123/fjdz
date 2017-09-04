



//飞机对象
var myPlane = {
	ele:null,
	fireInterval:300,
	//初始化
	init:function (){
		myPlane.ele = document.createElement("div");
		gameEngine.ele.appendChild(myPlane.ele);
		myPlane.ele.className = "my-plane";
		myPlane.ele.style.left = (gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth) / 2 + "px";
		myPlane.ele.style.bottom = 0;
		myPlane.drag();
		return this;
	},//注意+++++++++++++++++++++逗号没有会提示myPlane 未定义;
	
	//可以拖拽
	drag :function(){
		this.ele.onmousedown = function (e){
			var evt = e || event;
			var disX = evt.offsetX;
			var disY = evt.offsetY;
			
			document.onmousemove = function (e){
				var evt = e || event;
			    var x = evt.clientX - gameEngine.ele.offsetLeft - disX;
			    if(x<=0){
			    	x=0;
			    }else if(x>gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth){

                    x =gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth
			    }
			    myPlane.ele.style.left = x + "px";
			    myPlane.ele.style.top = evt.clientY - disY + "px";
			}
			document.onmouseup = function(){
				document.onmousemove = null;
				document.onmouseup = null;
			}
		}
	},
	//发射子弹
	fire: function(){
		this.timer = setInterval(function(){
			//创建子弹对象
			var bullet = new Bullet();
			bullet.init().move();
			
		}, this.fireInterval);
	},
	//飞机爆炸
	boom:function (callBack){
		//先停止发射子弹
		clearInterval(this.timer);
		
		var index = 1;
		var dieTimer = setInterval(function(){
			if(index > 4){
				clearInterval(dieTimer);
				gameEngine.ele.removeChild(myPlane.ele);
				callBack();
			}
			else{
				myPlane.ele.style.background = "url(images/me_die" + (index++) + ".png) no-repeat";
			}
		}, 100);
	}
}

