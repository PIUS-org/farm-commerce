import { useDoc, Go, Prop } from '../doc/kit.jsx';

const W = 150, H = 40;
/* 화면 노드 좌표 — 고객 모바일 · (고객 PC + 시스템) · 판매자 센터 · 운영자 관리자 */
const NODES = [
  ['s11', 40, 50], ['s12', 40, 114], ['s13', 40, 178], ['s14', 40, 242], ['s15', 40, 306], ['s16', 40, 370],
  ['s17', 40, 434], ['s18', 40, 498], ['s19', 40, 562], ['s110', 40, 626], ['s111', 40, 690], ['s112', 40, 754],
  ['s21', 272, 178], ['s22', 272, 242], ['s23', 272, 306],
  ['s31', 505, 50], ['s32', 505, 130], ['s33', 505, 194], ['s38', 505, 258], ['s37', 505, 322],
  ['s34', 505, 434], ['s35', 505, 626], ['s36', 505, 754],
  ['s41', 775, 50], ['s42', 775, 114], ['s43', 775, 178], ['s48', 775, 242], ['s46', 775, 322],
  ['s44', 775, 434], ['s45', 775, 690], ['s47', 775, 754],
];

function FlowNode({ id, x, y }) {
  const doc = useDoc();
  const s = doc.byId[id];
  const cls = 'fnode' + (doc.active === id ? ' active' : doc.glow === id ? ' glow' : doc.linked.has(id) ? ' linked' : '');
  return (
    <g className={cls} data-screen={id}
      onMouseEnter={(e) => doc.setPeek({ id, rect: e.currentTarget.getBoundingClientRect() })}
      onMouseLeave={() => doc.setPeek(null)}
      onClick={() => { doc.setPeek(null); doc.goScreen(id); }}>
      <rect x={x} y={y} width={W} height={H} rx="10" fill="#fff" stroke="#282828" strokeWidth="1.5" />
      <text x={x + W / 2} y={y + 25} textAnchor="middle" fontSize={(s.short || s.title).length > 7 ? 12 : 13} fill="#282828">{s.no} {s.short || s.title}</text>
    </g>
  );
}

const Sys = ({ x, y, w = 170, h = 46, t, s1 }) => (<g>
  <rect x={x} y={y} width={w} height={h} rx="10" fill="#EDEDED" stroke="#8B8B8B" strokeWidth="1.5" strokeDasharray="5 4" />
  <text x={x + w / 2} y={y + (s1 ? 19 : 28)} textAnchor="middle" fontSize="12" fill="#5a5a5a">{t}</text>
  {s1 && <text x={x + w / 2} y={y + 34} textAnchor="middle" fontSize="10" fill="#8B8B8B">{s1}</text>}
</g>);

