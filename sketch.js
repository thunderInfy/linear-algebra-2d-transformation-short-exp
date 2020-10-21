let rad;

function createFig(x, orig=true){
	stroke(0);
	noFill();
  	
  	let center = {
  		x: x,
  		y: height/2
  	};

  	let len = height/4;

  	push();
  	translate(center.x, center.y);
  	line(0,-len,0,len);
  	line(-len,0,len,0);

  	if(orig){
  		ellipse(0,0,rad*2,rad*2);
  		stroke(0,0,255);
		strokeWeight(6);
		point(rad, 0);
		stroke(255,0,0);
		point(0,-rad);
  	}
  	else{

  	}


  	pop();
}

function inputs(str,y){
	let inp = createInput('');
	let p1 = createP(str);
	p1.position(width/2-100,y-15);
	inp.position(width/2-50, y);
	inp.size(100);
	return inp;
}

let inps = [];
let A, check, out;

function setup() {
	// put setup code here

	createCanvas(windowWidth, windowHeight);
	rad = height/8;

	inps.push(inputs('a00 = ',0));
	inps.push(inputs('a01 = ',30));
	inps.push(inputs('a10 = ',60));
	inps.push(inputs('a11 = ',90));	

	let button1 = createButton('submit');
	button1.position(width/2 - 40, 130);
	button1.mousePressed(processing);

	let button2 = createButton('choose randomly');
	button2.position(width/2 - 70, 170);	
	button2.mousePressed(random_proc);

	check = createCheckbox();
	let checkp = createP('normalize matrix values');
	checkp.position(width/2-180, 193);
	check.position(width/2 - 20, 210);

	createFig(width/4);	
	createFig(3*width/4, false);

	out = createP('');
	out.position(width/2-20,3*height/4);
}

function transformation(x,y){
	let rx, ry;
	rx = A[0][0]*x + A[0][1]*y;
	ry = A[1][0]*x + A[1][1]*y;
	let res = [];
	res.push(rx);
	res.push(ry);
	return res;
}

function output(){
	background(255);
	createFig(width/4);	
	createFig(3*width/4, false);

	stroke(0);
	noFill();
	beginShape();
	for(let theta = 0; theta<2*PI; theta+=PI/100){
		let x = rad*cos(theta);
		let y = rad*sin(theta);
		let res = transformation(x,y);
		console.log(theta);
		if(theta==0){
			stroke(0,0,255);
			strokeWeight(6);
			point(3*width/4+res[0], height/2-res[1]);
		}
		else if(abs(theta-PI/2)<pow(10,-5)){
			stroke(255,0,0);
			strokeWeight(6);
			point(3*width/4+res[0], height/2-res[1]);
		}
		else{
			stroke(0);
			strokeWeight(1);
		}
		vertex(3*width/4+res[0], height/2-res[1]);
	}
	endShape(CLOSE);
	out.html('a00 = '+str(A[0][0]) + '<br>'+ 'a01 = '+str(A[0][1]) + '<br>' + 'a10 = '+str(A[1][0]) + '<br>'+ 'a11 = '+str(A[1][1]));
}

function normalize(a,b,c,d){
	res = [];
	if(check.checked()){
		let norm = sqrt(pow(a,2)+pow(b,2)+pow(c,2)+pow(d,2))/sqrt(2);
		a = a/norm;
		b = b/norm;
		c = c/norm;
		d = d/norm;
	}
	res.push(a);
	res.push(b);
	res.push(c);
	res.push(d);
	return res;
}

function processing(){
	A = [[],[]];
	let a,b,c,d;
	a = eval(inps[0].value());
	b = eval(inps[1].value());
	c = eval(inps[2].value());
	d = eval(inps[3].value());

	let res = normalize(a,b,c,d);
	a = res[0];
	b = res[1];
	c = res[2];
	d = res[3];

	A[0].push(a);
	A[0].push(b);
	A[1].push(c);
	A[1].push(d);
	output();
}

function random_proc(){
	A = [[],[]];
	let res = normalize(random(-1,1),random(-1,1),random(-1,1),random(-1,1));
	a = res[0];
	b = res[1];
	c = res[2];
	d = res[3];

	A[0].push(a);
	A[0].push(b);
	A[1].push(c);
	A[1].push(d);
	output();
}
