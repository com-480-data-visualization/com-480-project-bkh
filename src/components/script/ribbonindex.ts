import * as d3 from "d3";

const cos = Math.cos;
const sin = Math.sin;
const pi = Math.PI;
const halfPi = pi / 2;
const tau = pi * 2;
const max = Math.max;
const range = d3.range;
const path = d3.path;
const slice = Array.prototype.slice;

const constant = function(x: any) {
  return function() {
    return x;
  };
};

function defaultSource(d: any) {
  return d.source;
}

function defaultTarget(d: any) {
  return d.target;
}

function defaultRadius(d: any) {
  console.log(d);
  return d.radius;
}

function defaultStartAngle(d: any) {
  return d.startAngle;
}

function defaultEndAngle(d: any) {
  return d.endAngle;
}

export function customeRibbon() {
  let source: any = defaultSource,
    target: any = defaultTarget,
    radius: any = defaultRadius,
    startAngle: any = defaultStartAngle,
    endAngle: any = defaultEndAngle,
    context: any = null;

  const ribbon = (...args: any) => {
    // console.log(args);
    let buffer: any = null;
    const argv = slice.call(args);
    // console.log(argv);

    const s = source(argv[0]);

    const t = target(argv[0]),
      sr = +radius(((argv[0] = s), argv)),
      sa0 = startAngle(argv[0]) - halfPi,
      sa1 = endAngle(argv[0]) - halfPi,
      sx0 = sr * cos(sa0),
      sy0 = sr * sin(sa0),
      sx1 = sr * cos(sa1),
      sy1 = sr * sin(sa1),
      tx0 = t.x,
      ty0 = t.y,
      my0 = (sy0 + ty0) / 2,
      my1 = (sy1 + ty0) / 2;

    // console.log(argv)
    // console.log(s)
    // console.log(t)
    // console.log((argv[0] = s, argv))
    // console.log(sr)
    // console.log(sa0)
    // console.log(sa1)
    // console.log(sx0)
    // console.log(sy0)
    // console.log(tx0)
    // console.log(ty0)

    if (context == null) {
      buffer = path();
      context = buffer;
    }
    if (sa0 == sa1) context.moveTo(sx0, sy0);
    else {
      context.moveTo(sx0, sy0);
      context.bezierCurveTo(sx0, my0, tx0, my0, tx0, ty0);
      context.lineTo(tx0, ty0);
      context.bezierCurveTo(tx0, my1, sx1, my1, sx1, sy1);
      context.arc(0, 0, sr, sa1, sa0, 1);
      context.closePath();
    }

    // context.moveTo(sx0, sy0);
    // context.arc(0, 0, sr, sa0, sa1);

    // context.bezierCurveTo(sx1, my1, tx0, my1, tx0, ty0);
    // context.bezierCurveTo(tx0, my0, sx0, my0, sx0, sy0);
    // context.closePath();

    if (buffer) return (context = null), buffer + "" || null;
  };

  ribbon.radius = function(_: any) {
    return arguments.length
      ? ((radius = typeof _ === "function" ? _ : constant(+_)), ribbon)
      : radius;
  };

  ribbon.startAngle = function(_: any) {
    return arguments.length
      ? ((startAngle = typeof _ === "function" ? _ : constant(+_)), ribbon)
      : startAngle;
  };

  ribbon.endAngle = function(_: any) {
    return arguments.length
      ? ((endAngle = typeof _ === "function" ? _ : constant(+_)), ribbon)
      : endAngle;
  };

  ribbon.source = function(_: any) {
    return arguments.length ? ((source = _), ribbon) : source;
  };

  ribbon.target = function(_: any) {
    return arguments.length ? ((target = _), ribbon) : target;
  };

  ribbon.context = function(_: any) {
    return arguments.length
      ? ((context = _ == null ? null : _), ribbon)
      : context;
  };
  console.log(ribbon);
  return ribbon;
}
