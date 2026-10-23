import { useEffect, useMemo, useState } from 'react';
import { DocCtx, WfBlock, ScreenDef } from './doc/kit.jsx';
import { Peek, Drawer, DocsBar, useGuard } from './doc/Layer.jsx';
import { shopper } from './screens/shopper.jsx';
import { shopperPc } from './screens/shopperPc.jsx';
import { seller } from './screens/seller.jsx';
import { admin } from './screens/admin.jsx';
import { AGENDA } from './sections/Open.jsx';
import Overview from './sections/Overview.jsx';
import Flow from './sections/Flow.jsx';
import Refs from './sections/Refs.jsx';
import Open from './sections/Open.jsx';
import logoWhite from './assets/pius-horizontal-white.png';
import outline from './assets/pius-symbol-white.png';
import symbol from './assets/pius-symbol-black.png';

const TOC = [
  ['overview', '01', '개요'], ['flow', '02', '플로우'], ['wireframe', '03', '와이어프레임'],
  ['screens', '04', '화면정의서'], ['refs', '05', '레퍼런스'], ['open', '06', '안건 · 견적 · 일정'],
];

/* 플로우 박스에 들어갈 짧은 이름 */
const SHORT = {
  s11: '로그인·가입', s12: '홈', s13: '카테고리·검색', s14: '상품 상세', s15: '장바구니', s16: '주문서·결제',
  s17: '주문 완료', s18: '주문 내역', s19: '주문 상세·배송', s110: '취소·교환·반품', s111: '리뷰·문의', s112: '마이·찜·알림',
  s21: 'PC 홈·목록', s22: 'PC 상품 상세', s23: 'PC 장바구니·주문',
  s31: '입점 신청', s32: '판매자 홈', s33: '상품 등록', s34: '주문·송장', s35: '취소·반품 처리', s36: '정산 내역',
  s37: '입점료·광고', s38: '계정·배송 설정',
  s41: '판매자 심사', s42: '회원', s43: '상품·카테고리', s44: '주문·배송', s45: '반품·환불', s46: '수익모델 설정',
  s47: '정산 관리', s48: '공지·알림',
};
const GROUPS = [
  { t: '1. 고객 웹앱 · 모바일', d: '둘러보기 → 판매자별 장바구니 → 결제 1번 → 판매자별 배송 · 폰 프레임', list: shopper },
  { t: '2. 고객 웹 · PC', d: '같은 반응형 웹앱에서 배치가 크게 달라지는 화면만 · PC 프레임', list: shopperPc },
  { t: '3. 판매자 센터', d: '입점 → 상품 → 주문·송장 → 취소·반품 → 정산 · 입점료·광고 · PC 프레임', list: seller },
  { t: '4. 운영자 관리자', d: '판매자 심사 · 주문 · 환불 · 수익모델 · 정산 지급 · 공지 · PC 프레임', list: admin },
];
const SCREENS = GROUPS.flatMap((g) => g.list).map((s) => ({ ...s, short: SHORT[s.id] }));
const VERSIONS = [{ v: '1', label: 'v1 · 2026. 10. 22. 초안' }];

