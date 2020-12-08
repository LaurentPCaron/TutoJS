//Doc
//https://brm.io/matter-js/docs/index.html

const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

//CONSTENTS
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const CELLS_HORIZONTAL = 25;
const CELLS_VERTICAL = 20;
const WALL_THICKNESS = 6;
const UNIT_LENGTH_X = WIDTH / CELLS_HORIZONTAL;
const UNIT_LENGTH_Y = HEIGHT / CELLS_VERTICAL;
const BALL_RADIUS = Math.min(UNIT_LENGTH_X, UNIT_LENGTH_Y) * 0.25;
const SPEED_LIMIT = 5;

// ENGIEN STUFF
const engine = Engine.create();
engine.world.gravity.y = 0;
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

// Those dank Walls

const walls = [
  Bodies.rectangle(WIDTH / 2, 0, WIDTH, WALL_THICKNESS, { isStatic: true }),
  Bodies.rectangle(WIDTH / 2, HEIGHT, WIDTH, WALL_THICKNESS, {
    isStatic: true,
  }),
  Bodies.rectangle(0, HEIGHT / 2, WALL_THICKNESS, HEIGHT, {
    isStatic: true,
  }),
  Bodies.rectangle(WIDTH, HEIGHT / 2, WALL_THICKNESS, HEIGHT, {
    isStatic: true,
  }),
];
World.add(world, walls);

// Maze generation

const shuffle = arr => {
  let counter = arr.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }

  return arr;
};

const grid = Array(CELLS_VERTICAL)
  .fill(null)
  .map(() => Array(CELLS_HORIZONTAL).fill(false));

const verticals = Array(CELLS_VERTICAL)
  .fill(null)
  .map(() => Array(CELLS_HORIZONTAL - 1).fill(false));

const horizontals = Array(CELLS_VERTICAL - 1)
  .fill(null)
  .map(() => Array(CELLS_HORIZONTAL).fill(false));

//Starting cell
const startRow = Math.floor(Math.random() * CELLS_VERTICAL);
const startColumn = Math.floor(Math.random() * CELLS_HORIZONTAL);

const stepTroughCell = (row, column) => {
  //check if the cell was visited
  if (grid[row][column]) {
    return;
  }
  //set the cell as visited
  grid[row][column] = true;

  // get the neighbors randomly
  const neighbors = shuffle([
    [row - 1, column, 'up'],
    [row, column + 1, 'right'],
    [row + 1, column, 'down'],
    [row, column - 1, 'left'],
  ]);

  neighbors.forEach(neighbor => {
    const [nextRow, nextColumn, direction] = neighbor;

    if (
      nextRow < 0 ||
      nextRow >= CELLS_VERTICAL ||
      nextColumn < 0 ||
      nextColumn >= CELLS_HORIZONTAL
    ) {
      return;
    }
    if (grid[nextRow][nextColumn]) {
      return;
    }
    if (direction === 'left') {
      verticals[row][column - 1] = true;
    } else if (direction === 'right') {
      verticals[row][column] = true;
    } else if (direction === 'up') {
      horizontals[row - 1][column] = true;
    } else if (direction === 'down') {
      horizontals[row][column] = true;
    }

    stepTroughCell(nextRow, nextColumn);
  });
};

stepTroughCell(startRow, startColumn);

//Drawing walls

horizontals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }

    const wall = Bodies.rectangle(
      columnIndex * UNIT_LENGTH_X + UNIT_LENGTH_X / 2,
      rowIndex * UNIT_LENGTH_Y + UNIT_LENGTH_Y,
      UNIT_LENGTH_X,
      WALL_THICKNESS,
      {
        label: 'wall',
        isStatic: true,
        render: {
          fillStyle: 'red',
        },
      }
    );
    World.add(world, wall);
  });
});

verticals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }
    const wall = Bodies.rectangle(
      columnIndex * UNIT_LENGTH_X + UNIT_LENGTH_X,
      rowIndex * UNIT_LENGTH_Y + UNIT_LENGTH_Y / 2,
      WALL_THICKNESS,
      UNIT_LENGTH_Y,
      {
        label: 'wall',
        isStatic: true,
        render: {
          fillStyle: 'red',
        },
      }
    );
    World.add(world, wall);
  });
});

//GOAL
const goal = Bodies.rectangle(
  WIDTH - UNIT_LENGTH_X / 2,
  HEIGHT - UNIT_LENGTH_Y / 2,
  UNIT_LENGTH_X * 0.7,
  UNIT_LENGTH_Y * 0.7,
  {
    label: 'goal',
    isStatic: true,
    render: {
      fillStyle: 'green',
    },
  }
);
World.add(world, goal);

//BALLLLLLLLLLLLLLLLLLLLLLLLLLLL

const ball = Bodies.circle(UNIT_LENGTH_X / 2, UNIT_LENGTH_Y / 2, BALL_RADIUS, {
  label: 'ball',
  render: {
    fillStyle: 'blue',
  },
});

World.add(world, ball);

document.addEventListener('keydown', e => {
  const { x, y } = ball.velocity;
  if (e.key == 'a' && x > -SPEED_LIMIT) {
    Body.setVelocity(ball, { x: x - 5, y });
  } else if (e.key === 's' && y < SPEED_LIMIT) {
    Body.setVelocity(ball, { x, y: y + 5 });
  } else if (e.key === 'd' && x < SPEED_LIMIT) {
    Body.setVelocity(ball, { x: x + 5, y });
  } else if (e.key === 'w' && y > -SPEED_LIMIT) {
    Body.setVelocity(ball, { x, y: y - 5 });
  }
});

//Win Condition

Events.on(engine, 'collisionStart', e => {
  e.pairs.forEach(collision => {
    const LABELS = ['ball', 'goal'];
    if (
      LABELS.includes(collision.bodyA.label) &&
      LABELS.includes(collision.bodyB.label)
    ) {
      document.querySelector('.winner').classList.remove('hidden');
      world.gravity.y = 1;
      world.bodies.forEach(body => {
        if (body.label === 'wall') {
          Body.setStatic(body, false);
        }
      });
    }
  });
});
