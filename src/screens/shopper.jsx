/* 1. 고객 웹앱 (모바일) — 둘러보기 → 상품 → 장바구니(판매자별) → 결제 1번 → 판매자별 주문·배송 → 취소·교환·반품 */
import { P, Go, Prop, B } from '../doc/kit.jsx';

const lane = '고객 · 모바일';

const Tab = ({ on }) => (
  <div className="sk-tabbar">
    {['홈', '카테고리', '장바구니', '주문', '마이'].map((t) => <span key={t} className={on === t ? 'on' : ''}><i className="sk-ic round" style={{ width: 14, height: 14 }} />{t}</span>)}
  </div>
);
const Top = ({ t, back = true, right }) => (
  <div className="sk-nav">{back && <span className="sk-t">‹</span>}<span className="sk-t lg">{t}</span><span className="grow" />{right}</div>
);
const Thumb = ({ s = 44 }) => <span className="sk-img sq" style={{ width: s, minHeight: s, flex: `0 0 ${s}px` }} />;
const Seller = ({ n, fee }) => (
  <div className="sk-row between" style={{ borderBottom: '1px solid #EEE', paddingBottom: 4 }}>
    <span className="sk-row" style={{ gap: 4 }}><i className="sk-ic round" style={{ width: 12, height: 12 }} /><span className="sk-t">{n}</span></span><span className="sk-s">{fee}</span>
  </div>
);

