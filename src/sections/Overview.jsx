import { Prop } from '../doc/kit.jsx';

export default function Overview() {
  return (
    <section className="sec" id="overview">
      <div className="sec-label"><i>01</i><span>OVERVIEW</span></div>
      <h2>개요</h2>

      <div className="legend">
        <span><b>읽는 법</b></span>
        <span>표시 없음 = 클라이언트 공고문(요구사항)에 있는 내용</span>
        <span><Prop /> = 요구사항에 없거나 확정되지 않은 내용 — <b>미팅에서 확정할 때까지 PiUS의 제안</b>입니다</span>
      </div>

      <h3>프로젝트 한 줄</h3>
      <p><b>농수산물 산지직송 상품</b>을 파는 독립형 커머스 플랫폼. 처음에는 참여 기업 <b>2곳이 각각 판매자</b>로 입점해 팔고, 이후 <b>외부 판매자까지 입점</b>하는 멀티셀러 구조로 넓힙니다. 고객 서비스(앱 또는 웹앱) · 운영자 웹 관리자 · 판매자 관리 페이지 · 서버를 만들고, 판매 수수료에 더해 <b>입점료·광고 수수료</b> 수익모델을 검토 중입니다.</p>
      <p>이 플랫폼의 핵심은 한 문장입니다 — <b>"결제는 한 번, 주문·배송·환불·정산은 판매자별로."</b> 고객은 여러 판매자 상품을 한 장바구니에 담아 한 번에 결제하지만, 실제로는 판매자마다 따로 출고·배송·취소·정산됩니다. 그래서 이 기획서는 <b>하나의 결제가 판매자 주문 N개로 나뉘는 지점</b>을 고객·판매자·운영자 화면 모두에서 같은 말로 보여주는 데 가장 많은 장치를 썼습니다(판매자별 장바구니 묶음, 판매자 주문 번호, 판매자별 송장, PG 부분 취소, 구매 확정 기준 정산).</p>
      <p>PiUS는 과일 멀티셀러 커머스 플랫폼 <b>FRUT</b>을 구축·운영한 경험이 있습니다. 판매자 입점 구조, 판매자별 주문·배송 분리, PG·간편결제와 정산 로직을 이 프로젝트에 재활용하는 안을 06 섹션에 구현 방식별 견적과 함께 제안합니다.</p>

      <h3>사용자</h3>
      <table className="spec"><tbody>
        <tr><th>고객<br /><span className="muted">웹앱 · 모바일 주력</span></th><td>산지 직송 과일·채소·수산물을 사는 사람. <b>신선도·원산지·배송비</b>를 가장 먼저 보고, 여러 산지 상품을 함께 사도 "왜 상자가 따로 오는지"를 알고 싶어합니다. 카카오·네이버·Apple 소셜 로그인 또는 이메일 가입.</td></tr>
        <tr><th>판매자<br /><span className="muted">판매자 센터 · PC</span></th><td>농가·수산업체·유통업체. 처음엔 참여 기업 2곳, 이후 외부 판매자. 하루 일과의 중심은 <b>주문 확인 → 송장 입력</b>이고, 반품 요청과 정산 금액을 확인합니다. 입점 신청 → 운영자 승인 후 이용. 직원 계정을 나눠 줄 수 있습니다.</td></tr>
        <tr><th>운영자<br /><span className="muted">관리자 웹 · PC</span></th><td>플랫폼 운영 담당자(클라이언트사). 판매자 입점 심사, 전체 주문·환불 확인, 수수료·입점료·광고 설정, <b>정산자료를 보고 판매자에게 직접 송금한 뒤 지급 여부 기록</b>, 공지·알림을 맡습니다.</td></tr>
      </tbody></table>

      <h3>목표 / 비목표</h3>
      <table className="spec"><tbody>
        <tr><th>목표<br /><span className="muted">공고문 합격 기준</span></th><td>
          ① 고객이 여러 판매자 상품을 <b>한 번에 주문·결제</b>한다<br />
          ② 주문·배송·취소/환불·정산이 <b>판매자별로 분리</b>되어 처리된다<br />
          ③ 결제 → 주문 → 배송 → 취소/환불 → <b>정산 내역 산출</b>까지 전체 흐름이 검증된다<br />
          ④ 확정된 범위의 <b>입점료·광고 수수료</b> 기능이 동작한다<br />
          ⑤ 확정된 구현 방식대로 <b>서비스 오픈(웹앱) 또는 스토어 등록(앱)</b>까지 끝낸다<br />
          ⑥ 소스코드·디자인 원본을 인도한다(소스 재활용 시 소유권·이용 조건 명시)
        </td></tr>
        <tr><th>비목표<br /><span className="muted">공고문의 제외 범위</span></th><td>
          · 정산금 <b>자동 송금</b> (운영자가 자료 확인 후 직접 지급)<br />
          · <b>묶음배송</b> (같은 장바구니여도 판매자별 배송)<br />
          · 기존 쇼핑몰과 연동 (독립 플랫폼)
        </td></tr>
        <tr><th>1차 제외 제안 <Prop /></th><td>
          · 쿠폰·적립금·회원 등급 (공고문에 없음 — 06 B에서 확인)<br />
          · 판매자 한 곳 안의 부분 출고 · 직접 배송(퀵) · 택배사 반품 접수 연동<br />
          · 입점료 카드 정기결제 · 광고 입찰/클릭당 과금 · 판매자 세금계산서 자동 발행<br />
          · 엑셀 일괄 상품 등록 · 가격 비교 묶음 · 고급 검색(초성·오타 보정)
        </td></tr>
      </tbody></table>

      <h3>용어 · 상태 정의 <span className="muted">(문서 전체와 세 사용자 화면이 이 이름만 씁니다)</span></h3>
      <table className="spec"><tbody>
        <tr><th>주문</th><td>고객이 <b>한 번 결제한 단위</b>. 주문번호 하나(예: 2610220012). 결제 금액 = 모든 판매자 상품 + 판매자별 배송비.</td></tr>
        <tr><th>판매자 주문</th><td>주문을 <b>판매자별로 나눈 단위</b>(예: 2610220012-1, -2). 출고·송장·배송 상태·취소/반품·정산이 모두 이 단위로 움직입니다. 판매자는 자기 판매자 주문만 봅니다. <Prop>번호 규칙</Prop></td></tr>
        <tr><th>판매자 주문 상태</th><td>
          <div className="state-flow"><span>결제 완료</span><em>→</em><span>상품 준비 중</span><em>→</em><span>배송 중</span><em>→</em><span>배송 완료</span><em>→</em><span className="end">구매 확정</span> <Prop /></div>
          <p className="muted" style={{ marginTop: 6 }}>상품 준비 중 = 판매자가 「주문 확인」을 누른 상태(이후 고객 즉시 취소 불가). <b>구매 확정</b>은 공고문에 없지만 "언제부터 정산 대상인가"의 기준이 필요해 제안합니다 — 고객이 누르거나 배송 완료 ○일 후 자동.</p>
        </td></tr>
        <tr><th>취소 · 반품 · 교환</th><td>
          <div className="state-flow"><span className="bad">취소 요청</span><em>→</em><span>취소 완료</span><em>·</em><span className="bad">반품 요청</span><em>→</em><span>반품 완료</span><em>·</em><span className="bad">교환 요청</span><em>→</em><span>재발송</span><em>→</em><span>교환 완료</span><em>·</em><span className="bad">거부</span><em>→</em><span>운영자 중재</span> <Prop /></div>
          <p className="muted" style={{ marginTop: 6 }}>출고 전 취소는 요청 없이 <b>즉시 취소 완료</b>(판매자 확인 없음) <Prop />. 환불은 항상 <b>PG 부분 취소</b>로 해당 판매자 주문 금액만.</p>
        </td></tr>
        <tr><th>정산</th><td>
          <div className="state-flow"><span>정산 예정</span><em>→</em><span>미지급</span><em>→</em><span className="end">지급 완료</span><em>·</em><span className="bad">보류</span> <Prop /></div>
          <p className="muted" style={{ marginTop: 6 }}>정산 금액 = 판매 금액(상품+배송비) − 판매 수수료 − 취소·환불 (− 입점료·광고비, 정산 차감 방식일 때). 공고문엔 "정산 지급 여부 관리"만 있어 상태 이름은 <Prop /></p>
        </td></tr>
        <tr><th>입점 심사</th><td><div className="state-flow"><span>심사 대기</span><em>→</em><span className="end">운영 중</span><em>·</em><span className="bad">반려</span><em>→</em><span>재신청</span><em>·</em><span className="bad">정지</span></div></td></tr>
        <tr><th>광고 상품</th><td>판매자가 기간 정액으로 사는 <b>카테고리 상위 노출</b> 자리(1차 1종) <Prop />. 고객 화면에는 반드시 「AD」 표시.</td></tr>
        <tr><th>배송비 규칙</th><td>판매자가 만들어 상품에 붙이는 배송비 묶음(기본 배송비 · 무료 기준 · 제주·도서산간). 묶음배송이 없으므로 <b>판매자 주문마다 1회</b> 부과 <Prop />.</td></tr>
      </tbody></table>

      <h3>성공 기준 <Prop /></h3>
      <ul>
        <li><b>판매자 2곳 상품을 한 번에 결제</b>하면 판매자 주문 2건이 생기고, 각 판매자 센터에는 자기 것만 보인다.</li>
        <li><b>한 판매자만 반품</b>해도 그 금액만 부분 환불되고, 그 판매자 정산에서만 빠진다 — 다른 판매자 정산은 그대로.</li>
        <li><b>정산자료 = 실제 송금액</b> — 운영자가 내려받은 엑셀 합계와 판매자 화면 정산 금액이 원 단위까지 같다.</li>
        <li><b>환불 누락 0건</b> — PG 환불이 실패하면 운영자 「환불 확인 필요」에 반드시 뜬다.</li>
        <li><b>송장 입력 10초</b> — 판매자가 주문 목록에서 송장 칸에 바로 입력(스캐너 연속 입력 가능).</li>
      </ul>
    </section>
  );
}
