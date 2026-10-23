/* 2. 고객 웹 (PC) — 같은 웹앱이 넓은 화면에서 바뀌는 부분만 그림 */
import { P, Go, Prop, B } from '../doc/kit.jsx';

const lane = '고객 · PC';

const Gnb = ({ pin }) => (
  <div className="sk-row" style={{ borderBottom: '1px solid #E9E9E9', paddingBottom: 7, position: 'relative' }}>
    <span className="sk-t lg" style={{ flex: '0 0 90px' }}>서비스 이름</span>
    <span className="sk-s">과일 · 채소 · 쌀·잡곡 · 수산 · 건어물 · 축산 ▾</span>
    <span className="grow" />
    <span className="sk-input sm" style={{ flex: '0 0 170px' }}>⌕ 참외, 감귤, 전복</span>
    <span className="sk-s">찜</span><span className="sk-s">장바구니 3</span><span className="sk-s">마이</span>
    {pin}
  </div>
);
const Card = ({ ad, s, n, p, f }) => (
  <div className="sk-col">
    <div style={{ position: 'relative' }}><span className="sk-img" style={{ minHeight: 84, display: 'block' }} />{ad && <span className="sk-badge" style={{ position: 'absolute', left: 4, top: 4 }}>AD</span>}</div>
    <span className="sk-s">{s}</span><span className="sk-t">{n}</span><span className="sk-t">{p}</span><span className="sk-s">{f}</span>
  </div>
);