export const shopper = [
  {
    id: 's11', no: '1.1', title: '로그인 · 가입', sub: '소셜 간편로그인 + 일반 가입', lane, frame: 'phone',
    Wire: () => (<>
      <Top t="" right={<span className="sk-s">✕</span>} />
      <div style={{ textAlign: 'center', position: 'relative', marginTop: 10 }}>
        <div className="sk-ic lg" style={{ margin: '0 auto 8px' }} />
        <p className="sk-t xl">서비스 이름</p><p className="sk-s">산지에서 바로 보내는 농수산물</p>
        <P n={1} />
      </div>
      <div className="sk-col" style={{ gap: 7, marginTop: 10, position: 'relative' }}>
        <div className="sk-btn big kakao">카카오로 시작하기</div>
        <div className="sk-btn big line">네이버로 시작하기</div>
        <div className="sk-btn big line">Apple로 계속하기</div>
        <P n={2} />
      </div>
      <div className="sk-div" />
      <div className="sk-col" style={{ gap: 6, position: 'relative' }}>
        <div className="sk-input">이메일</div>
        <div className="sk-input">비밀번호</div>
        <div className="sk-btn">로그인</div>
        <div className="sk-row between"><span className="sk-s">이메일로 가입</span><span className="sk-s">비밀번호 찾기</span></div>
        <P n={3} />
      </div>
      <div className="sk-banner sk-row between" style={{ marginTop: 'auto', position: 'relative' }}>
        <span className="sk-s">농가·수산업체이신가요?</span><span className="sk-t">판매자 입점 신청 ›</span>
        <P n={4} />
      </div>
    </>),
    pins: [
      { t: <>서비스 이름 자리 — 요청서에 서비스 이름이 없어 비워 두었습니다. 이름·한 줄 소개는 클라이언트가 확정합니다.</> },
      { t: <>소셜 간편로그인 — 카카오·네이버·Apple(요구사항). 처음이면 약관 동의 한 화면만 거쳐 바로 가입되고, 기존 회원이면 보던 화면으로 돌아갑니다. 같은 이메일로 다른 소셜 계정이 이미 있으면 「카카오로 가입하신 계정이 있어요」로 안내합니다.</>, go: ['s12'] },
      { t: <>일반 로그인·가입 — 요구사항 "회원가입 및 로그인"을 이메일 방식으로 그렸습니다 <Prop/>. 휴대폰 본인인증은 넣지 않았습니다(건당 비용 발생 · 06 B 확인).</> },
      { t: <>판매자 입점 진입 — 판매자 업무는 PC 판매자 센터에서 하므로, 모바일에서는 입점 신청 안내 페이지로만 연결합니다 <Prop/>.</>, go: ['s31'] },
    ],
    badges: <>{B.f('화면 고정 · 스크롤 없음')}</>,
    rows: [
      ['목적', <>고객이 가장 짧은 경로로 가입·로그인한다. <b>둘러보기는 로그인 없이</b>, 장바구니 담기·찜·주문할 때 이 화면이 뜬다 <Prop/>.</>],
      ['구성 요소', <>서비스 이름(미정) / 카카오 · 네이버 · Apple 버튼 / 이메일·비밀번호 로그인 <Prop/> / 이메일 가입·비밀번호 찾기 / 판매자 입점 신청 띠 <Prop/></>],
      ['인터랙션', <>· 소셜 버튼 → 각 사 동의 화면 → 신규면 약관 동의(필수 2 · 선택 1) → 가입 완료<br />· 로그인 후 원래 하려던 동작(찜·담기·주문)을 이어서 처리<br />· 웹앱이라 로그인 유지 기간을 길게(30일) <Prop/></>],
      ['이동', <>로그인 성공 → 보던 화면 또는 <Go to="s12" /> / 판매자 입점 → <Go to="s31" /></>],
      ['상태', <>· 소셜 로그인 취소: 이 화면 그대로<br />· 탈퇴 후 30일 안 재가입: 「탈퇴 후 30일이 지나야 다시 가입할 수 있어요」 <Prop/><br />· 비밀번호 5회 오류: 「비밀번호 찾기」 안내</>],
      ['문구', <>「카카오로 시작하기」 「네이버로 시작하기」 「Apple로 계속하기」 「농가·수산업체이신가요? 판매자 입점 신청」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>이메일 칸은 이메일 키보드(@ 노출), 키보드 「다음」으로 비밀번호 칸 이동, 비밀번호 칸의 「완료」 = 로그인. 키보드가 올라오면 소셜 버튼 영역은 위로 밀려 가려지고, 로그인 버튼이 키보드 바로 위에 보이도록 스크롤한다.</> },
      { tag: 'UX · EDGE', body: <>· 카카오톡·네이버 앱 안의 브라우저(인앱 브라우저)로 들어온 경우 Apple 로그인이 막힐 수 있어, 그때는 「Safari/Chrome에서 열기」 안내를 띄운다<br />· 웹앱(PWA)은 앱스토어 심사가 없으므로 Apple 로그인은 요구사항대로 넣되, 네이티브 앱으로 갈 경우 심사 가이드라인 4.8과도 맞는다</> },
    ],
  },

  {
    id: 's12', no: '1.2', title: '홈', sub: '카테고리 · 광고 · 기획 진열', lane, frame: 'phone',
    Wire: () => (<>
      <div className="sk-row" style={{ position: 'relative' }}><span className="sk-t lg">서비스 이름</span><span className="grow" /><span className="sk-ic round" /><span className="sk-ic round" /><P n={1} /></div>
      <div className="sk-input">⌕ 참외, 감귤, 전복 검색</div>
      <div style={{ position: 'relative' }}>
        <div className="sk-img" style={{ minHeight: 82 }} />
        <span className="sk-badge" style={{ position: 'absolute', left: 6, top: 6 }}>AD</span>
        <span className="sk-s" style={{ position: 'absolute', right: 8, bottom: 4 }}>1/4</span>
        <P n={2} />
      </div>
      <div className="sk-grid4" style={{ position: 'relative', gap: 6 }}>
        {['과일', '채소', '쌀·잡곡', '수산', '건어물', '축산', '가공', '선물'].map((c) => <div key={c} className="sk-col" style={{ alignItems: 'center' }}><span className="sk-ic round" style={{ width: 24, height: 24 }} /><span className="sk-s">{c}</span></div>)}
        <P n={3} />
      </div>
      <div style={{ position: 'relative' }}>
        <div className="sk-row between"><span className="sk-t">지금 많이 찾는 산지 상품</span><span className="sk-badge">AD</span></div>
        <div className="sk-row" style={{ gap: 6 }}>
          {['성주 참외 2kg', '제주 감귤 5kg', '완도 전복 1kg'].map((n) => <div key={n} className="sk-col" style={{ flex: '0 0 72px' }}><span className="sk-img" style={{ minHeight: 60 }} /><span className="sk-s">{n}</span><span className="sk-t">19,900원</span></div>)}
        </div>
        <P n={4} />
      </div>
      <div className="sk-banner sk-row between" style={{ position: 'relative' }}><span className="sk-s">홈 화면에 추가하면 앱처럼 쓸 수 있어요</span><span className="sk-btn sm line">추가</span><P n={5} /></div>
      <Tab on="홈" />
    </>),
    pins: [
      { t: <>상단 — 서비스 이름(미정), 알림·장바구니 아이콘. 알림 아이콘의 빨간 점은 읽지 않은 주문·배송 알림이 있을 때.</>, go: ['s112', 's15'] },
      { t: <>메인 배너 — 운영자가 등록하는 배너와 <b>판매자 광고 배너</b>가 섞여 돌아갑니다. 광고 배너에는 반드시 「AD」 표시 <Prop/>. 배너 광고를 1차에 넣을지는 06 논의 안건입니다.</>, go: ['s46', 's37'] },
      { t: <>카테고리 바로가기 — 운영자가 관리하는 1단계 카테고리(요구사항 "상품 카테고리"). 이름·순서는 예시입니다 <Prop/>.</>, go: ['s13', 's43'] },
      { t: <>진열 영역 — 광고 상품(상위 노출)이나 운영자 기획 진열. 광고 상품은 「AD」 표시를 붙여 일반 상품과 구분합니다 <Prop/>.</>, go: ['s14'] },
      { t: <>홈 화면에 추가 안내 — 웹앱(PWA) 선택 시 요구사항 "홈 화면 추가". Android는 설치 창을 바로 띄우고, iPhone은 Safari 「공유 → 홈 화면에 추가」 방법을 그림으로 안내합니다. 닫으면 14일간 다시 안 보입니다 <Prop/>.</> },
    ],
    badges: <>{B.y()} {B.x('↔ 진열 상품 가로 스크롤')} {B.f('하단 탭바 고정')}</>,
    rows: [
      ['목적', <>처음 온 고객이 <b>무엇을 파는 곳인지</b> 바로 알고, 카테고리·검색·진열 중 하나로 상품에 들어간다.</>],
      ['구성 요소', <>상단 바(이름·알림·장바구니) / 검색창 / 메인 배너(운영자·광고) / 카테고리 8칸 / 진열 섹션 N개(광고·기획) <Prop/> / 홈 화면 추가 띠(웹앱) / 하단 탭바(홈·카테고리·장바구니·주문·마이) <Prop/></>],
      ['인터랙션', <>· 검색창 누름 → 검색 전용 화면(최근 검색어·인기 검색어 <Prop/>) → <Go to="s13" /><br />· 배너 자동 넘김 4초, 손으로 넘기면 멈춤<br />· 진열 섹션 구성·순서는 운영자 관리자에서 바꾼다 <Prop/></>],
      ['이동', <>카테고리 → <Go to="s13" /> / 상품 → <Go to="s14" /> / 장바구니 아이콘 → <Go to="s15" /> / 알림 → <Go to="s112" /></>],
      ['상태', <>· 판매자 2곳만 있는 오픈 초기: 진열 섹션을 1~2개로 줄이고 카테고리도 상품 있는 것만 노출(빈 카테고리 숨김) <Prop/><br />· 로딩: 배너·카드 뼈대</>],
      ['문구', <>「참외, 감귤, 전복 검색」 「지금 많이 찾는 산지 상품」 「AD」 「홈 화면에 추가하면 앱처럼 쓸 수 있어요」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>홈에서는 키보드가 올라오지 않는다. 검색창을 누르면 검색 전용 화면으로 바뀐 뒤 키보드가 올라오고, 키보드 「검색」 = 실행.</> },
      { tag: 'UX · EDGE', body: <>· <b>오픈 초기 상품 수가 적다</b>(판매자 2곳) — 홈이 비어 보이지 않게 섹션 수를 운영자가 조절할 수 있어야 한다<br />· 광고 배너·상위 노출 상품이 일반 상품처럼 보이면 안 된다 — 「AD」 표시 위치·크기를 디자인 단계에서 고정</> },
    ],
  },

  {
    id: 's13', no: '1.3', title: '카테고리 · 검색 결과', sub: '상품 목록', lane, frame: 'phone',
    Wire: () => (<>
      <Top t="과일" right={<span className="sk-s">⌕</span>} />
      <div style={{ position: 'relative' }}><div className="sk-chips"><span className="sk-chip on">전체</span><span className="sk-chip">참외·수박</span><span className="sk-chip">감귤·만감류</span><span className="sk-chip">사과·배</span></div><P n={1} /></div>
      <div className="sk-row between" style={{ position: 'relative' }}><span className="sk-s">상품 128개</span><span className="sk-chip">추천순 ▾</span><P n={2} /></div>
      <div style={{ position: 'relative' }}>
        <div className="sk-list"><Thumb s={56} /><div className="sk-col grow"><span className="sk-row"><span className="sk-badge">AD</span><span className="sk-s">○○농원</span></span><span className="sk-t">성주 꿀참외 2kg (5~7과)</span><span className="sk-t">19,900원</span><span className="sk-s">배송비 3,000원 · ★4.8 (212)</span></div><span className="sk-s">♡</span></div>
        <P n={3} />
      </div>
      <div style={{ position: 'relative' }}>
        <div className="sk-list"><Thumb s={56} /><div className="sk-col grow"><span className="sk-s">△△농장</span><span className="sk-t">제주 노지감귤 5kg 로얄과</span><span className="sk-row"><span className="sk-t">24,900원</span><span className="sk-s">무료배송</span></span><span className="sk-s">★4.6 (88)</span></div><span className="sk-s">♡</span></div>
        <div className="sk-list" style={{ opacity: .55 }}><Thumb s={56} /><div className="sk-col grow"><span className="sk-s">□□과수원</span><span className="sk-t">충주 사과 3kg</span><span className="sk-badge">품절</span></div></div>
        <P n={4} />
      </div>
      <Tab on="카테고리" />
    </>),
    pins: [
      { t: <>2단계 카테고리 칩 — 1단계(과일) 아래 세부 분류. 카테고리는 운영자가 관리합니다(요구사항).</>, go: ['s43'] },
      { t: <>개수·정렬 — 추천순(광고 상품 우선 + 판매량) / 판매량순 / 낮은 가격순 / 리뷰 많은순 / 최신순 <Prop/>. 검색 결과도 같은 화면 틀을 씁니다.</> },
      { t: <><b>광고 상품(상위 노출)</b> — 판매자가 산 광고 상품이 목록 맨 위 몇 칸에 「AD」 표시와 함께 나옵니다(요구사항 "상품 상위 노출" 예시). 몇 칸까지 광고로 쓸지는 06 논의 안건 <Prop/>.</>, go: ['s37'] },
      { t: <>상품 카드 — <b>판매자 이름</b>을 상품명 위에 둬 "어느 산지·업체 상품인지"를 먼저 보여줍니다(멀티셀러). 배송비는 판매자마다 달라서 카드에 함께 표시합니다. 찜(♡)은 바로 누를 수 있습니다.</>, go: ['s14'] },
    ],
    badges: <>{B.y('↕ 무한 스크롤')} {B.x('↔ 카테고리 칩 가로 스크롤')} {B.f('카테고리 칩 상단 고정')}</>,
    rows: [
      ['목적', <>카테고리나 검색어로 상품을 훑어보고 고른다(요구사항 "상품 카테고리 및 상품 검색").</>],
      ['구성 요소', <>상단 바(카테고리명·검색) / 2단계 칩 <span className="badge fixed">고정</span> / 개수·정렬 / 상품 카드(사진, 판매자명, 상품명, 가격, 배송비, 별점·리뷰 수, 찜, AD·품절 배지)</>],
      ['인터랙션', <>· 20개씩 이어 불러오기<br />· 찜 누름 → 로그인 전이면 <Go to="s11" />, 로그인 상태면 바로 반영(작은 토스트 「찜했어요」)<br />· 뒤로 왔을 때 스크롤 위치·정렬 유지</>],
      ['이동', <>상품 카드 → <Go to="s14" /> / 탭바 → <Go to="s12" /> · <Go to="s15" /> · <Go to="s18" /></>],
      ['상태', <>· 검색 0건: 「‘○○’ 상품이 없어요」 + 인기 검색어 <Prop/><br />· 품절: 흐리게 + 「품절」, 목록 맨 아래로 <Prop/><br />· 판매 중지·판매자 정지 상품: 목록에서 빠짐</>],
      ['문구', <>「상품 128개」 「추천순」 「무료배송」 「배송비 3,000원」 「품절」 「AD」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>검색 결과 화면에서 상단 검색창을 다시 누르면 검색어가 선택된 상태로 키보드가 올라와 바로 고쳐 쓸 수 있다. 목록을 스크롤하기 시작하면 키보드가 닫힌다.</> },
      { tag: 'UX · EDGE', body: <>· 검색은 상품명·판매자명·카테고리명 기준. 초성·오타 보정 같은 고급 검색은 1차 제외 <Prop/><br />· 같은 상품을 여러 판매자가 팔 때(가격 비교) 묶어 보여주는 기능은 1차 제외 — 외부 입점 확대 후 고도화 후보</> },
    ],
  },

  {
    id: 's14', no: '1.4', title: '상품 상세', sub: '원산지 · 판매자 · 옵션 · 리뷰 · 문의', lane, frame: 'phone',
    Wire: () => (<>
      <div style={{ position: 'relative' }}><div className="sk-img" style={{ minHeight: 96 }} /><span className="sk-chip" style={{ position: 'absolute', left: 6, top: 6 }}>‹</span><span className="sk-chip" style={{ position: 'absolute', right: 6, top: 6 }}>⌂ 🛒</span><P n={1} /></div>
      <div style={{ position: 'relative' }}>
        <span className="sk-s">○○농원 ›</span>
        <p className="sk-t lg">성주 꿀참외 2kg (5~7과)</p>
        <div className="sk-row"><span className="sk-t xl">19,900원</span><span className="sk-badge dark">원산지 국내산(경북 성주)</span></div>
        <P n={2} />
      </div>
      <div className="sk-card" style={{ position: 'relative' }}>
        <div className="sk-row between"><span className="sk-s">배송비</span><span className="sk-s">3,000원 · 4만원 이상 무료</span></div>
        <div className="sk-row between"><span className="sk-s">출고</span><span className="sk-s">평일 14시 전 주문 시 당일 출고</span></div>
        <div className="sk-row between"><span className="sk-s">배송</span><span className="sk-s">이 판매자 상품끼리만 함께 와요</span></div>
        <P n={3} />
      </div>
      <div style={{ position: 'relative' }}><div className="sk-chips"><span className="sk-chip on">상세정보</span><span className="sk-chip">리뷰 212</span><span className="sk-chip">문의 14</span><span className="sk-chip">배송·반품</span></div><P n={4} /></div>
      <div className="sk-line w95" /><div className="sk-line w80" />
      <div className="sk-bottom sk-row" style={{ position: 'relative', borderTop: '1px solid #E9E9E9', paddingTop: 7 }}>
        <span className="sk-btn line" style={{ flex: '0 0 40px' }}>♡</span><span className="sk-btn line grow">장바구니</span><span className="sk-btn grow">구매하기</span><P n={5} />
      </div>
    </>),
    pins: [
      { t: <>상품 사진 — 판매자가 올린 대표 사진 여러 장(넘겨 보기).</>, go: ['s33'] },
      { t: <>판매자·상품명·가격·<b>원산지</b> — 통신판매로 농수산물을 팔 때는 <b>원산지를 상품명·가격 표시 주변에 같은 크기 이상</b>으로 표시해야 합니다(국립수산물품질관리원 통신판매 원산지 표시 안내). 그래서 원산지를 가격 바로 옆에 고정 배치했습니다. 판매자 이름을 누르면 그 판매자 상품만 모아 봅니다 <Prop/>.</> },
      { t: <>배송 정보 — <b>판매자별 배송비·무료배송 기준·출고 기준</b>, 그리고 "이 판매자 상품끼리만 함께 온다"는 안내(묶음배송 미적용 요구사항을 고객 언어로). 무료배송 기준·출고 마감 시각 항목은 <Prop/> — 06 논의 안건.</> },
      { t: <>탭 — 상세정보(판매자 작성 + 상품정보제공고시) / 리뷰(요구사항) / 문의(요구사항) / 배송·교환·반품 안내(신선식품 반품 기준 고지 — 06 논의 안건).</>, go: ['s111'] },
      { t: <>하단 버튼 — 찜(요구사항) · 장바구니 · 구매하기. 누르면 옵션 선택 시트가 올라옵니다(중량·등급 옵션, 수량). 「구매하기」는 장바구니를 거치지 않고 바로 주문서로 갑니다.</>, go: ['s15', 's16'] },
    ],
    badges: <>{B.y()} {B.f('탭 줄 상단 고정 · 하단 버튼 고정')}</>,
    rows: [
      ['목적', <>이 상품을 살지 판단할 정보(가격·원산지·판매자·배송비·리뷰)를 한 화면에서 보고 담거나 산다.</>],
      ['구성 요소', <>사진 / 판매자명(링크) / 상품명 / 가격(할인가는 1차 제외 <Prop/>) / 원산지 <span className="badge fixed">가격 옆 고정</span> / 배송 정보 카드 / 탭 4개 <span className="badge fixed">고정</span> / 상품정보제공고시(농수산물 품목: 생산자·제조연월일·보관방법 등) / 찜·장바구니·구매하기 <span className="badge fixed">하단 고정</span></>],
      ['인터랙션', <>· 장바구니·구매하기 → 옵션 시트(옵션 선택 → 수량 → 합계) → 담기 완료 토스트 「장바구니에 담았어요 · 보기」<br />· 리뷰 탭: 사진 리뷰 먼저, 별점 분포<br />· 문의 탭: 「문의하기」 → <Go to="s111" />, 비밀글 선택 가능, 판매자 답변이 달리면 알림</>],
      ['이동', <>장바구니 → <Go to="s15" /> / 구매하기 → <Go to="s16" /> / 문의·리뷰 쓰기 → <Go to="s111" /> / 로그인 전 담기·구매 → <Go to="s11" /></>],
      ['상태', <>· 품절: 하단 버튼 대신 「품절 · 재입고 알림 받기」 <Prop/><br />· 옵션 일부 품절: 옵션 시트에서 그 옵션만 비활성<br />· 판매 중지된 상품(링크로 진입): 「지금은 판매하지 않는 상품이에요」</>],
      ['문구', <>「원산지 국내산(경북 성주)」 「4만원 이상 무료」 「이 판매자 상품끼리만 함께 와요」 「장바구니」 「구매하기」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>조회 화면이라 키보드가 올라오지 않는다. 옵션 시트의 수량은 −/+ 버튼으로만 바꾸고(숫자 키보드 없음), 최대 수량은 판매자 재고 또는 1회 최대 구매 수량 <Prop/>.</> },
      { tag: 'UX · EDGE', body: <>· 원산지는 판매자가 상품 등록 때 <b>필수 입력</b>하고, 상세 설명·상품정보고시와 일치해야 한다 — 판매자 상품 등록(<Go to="s33" />)에 같은 값 하나만 입력받아 세 곳에 함께 쓴다<br />· 플랫폼 운영사가 직접 파는 상품과 입점 판매자 상품을 소비자가 구분하게 하는 전자상거래법 개정안이 2026년 6월 발의됨 — 참여 기업 2곳의 상품 표시 방식 06 논의 안건</> },
    ],
  },

  {
    id: 's15', no: '1.5', title: '장바구니', sub: '판매자별로 나뉜 장바구니', lane, frame: 'phone',
    Wire: () => (<>
      <Top t="장바구니" back={false} />
      <div className="sk-row between" style={{ position: 'relative' }}><span className="sk-check on" style={{ padding: 0 }}>전체 선택 (3/3)</span><span className="sk-s">선택 삭제</span><P n={1} /></div>
      <div className="sk-card" style={{ position: 'relative' }}>
        <Seller n="○○농원" fee="배송비 3,000원" />
        <div className="sk-row"><span className="sk-check on" style={{ padding: 0 }} /><Thumb s={36} /><div className="sk-col grow"><span className="sk-s">성주 꿀참외 2kg</span><span className="sk-t">19,900원 · 1개</span></div></div>
        <div className="sk-row"><span className="sk-check on" style={{ padding: 0 }} /><Thumb s={36} /><div className="sk-col grow"><span className="sk-s">성주 방울토마토 1kg</span><span className="sk-t">9,900원 · 1개</span></div></div>
        <span className="sk-s">10,200원 더 담으면 이 판매자 배송비 무료</span>
        <P n={2} />
      </div>
      <div className="sk-card" style={{ position: 'relative' }}>
        <Seller n="△△수산" fee="무료배송" />
        <div className="sk-row"><span className="sk-check on" style={{ padding: 0 }} /><Thumb s={36} /><div className="sk-col grow"><span className="sk-s">완도 활전복 1kg (10~12미)</span><span className="sk-t">39,000원 · 1개</span></div></div>
        <P n={3} />
      </div>
      <div className="sk-bottom" style={{ position: 'relative', borderTop: '1px solid #E9E9E9', paddingTop: 6 }}>
        <div className="sk-sum"><span>상품 3개</span><span>68,800원</span></div>
        <div className="sk-sum"><span>배송비 (판매자 2곳)</span><span>3,000원</span></div>
        <div className="sk-sum tot"><span>결제 예정 금액</span><span>71,800원</span></div>
        <div className="sk-btn big" style={{ marginTop: 5 }}>71,800원 주문하기</div>
        <P n={4} />
      </div>
      <Tab on="장바구니" />
    </>),
    pins: [
      { t: <>전체 선택 — 고른 상품만 주문합니다. 고르지 않은 상품은 장바구니에 남습니다.</> },
      { t: <><b>판매자별 묶음</b> — 하나의 장바구니에 담겨도 상품은 <b>판매자 단위로 묶여</b> 보이고, 판매자마다 배송비가 따로 붙습니다(요구사항 "판매자별 배송비", "묶음배송 미적용"). 무료배송까지 남은 금액 안내 <Prop/>.</> },
      { t: <>두 번째 판매자 — 다른 판매자 상품은 다른 상자로 따로 옵니다. 여기서 이미 "판매자 2곳"이라는 사실을 보여줘, 나중에 송장이 2개인 이유를 설명할 필요가 없게 합니다.</> },
      { t: <>합계 — 상품 합계 + <b>판매자별 배송비 합계</b>. 결제는 한 번에 합니다(요구사항 "여러 판매자의 상품을 한 번에 주문").</>, go: ['s16'] },
    ],
    badges: <>{B.y()} {B.f('합계·주문 버튼 하단 고정')}</>,
    rows: [
      ['목적', <>여러 판매자 상품을 한 장바구니에서 모아 <b>한 번에 주문</b>하되, 판매자별 배송비를 미리 이해시킨다.</>],
      ['구성 요소', <>전체 선택·선택 삭제 / 판매자 묶음 카드 N개(판매자명, 판매자 배송비, 상품 줄: 체크·사진·이름·옵션·가격·수량, 무료배송 안내 <Prop/>) / 합계(상품·배송비·결제 예정) / 「○○원 주문하기」 <span className="badge fixed">하단 고정</span></>],
      ['인터랙션', <>· 수량 −/+, 옵션 변경(시트), 삭제(왼쪽으로 밀기 또는 ✕)<br />· 체크를 바꾸면 그 판매자 배송비와 합계가 즉시 다시 계산된다(판매자 상품을 모두 빼면 그 배송비도 빠짐)<br />· 장바구니는 로그인 계정에 저장 — PC·모바일 어디서나 같은 장바구니 <Prop/></>],
      ['이동', <>주문하기 → <Go to="s16" /> / 상품 줄 → <Go to="s14" /> / 판매자명 → 판매자 상품 모아 보기 <Prop/></>],
      ['상태', <>· 비어 있음: 「장바구니가 비었어요」 + 홈으로<br />· 담은 뒤 품절·판매 중지: 줄을 흐리게 + 「구매할 수 없는 상품」 묶음으로 내리고 체크 해제<br />· 가격 변경: 「담을 때보다 가격이 바뀌었어요」 한 줄</>],
      ['문구', <>「전체 선택」 「배송비 3,000원」 「10,200원 더 담으면 이 판매자 배송비 무료」 「배송비 (판매자 2곳)」 「71,800원 주문하기」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>입력 칸이 없어 키보드가 올라오지 않는다. 수량은 −/+ 버튼만.</> },
      { tag: 'UX · EDGE', body: <>· 도서산간(제주·섬) 추가 배송비는 배송지를 정해야 알 수 있으므로 장바구니에서는 「도서산간 추가 배송비 별도」 한 줄만, 실제 금액은 주문서에서 <Prop/><br />· 같은 판매자 안에서도 냉장·상온 상품이 섞이면 실제로는 따로 보낼 수 있다 — 1차는 <b>판매자 단위 배송비 1회</b>로 단순화(06 논의 안건)</> },
    ],
  },

  {
    id: 's16', no: '1.6', title: '주문서 · 결제', sub: '결제 1번 · 판매자별 확인', lane, frame: 'phone',
    Wire: () => (<>
      <Top t="주문서" />
      <div className="sk-card" style={{ position: 'relative' }}>
        <div className="sk-row between"><span className="sk-t">배송지 · 김고객</span><span className="sk-s">변경</span></div>
        <span className="sk-s">경기 수원시 ○○로 12 · 010-****-5678</span>
        <div className="sk-input sm">배송 요청사항 (문 앞에 놓아주세요)</div>
        <P n={1} />
      </div>
      <div style={{ position: 'relative' }}>
        <div className="sk-list"><span className="sk-t grow">○○농원 · 2개</span><span className="sk-s">29,800 + 배송 3,000</span></div>
        <div className="sk-list"><span className="sk-t grow">△△수산 · 1개</span><span className="sk-s">39,000 + 무료배송</span></div>
        <P n={2} />
      </div>
      <div style={{ position: 'relative' }}>
        <p className="sk-s">결제 수단</p>
        <div className="sk-grid2"><span className="sk-chip on" style={{ textAlign: 'center' }}>신용·체크카드</span><span className="sk-chip" style={{ textAlign: 'center' }}>카카오페이</span><span className="sk-chip" style={{ textAlign: 'center' }}>네이버페이</span><span className="sk-chip" style={{ textAlign: 'center' }}>토스페이</span></div>
        <P n={3} />
      </div>
      <div style={{ position: 'relative' }}>
        <div className="sk-sum"><span>상품 금액</span><span>68,800원</span></div>
        <div className="sk-sum"><span>배송비</span><span>3,000원</span></div>
        <div className="sk-sum tot"><span>최종 결제 금액</span><span>71,800원</span></div>
        <P n={4} />
      </div>
      <div className="sk-banner" style={{ position: 'relative' }}>
        <p className="sk-s">신선식품은 받은 뒤 단순 변심 반품이 어려워요. 상품 이상은 받은 날부터 ○일 안에 사진과 함께 알려 주세요.</p>
        <div className="sk-check on">주문 내용 확인 및 결제 동의 (필수)</div>
        <P n={5} />
      </div>
      <div className="sk-bottom"><div className="sk-btn big">71,800원 결제하기<P n={6} /></div></div>
    </>),
    pins: [
      { t: <>배송지 — 기본 배송지 자동 선택, 「변경」은 배송지 목록 시트(최대 10개) <Prop/>. 배송 요청사항은 <b>모든 판매자에게 같은 내용</b>으로 전달됩니다.</> },
      { t: <>판매자별 주문 요약 — 이 주문이 <b>판매자 2곳으로 나뉘어 처리된다</b>는 것을 결제 전에 한 번 더 보여줍니다. 판매자별 상품 금액·배송비.</> },
      { t: <>결제 수단 — 카드 + 간편결제(요구사항 "지원 가능한 간편결제"). 어떤 간편결제를 쓸 수 있는지는 PG 계약에 따라 달라 그린 4개는 예시입니다 <Prop/>. 결제 연동은 포트원 등 결제 연동 서비스 하나로 묶는 안 <Prop/>.</> },
      { t: <>금액 — 쿠폰·적립금 칸이 없습니다. 요구사항에 없어서이며, 1차에 넣을지 06 B에서 확인합니다.</> },
      { t: <><b>신선식품 반품 안내</b> + 결제 동의 — 단순 변심 청약철회를 제한하려면 사업자가 사전에 알려야 하므로 결제 직전에 보여줍니다. 문구·기한은 <Prop>법무 확인</Prop> — 06 논의 안건.</> },
      { t: <>결제하기 — PG 결제창 → 결제 승인 → 서버가 결제를 다시 확인한 뒤 <b>주문 1건 + 판매자 주문 2건</b>을 만듭니다.</>, go: ['s17'] },
    ],
    badges: <>{B.y()} {B.f('결제 버튼 하단 고정')}</>,
    rows: [
      ['목적', <>배송지·결제 수단을 정하고 <b>여러 판매자 상품을 한 번에 결제</b>한다.</>],
      ['구성 요소', <>배송지 카드(받는 사람·주소·연락처·요청사항) / 판매자별 주문 요약 / 결제 수단 / 금액(상품·배송비·도서산간 추가 <Prop/>·최종) / 반품 기준 고지·결제 동의 / 「○○원 결제하기」 <span className="badge fixed">하단 고정</span></>],
      ['인터랙션', <>· 결제 직전 서버가 재고·가격·판매 상태를 다시 확인 → 바뀐 게 있으면 결제 전에 알림<br />· 결제 성공 → 웹훅으로 결제 확인 → 주문 생성(판매자 주문 = 판매자 수만큼) → 재고 차감<br />· 결제 결과 화면에서 돌아오지 않고 창을 닫아도 서버가 결제 결과로 주문을 만든다</>],
      ['이동', <>결제 성공 → <Go to="s17" /> / 결제 실패·취소 → 이 화면에 머묾 / ‹ → <Go to="s15" /></>],
      ['상태', <>· 결제 실패: 「결제가 완료되지 않았어요」 — 주문은 만들어지지 않는다<br />· 결제 성공 + 주문 생성 실패(드묾): 자동 결제 취소 + 안내<br />· 결제 직전 품절 발견: 「○○ 상품이 방금 품절됐어요」 + 그 상품을 빼고 다시 계산<br />· 결제 처리 중: 전체 로딩, 버튼 두 번 누름 방지</>],
      ['문구', <>「주문서」 「배송 요청사항」 「최종 결제 금액」 「주문 내용 확인 및 결제 동의 (필수)」 「71,800원 결제하기」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>배송 요청사항 칸을 누르면 키보드가 올라오고 자주 쓰는 문구 칩(문 앞 · 경비실 · 직접 받기 <Prop/>)이 키보드 위에 뜬다. <b>결제 버튼은 키보드 위로 따라 올라오지 않는다</b>(실수 결제 방지). 새 배송지 입력은 주소 검색 → 상세 주소 칸 자동 포커스 → 숫자 키보드로 연락처.</> },
      { tag: 'UX · EDGE', body: <>· 결제는 1번이지만 이후 취소·환불은 판매자 주문 단위로 일어나므로 <b>PG 부분 취소</b>가 필수다 — 간편결제별 부분 취소 지원 여부를 PG 계약 전에 확인(06 B)<br />· 결제 대금을 누가 받고 판매자에게 어떻게 넘기는지(정산 구조)는 06 논의 안건 1번</> },
    ],
  },

  {
    id: 's17', no: '1.7', title: '주문 완료', sub: '판매자별로 따로 출발 안내', lane, frame: 'phone',
    Wire: () => (<>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 9, paddingTop: 18 }}>
        <div style={{ textAlign: 'center', position: 'relative' }}>
          <div className="sk-ic lg round" style={{ margin: '0 auto 8px' }} />
          <p className="sk-t xl">주문 완료</p>
          <p className="sk-s">주문번호 2610220012 · 71,800원</p>
          <P n={1} />
        </div>
        <div className="sk-card" style={{ position: 'relative' }}>
          <p className="sk-t">판매자 2곳에서 따로 보내드려요</p>
          <div className="sk-list"><span className="sk-badge dark">1</span><span className="sk-s grow">○○농원 · 참외 외 1개</span><span className="sk-s">오늘 출고 예정</span></div>
          <div className="sk-list" style={{ borderBottom: 0 }}><span className="sk-badge dark">2</span><span className="sk-s grow">△△수산 · 활전복</span><span className="sk-s">내일 출고 예정</span></div>
          <P n={2} />
        </div>
        <div className="sk-banner" style={{ position: 'relative' }}><p className="sk-s">알림을 켜면 판매자마다 출발·도착 소식을 알려드려요</p><div className="sk-btn sm line" style={{ marginTop: 4 }}>알림 켜기</div><P n={3} /></div>
      </div>
      <div className="sk-row" style={{ position: 'relative' }}><span className="sk-btn line grow">쇼핑 계속하기</span><span className="sk-btn grow">주문 상세 보기</span><P n={4} /></div>
    </>),
    pins: [
      { t: <>완료 메시지 — 고객에게 보이는 주문번호는 <b>하나</b>입니다(결제 단위). 판매자 주문 번호는 주문 상세에서 「-1」「-2」로 붙여 보여줍니다 <Prop/>.</> },
      { t: <><b>판매자별 출발 안내</b> — 상자가 따로 온다는 것을 완료 화면에서 다시 알려 "왜 하나만 왔죠?" 문의를 줄입니다. 출고 예정일은 판매자 출고 기준으로 계산 <Prop/>.</> },
      { t: <>알림 켜기 — 웹 푸시 권한을 아직 허용하지 않았을 때만 보입니다. iPhone은 <b>홈 화면에 추가한 웹앱에서만</b> 웹 푸시를 받을 수 있어(iOS 16.4 이상), 추가하지 않은 iPhone 사용자에게는 「홈 화면에 추가하기」 안내로 바뀝니다 <Prop/>.</> },
      { t: <>다음 행동 — 쇼핑 계속 / 주문 상세.</>, go: ['s19', 's12'] },
    ],
    badges: <>{B.f('화면 고정 · 스크롤 없음')}</>,
    rows: [
      ['목적', <>결제가 끝났고, 주문이 <b>판매자별로 나뉘어 따로 배송</b>된다는 것을 알린다.</>],
      ['구성 요소', <>완료 아이콘·주문번호·결제 금액 / 판매자별 출발 안내 카드 / 알림 켜기 띠(권한 미허용 시) <Prop/> / 「쇼핑 계속하기」「주문 상세 보기」</>],
      ['인터랙션', <>· 「알림 켜기」 → 브라우저 알림 권한 창(사용자가 버튼을 눌렀을 때만 띄울 수 있음)<br />· 뒤로가기 → 홈(결제 화면으로 돌아가지 않음)</>],
      ['이동', <>주문 상세 → <Go to="s19" /> / 쇼핑 계속 → <Go to="s12" /></>],
      ['상태', <>· 이미 알림 허용: 알림 띠 숨김<br />· iPhone + 홈 화면 미추가: 띠 문구가 「홈 화면에 추가하면 배송 알림을 받을 수 있어요」로</>],
      ['문구', <>「주문 완료」 「판매자 2곳에서 따로 보내드려요」 「오늘 출고 예정」 「알림 켜기」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>입력이 없는 화면이라 키보드가 올라오지 않는다.</> },
      { tag: 'UX · EDGE', body: <>· 웹 푸시를 못 받는 고객(권한 거부·iPhone 미설치)에게 주문·배송 소식을 무엇으로 알릴지 — 요구사항의 알림 채널은 "알림 기능"뿐이라 알림톡·문자 포함 여부 06 B 확인<br />· 주문 접수 이메일 발송 <Prop/></> },
    ],
  },

  {
    id: 's18', no: '1.8', title: '주문 내역', sub: '판매자 주문 단위 상태', lane, frame: 'phone',
    Wire: () => (<>
      <Top t="주문 내역" back={false} />
      <div style={{ position: 'relative' }}><div className="sk-chips"><span className="sk-chip on">전체</span><span className="sk-chip">배송 중</span><span className="sk-chip">취소·반품·교환</span><span className="sk-chip">3개월 ▾</span></div><P n={1} /></div>
      <div className="sk-card" style={{ position: 'relative' }}>
        <div className="sk-row between"><span className="sk-t">10.22 주문 · 71,800원</span><span className="sk-s">상세 ›</span></div>
        <div className="sk-list"><Thumb s={34} /><div className="sk-col grow"><span className="sk-s">○○농원 · 참외 외 1개</span><span className="sk-badge dark" style={{ alignSelf: 'flex-start' }}>배송 중</span></div><span className="sk-btn sm line">배송 조회</span></div>
        <div className="sk-list" style={{ borderBottom: 0 }}><Thumb s={34} /><div className="sk-col grow"><span className="sk-s">△△수산 · 활전복</span><span className="sk-badge" style={{ alignSelf: 'flex-start' }}>상품 준비 중</span></div><span className="sk-btn sm line">취소</span></div>
        <P n={2} />
      </div>
      <div className="sk-card" style={{ position: 'relative' }}>
        <div className="sk-row between"><span className="sk-t">10.15 주문 · 24,900원</span><span className="sk-s">상세 ›</span></div>
        <div className="sk-list" style={{ borderBottom: 0 }}><Thumb s={34} /><div className="sk-col grow"><span className="sk-s">△△농장 · 감귤 5kg</span><span className="sk-badge" style={{ alignSelf: 'flex-start' }}>배송 완료</span></div><div className="sk-col"><span className="sk-btn sm">구매 확정</span><span className="sk-btn sm line">리뷰 쓰기</span></div></div>
        <P n={3} />
      </div>
      <Tab on="주문" />
    </>),
    pins: [
      { t: <>필터 — 전체 / 배송 중 / 취소·반품·교환 / 기간. 요구사항 "주문 내역 및 배송 조회".</> },
      { t: <><b>한 주문 안에 판매자 주문이 줄로 나뉩니다</b> — 줄마다 상태가 다르고(배송 중 / 상품 준비 중), 할 수 있는 행동도 다릅니다. 출고 전이면 「취소」, 출고 후면 「배송 조회」.</>, go: ['s19', 's110'] },
      { t: <>배송 완료 줄 — 「구매 확정」과 「리뷰 쓰기」. 구매 확정은 정산 시점의 기준이 되어 넣은 <Prop/> 상태입니다(배송 완료 후 ○일이 지나면 자동 확정 — 06 논의 안건).</>, go: ['s111'] },
    ],
    badges: <>{B.y()} {B.x('↔ 필터 칩 가로 스크롤')} {B.f('필터 상단 고정 · 탭바 고정')}</>,
    rows: [
      ['목적', <>고객이 자기 주문을 <b>판매자 주문 단위</b>로 보고, 그 자리에서 다음 행동(취소·배송 조회·구매 확정·리뷰)을 한다.</>],
      ['구성 요소', <>필터 칩 / 주문 카드(주문일·결제 금액) 안에 판매자 주문 줄(사진, 판매자·상품, 상태 배지, 상태별 버튼)</>],
      ['인터랙션', <>· 상태별 버튼: 결제 완료·상품 준비 중 → 「취소」 / 배송 중 → 「배송 조회」 / 배송 완료 → 「구매 확정」「반품·교환」「리뷰 쓰기」 / 구매 확정 → 「리뷰 쓰기」<br />· 「구매 확정」 → 확인 시트(「확정하면 반품·교환을 신청할 수 없어요」) <Prop/><br />· 20건씩 이어 불러오기</>],
      ['이동', <>주문 카드·상세 → <Go to="s19" /> / 취소·반품·교환 → <Go to="s110" /> / 리뷰 쓰기 → <Go to="s111" /> / 로그인 전 → <Go to="s11" /></>],
      ['상태', <>· 주문 0건: 「아직 주문이 없어요」 + 쇼핑하러 가기<br />· 취소 완료 줄: 흐리게 + 「취소 완료 · 환불 완료」<br />· 상태 이름은 고객·판매자·운영자 화면 모두 같은 단어(01 상태 정의)</>],
      ['문구', <>「주문 내역」 「결제 완료」 「상품 준비 중」 「배송 중」 「배송 완료」 「구매 확정」 「취소 완료」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>입력이 없는 화면이라 키보드가 올라오지 않는다.</> },
      { tag: 'UX · EDGE', body: <>· 비회원 주문은 요구사항에 없어 그리지 않았다 — 넣으면 「주문번호 + 연락처로 조회」 화면이 하나 더 필요(06 B)<br />· 배송 상태는 택배사 조회 결과로 자동 갱신(배송 중 → 배송 완료) <Prop/></> },
    ],
  },

  {
    id: 's19', no: '1.9', title: '주문 상세 · 배송 조회', sub: '판매자별 송장 · 결제 · 환불', lane, frame: 'phone',
    Wire: () => (<>
      <Top t="주문 상세" />
      <div className="sk-row between" style={{ position: 'relative' }}><span className="sk-s">주문번호 2610220012 · 10.22</span><span className="sk-s">71,800원</span><P n={1} /></div>
      <div className="sk-card" style={{ position: 'relative' }}>
        <Seller n="○○농원 · 2610220012-1" fee="" />
        <span className="sk-badge dark" style={{ alignSelf: 'flex-start' }}>배송 중</span>
        <div className="sk-steps"><i className="on" /><i className="on" /><i className="on" /><i /></div>
        <div className="sk-row between"><span className="sk-s">CJ대한통운 6012****3412</span><span className="sk-s">복사</span></div>
        <div className="sk-list"><span className="sk-s grow">10.23 08:12 수원 Hub 도착</span></div>
        <div className="sk-list" style={{ borderBottom: 0 }}><span className="sk-s grow">10.22 18:40 성주 집하</span></div>
        <P n={2} />
      </div>
      <div className="sk-card" style={{ position: 'relative' }}>
        <Seller n="△△수산 · 2610220012-2" fee="" />
        <span className="sk-badge" style={{ alignSelf: 'flex-start' }}>상품 준비 중</span>
        <span className="sk-s">출고 전에는 바로 취소할 수 있어요</span>
        <div className="sk-row"><span className="sk-btn sm line grow">주문 취소</span><span className="sk-btn sm line grow">판매자 문의</span></div>
        <P n={3} />
      </div>
      <div className="sk-card" style={{ position: 'relative' }}>
        <div className="sk-row between"><span className="sk-s">결제</span><span className="sk-t">신용카드 71,800원</span></div>
        <div className="sk-row between"><span className="sk-s">배송지</span><span className="sk-s">수원시 ○○로 12</span></div>
        <P n={4} />
      </div>
    </>),
    pins: [
      { t: <>주문 요약 — 결제 단위 주문번호·주문일·결제 금액.</> },
      { t: <><b>판매자 주문 1</b> — 판매자별 번호(-1), 상태, 진행 단계(결제 완료 → 상품 준비 중 → 배송 중 → 배송 완료), 택배사·송장번호, <b>배송 추적 내역</b>. 택배 조회는 배송조회 API(예: 스마트택배 API)로 화면 안에서 보여줍니다 <Prop/>.</>, go: ['s34'] },
      { t: <>판매자 주문 2 — 아직 출고 전이라 「주문 취소」가 바로 됩니다(판매자 확인 없이 즉시 취소·환불 <Prop/>). 판매자 문의는 상품 문의로 연결.</>, go: ['s110', 's111'] },
      { t: <>결제·배송지 — 결제 수단·금액, 부분 취소가 있으면 「환불 19,900원 · 10.23」 줄이 추가됩니다.</> },
    ],
    badges: <>{B.y()}</>,
    rows: [
      ['목적', <>주문 1건의 <b>판매자별 상태·송장·배송 추적</b>과 결제·환불 내역을 확인하고, 판매자 주문별로 취소·반품·교환을 시작한다.</>],
      ['구성 요소', <>주문 요약 / 판매자 주문 카드 N개(번호, 상태 배지, 진행 단계, 택배사·송장, 추적 내역, 상태별 버튼) / 결제 정보(수단·금액·환불 줄) / 배송지</>],
      ['인터랙션', <>· 송장 「복사」<br />· 추적 내역은 최근 2줄 + 「전체 보기」<br />· 상태별 버튼은 <Go to="s18" />과 같은 규칙<br />· 배송 완료 판정: 택배사 조회 결과 「배달 완료」를 받으면 자동 변경 <Prop/></>],
      ['이동', <>주문 취소·반품·교환 → <Go to="s110" /> / 판매자 문의 → <Go to="s111" /> / ‹ → <Go to="s18" /></>],
      ['상태', <>· 송장 미입력(상품 준비 중): 「판매자가 상품을 준비하고 있어요」<br />· 택배 조회 실패: 「택배사 조회가 잠시 안 돼요 · 택배사에서 보기」(택배사 사이트 링크)<br />· 부분 취소 완료: 해당 판매자 카드 「취소 완료 · 19,900원 환불」</>],
      ['문구', <>「주문 상세」 「출고 전에는 바로 취소할 수 있어요」 「주문 취소」 「판매자 문의」 「복사」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>입력이 없는 화면이라 키보드가 올라오지 않는다. 송장번호를 길게 눌러도 복사된다.</> },
      { tag: 'UX · EDGE', body: <>· 판매자가 송장을 잘못 입력하면 조회 결과가 없다 — 「송장 정보를 확인하고 있어요」 상태로 두고 판매자 센터에 「조회 안 되는 송장」 표시 <Prop/><br />· 판매자가 직접 배송(퀵·자체 차량)하는 경우는 1차 범위에서 제외 — 택배 송장만 <Prop/></> },
    ],
  },

  {
    id: 's110', no: '1.10', title: '취소 · 교환 · 반품 신청', sub: '판매자 주문 단위', lane, frame: 'phone',
    Wire: () => (<>
      <Top t="반품 · 교환 신청" />
      <div className="sk-card" style={{ position: 'relative' }}>
        <span className="sk-s">○○농원 · 2610220012-1</span>
        <div className="sk-row"><span className="sk-check on" style={{ padding: 0 }} /><Thumb s={32} /><span className="sk-s grow">성주 꿀참외 2kg × 1</span></div>
        <div className="sk-row"><span className="sk-check" style={{ padding: 0 }} /><Thumb s={32} /><span className="sk-s grow">방울토마토 1kg × 1</span></div>
        <P n={1} />
      </div>
      <div style={{ position: 'relative' }}>
        <div className="sk-chips"><span className="sk-chip on">반품(환불)</span><span className="sk-chip">교환</span></div>
        <div className="sk-col" style={{ gap: 0, marginTop: 4 }}>
          <span className="sk-check sk-radio on">상품이 상했거나 파손됐어요</span>
          <span className="sk-check sk-radio">다른 상품이 왔어요</span>
          <span className="sk-check sk-radio">단순 변심</span>
        </div>
        <P n={2} />
      </div>
      <div style={{ position: 'relative' }}>
        <div className="sk-row"><span className="sk-img sq" style={{ width: 40, minHeight: 40, flex: '0 0 40px' }} /><span className="sk-img sq" style={{ width: 40, minHeight: 40, flex: '0 0 40px', borderStyle: 'dashed' }} /><span className="sk-s">사진 (필수 · 최대 5장)</span></div>
        <div className="sk-input" style={{ minHeight: 40 }}>상세 내용</div>
        <P n={3} />
      </div>
      <div className="sk-card" style={{ position: 'relative' }}>
        <div className="sk-sum"><span>환불 예정 금액</span><span>19,900원</span></div>
        <div className="sk-sum"><span>반품 배송비</span><span>판매자 부담</span></div>
        <span className="sk-s">판매자가 확인한 뒤 처리돼요 (영업일 2일 이내)</span>
        <P n={4} />
      </div>
      <div className="sk-bottom"><div className="sk-btn big">반품 신청하기<P n={5} /></div></div>
    </>),
    pins: [
      { t: <>대상 상품 — <b>판매자 주문 하나 안에서</b> 상품을 고릅니다. 다른 판매자 상품은 이 화면에 섞이지 않습니다(요구사항 "판매자별 취소·환불").</> },
      { t: <>유형·사유 — 반품(환불) / 교환. 사유에 따라 반품 배송비 부담이 갈립니다(상품 문제 = 판매자, 단순 변심 = 고객). <b>신선식품 단순 변심 반품을 받을지</b>는 06 논의 안건 — 받지 않기로 하면 「단순 변심」 선택지는 출고 후 숨깁니다 <Prop/>.</> },
      { t: <>사진·내용 — 신선식품 상태 문제는 사진이 판단 근거라 <b>사진 필수</b> <Prop/>.</> },
      { t: <>예상 금액 — 환불 예정 금액과 반품 배송비 부담. 판매자 처리 기한(영업일 2일)은 <Prop/>.</>, go: ['s35'] },
      { t: <>신청 — 판매자 센터 취소·반품 처리 목록에 들어가고, 판매자가 승인하면 PG 부분 취소로 환불됩니다.</>, go: ['s35'] },
    ],
    badges: <>{B.y()} {B.f('신청 버튼 하단 고정')}</>,
    rows: [
      ['목적', <>고객이 판매자 주문 단위로 <b>취소·교환·반품</b>을 신청한다(요구사항 "취소·교환·반품·환불 처리").</>],
      ['구성 요소', <>대상 상품 체크 / 유형(반품·교환) / 사유 라디오 / 사진 첨부 / 상세 내용 / 예상 환불·배송비 부담 / 처리 안내 / 신청 버튼 <span className="badge fixed">하단 고정</span><br />· <b>출고 전 취소</b>는 이 화면 대신 확인 시트 하나로 끝난다(즉시 취소·환불) <Prop/><br />· 교환은 같은 옵션 재발송만(다른 상품으로 교환 없음) <Prop/></>],
      ['인터랙션', <>· 수량이 2개 이상이면 일부 수량만 신청 가능<br />· 사유를 바꾸면 반품 배송비 부담 줄이 즉시 바뀐다<br />· 신청 후 상태: 반품 요청 → (수거 <Prop/>) → 반품 완료·환불 / 교환 요청 → 재발송 → 교환 완료<br />· 판매자가 거부하면 사유와 함께 알림, 운영자 중재 요청 버튼 <Prop/></>],
      ['이동', <>신청 완료 → <Go to="s19" />(상태 갱신) / 판매자 처리 → <Go to="s35" /> / 분쟁 → 운영자 <Go to="s45" /></>],
      ['상태', <>· 구매 확정 후: 신청 불가 + 「구매 확정된 주문은 판매자 문의로 연락해 주세요」<br />· 신청 기한 지남(배송 완료 후 ○일): 신청 불가 <Prop/><br />· 사진 업로드 실패: 그 사진만 다시 시도</>],
      ['문구', <>「반품(환불)」 「교환」 「상품이 상했거나 파손됐어요」 「사진 (필수 · 최대 5장)」 「환불 예정 금액」 「반품 신청하기」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>상세 내용 칸을 누르면 키보드가 올라오고, 신청 버튼은 키보드 위로 따라 올라오지 않는다. 500자 제한 + 글자 수 표시. 키보드 「완료」 또는 빈 곳을 누르면 닫힌다.</> },
      { tag: 'UX · EDGE', body: <>· 반품 상품 수거(회수 택배 접수)는 판매자가 직접 하는 것으로 가정 — 택배사 반품 접수 API 연동은 1차 제외 <Prop/><br />· 신선식품은 <b>반품 상품을 돌려받지 않고 환불만</b> 하는 경우가 많다(회수 의미 없음) — 판매자가 「회수 없이 환불」을 고를 수 있게 <Prop/></> },
    ],
  },

  {
    id: 's111', no: '1.11', title: '리뷰 · 상품 문의 작성', sub: '구매 확정 후 리뷰 · 누구나 문의', lane, frame: 'phone',
    Wire: () => (<>
      <Top t="리뷰 쓰기" />
      <div className="sk-row" style={{ position: 'relative' }}><Thumb s={38} /><div className="sk-col"><span className="sk-s">△△농장</span><span className="sk-t">제주 노지감귤 5kg 로얄과</span></div><P n={1} /></div>
      <div style={{ textAlign: 'center', position: 'relative' }}><span className="sk-t xl">★ ★ ★ ★ ☆</span><P n={2} /></div>
      <div style={{ position: 'relative' }}>
        <div className="sk-chips wrap"><span className="sk-chip on">당도 좋아요</span><span className="sk-chip">신선해요</span><span className="sk-chip on">포장 꼼꼼</span><span className="sk-chip">크기 고르지 않아요</span></div>
        <P n={3} />
      </div>
      <div style={{ position: 'relative' }}>
        <div className="sk-input" style={{ minHeight: 56, alignItems: 'flex-start' }}>맛·신선도·포장은 어땠나요? (10자 이상)</div>
        <div className="sk-row"><span className="sk-img sq" style={{ width: 40, minHeight: 40, flex: '0 0 40px', borderStyle: 'dashed' }} /><span className="sk-s">사진 추가 (최대 5장)</span></div>
        <P n={4} />
      </div>
      <div className="sk-div" />
      <div className="sk-banner" style={{ position: 'relative' }}>
        <p className="sk-t">상품 문의 (상품 상세 → 문의 탭)</p>
        <p className="sk-s">문의 유형 · 내용 · 🔒 비밀글 — 판매자가 답변하면 알림</p>
        <P n={5} />
      </div>
      <div className="sk-bottom"><div className="sk-btn big">리뷰 등록</div></div>
    </>),
    pins: [
      { t: <>대상 상품 — 판매자·상품명. 리뷰는 <b>구매 확정(또는 배송 완료)한 상품</b>만 쓸 수 있습니다 <Prop/>.</> },
      { t: <>별점 — 1~5. 상품 상세와 목록의 평균 별점이 됩니다.</>, go: ['s14'] },
      { t: <>빠른 평가 칩 — 농수산물 리뷰에서 자주 나오는 항목(당도·신선도·포장·크기)을 골라 쓰게 합니다 <Prop/>. 칩 목록은 카테고리별로 운영자가 관리.</> },
      { t: <>본문·사진 — 10자 이상, 사진 최대 5장. 사진 리뷰가 상세에서 먼저 보입니다.</> },
      { t: <><b>상품 문의</b> — 요구사항 "상품 문의". 상품 상세 문의 탭의 「문의하기」로 같은 틀(유형·내용·비밀글)을 엽니다. 답변은 <b>판매자</b>가 판매자 센터에서 다는 것으로 가정 <Prop/> — 06 B 확인.</>, go: ['s32'] },
    ],
    badges: <>{B.y()} {B.f('등록 버튼 하단 고정')}</>,
    rows: [
      ['목적', <>구매한 상품의 리뷰를 남기고, 사기 전 궁금한 점을 판매자에게 묻는다(요구사항 "상품 리뷰 및 상품 문의").</>],
      ['구성 요소', <>리뷰: 대상 상품 / 별점 / 빠른 평가 칩 <Prop/> / 본문 / 사진 / 등록 <span className="badge fixed">하단 고정</span><br />문의: 문의 유형(상품·배송·기타) <Prop/> / 내용 / 비밀글 / 등록</>],
      ['인터랙션', <>· 리뷰 수정은 작성 후 30일까지, 삭제는 언제든 <Prop/><br />· 문의는 답변 전까지 수정 가능, 답변 달리면 웹 푸시·알림함<br />· 부적절한 리뷰·문의는 운영자가 숨김 <Prop/></>],
      ['이동', <>등록 → 보던 화면(<Go to="s18" /> 또는 <Go to="s14" /> 리뷰·문의 탭) / 판매자 답변 → 판매자 센터 <Go to="s32" /></>],
      ['상태', <>· 리뷰 이미 작성: 「리뷰 수정」으로 바뀜<br />· 10자 미만: 등록 버튼 비활성 + 남은 글자 수<br />· 반품·환불된 상품: 리뷰 쓰기 숨김</>],
      ['문구', <>「리뷰 쓰기」 「맛·신선도·포장은 어땠나요?」 「사진 추가 (최대 5장)」 「비밀글」 「리뷰 등록」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>본문 칸을 누르면 키보드가 올라오고 화면이 본문 칸까지 자동 스크롤. 등록 버튼은 키보드 위에 붙는다(리뷰는 실수 등록해도 수정 가능해서 결제 화면과 달리 붙임). 키보드 「완료」 = 닫기.</> },
      { tag: 'UX · EDGE', body: <>· 리뷰 적립금 같은 보상은 적립금 기능이 요구사항에 없어 그리지 않았다<br />· 판매자가 리뷰에 답글을 다는 기능은 1차 제외 <Prop/></> },
    ],
  },

  {
    id: 's112', no: '1.12', title: '마이 · 찜 · 알림', sub: '찜 목록 · 알림함 · 공지', lane, frame: 'phone',
    Wire: () => (<>
      <Top t="마이" back={false} right={<span className="sk-s">설정</span>} />
      <div className="sk-row" style={{ position: 'relative' }}><span className="sk-img av" /><div className="sk-col grow"><span className="sk-t">김고객님</span><span className="sk-s">카카오 로그인</span></div><P n={1} /></div>
      <div className="sk-grid3" style={{ position: 'relative', textAlign: 'center' }}>
        <div className="sk-card"><span className="sk-t">2</span><span className="sk-s">배송 중</span></div>
        <div className="sk-card"><span className="sk-t">5</span><span className="sk-s">찜</span></div>
        <div className="sk-card"><span className="sk-t">1</span><span className="sk-s">리뷰 쓸 상품</span></div>
        <P n={2} />
      </div>
      <div style={{ position: 'relative' }}>
        <p className="sk-t">찜한 상품</p>
        <div className="sk-row" style={{ gap: 6 }}>{[1, 2, 3].map((i) => <span key={i} className="sk-img" style={{ flex: '0 0 62px', minHeight: 54 }} />)}</div>
        <P n={3} />
      </div>
      <div style={{ position: 'relative' }}>
        <p className="sk-t">알림</p>
        <div className="sk-list"><span className="sk-badge dark">배송</span><span className="sk-s grow">○○농원 상품이 출발했어요</span><span className="sk-s">2시간</span></div>
        <div className="sk-list"><span className="sk-badge">문의</span><span className="sk-s grow">△△수산이 문의에 답변했어요</span><span className="sk-s">어제</span></div>
        <P n={4} />
      </div>
      <div style={{ position: 'relative' }}>
        <div className="sk-list"><span className="sk-s grow">공지사항</span><span className="sk-s">›</span></div>
        <div className="sk-list"><span className="sk-s grow">배송지 관리 · 알림 설정 · 로그아웃 · 탈퇴</span><span className="sk-s">›</span></div>
        <P n={5} />
      </div>
      <Tab on="마이" />
    </>),
    pins: [
      { t: <>계정 — 이름·로그인 방식.</>, go: ['s11'] },
      { t: <>요약 숫자 — 배송 중·찜·리뷰 쓸 상품. 누르면 각 목록으로 갑니다.</>, go: ['s18'] },
      { t: <>찜한 상품 — 요구사항 "찜하기". 전체 보기에서 품절 여부·가격 확인, 바로 장바구니 담기.</>, go: ['s14'] },
      { t: <>알림함 — 요구사항 "알림 기능". 주문·배송·취소/반품 처리·문의 답변·공지. 웹 푸시를 못 받는 고객도 여기서 다 확인할 수 있어야 해서 <b>알림함은 푸시와 별개로 항상 쌓입니다</b> <Prop/>.</>, go: ['s48'] },
      { t: <>공지사항·설정 — 공지(요구사항), 배송지 관리, 알림 종류별 켜기/끄기 <Prop/>, 로그아웃, 탈퇴.</>, go: ['s48'] },
    ],
    badges: <>{B.y()} {B.x('↔ 찜 가로 스크롤')} {B.f('탭바 고정')}</>,
    rows: [
      ['목적', <>내 정보·찜·알림·공지를 한곳에서 본다.</>],
      ['구성 요소', <>계정 / 요약 3칸 / 찜한 상품(가로) / 알림함 최근 N개 / 공지사항 / 배송지 관리 / 알림 설정 / 로그아웃 / 탈퇴</>],
      ['인터랙션', <>· 알림을 누르면 해당 주문 상세·문의·공지로 이동, 읽음 처리<br />· 알림 설정: 주문·배송(끌 수 없음 <Prop/>) / 문의 답변 / 혜택·광고(선택 동의 필요)</>],
      ['이동', <>찜 → <Go to="s14" /> / 배송 알림 → <Go to="s19" /> / 공지 → 공지 상세(운영자 <Go to="s48" />에서 작성)</>],
      ['상태', <>· 찜 0개: 「마음에 드는 상품에 ♡를 눌러 보세요」<br />· 알림 0개: 「새 알림이 없어요」<br />· 탈퇴: 진행 중인 주문(배송 전·반품 중)이 있으면 탈퇴 불가 안내</>],
      ['문구', <>「찜한 상품」 「알림」 「공지사항」 「배송지 관리」 「알림 설정」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>입력이 없는 화면이라 키보드가 올라오지 않는다.</> },
      { tag: 'UX · EDGE', body: <>· 광고성 푸시(혜택 알림)는 수신 동의를 받은 고객에게만, 야간(21~08시) 발송 금지 — 정보통신망법 규정, 운영자 알림 발송 화면에서 막는다 <Prop/></> },
    ],
  },
];