export default function App() {
  const byId = useMemo(() => Object.fromEntries(SCREENS.map((s) => [s.id, s])), []);
  const [active, setActive] = useState(null);
  const [linked, setLinked] = useState(new Set());
  const [glow, setGlow] = useState(null);
  const [peek, setPeek] = useState(null);
  const [defOpen, setDefOpen] = useState(false);
  useGuard();

  const close = () => { setActive(null); setLinked(new Set()); setGlow(null); };
  const goScreen = (id) => {
    setPeek(null);
    if (innerWidth <= 900) { // 모바일: 상세 패널 없이 그 화면 와이어프레임으로 이동
      document.getElementById('wf-' + id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    setGlow(null);
    setActive(id);
  };

  useEffect(() => { document.body.classList.toggle('drawer-open', !!active); }, [active]);

  /* 목차: 지금 읽는 섹션 표시 + 읽은 만큼 진행 막대 */
  const [sec, setSec] = useState('overview');
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      setProgress(Math.min(1, h.scrollTop / Math.max(1, h.scrollHeight - innerHeight)));
      let cur = TOC[0][0];
      for (const [id] of TOC) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top < 140) cur = id; }
      setSec(cur);
    };
    on();
    addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape') close(); };
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, []);

  const doc = { byId, active, linked, setLinked, glow, setGlow, peek, setPeek, goScreen, close };
  const counts = { mo: shopper.length, pc: shopperPc.length, seller: seller.length, admin: admin.length };

  return (
    <DocCtx.Provider value={doc}>
      {/* 좁은 화면에서 PC 와이어프레임이 페이지 전체를 가로로 밀지 않도록 — 프레임 안에서만 가로 스크롤 */}
      <style>{'@media (max-width:720px){.wf-block{grid-template-columns:minmax(0,1fr)!important}.wf.pc{max-width:100%;overflow-x:auto}.wf.pc .frame{max-width:none}}'}</style>
      <div id="pius-watermark"><img src={symbol} alt="" draggable="false" /></div>

      <div className="cover">
        <img className="cover-mark" src={outline} alt="" draggable="false" />
        <header className="doc">
          <div className="brand"><img src={logoWhite} alt="PiUS — BUILD YOUR GROWTH" draggable="false" /><em>PLANNING DOCUMENT</em></div>
          <p className="kicker">제안 기획서 · 초안 v1</p>
          <h1>농수산물 산지직송<br />멀티셀러 커머스 플랫폼</h1>
          <p className="lede">자체 판매자 2곳으로 시작해 외부 판매자 입점까지 넓히는 고객 웹앱 · 판매자 센터 · 운영자 관리자 — 기존 멀티셀러 소스(FRUT) 재활용 제안 포함</p>
          <dl className="meta">
            <div><dt>고객사</dt><dd>클라이언트사</dd></div>
            <div><dt>작성</dt><dd>PiUS · 2026.10.22</dd></div>
            <div><dt>기준</dt><dd>클라이언트 공고문 · 미팅 전</dd></div>
            <div><dt>대상</dt><dd>고객 반응형 웹앱(PWA) + 판매자·운영자 PC 웹</dd></div>
          </dl>
          <div className="summary">
            <div><b>{counts.mo + counts.pc + counts.seller + counts.admin}<small>개 화면</small></b><span>고객 모바일 {counts.mo} · PC {counts.pc} · 판매자 {counts.seller} · 운영자 {counts.admin}</span></div>
            <div><b>3<small>종 사용자</small></b><span>고객 · 판매자 · 운영자</span></div>
            <div><b>{AGENDA.length}<small>건 논의 안건</small></b><span>착수 전에 결론 필요 · PiUS 제안 포함</span></div>
            <div><b>14<small>주 일정</small></b><span>권장안(소스 재활용 · 웹앱) 기준 (제안)</span></div>
          </div>
        </header>
      </div>

      <nav className="toc">
        <div className="toc-in">
          {TOC.map(([id, n, t]) => (
            <a key={id} href={'#' + id} className={sec === id ? 'on' : ''} onClick={id === 'screens' ? () => setDefOpen(true) : undefined}><i>{n}</i>{t}</a>
          ))}
        </div>
        <div className="toc-bar"><i style={{ width: (progress * 100).toFixed(1) + '%' }} /></div>
      </nav>

      <main>
        <Overview />
        <Flow />

        <section className="sec" id="wireframe">
          <div className="sec-label"><i>03</i><span>WIREFRAME</span></div>
          <h2>와이어프레임</h2>
          <p className="muted">로파이 — 레이아웃과 우선순위만 표현합니다. 비주얼 디자인은 디자인 단계에서. 번호 핀에 마우스를 올리면 해당 설명이 강조되고, 초록 글씨 화면 번호를 누르면 그 화면 상세가 열립니다.</p>
          {GROUPS.map((g) => (
            <div key={g.t}>
              <div className="wf-group"><b>{g.t}</b><span>{g.d}</span></div>
              {g.list.map((s) => <WfBlock key={s.id} s={byId[s.id]} />)}
            </div>
          ))}
        </section>

        <section className="sec" id="screens">
          <div className="sec-label"><i>04</i><span>SCREENS</span></div>
          <h2>화면정의서</h2>
          <div className="hint">💡 화면 상세는 02 플로우에서 화면을 클릭해 오른쪽 패널로 보는 게 편해요 — 아래 원문은 개발용 전체 정의입니다</div>
          <details className="def-fold" open={defOpen} onToggle={(e) => setDefOpen(e.currentTarget.open)}>
            <summary>화면 정의 전체 펼치기 (원문 · {SCREENS.length}개 화면)</summary>
            {SCREENS.map((s) => <ScreenDef key={s.id} s={s} />)}
          </details>
        </section>

        <Refs />
        <Open />
      </main>

      <Peek />
      <Drawer />
      <DocsBar versions={VERSIONS} />
    </DocCtx.Provider>
  );
}
