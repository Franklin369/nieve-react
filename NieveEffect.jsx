import { useEffect } from 'react';

export const NieveEffect = ({canvasRef}) => {
  
  let flakes = [];
  let mX = -100;
  let mY = -100;

  const reset = (flake) => {
    flake.x = Math.floor(Math.random() * window.innerWidth);
    flake.y = 0;
    flake.size = (Math.random() * 3) + 2;
    flake.speed = (Math.random() * 1) + 0.3;
    flake.velY = flake.speed;
    flake.velX = 2;
    flake.opacity = (Math.random() * 0.5) + 0.3;
  };

  const snow = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < flakes.length; i++) {
      let flake = flakes[i];
      let x = mX;
      let y = mY;
      let minDist = 150;
      let x2 = flake.x;
      let y2 = flake.y;

      let dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y));
      let dx = x2 - x;
      let dy = y2 - y;
     

      if (dist < minDist) {
        let force = minDist / (dist * dist);
        let xcomp = (x - x2) / dist;
        let ycomp = (y - y2) / dist;
        let deltaV = force / 2;

        flake.velX -= deltaV * xcomp;
        flake.velY -= deltaV * ycomp;
      } else {
        flake.velX *= .98;
        if (flake.velY <= flake.speed) {
          flake.velY = flake.speed
        }
        flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
      }

      ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
      flake.y += flake.velY;
      flake.x += flake.velX;

      if (flake.y >= canvas.height || flake.y <= 0) {
        reset(flake);
      }

      if (flake.x >= canvas.width || flake.x <= 0) {
        reset(flake);
      }

      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(snow);
  };

  const init = () => {
    for (let i = 0; i < 400; i++) {
      let x = Math.floor(Math.random() * window.innerWidth);
      let y = Math.floor(Math.random() * window.innerHeight);
      let size = (Math.random() * 3) + 2;
      let speed = (Math.random() * 10) + 0.5;
      let opacity = (Math.random() * 0.5) + 0.3;

      flakes.push({
        speed: speed,
        velY: speed,
        velX: 0,
        x: x,
        y: y,
        size: size,
        stepSize: (Math.random()) / 30,
        step: 0,
        opacity: opacity
      });
    }

    snow();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleMouseMove = (e) => {
      mX = e.clientX;
      mY = e.clientY;
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    init();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};


