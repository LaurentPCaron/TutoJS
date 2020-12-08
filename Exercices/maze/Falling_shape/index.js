//Doc
//https://brm.io/matter-js/docs/index.html

const {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  MouseConstraint,
  Mouse,
} = Matter;

//CONSTENTS
const WIDTH = 800;
const HEIGHT = 600;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine,
  options: {
    wireframes: false,
    width: WIDTH,
    height: HEIGHT,
  },
});
Render.run(render);
Runner.run(Runner.create(), engine);

World.add(
  world,
  MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas),
  })
);

// Those dank Walls

const walls = [
  Bodies.rectangle(WIDTH / 2, 0, WIDTH, 40, { isStatic: true }),
  Bodies.rectangle(WIDTH / 2, HEIGHT, WIDTH, 40, { isStatic: true }),
  Bodies.rectangle(0, HEIGHT / 2, 40, HEIGHT, { isStatic: true }),
  Bodies.rectangle(WIDTH, HEIGHT / 2, 40, HEIGHT, { isStatic: true }),
];
World.add(world, walls);

// Random shapes
for (let i = 0; i < 50; i++) {
  if (Math.random() > 0.5) {
    World.add(
      world,
      Bodies.circle(Math.random() * WIDTH, Math.random() * HEIGHT, 25)
    );
  } else {
    World.add(
      world,
      Bodies.rectangle(Math.random() * WIDTH, Math.random() * HEIGHT, 50, 50, {
        render: {
          fillStyle: 'green',
        },
      })
    );
  }
}
