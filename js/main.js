
    var canvas = document.getElementById("theCanvas");


    canvas.width = window.innerWidth - 2;
    canvas.height = window.innerHeight - 250;
    var c = canvas.getContext("2d");

    var score = 0;
    var out = 0;
    var end = new Date;

    var mouse = {
        x: null,
        y: null
    }

    var click = {
        x: undefined,
        y: undefined,
        count: 0
    }

    var clear = false;

    var start = new Date;
    var now = new Date;

    // canvas.addEventListener("mousemove", function(e) {
    //     mouse.x = e.x;
    //     mouse.y = e.y;
    // });

    // canvas.addEventListener("mouseout", function(e) {
    //     mouse.x = 20000;
    //     mouse.y = 20000;
    // });

    canvas.addEventListener("mousedown", function(e) {
        click.x = e.x;
        click.y = e.y;
        click.count++
    });

    canvas.addEventListener("mouseup", function(e) {
        click.x = 20000;
        click.y = 20000;
    });

    function Circle(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
        this.maxRadius = 40;
        this.minRadius = radius;
    };

    Circle.prototype.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.strokeStyle = this.color;
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
    };


    Circle.prototype.delete = function() {
         if (click.x - this.x < this.radius && click.y - this.y < this.radius
            && click.x - this.x > -this.radius && click.y - this.y > -this.radius) {
            this.x = -100;
            this.x = -100;
            this.dx = 0;
            this.dy = 0;
            score++;
            // c.font = "20px Verdana";
            // c.fillStyle = "#999";
            // c.fillText("Score: " + score, 10, 50 );
            end = new Date;
        }
        //circleArray.push(new Circle(this.x, this.y, this.dx, this.dy, this.radius, this.color));
    };

    Circle.prototype.update = function() {
        //bounce off walls
        if(this.x - this.radius < 0) {
                this.dx = -this.dx;
        };
        if (this.y > canvas.height - this.radius
            || this.y - this.radius < 0) {
                this.dy = -this.dy;
        };
        this.x += this.dx;
        this.y += this.dy;


        if(this.x + this.radius > canvas.width - canvas.width / 4) {
            this.color = this.color.replace(/[0-9]\.[0-9]/i, "1" );
            if (this.x + this.radius > canvas.width - canvas.width / 8) {
                this.color = "red";
                if (this.x + this.radius > canvas.width) {
                    this.x = 0;
                    this.y = -100;
                    end = new Date;
                    score--;
                    out++;
                }
            }
        }
        c.font = "20px Verdana";
        c.fillStyle = "#999";
        c.fillText("Score: " + score, 10, 50 );
        c.fillText("Clicks: " + click.count, 10, 20 );
        now = new Date;
        if(score + out*2 < circleArray.length) {
            c.fillText("Time: " + (now - start) / 1000, 10, 80 );
        } else {
            c.fillText("Time: " + (end - start) / 1000, 10, 80 );
        };




        // if (mouse.x - this.x < 30 && mouse.x - this.x > -30
        //     && mouse.y - this.y < 30 && mouse.y - this.y > -30) {
        //     if (this.radius < this.maxRadius) {
        //         this.radius += 1;
        //         this.x = mouse.x;
        //         this.y = mouse.y;
        //     }
        // } else if (this.radius > this.minRadius) {
        //     this.radius -= 1;
        // };

        this.draw();
        this.delete();
    };


    function clearScore() {
        circleArray = [];
        score = 0;
        out = 0;
        clear = true;
        click.count = 0
        start = end = now;
    }

    function drawSpikes() {
        c.beginPath();
        c.moveTo(canvas.width,0);
        
        for(var i = 0; i< canvas.height; i+=20){
            c.lineTo(canvas.width - 10, i - 10);
            c.lineTo(canvas.width, i);
        };
        c.strokeStyle = "black";
        c.stroke();
        c.closePath();
    };


    var circleArray = [];
    

    function spawn (number) {
        for(var i = 0; i < number; i++) {
            var radius = Math.floor(Math.random() * 10 + 24),
            x = Math.floor(Math.random() * (canvas.width / 3 - radius * 2) + radius),
            y = Math.floor(Math.random() * (canvas.height - radius * 2) + radius),
            dx = (Math.random() - 0.5) * 2 + 2,
            dy = (Math.random() - 0.5) * 5,
            r = Math.floor(Math.random() * 255) + 1,
            g = Math.floor(Math.random() * 255) + 1,
            b = Math.floor(Math.random() * 255) + 1,
            alpha = (Math.floor(Math.random() * 10) / 10 + 0.1),
            color = "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
            circleArray.push(new Circle(x, y, dx, dy, radius, color));
        };
        if (clear) {
            clear = false;
            start = new Date;
        }
    };
    spawn(25);
    

    function animate() {
        requestAnimationFrame(animate);

        c.clearRect(0, 0, canvas.width, canvas.height);

        for(var i = 0; i < circleArray.length; i++) {
            circleArray[i].update();
        };
        drawSpikes();
    };

    animate();
