/* 3. 판매자 센터 (PC 웹) — 입점 → 상품 → 주문·송장 → 취소·반품 → 정산 · 입점료·광고 */
import { P, Go, Prop, B } from '../doc/kit.jsx';

const lane = '판매자 센터';
const MENU = ['홈', '상품 관리', '주문 · 배송', '취소 · 교환 · 반품', '정산 내역', '입점료 · 광고', '계정 · 설정'];

const Shell = ({ on, children, gnbPin }) => (<>
  <div className="sk-nav"><span className="sk-t">판매자 센터</span><span className="sk-badge">○○농원</span><span className="grow" /><span className="sk-input sm" style={{ flex: '0 0 170px' }}>주문번호·상품명·주문자</span><span className="sk-ic round" /><span className="sk-s">대표 계정</span></div>
  <div style={{ display: 'flex', gap: 10, flex: 1, minHeight: 0 }}>
    <div className="sk-gnb" style={{ position: 'relative' }}>
      {MENU.map((m) => <span key={m} className={m === on ? 'sk-t' : 'sk-s'}>{m}</span>)}
      {gnbPin}
    </div>
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>{children}</div>
  </div>
</>);
const Th = ({ cols }) => <div className="sk-th">{cols.map(([t, w]) => <span key={t} className="sk-s" style={{ flex: w ? `0 0 ${w}px` : 1 }}>{t}</span>)}</div>;
const Tr = ({ cells }) => <div className="sk-list">{cells.map(([t, w, cls = 'sk-s'], i) => <span key={i} className={cls} style={{ flex: w ? `0 0 ${w}px` : 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t}</span>)}</div>;
const Panel = ({ children, w = 170 }) => <div style={{ flex: `0 0 ${w}px`, border: '1.5px solid #C9C9C9', borderRadius: 10, padding: 9, display: 'flex', flexDirection: 'column', gap: 6, position: 'relative' }}>{children}</div>;
const Stat = ({ n, t, dark }) => <div className="sk-card" style={dark ? { border: '2px solid #282828' } : undefined}><span className="sk-s">{t}</span><span className="sk-t lg">{n}</span></div>;

export const seller = [
  {
    id: 's31', no: '3.1', title: '입점 신청 · 심사 상태', sub: '판매자 가입 → 운영자 승인 후 이용', lane, frame: 'pc',
    Wire: () => (<>
      <div className="sk-nav"><span className="sk-t">판매자 입점 신청</span><span className="grow" /><span className="sk-s">① 계정 › ② 사업자·판매 정보 › ③ 정산 계좌 › ④ 약관</span></div>
      <div style={{ display: 'flex', gap: 12 }}>
        <div className="sk-col" style={{ flex: 1, gap: 6, position: 'relative' }}>
          <p className="sk-t">② 사업자 · 판매 정보</p>
          <div className="sk-grid2">
            <div className="sk-input sm">상호 (○○농원)</div><div className="sk-input sm">대표자명</div>
            <div className="sk-input sm">사업자등록번호</div><div className="sk-input sm">통신판매업 신고번호</div>
            <div className="sk-input sm">사업장 주소</div><div className="sk-input sm">반품 받을 주소</div>
            <div className="sk-input sm">고객 응대 연락처</div><div className="sk-input sm">주요 품목 (과일 ▾)</div>
          </div>
          <P n={1} />
          <div className="sk-row" style={{ position: 'relative' }}>
            <div className="sk-card sk-row" style={{ borderStyle: 'dashed', flex: 1 }}><span className="sk-ic" /><span className="sk-s grow">사업자등록증 첨부</span><span className="sk-t">＋</span></div>
            <div className="sk-card sk-row" style={{ borderStyle: 'dashed', flex: 1 }}><span className="sk-ic" /><span className="sk-s grow">통신판매업 신고증 첨부</span><span className="sk-t">＋</span></div>
            <P n={2} />
          </div>
          <div className="sk-row" style={{ position: 'relative' }}><span className="sk-btn line" style={{ flex: '0 0 90px' }}>이전</span><span className="sk-btn grow">다음 · 정산 계좌</span><P n={3} /></div>
        </div>
        <Panel w={190}>
          <span className="sk-t">심사 상태</span>
          <span className="sk-badge dark" style={{ alignSelf: 'flex-start' }}>심사 중</span>
          <span className="sk-s">제출 10.21 · 보통 영업일 2일 안에 결과를 알려드려요</span>
          <div className="sk-div" style={{ margin: '2px 0' }} />
          <span className="sk-s">반려되면: 반려 사유 + 「고쳐서 다시 신청」</span>
          <div className="sk-div" style={{ margin: '2px 0' }} />
          <span className="sk-s">입점료 안내 — 월 ○○원 (승인 후 청구)</span>
          <P n={4} />
        </Panel>
      </div>
    </>),
    pins: [
      { t: <>사업자·판매 정보 — 플랫폼이 소비자에게 판매자 정보를 제공해야 하므로(통신판매중개자 의무) 상호·대표자·사업자번호·<b>통신판매업 신고번호</b>·주소·연락처를 받습니다. 반품 주소는 반품 안내에 씁니다 <Prop/>.</>, go: ['s22'] },
      { t: <>증빙 첨부 — 사업자등록증 + 통신판매업 신고증 <Prop/>. 운영자가 눈으로 확인합니다(사업자 진위 자동 조회는 1차 제외 <Prop/>).</>, go: ['s41'] },
      { t: <>단계 이동 — ① 계정(아이디·비밀번호·담당자 휴대폰) ② 사업자·판매 정보 ③ 정산 계좌(예금주 = 사업자명 확인) ④ 약관(판매자 이용약관·수수료·입점료 조건 동의). 중간 저장 가능.</> },
      { t: <>심사 상태 — 심사 중 / 승인 / 반려. 요구사항 "입점 신청 후 운영 담당자 확인·승인 절차". 입점료가 생기면 금액·청구 시점을 여기서 미리 알립니다 <Prop/> — 06 논의 안건.</>, go: ['s32', 's37'] },
    ],
    badges: <>{B.y()} {B.f('단계 표시 상단 고정')}</>,
    rows: [
      ['목적', <>외부 판매자가 가입과 입점 신청을 한 번에 하고, <b>운영자 승인 후에만</b> 판매자 센터를 쓴다(요구사항).</>],
      ['구성 요소', <>4단계 — ① 계정·담당자 ② 사업자·판매 정보 + 증빙 2종 ③ 정산 계좌(은행·계좌번호·예금주, 통장 사본) ④ 판매자 약관 동의 / 오른쪽: 심사 상태·안내</>],
      ['인터랙션', <>· 제출 → 운영자 <Go to="s41" /> 심사 목록에 접수 → 승인 시 담당자에게 이메일·문자 <Prop/><br />· 반려 시 사유 표시, 고친 항목만 다시 제출<br />· 승인 전 로그인하면 이 심사 상태 화면만 보인다</>],
      ['이동', <>승인 후 로그인 → <Go to="s32" /> / 심사 → <Go to="s41" /> / 고객 모바일 「판매자 입점 신청」 → 이 화면(<Go to="s11" />)</>],
      ['상태', <>· 심사 중 / 승인 / 반려 / 재신청<br />· 같은 사업자번호로 이미 입점: 「이미 입점한 사업자예요 · 계정 찾기」<br />· 첨부 실패: 「파일을 올리지 못했어요 · 다시 시도」(PDF·이미지 10MB)</>],
      ['문구', <>「판매자 입점 신청」 「통신판매업 신고번호」 「반품 받을 주소」 「심사 중」 「고쳐서 다시 신청」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>PC: Tab으로 칸 이동, 사업자번호·연락처는 숫자만 받고 하이픈 자동, 주소 칸 Enter = 주소 검색 창. 마지막 칸에서 Enter = 「다음」. 중간에 창을 닫아도 입력값이 남는다(임시 저장).</> },
      { tag: 'UX · EDGE', body: <>· <b>오픈 시점의 판매자 2곳(참여 기업)</b>은 이 신청을 거치지 않고 운영자가 직접 등록하는 안 <Prop/><br />· 판매자 1곳이 상호 여러 개를 운영하는 경우는 사업자번호별로 계정을 따로 둔다 <Prop>가정</Prop></> },
    ],
  },

  {
    id: 's32', no: '3.2', title: '판매자 홈', sub: '오늘 처리할 일 · 매출 요약', lane, frame: 'pc',
    Wire: () => (
      <Shell on="홈" gnbPin={<P n={1} />}>
        <div className="sk-grid4" style={{ position: 'relative' }}>
          <Stat t="신규 주문 · 확인 전" n="7" dark />
          <Stat t="발송 대기" n="12" />
          <Stat t="취소·반품 요청" n="2" dark />
          <Stat t="답변 안 한 문의" n="3" />
          <P n={2} />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div className="sk-card" style={{ flex: 1, position: 'relative' }}>
            <div className="sk-row between"><span className="sk-t">매출</span><div className="sk-chips"><span className="sk-chip on">일별</span><span className="sk-chip">월별</span></div></div>
            <div className="sk-bar">{[30, 45, 40, 70, 52, 66, 88].map((h, i) => <i key={i} className={i === 6 ? 'on' : ''} style={{ height: h + '%' }} />)}</div>
            <span className="sk-s">오늘 판매 1,284,000원 · 주문 46건</span>
            <P n={3} />
          </div>
          <div className="sk-card" style={{ flex: '0 0 200px', position: 'relative' }}>
            <span className="sk-t">정산</span>
            <div className="sk-row between"><span className="sk-s">다음 정산 예정</span><span className="sk-t">3,412,000원</span></div>
            <div className="sk-row between"><span className="sk-s">지급 예정일</span><span className="sk-s">11.10</span></div>
            <div className="sk-div" style={{ margin: '3px 0' }} />
            <div className="sk-row between"><span className="sk-s">11월 입점료</span><span className="sk-s">청구 예정</span></div>
            <P n={4} />
          </div>
        </div>
        <div className="sk-banner" style={{ position: 'relative' }}><span className="sk-s">[공지] 추석 연휴 택배 마감 안내 · 운영자</span><P n={5} /></div>
      </Shell>
    ),
    pins: [
      { t: <>왼쪽 메뉴 — 요구사항 판매자 페이지 항목을 7개 메뉴로 묶었습니다.</>, go: ['s33', 's34', 's35', 's36', 's37', 's38'] },
      { t: <><b>오늘 처리할 일</b> — 신규 주문(확인 전) · 발송 대기 · 취소·반품 요청 · 미답변 문의. 숫자를 누르면 해당 목록이 그 상태로 걸러져 열립니다. 신선식품은 출고가 늦으면 바로 품질 문제라 이 4칸이 판매자 센터의 첫 줄입니다.</>, go: ['s34', 's35'] },
      { t: <>매출 — 요구사항 "판매자별 매출 조회". 일별·월별, 결제 금액 기준(취소 차감) <Prop>집계 기준</Prop>.</>, go: ['s36'] },
      { t: <>정산·입점료 요약 — 다음 정산 예정 금액·지급 예정일(정산 주기 확정 전이라 <Prop/>), 이번 달 입점료 청구 상태.</>, go: ['s36', 's37'] },
      { t: <>운영자 공지 — 운영자가 판매자 대상으로 쓴 공지 <Prop/>.</>, go: ['s48'] },
    ],
    badges: <>{B.y()} {B.f('상단바·왼쪽 메뉴 고정')}</>,
    rows: [
      ['목적', <>판매자가 들어오자마자 <b>지금 처리해야 할 주문·요청</b>과 매출·정산 상황을 본다.</>],
      ['구성 요소', <>상단바(판매자명·통합 검색·계정) / 왼쪽 메뉴 7개 / 처리할 일 4칸 / 매출 차트(일별 7일·월별 6개월) / 정산·입점료 요약 / 운영자 공지</>],
      ['인터랙션', <>· 새 주문이 들어오면 브라우저 알림 + 숫자 갱신 <Prop/><br />· 처리할 일 숫자 클릭 → 해당 목록 필터<br />· 상품 문의 답변은 <b>홈의 「답변 안 한 문의」 → 문의 목록</b>에서(별도 화면 미작성, 목록+답변 칸 단순 구성) <Prop/></>],
      ['이동', <>신규 주문·발송 대기 → <Go to="s34" /> / 취소·반품 → <Go to="s35" /> / 정산 → <Go to="s36" /> / 입점료 → <Go to="s37" /></>],
      ['상태', <>· 처리할 일 모두 0: 「오늘 처리할 일이 없어요」<br />· 상품 0개(막 승인됨): 맨 위에 「첫 상품을 등록해 보세요」 → <Go to="s33" /><br />· 입점료 미납: 상단 띠 「입점료가 미납 상태예요 · ○일 지나면 상품 노출이 중지돼요」 <Prop/></>],
      ['문구', <>「신규 주문 · 확인 전」 「발송 대기」 「취소·반품 요청」 「답변 안 한 문의」 「다음 정산 예정」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>PC: 「/」 = 통합 검색, 숫자 1~4 = 처리할 일 칸으로 바로 이동 <Prop/>.</> },
      { tag: 'UX · EDGE', body: <>· 판매자 센터는 PC 기준 설계, 모바일에서는 홈·주문 확인·송장 입력만 쓸 수 있게 반응형 <Prop/> — 산지 판매자는 현장에서 휴대폰으로 송장을 넣는 경우가 많다</> },
    ],
  },

  {
    id: 's33', no: '3.3', title: '상품 등록 · 수정', sub: '원산지 · 옵션 · 재고 · 판매 상태', lane, frame: 'pc',
    Wire: () => (
      <Shell on="상품 관리">
        <div className="sk-row between" style={{ position: 'relative' }}><span className="sk-t">상품 등록</span><div className="sk-row"><span className="sk-btn sm line">임시 저장</span><span className="sk-btn sm">등록</span></div><P n={5} /></div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div className="sk-col" style={{ flex: 1, gap: 6 }}>
            <div style={{ position: 'relative' }} className="sk-col">
              <div className="sk-row"><span className="sk-input sm grow">카테고리: 과일 › 참외·수박</span></div>
              <div className="sk-input sm">상품명 (성주 꿀참외 2kg 5~7과)</div>
              <div className="sk-row"><span className="sk-input sm grow">원산지: 국내산 ▾</span><span className="sk-input sm grow">경북 성주군</span></div>
              <P n={1} />
            </div>
            <div style={{ position: 'relative' }}>
              <span className="sk-s">옵션 (중량 · 등급)</span>
              <Th cols={[['옵션명'], ['판매가', 70], ['재고', 46], ['상태', 50]]} />
              <Tr cells={[['2kg (5~7과)', 0, 'sk-t'], ['19,900', 70], ['120', 46], [<span className="sk-badge dark">판매 중</span>, 50]]} />
              <Tr cells={[['4kg (10~14과)', 0, 'sk-t'], ['36,900', 70], ['0', 46], [<span className="sk-badge">품절</span>, 50]]} />
              <P n={2} />
            </div>
            <div className="sk-row" style={{ position: 'relative' }}><span className="sk-input sm grow">배송비: 기본 3,000원 · 4만원 이상 무료 ▾</span><span className="sk-input sm" style={{ flex: '0 0 130px' }}>출고: 당일(14시) ▾</span><P n={3} /></div>
          </div>
          <Panel w={180}>
            <span className="sk-t">사진 · 상세 · 고시</span>
            <div className="sk-row">{[1, 2, 3].map((i) => <span key={i} className="sk-img sq" style={{ width: 38, minHeight: 38, flex: '0 0 38px' }} />)}</div>
            <div className="sk-line w95" /><div className="sk-line w80" />
            <span className="sk-s">상품정보제공고시 (농수산물)</span>
            <span className="sk-s">생산자 · 생산연월 · 보관방법 …</span>
            <P n={4} />
          </Panel>
        </div>
      </Shell>
    ),
    pins: [
      { t: <>카테고리·상품명·<b>원산지</b> — 카테고리는 운영자가 만든 목록에서 고릅니다. 원산지는 <b>필수 입력</b>이며 상품 상세의 가격 옆·상세 설명·고시 세 곳에 같은 값으로 자동 표시됩니다(원산지 표시 일치 의무).</>, go: ['s14', 's43'] },
      { t: <>옵션 — 농수산물은 <b>중량·등급·과수</b>로 옵션을 나누는 경우가 대부분이라 옵션마다 판매가·재고·판매 상태를 둡니다. 옵션 2단(중량 × 등급) 조합은 <Prop/>.</> },
      { t: <><b>배송비·출고 기준</b> — 판매자가 미리 만든 배송비 규칙(기본 배송비·무료 기준·도서산간 추가) 중 하나를 고릅니다(요구사항 "판매자별 배송비"). 출고 마감 시각은 고객에게 「오늘 출고」를 보여주는 근거 <Prop/>.</>, go: ['s38'] },
      { t: <>사진·상세·상품정보제공고시 — 대표 사진 최대 10장, 상세 설명(에디터), 농수산물 품목 고시 항목 <Prop>항목 확인</Prop>.</> },
      { t: <>저장 — 임시 저장 / 등록. 등록 즉시 판매할지, 운영자 검수 후 노출할지는 06 논의 안건 <Prop/>.</>, go: ['s43'] },
    ],
    badges: <>{B.y()} {B.f('상단 저장 버튼 고정')}</>,
    rows: [
      ['목적', <>판매자가 상품을 등록·수정하고 판매 상태(판매 중·품절·판매 중지)를 관리한다(요구사항).</>],
      ['구성 요소', <>상품 목록(이 화면 앞단, 상태 필터·검색·일괄 판매 상태 변경) / 등록 폼: 카테고리 · 상품명 · 원산지(필수) · 옵션 표(옵션명·판매가·재고·상태) · 배송비 규칙 · 출고 기준 · 사진 · 상세 설명 · 상품정보제공고시 / 임시 저장·등록</>],
      ['인터랙션', <>· 재고 0이 되면 자동 품절, 재고를 넣으면 자동 판매 중<br />· 판매 중 상품의 가격 변경은 즉시 반영(장바구니에 담긴 상품은 「가격이 바뀌었어요」 표시)<br />· 상품 복사(비슷한 상품 빠르게 등록) <Prop/><br />· 엑셀 일괄 등록은 1차 제외 <Prop/></>],
      ['이동', <>등록 → 상품 목록 / 고객 화면 → <Go to="s14" /> / 운영자 검수(선택 시) → <Go to="s43" /></>],
      ['상태', <>· 필수 미입력: 칸 아래 빨간 안내 + 등록 버튼 위에 「3개 항목을 채워 주세요」<br />· 운영자가 판매 중지시킨 상품: 「운영자에 의해 판매 중지 · 사유」, 판매자가 다시 켤 수 없음<br />· 사진 용량 초과: 자동 줄임</>],
      ['문구', <>「원산지」 「옵션 (중량 · 등급)」 「판매 중」 「품절」 「판매 중지」 「임시 저장」 「등록」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>PC: 옵션 표에서 Tab = 다음 칸, 마지막 칸 Tab = 새 옵션 줄 추가, Ctrl+S = 임시 저장 <Prop/>. 판매가·재고는 숫자만, 천 단위 쉼표 자동.</> },
      { tag: 'UX · EDGE', body: <>· 계절 상품(참외·감귤)은 한 해 쉬었다 다시 파는 경우가 많다 — 삭제 대신 「판매 중지」로 두고 다음 철에 켜는 흐름을 기본으로<br />· 상품명에 원산지와 다른 지역명을 쓰면 원산지 표시 위반 소지 — 운영자 검수 시 확인 항목</> },
    ],
  },

  {
    id: 's34', no: '3.4', title: '주문 · 배송 관리', sub: '주문 확인 · 송장 입력', lane, frame: 'pc',
    Wire: () => (
      <Shell on="주문 · 배송">
        <div className="sk-row between" style={{ position: 'relative' }}>
          <div className="sk-chips"><span className="sk-chip on">신규 7</span><span className="sk-chip">발송 대기 12</span><span className="sk-chip">배송 중</span><span className="sk-chip">배송 완료</span><span className="sk-chip">구매 확정</span></div>
          <span className="sk-input sm" style={{ flex: '0 0 120px' }}>10.15 ~ 10.22</span>
          <P n={1} />
        </div>
        <div className="sk-row" style={{ position: 'relative' }}><span className="sk-check on" style={{ padding: 0 }}>3건 선택</span><span className="sk-btn sm">주문 확인</span><span className="sk-btn sm line">송장 일괄 입력 (엑셀)</span><span className="sk-btn sm line">주문 내려받기</span><P n={2} /></div>
        <div style={{ position: 'relative' }}>
          <Th cols={[['', 18], ['주문번호', 100], ['상품 · 옵션'], ['수량', 32], ['받는 분', 50], ['택배사 · 송장', 150]]} />
          <Tr cells={[[<span className="sk-check on" style={{ padding: 0 }} />, 18], ['2610220012-1', 100], ['성주 꿀참외 2kg 외 1', 0, 'sk-t'], ['2', 32], ['김고객', 50], [<span className="sk-row"><span className="sk-input sm" style={{ flex: '0 0 60px' }}>CJ ▾</span><span className="sk-input sm grow">송장번호</span></span>, 150]]} />
          <Tr cells={[[<span className="sk-check on" style={{ padding: 0 }} />, 18], ['2610220031-1', 100], ['방울토마토 1kg', 0, 'sk-t'], ['1', 32], ['이고객', 50], [<span className="sk-row"><span className="sk-input sm" style={{ flex: '0 0 60px' }}>CJ ▾</span><span className="sk-input sm grow">송장번호</span></span>, 150]]} />
          <Tr cells={[[<span className="sk-check" style={{ padding: 0 }} />, 18], ['2610210088-2', 100], ['성주 꿀참외 4kg', 0, 'sk-t'], ['1', 32], ['박고객', 50], [<span className="sk-badge">조회 안 되는 송장</span>, 150]]} />
          <P n={3} />
          <P n={4} style={{ top: 34, right: 178 }} />
        </div>
      </Shell>
    ),
    pins: [
      { t: <>상태 탭 — 신규(결제 완료) → 발송 대기(주문 확인함 = 상품 준비 중) → 배송 중 → 배송 완료 → 구매 확정. 요구사항 "주문 확인 및 주문 상태 관리". <b>이 판매자의 판매자 주문만</b> 보입니다(다른 판매자 상품은 같은 주문이어도 안 보임).</> },
      { t: <>일괄 처리 — 「주문 확인」(신규 → 발송 대기, 이후 고객은 즉시 취소 불가 · 취소 요청으로) / 송장 일괄 입력(엑셀 양식) <Prop/> / 주문 내려받기(택배사 접수용 엑셀) <Prop/>.</> },
      { t: <><b>송장 입력</b> — 택배사 선택 + 송장번호(요구사항 "배송 정보 및 송장번호 관리"). 입력하면 배송 중으로 바뀌고 고객에게 알림. 송장은 배송조회 API로 검증해 조회가 안 되면 「조회 안 되는 송장」 표시 <Prop/>.</>, go: ['s19'] },
      { t: <>주문 상세(행 클릭) — 받는 분·연락처·주소·배송 요청사항, 결제 금액, 이 판매자 주문의 상태 이력. 개인정보는 배송 완료 후 ○일 지나면 가림 <Prop/>.</> },
    ],
    badges: <>{B.y('↕ 목록 스크롤')} {B.f('상태 탭·일괄 버튼 고정')} {B.x('↔ 좁은 화면에서 표 가로 스크롤')}</>,
    rows: [
      ['목적', <>판매자가 자기 주문을 확인하고 <b>송장을 넣어 출고</b>를 끝낸다. 하나의 결제가 여러 판매자로 나뉘어도 판매자는 자기 몫만 처리한다(요구사항 "판매자별 주문 내역 분리").</>],
      ['구성 요소', <>상태 탭(건수) / 기간·검색 / 일괄 버튼 / 표(선택, 판매자 주문번호, 상품·옵션, 수량, 받는 분, 택배사·송장) / 행 클릭 → 오른쪽 주문 상세</>],
      ['인터랙션', <>· 「주문 확인」 → 발송 대기, 고객 화면 「상품 준비 중」<br />· 송장 저장 → 배송 중, 고객 웹 푸시·알림함 <Prop/><br />· 배송 완료는 택배 조회 결과로 자동 <Prop/>, 구매 확정은 고객 확정 또는 배송 완료 ○일 후 자동 <Prop/><br />· 품절로 보낼 수 없을 때 「판매자 취소」(사유 필수 → 고객 전액 환불) <Prop/></>],
      ['이동', <>고객 쪽 결과 → <Go to="s19" /> / 취소 요청이 걸린 주문 → <Go to="s35" /> / 운영자 전체 조회 → <Go to="s44" /></>],
      ['상태', <>· 신규 0건: 「새 주문이 없어요」<br />· 출고 기한(결제 후 영업일 ○일) 넘긴 주문: 빨간 「출고 지연」 배지 <Prop/><br />· 송장 일괄 입력 실패 줄: 실패 사유를 줄마다 표시하고 성공한 줄만 반영</>],
      ['문구', <>「신규」 「발송 대기」 「주문 확인」 「송장 일괄 입력 (엑셀)」 「조회 안 되는 송장」 「출고 지연」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>PC: 송장번호 칸에서 Enter = 저장 후 <b>다음 줄 송장 칸으로 이동</b>(바코드 스캐너로 연속 입력 가능 — 스캐너는 Enter를 함께 보냄). ↑↓ = 줄 이동, Space = 선택.</> },
      { tag: 'UX · EDGE', body: <>· 한 판매자 주문 안에서도 상품이 다른 날 출고되는 <b>부분 출고</b>는 1차 제외 — 판매자 주문 1건 = 송장 1개 <Prop/><br />· 택배사 계약·송장 출력은 판매자 각자 택배사 프로그램으로(택배사 연동 발급은 1차 제외)</> },
    ],
  },

  {
    id: 's35', no: '3.5', title: '취소 · 교환 · 반품 처리', sub: '승인 · 거부 · 환불 반영', lane, frame: 'pc',
    Wire: () => (
      <Shell on="취소 · 교환 · 반품">
        <div style={{ position: 'relative' }}><div className="sk-chips"><span className="sk-chip on">처리 대기 2</span><span className="sk-chip">취소</span><span className="sk-chip">반품</span><span className="sk-chip">교환</span><span className="sk-chip">완료</span><span className="sk-chip">운영자 중재</span></div><P n={1} /></div>
        <div style={{ display: 'flex', gap: 8, flex: 1, minHeight: 0 }}>
          <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
            <Th cols={[['요청일', 44], ['유형', 40], ['상품'], ['사유', 80], ['금액', 54]]} />
            <Tr cells={[['10.23', 44], ['반품', 40], ['꿀참외 2kg', 0, 'sk-t'], ['상함·파손', 80], ['19,900', 54]]} />
            <Tr cells={[['10.23', 44], ['취소', 40], ['참외 4kg', 0, 'sk-t'], ['단순 변심', 80], ['36,900', 54]]} />
            <P n={2} />
          </div>
          <Panel w={210}>
            <div className="sk-row between"><span className="sk-t">반품 · 2610220012-1</span><span className="sk-s">✕</span></div>
            <div className="sk-row">{[1, 2].map((i) => <span key={i} className="sk-img sq" style={{ width: 44, minHeight: 44, flex: '0 0 44px' }} />)}<span className="sk-s">고객 사진 2장</span></div>
            <span className="sk-s">"받아보니 2개가 물러 있었어요"</span>
            <div className="sk-col" style={{ gap: 0 }}>
              <span className="sk-check sk-radio on">회수 없이 환불</span>
              <span className="sk-check sk-radio">회수 후 환불</span>
            </div>
            <div className="sk-row between"><span className="sk-s">환불 금액</span><span className="sk-t">19,900원</span></div>
            <div className="sk-row"><span className="sk-btn sm line grow">거부</span><span className="sk-btn sm grow">승인 · 환불</span></div>
            <P n={3} />
            <P n={4} style={{ top: 'auto', bottom: 6 }} />
          </Panel>
        </div>
      </Shell>
    ),
    pins: [
      { t: <>상태 칩 — 처리 대기 / 취소 / 반품 / 교환 / 완료 / 운영자 중재. 요구사항 판매자 페이지의 "취소·환불 반영"을 처리하는 곳입니다.</> },
      { t: <>요청 목록 — 요청일·유형·상품·사유·금액. <b>출고 전 취소</b>는 판매자 확인 없이 자동 처리되어 「완료」에만 기록됩니다 <Prop/>. 주문 확인 후 취소 요청만 여기서 승인합니다.</>, go: ['s110'] },
      { t: <>요청 상세 — 고객 사진·내용. 신선식품은 회수해도 다시 팔 수 없어 <b>「회수 없이 환불」</b>을 고를 수 있게 했습니다 <Prop/>. 교환이면 재발송 송장 입력 칸이 나옵니다.</> },
      { t: <>승인·환불 / 거부 — 승인하면 <b>PG 부분 취소</b>로 해당 금액만 환불되고 정산에서 차감됩니다. 거부는 사유 필수, 고객이 동의하지 않으면 운영자 중재로 넘어갑니다 <Prop/>.</>, go: ['s36', 's45'] },
    ],
    badges: <>{B.y('↕ 목록·패널 각각 스크롤')} {B.f('상단바·왼쪽 메뉴 고정')}</>,
    rows: [
      ['목적', <>판매자가 자기 판매자 주문에 걸린 취소·교환·반품 요청을 처리하고, 결과가 <b>환불과 정산에 자동 반영</b>되게 한다.</>],
      ['구성 요소', <>상태 칩 / 요청 목록 / 오른쪽 상세(고객 사진·내용, 처리 방식: 회수 없이 환불·회수 후 환불·교환 재발송, 환불 금액(조정 가능 <Prop/>), 반품 배송비 차감, 승인·거부)</>],
      ['인터랙션', <>· 반품 배송비 고객 부담(단순 변심)이면 환불 금액에서 자동 차감 <Prop/><br />· 부분 환불(일부만 상함): 판매자가 금액을 줄여 승인 → 고객 동의 후 환불 <Prop/><br />· 처리 기한(요청 후 영업일 2일) 넘기면 운영자 화면에 경고 <Prop/></>],
      ['이동', <>고객 신청 → 이 화면 / 환불 결과 → 고객 <Go to="s19" /> / 정산 반영 → <Go to="s36" /> / 중재 → <Go to="s45" /></>],
      ['상태', <>· 처리 대기 0건: 「처리할 요청이 없어요」<br />· 환불 실패(PG 오류): 「환불 처리 중 오류 · 운영자가 확인 중」 — 운영자 <Go to="s45" />에 표시<br />· 이미 정산 지급된 주문의 반품: 다음 정산에서 차감(마이너스 정산) <Prop/></>],
      ['문구', <>「처리 대기」 「회수 없이 환불」 「회수 후 환불」 「승인 · 환불」 「거부」 「운영자 중재」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>PC: ↑↓ = 요청 이동(패널 갱신), A = 승인(확인 창), R = 거부 사유 입력, Esc = 패널 닫기 <Prop/>. 거부 사유 칸에서 Ctrl+Enter = 거부 확정.</> },
      { tag: 'UX · EDGE', body: <>· 판매자가 승인했는데 PG 부분 취소가 안 되는 결제 수단(일부 간편결제·기간 경과)이 있으면 계좌 환불로 바꿔야 한다 — PG 조건 확인 후 운영자 수동 처리 흐름 06 B<br />· 신선식품 반품 기준(단순 변심 불가 등)이 확정돼야 사유 목록이 정해진다 — 06 논의 안건</> },
    ],
  },

  {
    id: 's36', no: '3.6', title: '정산 내역', sub: '수수료 · 취소·환불 반영 · 내려받기', lane, frame: 'pc',
    Wire: () => (
      <Shell on="정산 내역">
        <div className="sk-row between" style={{ position: 'relative' }}>
          <div className="sk-row"><span className="sk-input sm">2026년 10월 ▾</span><div className="sk-chips"><span className="sk-chip on">정산 회차별</span><span className="sk-chip">주문별</span></div></div>
          <span className="sk-btn sm line">정산자료 내려받기 (엑셀)</span>
          <P n={1} />
        </div>
        <div className="sk-grid4" style={{ position: 'relative' }}>
          <Stat t="판매 금액" n="4,120,000" />
          <Stat t="판매 수수료 (10%)" n="−412,000" />
          <Stat t="취소·환불" n="−296,000" />
          <Stat t="정산 금액" n="3,412,000" dark />
          <P n={2} />
        </div>
        <div style={{ position: 'relative' }}>
          <Th cols={[['회차', 80], ['대상 기간'], ['판매', 64], ['수수료', 58], ['환불', 58], ['정산액', 68], ['지급', 52]]} />
          <Tr cells={[['10월 2회', 80], ['10.16 ~ 10.31 구매 확정분'], ['4,120,000', 64], ['412,000', 58], ['296,000', 58], ['3,412,000', 68, 'sk-t'], [<span className="sk-badge">지급 예정</span>, 52]]} />
          <Tr cells={[['10월 1회', 80], ['10.01 ~ 10.15 구매 확정분'], ['3,860,000', 64], ['386,000', 58], ['120,000', 58], ['3,354,000', 68, 'sk-t'], [<span className="sk-badge dark">지급 완료</span>, 52]]} />
          <P n={3} />
        </div>
        <div className="sk-banner" style={{ position: 'relative' }}><span className="sk-s">정산 금액 = 판매 금액(상품+배송비) − 판매 수수료 − 취소·환불 · 입점료·광고비는 별도 청구</span><P n={4} /></div>
      </Shell>
    ),
    pins: [
      { t: <>기간·보기 방식·내려받기 — 정산 회차별 / 주문별(판매자 주문 한 줄씩). 요구사항 "정산자료 다운로드". 엑셀 열 구성은 운영자 정산자료와 같게.</>, go: ['s47'] },
      { t: <>요약 — 판매 금액 · 판매 수수료 · 취소·환불 · <b>정산 금액</b>. 요구사항 "판매 수수료 및 취소·환불 반영 정산 내역 조회".</> },
      { t: <>회차 목록 — 정산 회차(예: 월 2회 <Prop/>)마다 대상 기간·금액·<b>지급 여부</b>. 지급 여부는 운영자가 직접 송금한 뒤 바꿉니다(요구사항: 자동 송금 제외). 정산 대상은 <b>구매 확정된 판매자 주문</b> 기준 <Prop/>.</>, go: ['s47'] },
      { t: <>계산식 안내 — 배송비에 수수료를 붙일지, PG 결제 수수료를 누가 부담할지, 입점료·광고비를 정산에서 빼고 줄지(상계) 따로 받을지 — 모두 06 논의 안건.</> },
    ],
    badges: <>{B.y()} {B.f('상단바·왼쪽 메뉴 고정')} {B.x('↔ 좁은 화면에서 표 가로 스크롤')}</>,
    rows: [
      ['목적', <>판매자가 <b>얼마를, 언제, 왜 그 금액으로</b> 받는지 확인하고 자료를 내려받는다.</>],
      ['구성 요소', <>월 선택 / 보기 방식(회차별·주문별) / 내려받기 / 요약 4칸 / 회차 표(회차, 대상 기간, 판매, 수수료, 환불, 정산액, 지급 상태) / 계산식 안내</>],
      ['인터랙션', <>· 회차 클릭 → 그 회차에 들어간 판매자 주문 목록(주문번호, 상품, 판매 금액, 배송비, 수수료율, 수수료, 환불, 정산액)<br />· 지급 완료 회차는 지급일·입금 메모 표시<br />· 세금계산서(수수료분) 발행 내역은 1차 제외 — 06 B</>],
      ['이동', <>운영자 정산 처리 → <Go to="s47" /> / 환불 원인 → <Go to="s35" /> / 홈 요약 → <Go to="s32" /></>],
      ['상태', <>· 이번 달 정산 없음: 「구매 확정된 주문이 생기면 정산 예정 금액이 보여요」<br />· 정산 후 반품(마이너스): 다음 회차에 「이전 회차 반품 차감」 줄 <Prop/><br />· 지급 보류(분쟁 중 주문): 해당 금액만 「보류」 <Prop/></>],
      ['문구', <>「정산자료 내려받기 (엑셀)」 「판매 수수료」 「취소·환불」 「정산 금액」 「지급 예정」 「지급 완료」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>PC: 월 선택에서 ←→ = 이전·다음 달, ↑↓ = 회차 이동, Enter = 회차 펼치기.</> },
      { tag: 'UX · EDGE', body: <>· 금액은 원 단위 정수, 수수료 끝전 처리(버림·반올림)를 계약서와 맞춰야 한다 <Prop>버림</Prop><br />· 수수료율이 바뀌면 <b>바뀐 날 이후 결제분</b>부터 새 요율 — 주문마다 결제 시점 요율을 저장한다</> },
    ],
  },

  {
    id: 's37', no: '3.7', title: '입점료 · 광고', sub: '청구 내역 · 광고 신청', lane, frame: 'pc',
    Wire: () => (
      <Shell on="입점료 · 광고">
        <div style={{ position: 'relative' }}><div className="sk-chips"><span className="sk-chip on">입점료</span><span className="sk-chip">광고 신청</span><span className="sk-chip">광고비 내역</span></div><P n={1} /></div>
        <div style={{ position: 'relative' }}>
          <Th cols={[['청구 월', 70], ['항목'], ['금액', 70], ['납부 방법', 100], ['상태', 60]]} />
          <Tr cells={[['2026.11', 70], ['월 입점료', 0, 'sk-t'], ['○○○,000', 70], ['정산 차감', 100], [<span className="sk-badge">청구 예정</span>, 60]]} />
          <Tr cells={[['2026.10', 70], ['월 입점료', 0, 'sk-t'], ['○○○,000', 70], ['계좌 입금', 100], [<span className="sk-badge dark">납부 완료</span>, 60]]} />
          <P n={2} />
        </div>
        <div className="sk-card" style={{ position: 'relative' }}>
          <span className="sk-t">광고 신청 · 상품 상위 노출</span>
          <div className="sk-row"><span className="sk-input sm grow">상품: 성주 꿀참외 2kg ▾</span><span className="sk-input sm" style={{ flex: '0 0 110px' }}>노출 위치: 과일 ▾</span><span className="sk-input sm" style={{ flex: '0 0 130px' }}>기간 11.01 ~ 11.14</span></div>
          <div className="sk-row between"><span className="sk-s">남은 자리 2/4 · 14일 ○○○,000원</span><span className="sk-btn sm">신청</span></div>
          <P n={3} />
        </div>
        <div className="sk-banner" style={{ position: 'relative' }}><span className="sk-s">배너 광고는 운영자에게 문의 (1차) · 광고 성과(노출·클릭) 보기</span><P n={4} /></div>
      </Shell>
    ),
    pins: [
      { t: <>세 탭 — 입점료 / 광고 신청 / 광고비 내역. 요구사항 "입점료 및 광고비 결제·청구 내역 조회". 수익모델이 <b>검토 중</b>이라 이 화면 전체가 1차 범위 확정에 따라 줄거나 빠질 수 있습니다 <Prop/>.</> },
      { t: <>입점료 청구 내역 — 월정액(예시) 청구 월·금액·납부 방법·상태. 납부 방법은 <b>정산금에서 차감</b> 또는 <b>계좌 입금</b> 중 운영자가 정한 것 <Prop/>. 판매자 카드 정기결제는 2차 후보.</>, go: ['s46'] },
      { t: <><b>광고 신청(상위 노출)</b> — 상품·노출 위치(카테고리)·기간을 고르면 자리 수와 금액이 나옵니다. 1차는 <b>기간 정액 · 자리 수 제한</b> 방식 <Prop/>. 클릭당 과금(CPC)·입찰은 2차 후보.</>, go: ['s13', 's46'] },
      { t: <>배너 광고·성과 — 1차는 운영자가 배너를 직접 등록(판매자는 문의), 광고 성과(노출·클릭 수) 보기 <Prop/>.</> },
    ],
    badges: <>{B.y()} {B.f('상단바·왼쪽 메뉴 고정')}</>,
    rows: [
      ['목적', <>판매자가 입점료·광고비를 <b>얼마, 언제, 어떻게</b> 내는지 보고, 상품 광고를 신청한다(요구사항 6번 — 범위 제안 요청 항목).</>],
      ['구성 요소', <>탭 3개 / 입점료 표(청구 월, 항목, 금액, 납부 방법, 상태) / 광고 신청 카드(상품, 노출 위치, 기간, 남은 자리, 금액, 신청) / 광고비 내역 표 / 배너·성과 안내</>],
      ['인터랙션', <>· 광고 신청 → 운영자 승인 <Prop/> → 기간 시작일 0시 자동 노출, 종료일 24시 자동 해제<br />· 광고비 납부: 정산 차감 또는 입금 확인 후 노출 시작 <Prop/><br />· 판매자가 이 화면에서 결제하는 것은 <b>PC 웹 결제</b>라 앱스토어 인앱결제와 무관</>],
      ['이동', <>운영자 설정·승인 → <Go to="s46" /> / 광고 노출 → 고객 <Go to="s13" /> · <Go to="s12" /> / 정산 차감 → <Go to="s36" /></>],
      ['상태', <>· 입점료 미납: 「○일까지 납부하지 않으면 상품 노출이 중지돼요」 <Prop/><br />· 광고 자리 마감: 「이 기간은 자리가 다 찼어요 · 다른 기간 보기」<br />· 광고 상품 품절: 광고 기간은 그대로 흐르고 노출만 멈춤 <Prop/></>],
      ['문구', <>「입점료」 「광고 신청 · 상품 상위 노출」 「남은 자리 2/4」 「정산 차감」 「납부 완료」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>PC: 기간 칸은 달력 입력 — ←→ = 하루, PgUp/PgDn = 한 달, Enter = 선택.</> },
      { tag: 'UX · EDGE', body: <>· 오픈 초기 판매자 2곳(참여 기업)에게도 입점료를 받는지, 면제하는지 — 06 논의 안건<br />· 광고비·입점료에는 플랫폼이 판매자에게 <b>세금계산서</b>를 발행해야 한다 — 발행을 시스템에서 할지(전자세금계산서 연동) 회계 담당이 할지 06 B</> },
    ],
  },

  {
    id: 's38', no: '3.8', title: '계정 · 권한 · 배송 설정', sub: '직원 계정 · 배송비 규칙', lane, frame: 'pc',
    Wire: () => (
      <Shell on="계정 · 설정">
        <div style={{ position: 'relative' }}><div className="sk-chips"><span className="sk-chip on">직원 계정</span><span className="sk-chip">배송비 규칙</span><span className="sk-chip">판매자 정보</span><span className="sk-chip">정산 계좌</span></div><P n={1} /></div>
        <div style={{ position: 'relative' }}>
          <Th cols={[['이름', 70], ['아이디'], ['상품', 46], ['주문·배송', 60], ['취소·반품', 60], ['정산', 46]]} />
          <Tr cells={[['김대표', 70], ['owner01 (대표)', 0, 'sk-t'], ['✓', 46], ['✓', 60], ['✓', 60], ['✓', 46]]} />
          <Tr cells={[['이직원', 70], ['staff02', 0, 'sk-t'], ['✓', 46], ['✓', 60], ['—', 60], ['—', 46]]} />
          <div className="sk-row" style={{ marginTop: 4 }}><span className="sk-btn sm line">＋ 직원 추가</span></div>
          <P n={2} />
        </div>
        <div className="sk-card" style={{ position: 'relative' }}>
          <span className="sk-t">배송비 규칙</span>
          <div className="sk-list"><span className="sk-t grow">기본 · 3,000원 / 4만원 이상 무료</span><span className="sk-s">제주·도서산간 +3,000 · 상품 18개</span></div>
          <div className="sk-list"><span className="sk-t grow">냉장 · 4,000원 / 무료 기준 없음</span><span className="sk-s">제주·도서산간 배송 불가 · 상품 4개</span></div>
          <P n={3} />
        </div>
        <div className="sk-banner" style={{ position: 'relative' }}><span className="sk-s">상호·사업자번호·정산 계좌 변경은 운영자 확인 후 반영돼요</span><P n={4} /></div>
      </Shell>
    ),
    pins: [
      { t: <>설정 탭 — 직원 계정 / 배송비 규칙 / 판매자 정보 / 정산 계좌.</> },
      { t: <><b>직원 계정·권한</b> — 요구사항 "판매자 계정 및 권한 관리". 대표 계정이 직원 계정을 만들고 메뉴 단위(상품·주문배송·취소반품·정산)로 권한을 켭니다 <Prop/>. 정산·계좌는 대표 계정만 기본.</> },
      { t: <><b>배송비 규칙</b> — 판매자가 규칙을 여러 개 만들고 상품마다 하나를 고릅니다(요구사항 "판매자별 배송비"). 기본 배송비 · 무료 기준 · 제주·도서산간 추가 또는 배송 불가 <Prop/>.</>, go: ['s33', 's15'] },
      { t: <>중요 정보 변경 — 상호·사업자번호·정산 계좌는 운영자 확인 후 반영 <Prop/>(정산 사고 방지).</>, go: ['s41'] },
    ],
    badges: <>{B.y()} {B.f('상단바·왼쪽 메뉴 고정')}</>,
    rows: [
      ['목적', <>판매자 대표가 직원 계정과 권한, 배송비 규칙, 판매자·계좌 정보를 관리한다.</>],
      ['구성 요소', <>탭 4개 / 직원 표(이름, 아이디, 메뉴별 권한, 마지막 접속) + 직원 추가 / 배송비 규칙 목록(이름, 기본비, 무료 기준, 도서산간, 사용 상품 수) / 판매자 정보 / 정산 계좌</>],
      ['인터랙션', <>· 직원 추가 → 이름·아이디·휴대폰 → 임시 비밀번호 문자 <Prop/><br />· 배송비 규칙 수정 → 그 규칙을 쓰는 모든 상품에 즉시 반영(이미 결제된 주문은 그대로)<br />· 사용 중인 규칙은 삭제 불가</>],
      ['이동', <>상품 등록의 배송비 선택 → <Go to="s33" /> / 고객 장바구니 계산 → <Go to="s15" /> / 정보 변경 심사 → <Go to="s41" /></>],
      ['상태', <>· 직원 권한 없는 메뉴: 메뉴는 보이되 「권한이 없어요 · 대표 계정에 요청하세요」<br />· 계좌 변경 심사 중: 「변경 확인 중 · 이번 정산은 기존 계좌로」</>],
      ['문구', <>「직원 계정」 「＋ 직원 추가」 「배송비 규칙」 「제주·도서산간」 「운영자 확인 후 반영돼요」</>],
    ],
    ux: [
      { tag: 'UX · KEYBOARD', kb: true, body: <>PC: 권한 표에서 Space = 체크 전환, Tab = 다음 칸. 배송비 금액 칸은 숫자만.</> },
      { tag: 'UX · EDGE', body: <>· 묶음배송 미적용이므로 <b>판매자 안에서도 규칙이 다른 상품을 함께 사면 배송비를 어떻게 셀지</b> 정해야 한다(가장 큰 배송비 1회 / 규칙별 각각) — 06 논의 안건<br />· 직원 활동 기록(누가 송장·환불을 처리했는지)은 주문 상태 이력에 처리자로 남긴다</> },
    ],
  },
];
