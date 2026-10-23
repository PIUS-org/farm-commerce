/* 인터랙션 레이어 — 플로우 hover 미리보기(팝오버) · 클릭 상세 패널(드래그 리사이즈) · 상단 문서 바 · 복사 방지 */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDoc, ScreenWire, PinList, BlockScope, ScreenDef } from './kit.jsx';
import logoWhite from '../assets/pius-horizontal-white.png';

/* ── 플로우 hover 미리보기 ── */
export function Peek() {
  const { peek, byId } = useDoc();
  const inner = useRef(null);
  const [geo, setGeo] = useState(null);

  useLayoutEffect(() => {
    if (!peek) { setGeo(null); return; }
    const el = inner.current;
    const fw = el.offsetWidth || 270, fh = el.offsetHeight || 540;
    const sc = Math.min(190 / fw, 340 / fh);
    const bw = Math.ceil((fw + 12) * sc), bh = Math.ceil((fh + 6) * sc);
    const pw = bw + 22, ph = bh + 56;
    const r = peek.rect;
    let x = r.right + 14, y = r.top - 20;
    if (x + pw + 6 > innerWidth) x = r.left - pw - 8;
    if (x < 6) x = 6;
    y = Math.max(8, Math.min(y, innerHeight - ph - 8));
    setGeo({ sc, bw, bh, pw, x, y });
  }, [peek]);

  if (!peek || !byId[peek.id]) return null;
  const s = byId[peek.id];
  return (
    <div id="peek" style={geo ? { left: geo.x, top: geo.y, width: geo.pw } : { left: -9999, top: 0, visibility: 'hidden' }}>
      <div style={geo ? { width: geo.bw, height: geo.bh, overflow: 'hidden' } : undefined}>
        <div ref={inner} style={{ display: 'inline-block', padding: '6px 0 0 6px', transformOrigin: 'top left', transform: geo ? `scale(${geo.sc})` : 'none' }}>
          <BlockScope><ScreenWire s={s} noCap /></BlockScope>
        </div>
      </div>
      <div className="peek-cap">{s.no} {s.title} — 클릭하면 상세</div>
    </div>
  );
}

/* ── 상세 패널 ── */
const MINW = 520;
export function Drawer() {
  const doc = useDoc();
  const [shown, setShown] = useState(null); // 닫히는 애니메이션 동안 내용 유지
  const body = useRef(null);
  const right = useRef(null);
  const [zoom, setZoom] = useState(0.46);
  const sized = useRef(false);

  useEffect(() => { if (doc.active) setShown(doc.active); }, [doc.active]);

  const calcZoom = (w) => {
    w = w || document.getElementById('drawer').getBoundingClientRect().width;
    // 우측 설명에 최소 ~320px을 남기고 남는 폭으로 PC 프레임을 키운다. 좁은 패널(세로 스택)이면 전폭 사용
    setZoom(w <= 680 ? Math.min(1, (w - 90) / 656) : Math.max(0.35, Math.min(1, (w - 380) / 656)));
  };
  const setW = (px) => {
    const w = Math.max(MINW, Math.min(px, innerWidth * 0.94));
    document.documentElement.style.setProperty('--drawer-w', w + 'px');
    calcZoom(w);
  };

  useLayoutEffect(() => {
    if (!doc.active) return;
    // 처음 열 때: PC 프레임이 섞인 문서라 넓은 기본 폭으로
    if (!sized.current) { sized.current = true; setW(Math.min(innerWidth * 0.62, 1040)); } else calcZoom();
    // 이 화면에서 갈 수 있는 화면 전부 → 플로우에서 파랑 강조
    const ids = new Set();
    body.current.querySelectorAll('[data-go]').forEach((g) => ids.add(g.getAttribute('data-go')));
    ids.delete(doc.active);
    doc.setLinked(ids);
    if (right.current) right.current.scrollTop = 0;
  }, [doc.active, shown]);

  const startResize = (e) => {
    e.preventDefault();
    document.body.classList.add('d-resizing');
    const mv = (ev) => setW(innerWidth - ev.clientX);
    const up = () => { document.body.classList.remove('d-resizing'); removeEventListener('mousemove', mv); removeEventListener('mouseup', up); };
    addEventListener('mousemove', mv); addEventListener('mouseup', up);
  };

  const s = shown && doc.byId[shown];
  return (
    <aside id="drawer" role="dialog" aria-modal="true">
      <div id="d-resize" title="드래그해서 크기 조절" onMouseDown={startResize} />
      <div className="d-head">
        <div><b>{s ? `${s.no} ${s.title}` : ''}</b><span className="d-sub">화면 상세 · {s ? s.lane : ''}</span></div>
        <button className="d-close" aria-label="닫기" onClick={doc.close}>✕</button>
      </div>
      <div className="d-body" ref={body}>
        {s && (
          <BlockScope key={s.id}>
            <div className="d-left">
              <div style={s.frame === 'pc' ? { zoom } : undefined}><ScreenWire s={s} /></div>
            </div>
            <div className="d-right" ref={right}>
              <h3>구성 요소</h3>
              <PinList s={s} />
              <h3>화면 정의</h3>
              <ScreenDef s={s} withId={false} />
            </div>
          </BlockScope>
        )}
      </div>
    </aside>
  );
}

/* ── 상단 문서 바: 로고 + 버전 선택 ── */
export function DocsBar({ versions }) {
  const cur = new URL(location.href).searchParams.get('v') || versions[0].v;
  return (
    <div id="pius-docs-bar">
      <img src={logoWhite} alt="PiUS" draggable="false" />
      <select value={cur} onChange={(e) => { const u = new URL(location.href); u.searchParams.set('v', e.target.value); location.href = u.toString(); }}>
        {versions.map((x) => <option key={x.v} value={x.v}>{x.label}</option>)}
      </select>
    </div>
  );
}

/* ── 복사·인쇄·우클릭 방지 (고객 유출 방지용 가드) ── */
export function useGuard() {
  useEffect(() => {
    document.body.classList.add('guard');
    const stop = (e) => { e.preventDefault(); return false; };
    const isField = (t) => t && /^(INPUT|TEXTAREA)$/.test(t.tagName);
    const onCopy = (e) => { if (isField(e.target)) return; stop(e); };
    const onKey = (e) => {
      const k = (e.key || '').toLowerCase(), m = e.metaKey || e.ctrlKey;
      if ((m && ['s', 'p', 'u', 'a', 'c', 'x'].includes(k)) || (m && e.shiftKey && ['i', 'j', 'c', 's'].includes(k)) || e.key === 'F12' || e.key === 'PrintScreen') {
        if (isField(e.target) && ['a', 'c', 'x'].includes(k)) return;
        stop(e);
      }
    };
    const onPrint = () => { document.title = 'PiUS'; };
    document.addEventListener('contextmenu', stop);
    document.addEventListener('dragstart', stop);
    document.addEventListener('copy', onCopy);
    document.addEventListener('cut', stop);
    document.addEventListener('keydown', onKey);
    addEventListener('beforeprint', onPrint);
    return () => {
      document.body.classList.remove('guard');
      document.removeEventListener('contextmenu', stop);
      document.removeEventListener('dragstart', stop);
      document.removeEventListener('copy', onCopy);
      document.removeEventListener('cut', stop);
      document.removeEventListener('keydown', onKey);
      removeEventListener('beforeprint', onPrint);
    };
  }, []);
}
