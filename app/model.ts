// From the orginal python spec. Some of these formulas look incorrect.

// Constants
const g = 9.81; // m/s^2

interface Results {
  horizontal_distance: number;
  velocity: number;
  kinetic_energy: number;
}

// TODO correct these calculations and separate out to logical methods
function do_calculation(
  h0: number,
  v0: number,
  wind_speed_knots: number,
  air_density: number,
  object_mass: number,
  object_area: number,
  drag_coefficient: number
): Results {
  // Convert wind speed from knots to m/s
  const wind_speed = wind_speed_knots * 0.514444;

  // Calculate time of flight
  const t_f = Math.sqrt((2 * h0) / g);

  // Calculate acceleration due to gravity
  const a_gravity = -g;

  // Calculate drag force
  function a_drag(v: number) {
    return (
      (-0.5 *
        air_density *
        object_area *
        drag_coefficient *
        (v - wind_speed) *
        Math.abs(v - wind_speed)) /
      object_mass
    );
  }

  // Calculate horizontal acceleration
  const a_x =
    a_drag(v0) * Math.cos(Math.atan((v0 - wind_speed) / (t_f * a_gravity)));

  // Calculate final position and velocity using numerical integration
  const dt = 0.01;
  let t = 0;
  let x = 0;
  let y = h0;
  let v_x = v0 * Math.cos(Math.atan((v0 - wind_speed) / (t_f * a_gravity)));
  let v_y = v0 * Math.sin(Math.atan((v0 - wind_speed) / (t_f * a_gravity)));
  while (y > 0) {
    let a_x =
      a_drag(Math.sqrt(v_x ** 2 + v_y ** 2)) *
      Math.cos(Math.atan((v_y - wind_speed) / Math.abs(v_x)));
    let a_y =
      a_gravity +
      a_drag(Math.sqrt(v_x ** 2 + v_y ** 2)) *
        Math.sin(Math.atan((v_y - wind_speed) / Math.abs(v_x)));
    v_x += a_x * dt;
    v_y += a_y * dt;
    x += v_x * dt;
    y += v_y * dt;
    t += dt;
  }

  // Calculate final kinetic energy
  const kinetic_energy = 0.5 * object_mass * (v_x ** 2 + v_y ** 2);

  return {
    horizontal_distance: x,
    velocity: Math.sqrt(v_x ** 2 + v_y ** 2),
    kinetic_energy: kinetic_energy,
  };
}

export { do_calculation };
export type { Results };
