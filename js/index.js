window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };
  function startGame() {



    const canvas = document.querySelector(`#canvas`);
    const ctx = canvas.getContext("2d");


    //IMAGES
    let img = new Image();
    img.src = './images/road.png';
    img.onload = function () {
      ctx.drawImage(img, 0, 0, 500, 700)
    }

    let carImg = new Image();
    carImg.src = './images/car.png';


    //Declaring Car
    let car = {
      x: 220,
      y: 550,
      h: 100,
      w: 60,

      draw: function () {
        ctx.drawImage(carImg, this.x, this.y, this.w, this.h)
      }
    }

    //Moving Car
    window.onkeydown = function (e) {
      console.log(e.key)
      if (e.key === 'ArrowLeft') {
        if (car.x > 0) {
          car.x -= 15
        }
      }
      if (e.key === 'ArrowRight') {
        if (car.x < 440) {
          car.x += 15
        }
      }
    }



    function detectCollision(rect1, rect2) {
      if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y) {
        // collision detected!
        console.log("COLLISION")
        cancelAnimationFrame(gameInt)
        alert("GAME OVER NOOB")
      }
    }

    //Declaring Obstacles
    class Obstacle {
      constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255}`

      }
      draw = () => {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h)
      }
      move = () => {
        this.y += 5;
      }
    }

    setInterval(function () {
      obstacles.push(new Obstacle(Math.random() * 450, 0, Math.random() * 200 + 50, 30))
      score += 1
    }, 1000)

    let obstacles = []


    ctx.font = "30px Arial";



    let gameInt = null;
    let score = 0;
    function animate() { //Your rendering engine 
      gameInt = requestAnimationFrame(animate) //Infinte loop
      ctx.clearRect(0, 0, 500, 700) //Flip to a new page >> clear canvas
      ctx.drawImage(img, 0, 0, 500, 700)

      ctx.fillText(score, 10, 30, 50, 00)
      car.draw()

      obstacles.forEach(eachObstacle => {
        eachObstacle.move()
        eachObstacle.draw()
        detectCollision(car, eachObstacle)
      })
    }

    animate()


  }
};