export const shopperPc = [
  {
    id: 's21', no: '2.1', title: 'PC 홈 · 상품 목록', sub: '넓은 화면 · 4열 그리드', lane, frame: 'pc',
    Wire: () => (<>
      <Gnb pin={<P n={1} />} />
      <div style={{ display: 'flex', gap: 10, flex: 1 }}>
        <div className="sk-col" style={{ flex: '0 0 110px', gap: 5, position: 'relative' }}>
          <span className="sk-t">과일</span>
          {['전체', '참외·수박', '감귤·만감류', '사과·배', '포도·복숭아'].map((c, i) => <span key={c} className={i === 0 ? 'sk-t' : 'sk-s'}>{c}</span>)}
          <div className="sk-div" style={{ margin: '4px 0' }} />
          <span className="sk-s">배송</span><span className="sk-check" style={{ padding: 0 }}>무료배송만</span>
          <span className="sk-s">판매자</span><span className="sk-check" style={{ padding: 0 }}>○○농원</span><span className="sk-check" style={{ padding: 0 }}>△△농장</span>
          <P n={2} />
        </div>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
          <div className="sk-row between" style={{ position: 'relative' }}><span className="sk-s">과일 128개</span><div className="sk-chips"><span className="sk-chip on">추천순</span><span className="sk-chip">판매량순</span><span className="sk-chip">낮은 가격순</span><span className="sk-chip">리뷰 많은순</span></div><P n={3} /></div>
          <div className="sk-grid4" style={{ gap: 10, position: 'relative' }}>
            <Card ad s="○○농원" n="성주 꿀참외 2kg" p="19,900원" f="배송비 3,000원" />
            <Card ad s="△△농장" n="제주 노지감귤 5kg" p="24,900원" f="무료배송" />
            <Card s="□□과수원" n="충주 사과 3kg" p="29,000원" f="배송비 3,500원" />
            <Card s="○○농원" n="방울토마토 1kg" p="9,900원" f="배송비 3,000원" />
            <P n={4} />
          </div>
        </div>
      </div>
    </>),
    pins: [
      { t: <>상단 메뉴 — 모바일 탭바 대신 <b>카테고리 메뉴 + 검색 + 찜·장바구니·마이</b>가 한 줄에. 카테고리에 마우스를 올리면 2단계 분류가 펼쳐집니다 <Prop/>.</>, go: ['s12'] },
      { t: <>왼쪽 필터 — PC에서만 펼쳐 둡니다. 2단계 카테고리 / 무료배송만 / 판매자별 <Prop/>. 모바일에서는 칩 + 필터 시트로 같은 기능.</>, go: ['s13'] },
      { t: <>개수·정렬 — 모바일과 같은 정렬 기준(광고 상품 우선 규칙 포함).</> },
      { t: <>4열 상품 그리드 — 광고 상품은 앞 칸 + 「AD」. 카드 정보(판매자·상품명·가격·배송비)는 모바일과 같고 배치만 다릅니다.</>, go: ['s22'] },
    ],
    badges: <>{B.y()} {B.f('상단 메뉴 고정')}</>,
    rows: [
      ['목적', <>PC로 들어온 고객(선물 구매·대량 구매 등 <Prop>가정</Prop>)이 넓은 화면에서 상품을 비교하며 고른다. 화면 기능은 <Go to="s12" /> · <Go to="s13" />과 같고 <b>배치만 다르다</b>.</>],
      ['구성 요소', <>상단 메뉴(이름·카테고리·검색·찜·장바구니·마이) <span className="badge fixed">고정</span> / 왼쪽 필터 / 정렬 / 4열 그리드(1280px 기준, 1024px 이하 3열, 768px 이하 모바일 배치) / 페이지 하단 사업자 정보·판매자 정보 안내</>],
      ['인터랙션', <>· 카드 마우스 오버 → 「장바구니」 빠른 담기 버튼 <Prop/><br />· 필터를 바꾸면 주소(URL)에 반영 — 새로고침·공유해도 같은 목록<br />· 페이지 번호 방식(모바일은 이어 불러오기) <Prop/></>],
      ['이동', <>상품 → <Go to="s22" /> / 장바구니 → <Go to="s23" /> / 마이 → <Go to="s112" />(PC 배치)</>],
      ['상태', <>모바일 <Go to="s13" />과 같다(0건·품절·판매 중지).</>],
      ['문구', <>모바일과 같은 문구를 쓴다.</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>PC: 「/」 = 검색창으로, 검색창에서 ↑↓ = 추천 검색어 이동, Enter = 검색, Esc = 펼친 카테고리 메뉴 닫기.</> },
      { tag: 'UX · EDGE', body: <>· 고객 PC 화면은 <b>모바일 화면을 넓힌 반응형 한 벌</b>로 만든다(별도 PC 사이트 아님) — 그래서 PC는 배치가 크게 다른 3화면만 그렸고, 나머지(주문 내역·반품·리뷰·마이)는 모바일 화면을 가운데 정렬한 폭 720px 배치 <Prop/><br />· 화면 하단에 통신판매중개자 고지와 판매자 정보 확인 링크 — 06 B</> },
    ],
  },

  {
    id: 's22', no: '2.2', title: 'PC 상품 상세', sub: '사진 · 구매 영역 2단', lane, frame: 'pc',
    Wire: () => (<>
      <Gnb />
      <div style={{ display: 'flex', gap: 14 }}>
        <div style={{ flex: '0 0 250px', position: 'relative' }}>
          <span className="sk-img" style={{ minHeight: 200, display: 'block' }} />
          <div className="sk-row" style={{ marginTop: 5 }}>{[1, 2, 3, 4].map((i) => <span key={i} className="sk-img sq" style={{ width: 40, minHeight: 40, flex: '0 0 40px' }} />)}</div>
          <P n={1} />
        </div>
        <div className="sk-col" style={{ flex: 1, gap: 6, position: 'relative' }}>
          <span className="sk-s">○○농원 ›</span>
          <span className="sk-t xl">성주 꿀참외 2kg (5~7과)</span>
          <div className="sk-row"><span className="sk-t xl">19,900원</span><span className="sk-badge dark">원산지 국내산(경북 성주)</span></div>
          <span className="sk-s">★4.8 · 리뷰 212</span>
          <P n={2} />
          <div className="sk-card" style={{ position: 'relative' }}>
            <div className="sk-row between"><span className="sk-s">배송비</span><span className="sk-s">3,000원 · 4만원 이상 무료 · 제주/도서산간 +3,000원</span></div>
            <div className="sk-row between"><span className="sk-s">출고</span><span className="sk-s">평일 14시 전 주문 시 당일 출고</span></div>
            <P n={3} />
          </div>
          <div style={{ position: 'relative' }}>
            <div className="sk-input sm">옵션: 2kg (5~7과) ▾</div>
            <div className="sk-row between" style={{ marginTop: 5 }}><span className="sk-chip">− 1 +</span><span className="sk-t lg">합계 19,900원</span></div>
            <div className="sk-row" style={{ marginTop: 5 }}><span className="sk-btn line" style={{ flex: '0 0 40px' }}>♡</span><span className="sk-btn line grow">장바구니</span><span className="sk-btn grow">구매하기</span></div>
            <P n={4} />
          </div>
        </div>
      </div>
      <div style={{ position: 'relative' }}><div className="sk-chips"><span className="sk-chip on">상세정보</span><span className="sk-chip">리뷰 212</span><span className="sk-chip">문의 14</span><span className="sk-chip">배송·교환·반품</span><span className="sk-chip">판매자 정보</span></div><P n={5} /></div>
    </>),
    pins: [
      { t: <>사진 — 왼쪽 큰 사진 + 썸네일, 마우스를 올리면 확대 <Prop/>.</> },
      { t: <>판매자·상품명·가격·원산지 — 모바일과 같이 <b>원산지를 가격 옆에 같은 크기</b>로.</>, go: ['s14'] },
      { t: <>배송 정보 — 판매자별 배송비·무료배송 기준·도서산간 추가 배송비 <Prop/>·출고 기준.</> },
      { t: <>구매 영역 — PC는 옵션 시트 대신 <b>옵션·수량·합계가 화면에 펼쳐져</b> 있습니다. 스크롤해도 오른쪽에 따라오는 구매 상자 <Prop/>.</>, go: ['s23'] },
      { t: <>탭 — 모바일 4개 + <b>판매자 정보</b>(상호·대표자·사업자번호·통신판매업 신고번호·연락처). 통신판매중개 플랫폼은 판매자 정보를 소비자에게 제공해야 하므로 PC·모바일 모두 상세 탭에 둡니다(모바일은 배송·교환·반품 탭 맨 아래).</>, go: ['s31'] },
    ],
    badges: <>{B.y()} {B.f('상단 메뉴 고정 · 구매 상자 따라옴')}</>,
    rows: [
      ['목적', <>모바일 <Go to="s14" />과 같은 정보를 PC에서 <b>사진과 구매 영역 2단</b>으로 보여준다.</>],
      ['구성 요소', <>상단 메뉴 / 사진 영역 / 판매자·상품명·가격·원산지·별점 / 배송 정보 / 옵션·수량·합계·찜·장바구니·구매하기 / 탭 5개(상세·리뷰·문의·배송교환반품·판매자 정보)</>],
      ['인터랙션', <>· 옵션 선택 시 선택 줄이 아래 쌓임(여러 옵션 함께 담기) <Prop/><br />· 장바구니 → 오른쪽 위 작은 확인 창 「장바구니에 담았어요 · 바로 가기」</>],
      ['이동', <>구매하기 → 주문서(<Go to="s23" />의 주문서 단계) / 장바구니 → <Go to="s23" /> / 판매자명 → 판매자 상품 모아 보기 <Prop/></>],
      ['상태', <>모바일 <Go to="s14" />과 같다.</>],
      ['문구', <>모바일과 같은 문구 + 「판매자 정보」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>PC: 수량 칸에 숫자를 직접 입력할 수 있고(재고 넘으면 최대값으로 고침), Enter = 장바구니 담기 <Prop/>. Tab 순서: 옵션 → 수량 → 찜 → 장바구니 → 구매하기.</> },
      { tag: 'UX · EDGE', body: <>· 판매자 정보에 대표자·사업자번호를 보여줄 때 개인 판매자(농가 개인사업자) 주소 노출 범위 확인 필요 — 06 B</> },
    ],
  },

  {
    id: 's23', no: '2.3', title: 'PC 장바구니 · 주문서', sub: '목록 + 오른쪽 결제 요약', lane, frame: 'pc',
    Wire: () => (<>
      <Gnb />
      <div className="sk-row" style={{ position: 'relative' }}><span className="sk-t lg">장바구니</span><span className="sk-s">① 장바구니 › ② 주문서 › ③ 주문 완료</span><P n={1} /></div>
      <div style={{ display: 'flex', gap: 12 }}>
        <div className="sk-col" style={{ flex: 1, gap: 7, position: 'relative' }}>
          <div className="sk-card">
            <div className="sk-row between"><span className="sk-t">○○농원</span><span className="sk-s">배송비 3,000원 · 10,200원 더 담으면 무료</span></div>
            <div className="sk-row"><span className="sk-check on" style={{ padding: 0 }} /><span className="sk-img sq" style={{ width: 34, minHeight: 34, flex: '0 0 34px' }} /><span className="sk-s grow">성주 꿀참외 2kg</span><span className="sk-chip">− 1 +</span><span className="sk-t" style={{ flex: '0 0 64px', textAlign: 'right' }}>19,900원</span></div>
            <div className="sk-row"><span className="sk-check on" style={{ padding: 0 }} /><span className="sk-img sq" style={{ width: 34, minHeight: 34, flex: '0 0 34px' }} /><span className="sk-s grow">방울토마토 1kg</span><span className="sk-chip">− 1 +</span><span className="sk-t" style={{ flex: '0 0 64px', textAlign: 'right' }}>9,900원</span></div>
          </div>
          <div className="sk-card">
            <div className="sk-row between"><span className="sk-t">△△수산</span><span className="sk-s">무료배송</span></div>
            <div className="sk-row"><span className="sk-check on" style={{ padding: 0 }} /><span className="sk-img sq" style={{ width: 34, minHeight: 34, flex: '0 0 34px' }} /><span className="sk-s grow">완도 활전복 1kg</span><span className="sk-chip">− 1 +</span><span className="sk-t" style={{ flex: '0 0 64px', textAlign: 'right' }}>39,000원</span></div>
          </div>
          <P n={2} />
        </div>
        <div className="sk-card" style={{ flex: '0 0 190px', position: 'relative', alignSelf: 'flex-start' }}>
          <span className="sk-t">결제 예정</span>
          <div className="sk-sum"><span>상품 3개</span><span>68,800원</span></div>
          <div className="sk-sum"><span>배송비 (판매자 2곳)</span><span>3,000원</span></div>
          <div className="sk-sum tot"><span>합계</span><span>71,800원</span></div>
          <div className="sk-btn">주문하기</div>
          <span className="sk-s">판매자별로 따로 배송돼요</span>
          <P n={3} />
        </div>
      </div>
    </>),
    pins: [
      { t: <>단계 표시 — 장바구니 → 주문서 → 주문 완료. PC에서는 세 단계가 같은 틀(왼쪽 내용 + 오른쪽 결제 요약)을 공유합니다.</>, go: ['s16', 's17'] },
      { t: <>판매자별 묶음 — 모바일 <Go to="s15" />과 같은 규칙. 표 형태로 수량·금액 열을 맞춥니다.</>, go: ['s15'] },
      { t: <>결제 요약 상자 — 스크롤해도 오른쪽에 고정. 주문서 단계에서는 이 상자에 결제 수단·동의·「결제하기」가 들어갑니다.</>, go: ['s16'] },
    ],
    badges: <>{B.y()} {B.f('결제 요약 상자 오른쪽 고정')}</>,
    rows: [
      ['목적', <>PC에서 장바구니 확인 → 주문서 → 결제까지 <b>한 틀 안에서</b> 끝낸다. 규칙은 모바일 <Go to="s15" /> · <Go to="s16" />과 같다.</>],
      ['구성 요소', <>단계 표시 / 왼쪽: 판매자 묶음 표(체크·사진·상품·옵션·수량·금액) / 오른쪽: 결제 요약(상품·배송비·합계·버튼·안내) <span className="badge fixed">고정</span><br />주문서 단계: 왼쪽에 배송지·판매자별 주문 요약, 오른쪽에 결제 수단·반품 고지·동의·결제하기</>],
      ['인터랙션', <>· PC 결제는 PG 결제창이 <b>팝업 또는 레이어</b>로 뜬다(모바일은 페이지 이동)<br />· 결제 중 창을 닫으면 「결제가 완료되지 않았어요」</>],
      ['이동', <>주문하기 → 주문서 단계 / 결제 성공 → 주문 완료(<Go to="s17" />와 같은 내용)</>],
      ['상태', <>모바일 <Go to="s15" /> · <Go to="s16" />과 같다.</>],
      ['문구', <>「① 장바구니 › ② 주문서 › ③ 주문 완료」 「판매자별로 따로 배송돼요」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>PC 주문서: 주소 검색 창에서 Enter = 검색, ↑↓ = 결과 선택, 상세 주소 칸 자동 포커스. Tab 순서는 받는 사람 → 연락처 → 주소 → 요청사항 → 결제 수단 → 동의 → 결제하기.</> },
      { tag: 'UX · EDGE', body: <>· 일부 간편결제는 PC에서 QR·휴대폰 인증으로 넘어간다 — PG 결제창 기본 동작을 그대로 쓴다</> },
    ],
  },
];
