import React from 'react';
import {AbsoluteFill, useCurrentFrame, spring, interpolate} from 'remotion';

const W = 1920, H = 1080, cx = W / 2, cy = H / 2;

export const AxiomLattice = () => {
  const f = useCurrentFrame();
  const rot = f * 0.01;
  const pulseIndex = Math.floor((f / 4) % 90);
  const nodes = Array.from({length: 90}, (_, i) => {
    const a = (i / 90) * Math.PI * 2;
    const r = 160 + (i % 6) * 52;
    return {
      x: cx + Math.cos(a + rot) * r,
      y: cy + Math.sin(a * 1.2 + rot * 1.5) * (r * 0.56),
      z: Math.sin(a * 2 + rot) * 0.5 + 0.5,
    };
  });

  const lines = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j <= i + 3 && j < nodes.length; j++) {
      lines.push({a: nodes[i], b: nodes[j], k: `${i}-${j}`});
    }
  }

  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #122042 0%, #04070d 70%)'}}>
      <svg width={W} height={H}>
        {lines.map((l) => (
          <line key={l.k} x1={l.a.x} y1={l.a.y} x2={l.b.x} y2={l.b.y} stroke={`rgba(130,190,255,${0.08 + l.a.z * 0.14})`} strokeWidth="1" />
        ))}
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={2 + n.z * 3 + (i === pulseIndex ? 3 : 0)} fill={i === pulseIndex ? '#c6e4ff' : '#75a9ff'} />
        ))}
      </svg>
    </AbsoluteFill>
  );
};

export const ExtractionTheater = () => {
  const f = useCurrentFrame();
  const phase = interpolate(f, [0, 90, 180, 300], [0, 1, 1.4, 1]);
  const pull = spring({frame: f - 100, fps: 30, config: {damping: 12}});

  return (
    <AbsoluteFill style={{background: '#0b0e14', color: '#d9dee8', fontFamily: 'sans-serif'}}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{position: 'absolute', left: 220 + i * 120, top: 170 + i * 80, width: 980 - i * 120, height: 520 - i * 80, border: '1px solid rgba(180,200,220,0.35)', background: 'rgba(40,50,70,0.14)'}} />
      ))}
      <div style={{position: 'absolute', left: 390 - pull * 120, top: 250 - pull * 70, width: 640 + pull * 240, height: 360 + pull * 120, border: '2px solid rgba(255,180,70,0.9)', boxShadow: '0 0 30px rgba(255,180,70,0.25)'}} />
      {Array.from({length: 24}, (_, i) => (
        <div key={i} style={{position: 'absolute', left: 220, top: 130 + i * 40 + ((f * 6) % 40), width: 1480, height: 1, background: 'rgba(180,220,255,0.12)'}} />
      ))}
      <div style={{position: 'absolute', left: 700, top: 460, width: 520 * phase, height: 2, background: 'linear-gradient(90deg,#ffb347,#fff)'}} />
    </AbsoluteFill>
  );
};

export const MnemonicTides = () => {
  const f = useCurrentFrame();
  const wave = 1 + Math.sin(f * 0.05) * 0.04;
  const impulse = Math.max(0, (f - 70) / 150);
  const seeds = Array.from({length: 26}, (_, i) => {
    const a = i * 1.11;
    const r = 120 + (i % 8) * 75;
    return {x: cx + Math.cos(a) * r + Math.sin(f * 0.01 + i) * 20, y: cy + Math.sin(a * 1.4) * r * 0.5 + Math.cos(f * 0.009 + i) * 18};
  });

  const links = [];
  for (let i = 0; i < seeds.length; i++) {
    for (let j = i + 1; j < seeds.length; j++) {
      const s = seeds[i], m = seeds[j];
      const d1 = Math.hypot(s.x - cx, s.y - cy), d2 = Math.hypot(m.x - cx, m.y - cy);
      const active = impulse * 380 > Math.min(d1, d2) && Math.hypot(s.x - m.x, s.y - m.y) < 240;
      if (active) links.push({s, m, k: `${i}-${j}`});
    }
  }

  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 55%, #132722 0%, #06090b 70%)'}}>
      <svg width={W} height={H}>
        <ellipse cx={cx} cy={cy} rx={620 * wave} ry={300 * wave} fill="rgba(80,255,200,0.07)" stroke="rgba(120,255,220,0.18)" />
        {seeds.map((s, i) => {
          const d = Math.hypot(s.x - cx, s.y - cy);
          const active = impulse * 380 > d;
          return <circle key={i} cx={s.x} cy={s.y} r={active ? 5 : 3} fill={active ? '#8fffd6' : '#6bc8b0'} />;
        })}
        {links.map((l) => <line key={l.k} x1={l.s.x} y1={l.s.y} x2={l.m.x} y2={l.m.y} stroke="rgba(130,255,220,0.25)" strokeWidth="1.5" />)}
      </svg>
    </AbsoluteFill>
  );
};
