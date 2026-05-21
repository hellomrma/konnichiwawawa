import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <Link href="/" className="text-sm text-primary hover:underline">
          ← 홈으로
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-foreground">
          개인정보처리방침
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          시행일: 2025년 6월 1일
        </p>

        <div className="mt-8 flex flex-col gap-8 text-sm leading-relaxed text-foreground">
          <section>
            <h2 className="mb-3 text-base font-bold">
              1. 수집하는 개인정보 항목
            </h2>
            <p className="text-muted-foreground">
              Konnichiwawawa(이하 "서비스")는 서비스 이용을 위해 다음과 같은
              개인정보를 수집합니다.
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">
                  필수 수집 항목:
                </span>{" "}
                이메일 주소, 표시 이름(닉네임)
              </li>
              <li>
                <span className="font-medium text-foreground">
                  소셜 로그인 시 추가 수집:
                </span>{" "}
                Google 또는 Kakao가 제공하는 OAuth 식별자(고유 ID), 프로필
                이미지 URL
              </li>
              <li>
                <span className="font-medium text-foreground">
                  서비스 이용 과정에서 자동 생성:
                </span>{" "}
                학습 기록(단원·레슨 진도, 정답률, 획득 XP, 학습 연속일), 최초
                가입일, 마지막 접속일
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold">
              2. 개인정보 수집·이용 목적
            </h2>
            <p className="text-muted-foreground">
              수집한 개인정보는 다음 목적으로만 이용합니다.
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">
                  회원 식별 및 인증:
                </span>{" "}
                로그인, 계정 관리, 본인 확인
              </li>
              <li>
                <span className="font-medium text-foreground">
                  서비스 제공:
                </span>{" "}
                일본어 학습 콘텐츠 제공, 학습 진도 저장 및 복원
              </li>
              <li>
                <span className="font-medium text-foreground">
                  학습 경험 개선:
                </span>{" "}
                XP·연속학습일(Streak) 등 학습 동기 부여 기능 운영
              </li>
              <li>
                <span className="font-medium text-foreground">
                  서비스 운영·개선:
                </span>{" "}
                오류 감지, 서비스 품질 향상을 위한 통계 분석 (개인 식별 불가
                형태로 처리)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold">
              3. 개인정보 보유·이용 기간
            </h2>
            <p className="text-muted-foreground">
              회원의 개인정보는 서비스 이용 계약이 유효한 기간, 즉{" "}
              <span className="font-medium text-foreground">
                회원 탈퇴 요청 후 즉시 삭제
              </span>
              되는 것을 원칙으로 합니다. 단, 관계 법령에 따라 보존이 필요한
              경우 해당 법령에서 정한 기간 동안 보관합니다.
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-muted-foreground">
              <li>
                전자상거래 등에서의 소비자보호에 관한 법률: 계약 또는 청약
                철회에 관한 기록 — 5년
              </li>
              <li>통신비밀보호법: 서비스 이용 로그 — 3개월</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold">
              4. 개인정보 제3자 제공
            </h2>
            <p className="text-muted-foreground">
              서비스는 이용자의 개인정보를 원칙적으로 제3자에게 제공하지
              않습니다. 다만, 서비스 운영을 위한 인프라 처리자(수탁사)로{" "}
              <span className="font-medium text-foreground">
                Supabase, Inc.
              </span>
              가 데이터베이스 및 인증 서비스를 수탁하여 처리합니다. 수탁사는
              위탁받은 목적 이외의 용도로 개인정보를 이용하거나 제3자에게
              제공하지 않습니다.
            </p>
            <p className="mt-3 text-muted-foreground">
              다음의 경우에는 예외적으로 제공될 수 있습니다.
            </p>
            <ul className="mt-2 flex flex-col gap-2 text-muted-foreground">
              <li>이용자가 사전에 명시적으로 동의한 경우</li>
              <li>
                법령의 규정에 의하거나 수사·조사 목적으로 관계 기관의 요구가
                있는 경우
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold">5. 이용자의 권리</h2>
            <p className="text-muted-foreground">
              이용자는 언제든지 다음의 권리를 행사할 수 있습니다.
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">열람 요청:</span>{" "}
                본인의 개인정보 처리 현황 확인
              </li>
              <li>
                <span className="font-medium text-foreground">수정 요청:</span>{" "}
                부정확한 개인정보의 정정
              </li>
              <li>
                <span className="font-medium text-foreground">삭제 요청:</span>{" "}
                개인정보 삭제(회원 탈퇴 포함)
              </li>
              <li>
                <span className="font-medium text-foreground">
                  처리 정지 요청:
                </span>{" "}
                개인정보 처리의 일시적 정지
              </li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              권리 행사는 아래 개인정보 보호책임자에게 이메일로 요청하시면
              지체 없이 조치하겠습니다.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold">
              6. 개인정보 보호책임자
            </h2>
            <p className="text-muted-foreground">
              개인정보 처리에 관한 업무를 총괄하고 이용자의 개인정보 관련
              불만·문의를 처리합니다.
            </p>
            <div className="mt-3 rounded-xl border border-border bg-card px-5 py-4 text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">책임자:</span>{" "}
                서비스 운영자
              </p>
              <p className="mt-1">
                <span className="font-medium text-foreground">이메일:</span>{" "}
                <a
                  href="mailto:support@konnichiwawawa.app"
                  className="text-primary hover:underline"
                >
                  support@konnichiwawawa.app
                </a>
              </p>
              <p className="mt-1">
                <span className="font-medium text-foreground">처리 기간:</span>{" "}
                접수 후 10영업일 이내 회신
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold">7. 쿠키 및 자동 수집</h2>
            <p className="text-muted-foreground">
              서비스는 로그인 세션 유지를 위해 쿠키(Cookie)를 사용합니다.
              브라우저 설정을 통해 쿠키 저장을 거부할 수 있으나, 이 경우
              로그인 기능이 제한될 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold">
              8. 개인정보처리방침 변경
            </h2>
            <p className="text-muted-foreground">
              본 방침은 법령·서비스 변경에 따라 수정될 수 있습니다. 중요한
              변경 사항은 서비스 내 공지사항을 통해 시행 7일 전에 사전
              고지합니다. 변경된 방침은 공지된 시행일로부터 효력이 발생합니다.
            </p>
          </section>

          <p className="border-t border-border pt-6 text-xs text-muted-foreground">
            본 개인정보처리방침은 2025년 6월 1일부터 시행됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
