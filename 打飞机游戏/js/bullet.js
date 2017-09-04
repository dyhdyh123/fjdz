



//子弹
//构建函数(类)
function Bullet(){
	this.ele = document.createElement("div");
//	alert(1);
    this.id = parseInt(Math.random()*1000000);//给创建的子弹随机的id
	this.init =function (){
		gameEngine.ele.appendChild(this.ele);
		
		gameEngine.allBullet[this.id] = this;//将新创建的子弹对象添加到allBullet中;this.id为all中的属性;this为all中的属性值;
//		console.log(gameEngine.allBullet[this.id]);
		this.ele.className = "bullet";
		this.ele.style.left = myPlane.ele.offsetLeft + myPlane.ele.offsetWidth/2 -this.ele.offsetWidth/2 + "px";
		this.ele.style.top = myPlane.ele.offsetTop - this.ele.offsetHeight+ "px";
		return this;
	};
	//子弹移动
	this.move = function (){
		var that = this;
		this.timer = setInterval(function (){
			//如果超出上边界, 则把子弹移除,并停止定时器  把all中的也删除掉
			if(that.ele.offsetTop< -18){
				clearInterval(this.timer);
				gameEngine.ele.removeChild(that.ele);
				
				delete gameEngine.allBullet[this.id];  //把all中的也删除掉   删除对象需要delete;
			}
			else{
				that.ele.style.top = that.ele.offsetTop - 10 +"px";
			}
		},50);
	};
	
	//子弹爆炸
	this.boom = function(){
		//先停止移动
		clearInterval(this.timer);
		
		//子弹爆炸
		this.ele.className = "bullet-boom"; //先改成子弹爆炸的第一张图
		var index = 1;
		var that = this; 
		var dieTimer = setInterval(function(){
			//如果爆炸动画完成, 则清除定时器, 移除子弹
			if (index > 2){
				clearInterval(dieTimer); 
				that.ele.parentNode.removeChild(that.ele);
			}
			else {
				that.ele.style.background = "url(images/die"+ index +".png) no-repeat";
				index++;
			}
		}, 100);
	}
}
