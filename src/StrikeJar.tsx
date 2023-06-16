import { useEffect, useRef } from "react";
import {
  Bodies,
  Composite,
  Engine,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
  World,
} from "matter-js";

type Props = {
  strikes: number;
};

const WIDTH = 300;
const HEIGHT = 400;

export function StrikeJar({ strikes }: Props) {
  const scene = useRef<HTMLDivElement>(null);
  const engine = useRef(Engine.create());
  const imageLoaded = useRef(false);

  useEffect(() => {
    const currentEngine = engine.current;
    const world = currentEngine.world;
    const render = Render.create({
      element: scene.current!,
      engine: currentEngine,
      options: {
        width: WIDTH,
        height: HEIGHT,
        wireframes: false,
        background: "transparent",
      },
    });

    const reena = new Image();
    reena.src = "images/reena.png";

    reena.onload = () => {
      if (imageLoaded.current) return;
      imageLoaded.current = true;
      for (let i = 0; i < strikes; i++) {
        const x = Math.floor(Math.random() * WIDTH);
        const y = Math.floor(Math.random() * 300);
        const radius = 25;
        World.add(
          world,
          Bodies.circle(x, y, radius, {
            render: {
              sprite: {
                texture: reena.src,
                xScale: (radius * 2) / reena.width,
                yScale: (radius * 2) / reena.height,
              },
            },
            density: 0.00005,
          })
        );
      }
    };

    Composite.add(world, [
      // walls
      Bodies.rectangle(WIDTH, 0, 20, 1000, { isStatic: true }), // right
      Bodies.rectangle(0, 0, 20, 1000, { isStatic: true }), // left
      Bodies.rectangle(0, HEIGHT, 1000, 20, { isStatic: true }), // bottom
    ]);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(currentEngine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2, // Adjust the stiffness of the constraint to control the dragging behavior
        render: {
          visible: false, // Set to true if you want to see the constraint's visual representation
        },
      },
    });
    World.add(world, mouseConstraint);

    Runner.run(currentEngine);
    Render.run(render);

    // unmount
    return () => {
      // destroy Matter
      Render.stop(render);
      World.clear(world, false);
      Engine.clear(currentEngine);
      render.canvas.remove();
      render.textures = {};
    };
  }, [strikes]);

  return (
    <div
      ref={scene}
      style={{
        width: `${WIDTH}px`,
        height: `${HEIGHT}px`,
      }}
    ></div>
  );
}
