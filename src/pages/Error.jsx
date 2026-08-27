import { useEffect, useRef } from "react";
// import "./styles/astronaut.css";

export default function Error() {
  const visorRef = useRef(null);
  const cordRef = useRef(null);

  useEffect(() => {
    // ===== Visor =====
    const visor = visorRef.current;
    const vctx = visor.getContext("2d");

    vctx.beginPath();
    vctx.moveTo(5, 45);
    vctx.bezierCurveTo(15, 64, 45, 64, 55, 45);
    vctx.lineTo(55, 20);
    vctx.bezierCurveTo(55, 15, 50, 10, 45, 10);
    vctx.lineTo(15, 10);
    vctx.bezierCurveTo(15, 10, 5, 10, 5, 20);
    vctx.lineTo(5, 45);
    vctx.fillStyle = "#2f3640";
    vctx.strokeStyle = "#f5f6fa";
    vctx.fill();
    vctx.stroke();

    // ===== Cord =====
    const canvas = cordRef.current;
    const ctx = canvas.getContext("2d");

    let y1 = 160;
    let y2 = 100;
    let y3 = 100;

    let y1Forward = true;
    let y2Forward = false;
    let y3Forward = true;

    const animate = () => {
      ctx.clearRect(0, 0, 500, 500);

      ctx.beginPath();
      ctx.moveTo(130, 170);
      ctx.bezierCurveTo(250, y1, 345, y2, 400, y3);

      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 8;
      ctx.stroke();

      if (y1 <= 100) y1Forward = true;
      if (y1 >= 300) y1Forward = false;

      if (y2 <= 100) y2Forward = true;
      if (y2 >= 310) y2Forward = false;

      if (y3 <= 100) y3Forward = true;
      if (y3 >= 317) y3Forward = false;

      y1 += y1Forward ? 1 : -1;
      y2 += y2Forward ? 1 : -1;
      y3 += y3Forward ? 1 : -1;

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-r from-[#2f3640] to-[#181b20]">

      {/* Moon */}
      <div className="moon" />
      <div className="moon__crater moon__crater1" />
      <div className="moon__crater moon__crater2" />
      <div className="moon__crater moon__crater3" />

      {/* Stars */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className={`star star${i}`} />
      ))}

      {/* Left */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 lg:left-24">
        <h1 className="text-8xl lg:text-[180px] font-black text-slate-700">
          404
        </h1>

        <h2 className="mt-2 text-3xl font-bold text-slate-500">
          Hmmm...
        </h2>

        <p className="mt-4 max-w-md text-slate-400">
          It looks like one of the developers fell asleep.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="rounded-full bg-orange-500 px-8 py-3 text-white transition hover:scale-105">
            LOGIN
          </button>

          <button className="rounded-full border border-slate-600 px-8 py-3 text-slate-300 transition hover:bg-slate-700">
            CONTACT
          </button>
        </div>
      </div>

      {/* Astronaut */}
      <div className="astronaut">
        <div className="astronaut__backpack"></div>
        <div className="astronaut__body"></div>
        <div className="astronaut__body__chest"></div>

        <div className="astronaut__arm-left1"></div>
        <div className="astronaut__arm-left2"></div>

        <div className="astronaut__arm-right1"></div>
        <div className="astronaut__arm-right2"></div>

        <div className="astronaut__arm-thumb-left"></div>
        <div className="astronaut__arm-thumb-right"></div>

        <div className="astronaut__leg-left"></div>
        <div className="astronaut__leg-right"></div>

        <div className="astronaut__foot-left"></div>
        <div className="astronaut__foot-right"></div>

        <div className="astronaut__wrist-left"></div>
        <div className="astronaut__wrist-right"></div>

        <canvas
          ref={cordRef}
          width={500}
          height={500}
          className="absolute -left-40 -top-32"
        />

        <div className="astronaut__head">
          <canvas ref={visorRef} width={60} height={60} />
          <div className="astronaut__head-visor-flare1"></div>
          <div className="astronaut__head-visor-flare2"></div>
        </div>
      </div>
    </div>
  );
}