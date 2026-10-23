/* 4. 운영자 웹 관리자 (PC) — 판매자·회원·상품·주문·환불·수익모델·정산·공지 */
import { P, Go, Prop, B } from '../doc/kit.jsx';

const lane = '운영자 관리자';
const MENU = ['판매자', '회원', '상품 · 카테고리', '주문 · 배송', '취소 · 반품 · 환불', '수수료 · 입점료 · 광고', '정산', '공지 · 알림'];

const Shell = ({ on, children, gnbPin }) => (<>
  <div className="sk-nav"><span className="sk-t">운영자 관리자</span><span className="grow" /><span className="sk-input sm" style={{ flex: '0 0 190px' }}>주문번호·판매자·회원 검색</span><span className="sk-ic round" /><span className="sk-s">운영팀</span></div>
  <div style={{ display: 'flex', gap: 10, flex: 1, minHeight: 0 }}>
    <div className="sk-gnb" style={{ position: 'relative' }}>
      <span className="sk-s">대시보드</span>
      {MENU.map((m) => <span key={m} className={m === on ? 'sk-t' : 'sk-s'}>{m}</span>)}
      {gnbPin}
    </div>
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>{children}</div>
  </div>
</>);
const Th = ({ cols }) => <div className="sk-th">{cols.map(([t, w]) => <span key={t} className="sk-s" style={{ flex: w ? `0 0 ${w}px` : 1 }}>{t}</span>)}</div>;
const Tr = ({ cells }) => <div className="sk-list">{cells.map(([t, w, cls = 'sk-s'], i) => <span key={i} className={cls} style={{ flex: w ? `0 0 ${w}px` : 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t}</span>)}</div>;
const Panel = ({ children, w = 170 }) => <div style={{ flex: `0 0 ${w}px`, border: '1.5px solid #C9C9C9', borderRadius: 10, padding: 9, display: 'flex', flexDirection: 'column', gap: 6, position: 'relative' }}>{children}</div>;

export const admin = [
  {
    id: 's41', no: '4.1', title: '판매자 입점 심사 · 관리', sub: '운영자 첫 화면', lane, frame: 'pc',
    Wire: () => (
      <Shell on="판매자" gnbPin={<P n={1} />}>
        <div className="sk-row between" style={{ position: 'relative' }}>
          <div className="sk-chips"><span className="sk-chip on">심사 대기 3</span><span className="sk-chip">운영 중 2</span><span className="sk-chip">정보 변경 요청 1</span><span className="sk-chip">정지</span><span className="sk-chip">반려</span></div>
          <span className="sk-btn sm line">＋ 판매자 직접 등록</span>
          <P n={2} />
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 1, minHeight: 0 }}>
          <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
            <Th cols={[['신청일', 46], ['상호'], ['품목', 46], ['지역', 52], ['상태', 50]]} />
            <Tr cells={[['10.21', 46], ['□□과수원', 0, 'sk-t'], ['과일', 46], ['충북', 52], [<span className="sk-badge">심사 대기</span>, 50]]} />
            <Tr cells={[['10.20', 46], ['◇◇건어물', 0, 'sk-t'], ['수산', 46], ['전남', 52], [<span className="sk-badge">심사 대기</span>, 50]]} />
            <Tr cells={[['10.01', 46], ['○○농원', 0, 'sk-t'], ['과일', 46], ['경북', 52], [<span className="sk-badge dark">운영 중</span>, 50]]} />
            <P n={3} />
          </div>
          <Panel w={200}>
            <div className="sk-row between"><span className="sk-t">□□과수원</span><span className="sk-s">✕</span></div>
            <div className="sk-row between"><span className="sk-s">사업자번호</span><span className="sk-s">123-45-67890</span></div>
            <div className="sk-row between"><span className="sk-s">통신판매업</span><span className="sk-s">2026-충북-0123</span></div>
            <div className="sk-row"><span className="sk-img" style={{ flex: 1, minHeight: 50 }} /><span className="sk-img" style={{ flex: 1, minHeight: 50 }} /></div>
            <div className="sk-row between"><span className="sk-s">판매 수수료</span><span className="sk-input sm" style={{ flex: '0 0 60px' }}>10 %</span></div>
            <div className="sk-row"><span className="sk-btn sm line grow">반려</span><span className="sk-btn sm grow">승인</span></div>
            <P n={4} />
            <P n={5} style={{ top: 'auto', bottom: 6 }} />
          </Panel>
        </div>
      </Shell>
    ),
    pins: [
      { t: <>왼쪽 메뉴 — 요구사항의 운영자 관리자 항목을 8개 메뉴로 묶었습니다. 대시보드는 요구사항에 없어 자리만 <Prop/>.</>, go: ['s42', 's43', 's44', 's45', 's46', 's47', 's48'] },
      { t: <>상태 칩 + 직접 등록 — 심사 대기 / 운영 중 / 정보 변경 요청 / 정지 / 반려. 오픈 시점 참여 기업 2곳은 「판매자 직접 등록」으로 운영자가 바로 만드는 안 <Prop/>.</>, go: ['s31'] },
      { t: <>판매자 목록 — 신청일·상호·품목·지역·상태. 요구사항 "회원 및 판매자 관리", "판매자 입점 신청 확인 및 승인".</> },
      { t: <>심사 상세 — 판매자가 낸 정보와 <b>사업자등록증·통신판매업 신고증</b>을 나란히 보고 일치 여부를 확인합니다. 승인할 때 <b>이 판매자의 판매 수수료율</b>을 정합니다(판매자별 수수료 — 06 논의 안건).</>, go: ['s46'] },
      { t: <>승인 / 반려 — 승인하면 판매자 센터 이용 시작 + 담당자 알림, 반려는 사유 필수(판매자 화면에 그대로).</>, go: ['s31', 's32'] },
    ],
    badges: <>{B.y('↕ 목록·패널 각각 스크롤')} {B.f('상단바·왼쪽 메뉴 고정')}</>,
    rows: [
      ['목적', <>운영자가 입점 신청을 <b>심사·승인</b>하고, 운영 중인 판매자를 관리(정지·정보 변경 승인)한다.</>],
      ['구성 요소', <>상태 칩 / 직접 등록 <Prop/> / 판매자 표 / 오른쪽 상세(판매자 정보, 증빙 2종, 정산 계좌, 판매 수수료율, 입점료 적용 여부 <Prop/>, 승인·반려 또는 정지·해제)</>],
      ['인터랙션', <>· 증빙 이미지 클릭 → 크게 보기<br />· 정지 → 사유 필수, 그 판매자 상품 전체 고객 화면에서 숨김, 진행 중 주문은 계속 처리 가능 <Prop/><br />· 정보 변경 요청(상호·사업자번호·계좌) → 변경 전·후 비교 후 승인</>],
      ['이동', <>판매자 신청 → 이 화면(<Go to="s31" />) / 승인 후 → <Go to="s32" /> / 수수료 기본값 → <Go to="s46" /> / 판매자 정산 → <Go to="s47" /></>],
      ['상태', <>· 심사 대기 0건: 「심사할 신청이 없어요」<br />· 재신청: 「재신청」 배지 + 이전 반려 사유</>],
      ['문구', <>「심사 대기」 「운영 중」 「정보 변경 요청」 「판매자 직접 등록」 「반려 사유 (판매자에게 그대로 보여요)」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>PC: ↑↓ = 행 이동(패널 갱신), A = 승인 확인 창, R = 반려 사유, Esc = 닫기 <Prop/>. 「/」 = 통합 검색.</> },
      { tag: 'UX · EDGE', body: <>· 운영자 권한 등급(심사만·정산까지 등)은 요구사항에 없음 — 1차는 운영자 계정 모두 같은 권한 <Prop/>, 처리자 이름은 모든 이력에 남긴다<br />· 판매자 수가 늘면(외부 입점 확대) 목록은 서버 페이지 단위(50건)로 불러온다</> },
    ],
  },

  {
    id: 's42', no: '4.2', title: '회원 관리', sub: '고객 회원 조회 · 상태', lane, frame: 'pc',
    Wire: () => (
      <Shell on="회원">
        <div className="sk-row between" style={{ position: 'relative' }}>
          <div className="sk-chips"><span className="sk-chip on">전체 1,204</span><span className="sk-chip">이번 달 가입 312</span><span className="sk-chip">휴면</span><span className="sk-chip">이용 제한</span><span className="sk-chip">탈퇴</span></div>
          <span className="sk-input sm" style={{ flex: '0 0 150px' }}>이름·이메일·휴대폰</span>
          <P n={1} />
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 1, minHeight: 0 }}>
          <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
            <Th cols={[['이름', 54], ['이메일'], ['가입', 52], ['가입일', 52], ['주문', 34], ['상태', 46]]} />
            <Tr cells={[['김고객', 54], ['kim****@naver.com', 0, 'sk-t'], ['카카오', 52], ['10.02', 52], ['6', 34], [<span className="sk-badge dark">정상</span>, 46]]} />
            <Tr cells={[['이고객', 54], ['lee****@gmail.com', 0, 'sk-t'], ['Apple', 52], ['10.05', 52], ['2', 34], [<span className="sk-badge dark">정상</span>, 46]]} />
            <Tr cells={[['박고객', 54], ['park***@daum.net', 0, 'sk-t'], ['이메일', 52], ['09.28', 52], ['11', 34], [<span className="sk-badge">이용 제한</span>, 46]]} />
            <P n={2} />
          </div>
          <Panel w={180}>
            <div className="sk-row between"><span className="sk-t">김고객</span><span className="sk-s">✕</span></div>
            <div className="sk-chips"><span className="sk-chip on">정보</span><span className="sk-chip">주문</span><span className="sk-chip">리뷰·문의</span></div>
            <div className="sk-line w95" /><div className="sk-line w80" />
            <span className="sk-s">개인정보 전체 보기 (사유 입력)</span>
            <div className="sk-btn sm line">이용 제한</div>
            <P n={3} />
          </Panel>
        </div>
      </Shell>
    ),
    pins: [
      { t: <>상태 칩·검색 — 전체 / 이번 달 가입 / 휴면 <Prop/> / 이용 제한 <Prop/> / 탈퇴. 요구사항 "회원 관리".</> },
      { t: <>회원 목록 — 이름·이메일(가림)·가입 방식(카카오·네이버·Apple·이메일)·가입일·주문 수·상태.</> },
      { t: <>회원 상세 — 정보 / 주문 / 리뷰·문의. 개인정보는 목록에서 가리고 「전체 보기」를 누를 때 <b>열람 사유를 남깁니다</b> <Prop/>. 이용 제한(악성 반품 등) <Prop/>.</>, go: ['s44'] },
    ],
    badges: <>{B.y('↕ 목록·패널 각각 스크롤')} {B.f('상단바·왼쪽 메뉴 고정')}</>,
    rows: [
      ['목적', <>고객 회원을 조회하고, 문의 대응에 필요한 주문·리뷰 이력을 본다.</>],
      ['구성 요소', <>상태 칩 / 검색 / 회원 표 / 오른쪽 상세(정보·주문·리뷰문의 탭, 개인정보 전체 보기, 이용 제한)</>],
      ['인터랙션', <>· 행 클릭 → 상세 패널<br />· 개인정보 열람·내려받기 시 사유 입력 + 기록 <Prop/><br />· 이용 제한 → 사유 필수, 로그인 시 안내 <Prop/></>],
      ['이동', <>회원 주문 → <Go to="s44" />(회원 필터) / 리뷰 숨김 → 상품 리뷰 관리(<Go to="s43" />)</>],
      ['상태', <>· 검색 0건: 「조건에 맞는 회원이 없어요」<br />· 탈퇴 회원: 이름 가림, 주문·결제 기록은 법정 보관 기간 동안 유지</>],
      ['문구', <>「회원」 「가입 방식」 「이용 제한」 「개인정보 전체 보기」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>PC: 「/」 = 검색, ↑↓ = 행 이동, Esc = 패널 닫기.</> },
      { tag: 'UX · EDGE', body: <>· 1년 미접속 휴면 처리·분리 보관은 법 개정으로 의무가 아니게 됐지만 개인정보처리방침에 맞춰야 한다 — 1차 미적용 <Prop/>, 06 B<br />· 엑셀 내려받기는 개인정보 유출 위험 때문에 마스킹된 값으로만 <Prop/></> },
    ],
  },

  {
    id: 's43', no: '4.3', title: '상품 · 카테고리 관리', sub: '전체 상품 · 카테고리 · 검수', lane, frame: 'pc',
    Wire: () => (
      <Shell on="상품 · 카테고리">
        <div style={{ position: 'relative' }}><div className="sk-chips"><span className="sk-chip on">전체 상품</span><span className="sk-chip">검수 대기 4</span><span className="sk-chip">신고된 상품</span><span className="sk-chip">카테고리</span><span className="sk-chip">진열 관리</span></div><P n={1} /></div>
        <div style={{ display: 'flex', gap: 8, flex: 1, minHeight: 0 }}>
          <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
            <Th cols={[['판매자', 60], ['상품명'], ['원산지', 66], ['가격', 52], ['상태', 52]]} />
            <Tr cells={[['○○농원', 60], ['성주 꿀참외 2kg', 0, 'sk-t'], ['경북 성주', 66], ['19,900', 52], [<span className="sk-badge dark">판매 중</span>, 52]]} />
            <Tr cells={[['△△수산', 60], ['완도 활전복 1kg', 0, 'sk-t'], ['전남 완도', 66], ['39,000', 52], [<span className="sk-badge">검수 대기</span>, 52]]} />
            <Tr cells={[['△△농장', 60], ['제주 감귤 5kg', 0, 'sk-t'], ['제주', 66], ['24,900', 52], [<span className="sk-badge">품절</span>, 52]]} />
            <P n={2} />
          </div>
          <Panel w={180}>
            <span className="sk-t">카테고리</span>
            <span className="sk-s">≡ 과일 (128)</span>
            <span className="sk-s" style={{ paddingLeft: 10 }}>≡ 참외·수박 (12)</span>
            <span className="sk-s" style={{ paddingLeft: 10 }}>≡ 감귤·만감류 (31)</span>
            <span className="sk-s">≡ 채소 (64)</span>
            <span className="sk-s">≡ 수산 (40)</span>
            <div className="sk-btn sm line">＋ 카테고리 추가</div>
            <P n={3} />
          </Panel>
        </div>
        <div className="sk-banner" style={{ position: 'relative' }}><span className="sk-s">선택 상품 → 판매 중지 · 진열 섹션에 추가</span><P n={4} /></div>
      </Shell>
    ),
    pins: [
      { t: <>탭 — 전체 상품 / 검수 대기 <Prop/> / 신고된 상품 <Prop/> / 카테고리 / 진열 관리(홈 섹션) <Prop/>. 요구사항 "상품 및 카테고리 관리".</>, go: ['s12'] },
      { t: <>전체 상품 — 모든 판매자 상품을 한 표에서. <b>원산지 열</b>을 따로 둬 상품명과 원산지가 어긋난 상품을 찾기 쉽게 했습니다. 행 클릭 → 판매자 등록 화면과 같은 내용(운영자는 판매 중지만, 내용 수정은 판매자) <Prop/>.</>, go: ['s33'] },
      { t: <>카테고리 — 2단계 트리, 끌어서 순서 변경, 이름 변경, 숨김. 상품이 있는 카테고리는 삭제 대신 숨김.</>, go: ['s13'] },
      { t: <>일괄 처리 — 판매 중지(사유 필수, 판매자에게 알림) / 홈 진열 섹션에 추가.</> },
    ],
    badges: <>{B.y('↕ 목록·패널 각각 스크롤')} {B.f('상단바·왼쪽 메뉴 고정')}</>,
    rows: [
      ['목적', <>운영자가 플랫폼 전체 상품을 보고 문제 상품을 막으며, 카테고리와 홈 진열을 관리한다.</>],
      ['구성 요소', <>탭 5개 / 상품 표(판매자, 상품명, 원산지, 가격, 상태, 등록일) / 카테고리 트리 / 일괄 처리 / 진열 관리(섹션 이름·상품 고르기·순서)</>],
      ['인터랙션', <>· 판매자 상품 등록 시 바로 판매 vs 검수 후 노출은 06 논의 안건 — 검수로 정하면 「검수 대기」 탭에서 승인·반려<br />· 운영자 판매 중지 상품은 판매자가 다시 켤 수 없다<br />· 리뷰 신고 처리(숨김)도 이 메뉴 아래 <Prop/></>],
      ['이동', <>판매자 상품 → <Go to="s33" /> / 카테고리 → 고객 <Go to="s13" /> / 진열 → 고객 <Go to="s12" /></>],
      ['상태', <>· 검수 대기 0건: 「검수할 상품이 없어요」<br />· 정지된 판매자의 상품: 「판매자 정지로 숨김」 회색</>],
      ['문구', <>「전체 상품」 「검수 대기」 「카테고리」 「진열 관리」 「판매 중지」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>PC: 카테고리 트리에서 ↑↓ = 이동, Enter = 이름 바꾸기, Alt+↑↓ = 순서 변경 <Prop/>.</> },
      { tag: 'UX · EDGE', body: <>· 운영자가 상품 내용을 직접 고치면 판매자 책임 소재가 흐려진다 — 1차는 운영자 수정 없이 「판매 중지 + 수정 요청」만 <Prop/></> },
    ],
  },

  {
    id: 's44', no: '4.4', title: '주문 · 배송 관리', sub: '전체 주문 · 판매자별 분리 확인', lane, frame: 'pc',
    Wire: () => (
      <Shell on="주문 · 배송">
        <div className="sk-row between" style={{ position: 'relative' }}>
          <div className="sk-row"><span className="sk-input sm">10.15 ~ 10.22</span><span className="sk-chip">판매자 ▾</span></div>
          <div className="sk-chips"><span className="sk-chip on">전체</span><span className="sk-chip">결제 완료</span><span className="sk-chip">배송 중</span><span className="sk-chip">출고 지연 3</span><span className="sk-chip">구매 확정</span></div>
          <P n={1} />
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 1, minHeight: 0 }}>
          <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
            <Th cols={[['주문번호', 82], ['주문자', 44], ['판매자 주문'], ['결제', 56]]} />
            <Tr cells={[['2610220012', 82], ['김고객', 44], [<span className="sk-row"><span className="sk-badge dark">○○농원 배송 중</span><span className="sk-badge">△△수산 준비 중</span></span>], ['71,800', 56]]} />
            <Tr cells={[['2610220031', 82], ['이고객', 44], [<span className="sk-badge dark">○○농원 배송 중</span>], ['12,900', 56]]} />
            <Tr cells={[['2610210088', 82], ['박고객', 44], [<span className="sk-badge">○○농원 출고 지연</span>], ['36,900', 56]]} />
            <div className="sk-row between" style={{ borderTop: '1px solid #DDD', paddingTop: 4 }}><span className="sk-s">주문 212건 · 판매자 주문 268건</span><span className="sk-t">결제 합계 8,940,000원</span></div>
            <P n={2} />
          </div>
          <Panel w={190}>
            <div className="sk-row between"><span className="sk-t">2610220012</span><span className="sk-s">✕</span></div>
            <div className="sk-list"><span className="sk-s grow">결제 71,800 · 카드</span><span className="sk-s">10.22</span></div>
            <div className="sk-list"><span className="sk-s grow">-1 ○○농원 · CJ 6012**</span><span className="sk-s">배송 중</span></div>
            <div className="sk-list"><span className="sk-s grow">-2 △△수산</span><span className="sk-s">준비 중</span></div>
            <div className="sk-btn sm line">운영자 취소 · 환불</div>
            <P n={3} />
          </Panel>
        </div>
      </Shell>
    ),
    pins: [
      { t: <>기간·판매자·상태 필터 — 요구사항 "주문 및 배송 관리". 「출고 지연」 칩은 결제 후 정해진 기간 안에 송장이 없는 판매자 주문 <Prop/>.</>, go: ['s34'] },
      { t: <><b>주문 1건 = 판매자 주문 N개</b>를 한 줄에서 배지로 보여줍니다. 운영자는 결제 단위로 찾고, 판매자 단위로 상태를 봅니다. 아래 합계는 주문 수와 판매자 주문 수를 함께.</> },
      { t: <>주문 상세 — 결제 정보, 판매자 주문별 상태·송장·처리 이력. 고객 문의 대응용 「운영자 취소·환불」 <Prop/>(판매자 연락 두절 등 예외).</>, go: ['s19', 's45'] },
    ],
    badges: <>{B.y('↕ 목록·패널 각각 스크롤')} {B.f('필터·표 헤더·합계 고정')} {B.x('↔ 좁은 화면에서 표 가로 스크롤')}</>,
    rows: [
      ['목적', <>운영자가 플랫폼 전체 주문을 보고, <b>판매자별 분리가 제대로 됐는지</b>와 출고 지연을 확인한다(합격 기준: 판매자별 주문·배송 분리 처리).</>],
      ['구성 요소', <>기간·판매자 필터 / 상태 칩 / 주문 표(주문번호, 주문자, 판매자 주문 배지들, 결제 금액) / 합계 / 오른쪽 상세(결제, 판매자 주문별 상태·송장·이력, 운영자 취소·환불)</>],
      ['인터랙션', <>· 행 클릭 → 상세<br />· 판매자 주문 배지 클릭 → 그 판매자 주문만 펼침<br />· 주문 내려받기(엑셀) <Prop/></>],
      ['이동', <>고객 화면 → <Go to="s19" /> / 판매자 화면 → <Go to="s34" /> / 환불 → <Go to="s45" /> / 회원 → <Go to="s42" /></>],
      ['상태', <>· 결제 결과 미수신(웹훅 지연): 「결제 확인 중」 — 임의로 성공 처리하지 않는다<br />· 0건: 「조건에 맞는 주문이 없어요」</>],
      ['문구', <>「출고 지연」 「판매자 주문」 「결제 합계」 「운영자 취소 · 환불」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>PC: 「/」 = 검색(주문번호 붙여넣기 → Enter = 바로 상세), ↑↓ = 행 이동, Esc = 패널 닫기.</> },
      { tag: 'UX · EDGE', body: <>· 조회 기간 최대 3개월 <Prop/><br />· 운영자가 송장을 대신 입력하는 기능은 넣지 않는다(판매자 책임) <Prop/></> },
    ],
  },

  {
    id: 's45', no: '4.5', title: '취소 · 반품 · 환불 관리', sub: '환불 오류 · 중재 · 지연', lane, frame: 'pc',
    Wire: () => (
      <Shell on="취소 · 반품 · 환불">
        <div style={{ position: 'relative' }}><div className="sk-chips"><span className="sk-chip">전체</span><span className="sk-chip on">환불 확인 필요 1</span><span className="sk-chip">중재 요청 1</span><span className="sk-chip">처리 지연 2</span><span className="sk-chip">완료</span></div><P n={1} /></div>
        <div style={{ display: 'flex', gap: 8, flex: 1, minHeight: 0 }}>
          <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
            <Th cols={[['요청일', 44], ['유형', 38], ['판매자', 58], ['상품'], ['금액', 52], ['상태', 66]]} />
            <Tr cells={[['10.20', 44], ['반품', 38], ['○○농원', 58], ['꿀참외 4kg', 0, 'sk-t'], ['36,900', 52], [<span className="sk-badge">환불 실패</span>, 66]]} />
            <Tr cells={[['10.19', 44], ['반품', 38], ['△△수산', 58], ['전복 1kg', 0, 'sk-t'], ['39,000', 52], [<span className="sk-badge">중재 요청</span>, 66]]} />
            <P n={2} />
          </div>
          <Panel w={200}>
            <div className="sk-row between"><span className="sk-t">반품 · 2610200044-1</span><span className="sk-s">✕</span></div>
            <div className="sk-list"><span className="sk-s grow">고객 반품 신청</span><span className="sk-s">10.20 09:12</span></div>
            <div className="sk-list"><span className="sk-s grow">판매자 승인</span><span className="sk-s">10.20 15:40</span></div>
            <div className="sk-list"><span className="sk-s grow">PG 부분 취소 → 실패</span><span className="sk-s">15:40</span></div>
            <div className="sk-row"><span className="sk-btn sm line grow">계좌 환불로 처리</span><span className="sk-btn sm grow">다시 요청</span></div>
            <P n={3} />
          </Panel>
        </div>
      </Shell>
    ),
    pins: [
      { t: <>문제 건 중심 칩 — <b>환불 확인 필요</b>(PG 환불 실패) / <b>중재 요청</b>(판매자 거부에 고객 불복) / <b>처리 지연</b>(판매자가 기한 안에 처리 안 함) <Prop/>. 요구사항 "취소·교환·반품·환불 관리"를 운영자가 놓치면 안 되는 건 위주로 그렸습니다.</> },
      { t: <>요청 목록 — 유형·판매자·상품·금액·상태. 판매자별로 거르면 반품률이 높은 판매자를 볼 수 있습니다 <Prop/>.</>, go: ['s35'] },
      { t: <>처리 이력·조치 — 신청 → 판매자 처리 → 환불 결과를 시간순으로. 환불 실패면 「다시 요청」 또는 「계좌 환불로 처리」(운영자가 직접 이체 후 기록) <Prop/>. 중재면 운영자가 승인·거부를 대신 결정.</>, go: ['s47'] },
    ],
    badges: <>{B.y('↕ 목록·패널 각각 스크롤')} {B.f('상단바·왼쪽 메뉴 고정')}</>,
    rows: [
      ['목적', <>취소·반품·환불이 <b>돈까지 정확히 끝났는지</b> 확인하고, 판매자와 고객 사이 분쟁을 정리한다(합격 기준: 결제 → 취소/환불 → 정산 흐름 검증).</>],
      ['구성 요소', <>상태 칩(문제 건 중심) / 요청 표 / 오른쪽 이력·조치(다시 요청, 계좌 환불 처리, 중재 결정)</>],
      ['인터랙션', <>· 중재 결정 → 판매자 거부를 뒤집으면 PG 부분 취소 실행 + 판매자 정산에서 차감<br />· 계좌 환불 처리 → 고객 계좌·금액·이체일 입력 → 주문 「환불 완료(계좌)」 <Prop/><br />· 모든 조치에 처리자·사유 기록</>],
      ['이동', <>판매자 처리 → <Go to="s35" /> / 고객 신청 → <Go to="s110" /> / 정산 반영 → <Go to="s47" /> / 원 주문 → <Go to="s44" /></>],
      ['상태', <>· 문제 건 0: 「확인할 건이 없어요」<br />· 이미 정산 지급된 판매자 주문의 환불: 「다음 정산에서 차감 예정」 표시</>],
      ['문구', <>「환불 확인 필요」 「중재 요청」 「처리 지연」 「계좌 환불로 처리」 「다시 요청」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>PC: ↑↓ = 행 이동, Esc = 닫기. 계좌 환불 입력 칸에서 Ctrl+Enter = 저장.</> },
      { tag: 'UX · EDGE', body: <>· 고객 계좌번호를 운영자가 받아 적는 흐름은 개인정보 노출이 커서 PG의 계좌 환불(가상계좌 환불) 기능이 있는지 먼저 확인 — 06 B</> },
    ],
  },

  {
    id: 's46', no: '4.6', title: '수수료 · 입점료 · 광고 설정', sub: '수익모델 설정 · 광고 승인', lane, frame: 'pc',
    Wire: () => (
      <Shell on="수수료 · 입점료 · 광고">
        <div style={{ position: 'relative' }}><div className="sk-chips"><span className="sk-chip on">판매 수수료</span><span className="sk-chip">입점료</span><span className="sk-chip">광고 상품</span><span className="sk-chip">광고 신청 2</span><span className="sk-chip">청구 · 수납</span></div><P n={1} /></div>
        <div className="sk-card" style={{ position: 'relative' }}>
          <div className="sk-row between"><span className="sk-t">기본 판매 수수료</span><span className="sk-input sm" style={{ flex: '0 0 80px' }}>10 %</span></div>
          <div className="sk-row between"><span className="sk-s">배송비에도 수수료 적용</span><span className="sk-toggle" /></div>
          <div className="sk-row between"><span className="sk-s">판매자별 예외 수수료 (1곳)</span><span className="sk-s">△△수산 8% ›</span></div>
          <div className="sk-row between"><span className="sk-s">적용 시작</span><span className="sk-s">변경 시 다음 날 0시 결제분부터</span></div>
          <P n={2} />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div className="sk-card" style={{ flex: 1, position: 'relative' }}>
            <span className="sk-t">입점료</span>
            <div className="sk-row between"><span className="sk-s">방식</span><span className="sk-chip">월정액 ▾</span></div>
            <div className="sk-row between"><span className="sk-s">금액</span><span className="sk-input sm" style={{ flex: '0 0 90px' }}>○○○,000원</span></div>
            <div className="sk-row between"><span className="sk-s">납부</span><span className="sk-s">정산 차감 / 계좌 입금</span></div>
            <P n={3} />
          </div>
          <div className="sk-card" style={{ flex: 1, position: 'relative' }}>
            <span className="sk-t">광고 상품 · 상위 노출</span>
            <div className="sk-row between"><span className="sk-s">카테고리당 자리</span><span className="sk-input sm" style={{ flex: '0 0 50px' }}>4</span></div>
            <div className="sk-row between"><span className="sk-s">14일 가격</span><span className="sk-input sm" style={{ flex: '0 0 90px' }}>○○○,000원</span></div>
            <div className="sk-row between"><span className="sk-s">신청 승인</span><span className="sk-s">운영자 승인 후 노출</span></div>
            <P n={4} />
          </div>
        </div>
      </Shell>
    ),
    pins: [
      { t: <>탭 — 판매 수수료 / 입점료 / 광고 상품 / 광고 신청(승인) / 청구·수납. 요구사항 "판매 수수료 설정", "입점료 및 광고 수수료 설정·관리".</> },
      { t: <><b>판매 수수료</b> — 기본 요율 + 판매자별 예외 요율 <Prop/>, 배송비 포함 여부 <Prop/>. 요율을 바꾸면 <b>다음 날 0시 결제분부터</b> 적용하고, 주문마다 결제 시점 요율을 저장해 정산이 흔들리지 않게 합니다. 카테고리별 요율은 2차 후보.</>, go: ['s36', 's47'] },
      { t: <><b>입점료</b> — 1차는 <b>월정액 1종 + 청구서 생성 + 납부 확인(정산 차감 또는 입금 확인)</b> <Prop/>. 금액·면제 대상(오픈 초기 2곳)은 06 논의 안건. 판매자 카드 정기결제(PG 빌링)는 2차.</>, go: ['s37'] },
      { t: <><b>광고 상품</b> — 1차는 「카테고리 상위 노출」 1종, 자리 수·기간 가격 고정 <Prop/>. 배너는 운영자가 직접 등록하고 청구만 수기 입력. 입찰·클릭당 과금은 2차.</>, go: ['s37', 's13'] },
    ],
    badges: <>{B.y()} {B.f('상단바·왼쪽 메뉴 고정')}</>,
    rows: [
      ['목적', <>운영자가 플랫폼 수익모델(판매 수수료·입점료·광고)을 설정하고, 광고 신청을 승인하고, 입점료·광고비 청구·수납을 관리한다.</>],
      ['구성 요소', <>탭 5개 / 판매 수수료(기본·판매자별·배송비 포함·적용 시작) / 입점료(방식·금액·납부 방법·면제 판매자) / 광고 상품(종류·자리·기간·가격) / 광고 신청 목록(승인·반려) / 청구·수납 표(판매자, 항목, 금액, 청구일, 납부 상태, 확인 처리)</>],
      ['인터랙션', <>· 매월 1일 입점료 청구서 자동 생성 <Prop/> → 판매자 <Go to="s37" />에 표시<br />· 정산 차감 방식이면 정산 회차에 「입점료 차감」 줄이 자동으로 붙는다<br />· 계좌 입금 방식이면 운영자가 입금 확인을 눌러 납부 완료</>],
      ['이동', <>판매자 화면 → <Go to="s37" /> / 정산 반영 → <Go to="s47" /> / 판매자 개별 요율 → <Go to="s41" /></>],
      ['상태', <>· 수익모델 미확정 상태로 오픈: 입점료·광고 탭을 꺼 두는 스위치 <Prop/><br />· 미납: 「미납 ○일」 + 노출 중지 처리 버튼</>],
      ['문구', <>「기본 판매 수수료」 「판매자별 예외 수수료」 「입점료」 「광고 상품 · 상위 노출」 「청구 · 수납」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>PC: 요율·금액 칸은 숫자만, Enter = 저장 확인 창(「다음 날 0시 결제분부터 적용돼요」), Esc = 취소.</> },
      { tag: 'UX · EDGE', body: <>· 이 화면의 1차 범위는 <b>수익모델 확정에 따라 가장 많이 바뀌는 곳</b> — 견적도 「입점료·광고 1차 포함」을 따로 떼어 제시(06 F)<br />· 광고 상품은 소비자가 광고임을 알 수 있게 「AD」 표시를 고객 화면에 강제한다</> },
    ],
  },

  {
    id: 's47', no: '4.7', title: '정산 관리', sub: '판매자별 정산 · 지급 여부 · 자료', lane, frame: 'pc',
    Wire: () => (
      <Shell on="정산">
        <div className="sk-row between" style={{ position: 'relative' }}>
          <div className="sk-row"><span className="sk-input sm">10월 2회차 (10.16~10.31) ▾</span><div className="sk-chips"><span className="sk-chip on">미지급 2</span><span className="sk-chip">지급 완료</span><span className="sk-chip">보류</span></div></div>
          <span className="sk-btn sm line">정산자료 내려받기</span>
          <P n={1} />
        </div>
        <div style={{ position: 'relative' }}>
          <Th cols={[['판매자', 66], ['판매'], ['수수료', 62], ['환불', 62], ['입점료', 56], ['정산액', 70], ['지급', 58]]} />
          <Tr cells={[['○○농원', 66], ['4,120,000'], ['412,000', 62], ['296,000', 62], ['—', 56], ['3,412,000', 70, 'sk-t'], [<span className="sk-badge">미지급</span>, 58]]} />
          <Tr cells={[['△△수산', 66], ['2,880,000'], ['230,400', 62], ['39,000', 62], ['—', 56], ['2,610,600', 70, 'sk-t'], [<span className="sk-badge">미지급</span>, 58]]} />
          <div className="sk-row between" style={{ borderTop: '1px solid #DDD', paddingTop: 4 }}><span className="sk-s">판매자 2곳</span><span className="sk-t">지급할 금액 6,022,600원</span></div>
          <P n={2} />
        </div>
        <div className="sk-card" style={{ position: 'relative' }}>
          <div className="sk-row between"><span className="sk-t">○○농원 · 3,412,000원</span><span className="sk-s">농협 ***-****-1234 · 예금주 ○○농원</span></div>
          <div className="sk-row"><span className="sk-input sm grow">지급일 2026-11-10 · 메모</span><span className="sk-btn sm line">보류</span><span className="sk-btn sm">지급 완료 처리</span></div>
          <P n={3} />
        </div>
      </Shell>
    ),
    pins: [
      { t: <>회차·상태·내려받기 — 정산 회차(주기 <Prop/>)별로 미지급 / 지급 완료 / 보류. 요구사항 "정산 지급 여부 관리, 정산자료 다운로드".</>, go: ['s36'] },
      { t: <><b>판매자별 정산 표</b> — 판매 · 수수료 · 환불 · 입점료(정산 차감 방식일 때) · 정산액. 요구사항 "판매자별 매출 및 정산 내역 조회". 합계 = 이번 회차에 운영자가 송금할 총액.</> },
      { t: <><b>지급 처리</b> — 운영자가 은행에서 직접 송금한 뒤 지급일·메모를 넣고 「지급 완료 처리」(요구사항: 자동 송금 제외). 판매자 화면에 즉시 반영. 분쟁 중 주문이 있으면 「보류」 <Prop/>.</>, go: ['s36'] },
    ],
    badges: <>{B.y()} {B.f('상단바·왼쪽 메뉴 고정')} {B.x('↔ 좁은 화면에서 표 가로 스크롤')}</>,
    rows: [
      ['목적', <>운영자가 회차마다 <b>누구에게 얼마를 보내야 하는지</b> 확인하고, 직접 송금한 뒤 지급 여부를 기록한다.</>],
      ['구성 요소', <>회차 선택 / 상태 칩 / 내려받기 / 판매자별 정산 표 + 합계 / 판매자 정산 카드(계좌, 지급일·메모, 보류·지급 완료 처리) / 회차 펼치기 → 판매자 주문 단위 내역</>],
      ['인터랙션', <>· 정산 회차 자동 마감: 회차 마지막 날까지 <b>구매 확정</b>된 판매자 주문을 모아 계산 <Prop/><br />· 지급 완료 처리는 되돌릴 수 없다(메모만 추가) <Prop/><br />· 내려받기: 판매자별 요약 시트 + 판매자 주문 상세 시트(엑셀) — 은행 대량 이체 양식 열 맞춤 <Prop/></>],
      ['이동', <>판매자 화면 → <Go to="s36" /> / 환불 원인 → <Go to="s45" /> / 입점료 차감 → <Go to="s46" /></>],
      ['상태', <>· 미지급 0: 「이번 회차 지급이 모두 끝났어요」<br />· 정산액이 마이너스(반품이 판매보다 많음): 「다음 회차 이월」 <Prop/><br />· 계좌 변경 심사 중인 판매자: 경고 띠</>],
      ['문구', <>「미지급」 「지급 완료」 「보류」 「지급할 금액」 「지급 완료 처리」 「정산자료 내려받기」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>PC: ↑↓ = 판매자 이동, Enter = 카드 펼치기, 지급일 칸 기본값 오늘, Ctrl+Enter = 지급 완료 처리(확인 창).</> },
      { tag: 'UX · EDGE', body: <>· 결제대금을 플랫폼이 전액 받아 판매자에게 다시 보내는 구조는 PG 계약 형태(오픈마켓 하위몰·지급대행)와 법 해석이 걸려 있다 — 06 논의 안건 1번<br />· 2차 고도화: PG 지급대행 API로 「지급 완료 처리」 대신 실제 송금까지(토스페이먼츠 지급대행은 1회 100건 · 월 고정 + 건당 이용료)</> },
    ],
  },

  {
    id: 's48', no: '4.8', title: '공지 · 알림 관리', sub: '고객·판매자 공지 · 발송', lane, frame: 'pc',
    Wire: () => (
      <Shell on="공지 · 알림">
        <div style={{ position: 'relative' }}><div className="sk-chips"><span className="sk-chip on">공지사항</span><span className="sk-chip">알림 발송</span><span className="sk-chip">자동 알림 문구</span></div><P n={1} /></div>
        <div style={{ position: 'relative' }}>
          <Th cols={[['대상', 60], ['제목'], ['게시일', 56], ['상태', 50]]} />
          <Tr cells={[['고객', 60], ['추석 연휴 배송 안내', 0, 'sk-t'], ['09.20', 56], [<span className="sk-badge dark">게시</span>, 50]]} />
          <Tr cells={[['판매자', 60], ['10월 정산 일정 안내', 0, 'sk-t'], ['10.01', 56], [<span className="sk-badge dark">게시</span>, 50]]} />
          <P n={2} />
        </div>
        <div className="sk-card" style={{ position: 'relative' }}>
          <span className="sk-t">알림 발송</span>
          <div className="sk-row"><span className="sk-chip on">고객 전체</span><span className="sk-chip">마케팅 동의 고객</span><span className="sk-chip">판매자</span></div>
          <div className="sk-input sm">제목 · 내용 · 누르면 열 화면</div>
          <div className="sk-row between"><span className="sk-s">웹 푸시 + 알림함 · 예약 발송 10.25 10:00</span><span className="sk-btn sm">발송 예약</span></div>
          <P n={3} />
        </div>
        <div className="sk-banner" style={{ position: 'relative' }}><span className="sk-s">자동 알림: 주문 완료 · 출고 · 배송 완료 · 취소/반품 결과 · 문의 답변 · 입점 심사 결과</span><P n={4} /></div>
      </Shell>
    ),
    pins: [
      { t: <>탭 — 공지사항 / 알림 발송 / 자동 알림 문구. 요구사항 "공지사항 및 알림 관리".</> },
      { t: <>공지사항 — <b>대상(고객·판매자)</b>을 나눠 씁니다. 고객 공지는 마이 → 공지사항, 판매자 공지는 판매자 센터 홈에 <Prop/>.</>, go: ['s112', 's32'] },
      { t: <>알림 발송 — 대상·내용·이동할 화면·예약 시각. 광고성 알림은 <b>마케팅 수신 동의 고객만</b> 고를 수 있고 야간 발송을 막습니다 <Prop/>. 채널은 웹 푸시 + 알림함(알림톡·문자는 요구사항 확인 필요).</>, go: ['s112'] },
      { t: <>자동 알림 — 주문·배송·취소/반품·문의 답변·입점 심사 결과 등 시스템이 보내는 알림의 문구를 운영자가 고칩니다 <Prop/>.</> },
    ],
    badges: <>{B.y()} {B.f('상단바·왼쪽 메뉴 고정')}</>,
    rows: [
      ['목적', <>고객·판매자에게 공지를 올리고, 필요한 알림을 보낸다.</>],
      ['구성 요소', <>탭 3개 / 공지 표(대상, 제목, 게시일, 상태) + 작성(제목·본문·상단 고정·게시 기간) / 알림 발송(대상, 내용, 이동 화면, 예약) / 자동 알림 문구 목록</>],
      ['인터랙션', <>· 공지 상단 고정 최대 3개 <Prop/><br />· 발송 전 「나에게 테스트 발송」<br />· 발송 결과: 대상 수·발송 성공 수(웹 푸시 권한 있는 기기 기준)</>],
      ['이동', <>고객 알림함·공지 → <Go to="s112" /> / 판매자 공지 → <Go to="s32" /></>],
      ['상태', <>· 웹 푸시 수신 가능 고객 수가 적을 때: 「푸시 받을 수 있는 고객 ○명 · 나머지는 알림함에만」</>],
      ['문구', <>「공지사항」 「알림 발송」 「마케팅 동의 고객」 「발송 예약」 「나에게 테스트 발송」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>PC: 공지 작성 에디터에서 Ctrl+S = 임시 저장, Ctrl+Enter = 게시 확인 창.</> },
      { tag: 'UX · EDGE', body: <>· iPhone 고객은 홈 화면에 추가한 경우에만 웹 푸시를 받으므로 <b>푸시 도달률이 Android보다 낮다</b> — 앱 방식 결정(06 논의 안건)에 이 숫자를 오픈 후 판단 근거로 쓴다</> },
    ],
  },
];
