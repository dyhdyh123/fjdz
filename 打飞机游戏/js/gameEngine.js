




//导演 游戏引擎
var gameEngine = {
	//属性
	ele:null,
	
	allBullet:{},//保存页面上所有的子弹  离开页面的子弹注意要记得删除       用于判断页面中是否有碰撞
	allEmeny:{},//保留页面上所有的敌机 离开页面的敌机要记得删除  用于判断页面中是否有碰撞  
	//方法
	//初始化
	init:function (){
		gameEngine.ele = document.getElementById("main");
		return this;
	},
	//开始游戏
	start:function (){
		console.log("开始游戏");
		//开始游戏后 加载动画  调用下面的函数;
		gameEngine.loading(function(){
			console.log("加载完成,进入游戏主页面");
			myPlane.init().fire();//创建飞机
			
			gameEngine.listenKeybord();//键盘监听
			
			gameEngine.createEmeny();//创建敌机
			
			gameEngine.moveBackground();//背景移动
			
			gameEngine.crashListening();//碰撞检测
			
			gameEngine.createScoreNode();//计算分数
		});
	},
	//加载动画
	loading:function (callBack){
		var logoNode = document.createElement("div");
		logoNode.className = "logo";
		gameEngine.ele.appendChild(logoNode);
		var logoPlane = document.createElement("div");
		logoPlane.className = "logo-plane";
		gameEngine.ele.appendChild(logoPlane);
		
		var index = 1;
		var timer = setInterval(function(){
			if(index >=6){
				clearInterval(timer);
				gameEngine.ele.removeChild(logoNode);
				gameEngine.ele.removeChild(logoPlane);
				console.log("加载结束");
				
				callBack();
			}
			else{
				logoPlane.style.background = " url(images/loading" + (index%3+1) +".png) no-repeat";
			    index ++;
			}
			
		},500);
	},
    
    //键盘监听
    listenKeybord : function (){
    	//键盘方向键按下
    	var speed = 0;
    	window.onkeydown = function (e){
    		var evt = e || event;
    		var keyCode = evt.keyCode;
    		if(keyCode == 37){
    			speed = -10;
    		}else if(keyCode ==39){
    			speed = 10;
    		}
    	}
    	window.onkeyup = function(){
    		speed = 0;
    	}
    	setInterval(function(){
    		var x =  myPlane.ele.offsetLeft +speed;
    		if(x<=0){
    			x=0;
    		}
    		else if(x >= gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth){
    			x = gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth;
    		}
    	   myPlane.ele.style.left = x + "px";
    	},50);
    },
    //创建敌机   注意++++++++++写完函数记得调用
    createEmeny:function (){

    	var timer1 = setInterval(function(){
//  	alert(1);
    		
    		var flag = Math.random()> 0.7?true:false;
    		if(flag){
	    		var largeEmeny = new Emeny(Emeny.prototype.Emeny_Type_Large);
	    		largeEmeny.init().move();
    		}
    	}, 6000);//创建大飞机
    	var timer2 = setInterval(function(){
//  		alert(2);
    		var flag = Math.random()> 0.7?true:false;
    		if(flag){
	    		var middleEmeny = new Emeny(Emeny.prototype.Emeny_Type_Middle);
	    		middleEmeny.init().move();
    		}
    	}, 1000);//创建中飞机
    	var timer3 = setInterval(function(){
    		var flag = Math.random()> 0.5?true:false;
    		if(flag){
	    		var smallEmeny = new Emeny(Emeny.prototype.Emeny_Type_Small);
	    		smallEmeny.init().move();
    		}
    	}, 500);//创建小飞机
    },
    
    //移动背景
    moveBackground:function(){
    	var y = 0;
    	setInterval(function(){
    		gameEngine.ele.style.backgroundPositionY = y++ + "px";
    	},30);
    },
    
    //碰撞检测
    crashListening :function (){//需要定时器时时监控
    	var isGameOver= false;
    	setInterval(function(){//需要遍历所有的all对象
    		for(var i in gameEngine.allEmeny){
	    		for(var j in gameEngine.allBullet){
    				if ( isCrash(gameEngine.allBullet[j].ele, gameEngine.allEmeny[i].ele) ){
//						console.log("发生了碰撞");	
						//子弹爆炸
					    gameEngine.allBullet[j].boom();
					    delete gameEngine.allBullet[j];
					    //敌机爆炸
					    gameEngine.allEmeny[i].hurt();
					}
    			}
	    		if(isGameOver == false && isCrash( myPlane.ele,gameEngine.allEmeny[i].ele)){
	    			isGameOver = true;
	    			myPlane.boom(function(){
	    				alert("游戏结束");
		    			//刷新游戏
		    			location.reload();	
	    			});

	    		}
    		}
    	},30);
    },
    
    //分数
    createScoreNode:function (){
    	this.scoreNode = document.createElement("div");
    	gameEngine.ele.appendChild(this.scoreNode);
    	this.scoreNode.className = "score";
    	this.scoreNode.innerHTML = "0";
    }
    
}
