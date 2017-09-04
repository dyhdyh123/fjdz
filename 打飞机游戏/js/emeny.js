




//敌军
function Emeny(type){
	//属性  :节点 血量 速度 
	this.ele = document.createElement("div");
	
	this.id = parseInt(Math.random()*1000000);
	this.hp = 1;
	this.speed = 10;
	this.score = 0;//分数
	this.dieImgs = [];//保存爆炸时候的图片 数组
	//初始化
	this.init = function (){
		switch (type){
			case this.Emeny_Type_Large://大飞机
			     this.ele.className = "emeny-large";//class名
			     this.speed = this.Emeny_Speed_Large;//速度
			     this.hp = this.Emeny_Hp_Large;//血量
			     this.dieImgs = ["images/plane3_die1.png", "images/plane3_die2.png", "images/plane3_die3.png", "images/plane3_die4.png", "images/plane3_die5.png", "images/plane3_die6.png"];
			     this.score = 50;
			     break;
			case this.Emeny_Type_Middle://中飞机
			     this.ele.className = "emeny-middle";
			     this.speed = this.Emeny_Speed_Middle;
			     this.hp = this.Emeny_Hp_Middle;
			     this.dieImgs = ["images/plane2_die1.png", "images/plane2_die2.png", "images/plane2_die3.png", "images/plane2_die4.png"];
			     this.score = 30
			     break;
			case this.Emeny_Type_Small://小飞机
			     this.ele.className = "emeny-small";
			     this.speed = this.Emeny_Speed_Small;
			     this.hp = this.Emeny_Hp_Small;
			     this.dieImgs = ["images/plane1_die1.png", "images/plane1_die2.png", "images/plane1_die3.png"];
			     this.score = 10;
			     break;     
			     
		}
		gameEngine.ele.appendChild(this.ele);
		gameEngine.allEmeny[this.id] = this;
		this.ele.style.left = Math.random()*(gameEngine.ele.offsetWidth - this.ele.offsetWidth)+"px";
		this.ele.style.top = -this.ele.offsetHeight + "px";
		return this;
	}
	
	this.move = function (){
		var that = this;
		this.timer = setInterval(function (){
						//如果超出了下边界, 则停止定时器, 删除敌机   并删除all对象中的敌机
			if(that.ele.offsetTop>gameEngine.ele.offsetHeight){
				clearInterval(this.timer);
				gameEngine.ele.removeChild(that.ele);
				
				delete gameEngine.allEmeny[this.id];//删除all对象中的敌机
			}
			that.ele.style.top = that.ele.offsetTop + that.speed +"px";
		},50);
	}
    //掉血
	this.hurt = function (){
		this.hp--;
		if(this.hp ==0){
			this.boom();//敌机爆炸
			
			//分数累加
			gameEngine.scoreNode.innerHTML = gameEngine.scoreNode.innerHTML-0 + this.score;
		}
	}
	
	
	//敌机爆炸
	this.boom = function (){
		//先清除之前的定时器  不让移动
		clearInterval(this.timer);
		var that = this;
		//然后爆炸动画
		var index = 0;
		var dieTimer = setInterval(function(){
			if(index>= that.dieImgs.length){
				clearInterval(dieTimer);
				gameEngine.ele.removeChild(that.ele);//删除节点
				
				delete gameEngine.allEmeny[this.id];
			}
			else{
				that.ele.style.background = "url(" + that.dieImgs[index++] + ") no-repeat";
			}	
		}, 80);
	}
}


//用原型添加属性
Emeny.prototype = {
	Emeny_Type_Large:1,//大飞机
	Emeny_Type_Middle:2,//中飞机
	Emeny_Type_Small:3,//小飞机
	
	Emeny_Hp_Large:8,
	Emeny_Hp_Middle:4,
	Emeny_Hp_Small:1,
	
	Emeny_Speed_Large:2,
	Emeny_Speed_Middle:4,
	Emeny_Speed_Small:8,
	

}