export default function Flow() {
  return (
    <section className="sec" id="flow">
      <div className="sec-label"><i>02</i><span>FLOW</span></div>
      <h2>정보구조 · 화면 흐름</h2>
      <div className="hint">💡 화면 박스에 마우스를 올리면 미리보기, 클릭하면 오른쪽에 상세 정의가 열립니다</div>

      <h3>메뉴 구조 (IA)</h3>
      <table className="spec"><tbody>
        <tr><th>고객 웹앱 · 모바일<br /><span className="muted">탭: 홈 · 카테고리 · 장바구니 · 주문 · 마이 <Prop /></span></th><td>
          진입 — <Go to="s11" /> (둘러보기는 로그인 없이, 담기·찜·주문 때 로그인)<br />
          쇼핑 — <Go to="s12" /> → <Go to="s13" /> → <Go to="s14" /> → <Go to="s15" /> → <Go to="s16" /> → <Go to="s17" /><br />
          주문 — <Go to="s18" /> → <Go to="s19" /> → <Go to="s110" /> · <Go to="s111" /><br />
          마이 — <Go to="s112" /> (찜 · 알림함 · 공지 · 배송지 · 설정)
        </td></tr>
        <tr><th>고객 웹 · PC<br /><span className="muted">같은 반응형 웹 · 상단 메뉴</span></th><td><Go to="s21" /> · <Go to="s22" /> · <Go to="s23" /> — 나머지 화면은 모바일 화면을 가운데 정렬한 배치 <Prop /></td></tr>
        <tr><th>판매자 센터<br /><span className="muted">PC 웹 · 왼쪽 메뉴</span></th><td>가입 — <Go to="s31" /><br />홈 — <Go to="s32" /> / 상품 관리 — <Go to="s33" /> / 주문·배송 — <Go to="s34" /> / 취소·교환·반품 — <Go to="s35" /> / 정산 내역 — <Go to="s36" /> / 입점료·광고 — <Go to="s37" /> / 계정·설정 — <Go to="s38" /></td></tr>
        <tr><th>운영자 관리자<br /><span className="muted">PC 웹 · 왼쪽 메뉴</span></th><td><Go to="s41" /> · <Go to="s42" /> · <Go to="s43" /> · <Go to="s44" /> · <Go to="s45" /> · <Go to="s46" /> · <Go to="s47" /> · <Go to="s48" /></td></tr>
      </tbody></table>
      <p className="muted">탭바·왼쪽 메뉴로 오가는 이동은 화살표를 일일이 그리지 않고 세로 줄(메뉴 버스)로 묶었습니다. 판매자 센터와 운영자 관리자는 <b>계정이 완전히 분리된 별도 웹</b>입니다(같은 서버·API 사용).</p>

      <h3>화면 흐름</h3>
      <div className="flow-box">
        <svg viewBox="0 0 960 830" width="960" xmlns="http://www.w3.org/2000/svg" fontFamily="Pretendard, 'Apple SD Gothic Neo', sans-serif">
          <defs>
            <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#8B8B8B" /></marker>
          </defs>
          {/* 레인 */}
          <g>
            <rect x="8" y="10" width="222" height="812" rx="12" fill="#EEF0FF" />
            <rect x="236" y="10" width="222" height="812" rx="12" fill="#F1F2F5" />
            <rect x="464" y="10" width="236" height="812" rx="12" fill="#F6F4FF" />
            <rect x="706" y="10" width="248" height="812" rx="12" fill="#F1F2F5" />
          </g>
          <g fontSize="12" fontWeight="700" fill="#8B8B8B" textAnchor="middle">
            <text x="119" y="30">고객 웹앱 · 모바일</text>
            <text x="347" y="30">고객 PC · 시스템 · 외부 연동</text>
            <text x="582" y="30">판매자 센터 (PC)</text>
            <text x="830" y="30">운영자 관리자 (PC)</text>
          </g>

          {/* 실선: 사람이 누르는 이동 */}
          <g stroke="#8B8B8B" strokeWidth="1.4" fill="none" markerEnd="url(#ah)">
            <path d="M115,90 L115,114" /><path d="M115,154 L115,178" /><path d="M115,218 L115,242" /><path d="M115,282 L115,306" /><path d="M115,346 L115,370" />
            <path d="M115,474 L115,498" /><path d="M115,538 L115,562" /><path d="M115,602 L115,626" />
            <path d="M40,518 L22,518 L22,710 L40,710" />
            <path d="M190,70 L505,70" />
            <path d="M190,390 L260,390" />
            <path d="M685,214 L655,214" /><path d="M685,278 L655,278" /><path d="M685,342 L655,342" /><path d="M685,454 L655,454" /><path d="M685,646 L655,646" /><path d="M685,774 L655,774" />
            <path d="M745,134 L775,134" /><path d="M745,198 L775,198" /><path d="M745,262 L775,262" /><path d="M745,342 L775,342" /><path d="M745,454 L775,454" /><path d="M745,710 L775,710" /><path d="M745,774 L775,774" />
          </g>
          {/* 메뉴 버스 (화살표 없음) */}
          <g stroke="#8B8B8B" strokeWidth="1.4" fill="none">
            <path d="M655,160 L685,160 L685,774" />
            <path d="M775,70 L745,70 L745,774" />
          </g>
          {/* 같은 기능 · PC 배치 */}
          <g stroke="#B0B4D8" strokeWidth="1.4" fill="none" strokeDasharray="2 3">
            <path d="M190,198 L272,198" /><path d="M190,262 L272,262" /><path d="M190,326 L272,326" />
          </g>
          {/* 점선: 시스템이 자동으로 처리하는 흐름 */}
          <g stroke="#8B8B8B" strokeWidth="1.4" fill="none" strokeDasharray="5 4" markerEnd="url(#ah)">
            <path d="M345,413 L345,430" />
            <path d="M260,454 L190,454" />
            <path d="M430,454 L505,454" />
            <path d="M580,474 L580,512 L345,512 L345,540" />
            <path d="M260,575 L190,575" />
            <path d="M190,640 L505,640" />
            <path d="M580,666 L580,713 L430,713" />
            <path d="M345,736 L345,782 L505,782" />
            <path d="M655,70 L775,70" />
            <path d="M775,84 L725,84 L725,140 L655,140" />
            <path d="M655,206 L775,206" />
            <path d="M775,330 L655,330" />
            <path d="M775,766 L655,766" />
          </g>

          <Sys x={260} y={367} t="PG 결제 (카드·간편결제)" s1="결제 1번 · 서버 재확인" />
          <Sys x={260} y={430} t="주문 생성 · 판매자별 분리" s1="주문 1 → 판매자 주문 N" />
          <Sys x={260} y={540} t="배송조회 API" s1="송장 검증 · 배송 추적" />
          <Sys x={260} y={690} t="PG 부분 취소" s1="판매자 주문 금액만 환불" />

          {NODES.map(([id, x, y]) => <FlowNode key={id} id={id} x={x} y={y} />)}

          <g fontSize="11" fill="#3340D9">
            <text x="250" y="63">판매자 입점 신청</text>
            <text x="663" y="62">신청 접수</text>
            <text x="690" y="133" fontSize="10">승인</text>
            <text x="198" y="384">결제</text>
            <text x="200" y="448">주문 완료</text>
            <text x="440" y="448">판매자 주문</text>
            <text x="440" y="506">송장 입력</text>
            <text x="198" y="569">배송 추적</text>
            <text x="300" y="634">취소·반품·교환 신청</text>
            <text x="470" y="728">승인 · 환불</text>
            <text x="352" y="776">정산에서 차감</text>
            <text x="694" y="200" fontSize="10">검수 <tspan>(선택)</tspan></text>
            <text x="700" y="324" fontSize="10">청구·승인</text>
            <text x="700" y="760" fontSize="10">지급 기록</text>
            <text x="200" y="190" fontSize="9" fill="#8B8B8B">PC 배치</text>
            <text x="16" y="614" fontSize="10" transform="rotate(-90 16 614)">리뷰 쓰기</text>
          </g>
        </svg>
      </div>
      <p className="muted">읽는 법 — 실선 = 사람이 화면에서 누르는 이동, 점선 = 시스템이 처리하거나 다른 사용자에게 넘어가는 흐름, 회색 점선 상자 = 화면이 아닌 시스템, 연한 점선 = 같은 기능의 PC 배치. 그리지 않은 공통 규칙: ① 로그인 전 고객이 담기·찜·주문을 누르면 <Go to="s11" />로 갔다가 하던 동작으로 돌아옵니다 ② 부분 취소 결과는 고객 <Go to="s19" />와 알림함(<Go to="s112" />)에 바로 반영 ③ 환불 실패·분쟁은 운영자 <Go to="s45" />로 ④ 상품 문의는 판매자 <Go to="s32" /> 「답변 안 한 문의」로 들어갑니다.</p>

      <h3>상태 흐름 — 주문 1건의 일생</h3>
      <table className="spec"><tbody>
        <tr><th>① 결제 → 분리</th><td>고객이 <Go to="s16" />에서 결제 1번 → 서버가 PG 결제를 다시 확인한 뒤 <b>주문 1건 + 판매자 주문 N건</b>(판매자 수만큼)을 만들고 재고를 줄인다 → 각 판매자 <Go to="s34" /> 「신규」에 들어감</td></tr>
        <tr><th>② 출고 전</th><td>판매자가 「주문 확인」 → <b>상품 준비 중</b>. 그 전까지 고객은 <Go to="s19" />에서 <b>즉시 취소</b>(판매자 확인 없음, 해당 판매자 주문 금액만 부분 취소) <Prop /></td></tr>
        <tr><th>③ 송장 → 배송</th><td>판매자가 송장 입력 → <b>배송 중</b> → 배송조회 API가 「배달 완료」를 받으면 <b>배송 완료</b> <Prop /> → 고객 알림</td></tr>
        <tr><th>④ 반품 · 교환</th><td>배송 완료 후 고객 신청(<Go to="s110" />) → 판매자 승인(<Go to="s35" />) → PG 부분 취소 → 판매자 정산에서 차감. 판매자 거부에 고객이 불복하면 운영자 중재(<Go to="s45" />)</td></tr>
        <tr><th>⑤ 구매 확정 → 정산</th><td>고객이 확정하거나 배송 완료 ○일 후 자동 <b>구매 확정</b> <Prop /> → 그 회차 정산 대상 → 운영자 <Go to="s47" />에서 자료 확인·직접 송금·「지급 완료 처리」 → 판매자 <Go to="s36" />에 반영</td></tr>
        <tr><th>⑥ 정해지지 않은 것</th><td>결제대금을 누가 받고 판매자에게 어떻게 넘기는지(PG 계약 구조), 정산 주기, 신선식품 반품 기준 — <b>06 논의 안건 1·3·4번</b>에 제안을 적었습니다.</td></tr>
      </tbody></table>
    </section>
  );
}
