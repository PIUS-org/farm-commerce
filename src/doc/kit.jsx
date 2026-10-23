/* 기획서 공통 부품 — 템플릿 v2의 인터랙션 규칙을 리액트로 옮긴 것.
   - 화면 키: 화면 번호 2.1 → "s21" (점 제거, s 접두)
   - <Go to="s22"/> : 이동 참조. hover → 02 플로우의 해당 화면 강조, 클릭 → 그 화면 상세 패널
   - <P n={1}/>     : 와이어프레임 번호 핀. 같은 블록의 번호 설명과 상호 하이라이트
   - <Prop/>        : "제안" 표시 — 요구사항 원문에 없거나 미팅에서 확정되지 않은 내용 */
import { createContext, useContext, useState } from 'react';

export const DocCtx = createContext(null);
export const useDoc = () => useContext(DocCtx);

export const BlockCtx = createContext({ hot: null, setHot: () => {} });

export const noOf = (id) => id.slice(1, 2) + '.' + id.slice(2);

/* 이동 참조 — block: 번호 설명 안의 줄 단위(→ 2.2 매장 상세), 기본: 문장 속 굵은 글씨 */
export function Go({ to, block, children }) {
  const doc = useDoc();
  const s = doc.byId[to];
  const label = children ?? (s ? `${s.no} ${s.title}` : to);
  const props = {
    className: 'go',
    'data-go': to,
    onClick: (e) => { e.stopPropagation(); doc.goScreen(to); },
    onMouseEnter: () => doc.setGlow(to),
    onMouseLeave: () => doc.setGlow(null),
  };
  if (block) return <span {...props}>→ {label}</span>;
  return <b {...props}>{label}</b>;
}

export function P({ n, l, style }) {
  const { hot, setHot } = useContext(BlockCtx);
  return (
    <i className={'pin' + (l ? ' l' : '') + (hot === n ? ' hot' : '')} style={style}
      onMouseEnter={() => setHot(n)} onMouseLeave={() => setHot(null)}>{n}</i>
  );
}

export const Prop = ({ children = '제안', lg }) => <em className={'prop' + (lg ? ' lg' : '')}>{children}</em>;
export const Req = ({ children = '요구사항' }) => <em className="req">{children}</em>;

/* 프레임 */
export function Phone({ children, cap, sub, frameStyle }) {
  return (
    <div className="wf">
      <div className="frame" style={frameStyle}>
        <div className="sk-status"><span>9:41</span><span>▮▮▮ ◔</span></div>
        {children}
      </div>
      {cap && <p className="cap">{cap}{sub && <span className="muted">{sub}</span>}</p>}
    </div>
  );
}
export function Pc({ children, cap, sub, frameStyle }) {
  return (
    <div className="wf pc">
      <div className="frame" style={frameStyle}>{children}</div>
      {cap && <p className="cap">{cap}{sub && <span className="muted">{sub}</span>}</p>}
    </div>
  );
}

/* 화면 1개의 와이어프레임 (프레임 + 캡션) */
export function ScreenWire({ s, noCap }) {
  const W = s.Wire;
  const F = s.frame === 'pc' ? Pc : Phone;
  return <F cap={noCap ? null : `${s.no} ${s.title}`} sub={s.sub}><W /></F>;
}

/* 번호 설명 목록 */
export function PinList({ s }) {
  const { hot, setHot } = useContext(BlockCtx);
  return (
    <ol className="pins">
      {s.pins.map((p, i) => {
        const n = i + 1;
        return (
          <li key={n} className={hot === n ? 'hot' : ''} onMouseEnter={() => setHot(n)} onMouseLeave={() => setHot(null)}>
            <b className="n">{n}</b>
            <div>{p.t}{(p.go || []).map((g) => <Go key={g} to={g} block />)}</div>
          </li>
        );
      })}
    </ol>
  );
}

export function BlockScope({ children }) {
  const [hot, setHot] = useState(null);
  return <BlockCtx.Provider value={{ hot, setHot }}>{children}</BlockCtx.Provider>;
}

/* 03 와이어프레임 섹션의 블록 1개 */
export function WfBlock({ s }) {
  const doc = useDoc();
  return (
    <BlockScope>
      <div className={'wf-block' + (s.frame === 'pc' ? ' pc' : '')} id={'wf-' + s.id}
        onMouseEnter={() => doc.setGlow(s.id)} onMouseLeave={() => doc.setGlow(null)}>
        <span className="wf-lane"><b>{s.no}</b>{s.lane}</span>
        <ScreenWire s={s} />
        <PinList s={s} />
      </div>
    </BlockScope>
  );
}

/* 04 화면정의서 1개 */
export function ScreenDef({ s, withId = true }) {
  return (
    <div className="screen-def" id={withId ? 'def-' + s.id : undefined}>
      <h3>{s.no} {s.title} {s.badges}</h3>
      <table className="spec"><tbody>
        {s.rows.map(([k, v]) => <tr key={k}><th>{k}</th><td>{v}</td></tr>)}
      </tbody></table>
      {s.ux.map((u, i) => (
        <div className="ux" key={i}><b className="tag">{u.tag}</b>{u.kb && <span className="badge keyboard">키보드</span>}{' '}{u.body}</div>
      ))}
    </div>
  );
}

/* 배지 단축 */
export const B = {
  y: (t = '↕ 세로 스크롤') => <span className="badge scroll-y">{t}</span>,
  x: (t = '↔ 가로 스크롤') => <span className="badge scroll-x">{t}</span>,
  f: (t) => <span className="badge fixed">{t}</span>,
};
