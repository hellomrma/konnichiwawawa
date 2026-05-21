import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <Link href="/" className="text-sm text-primary hover:underline">
          ← 홈으로
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-foreground">
          서비스 이용약관
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          시행일: 2025년 6월 1일 · 최종 수정일: 2025년 6월 1일
        </p>

        <div className="mt-8 flex flex-col gap-8 text-sm leading-relaxed text-foreground">
          <section>
            <h2 className="mb-3 text-base font-bold">
              제1조 (목적 및 서비스 소개)
            </h2>
            <p className="text-muted-foreground">
              본 약관은 Konnichiwawawa(이하 "서비스")가 제공하는 일본어 학습
              웹서비스의 이용 조건 및 절차, 이용자와 서비스 운영자 간의 권리·
              의무 및 책임 사항을 규정함을 목적으로 합니다.
            </p>
            <p className="mt-3 text-muted-foreground">
              Konnichiwawawa는 치와와 마스코트 코니(Koni)와 함께 히라가나·
              가타카나·기초 어휘를 학습하는 웹 기반 일본어 입문 서비스입니다.
              회원은 무료로 학습 콘텐츠에 접근하고 학습 진도를 저장할 수
              있습니다.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold">제2조 (이용 자격)</h2>
            <p className="text-muted-foreground">
              서비스는 다음 조건을 충족하는 사람이라면 누구나 이용할 수
              있습니다.
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">연령 제한:</span>{" "}
                만 14세 이상인 자. 만 14세 미만인 경우 법정대리인의 동의가
                필요하며, 서비스는 만 14세 미만의 이용자로부터 개인정보를
                수집하지 않습니다.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  정확한 정보 제공:
                </span>{" "}
                회원가입 시 본인의 정확한 정보를 입력해야 합니다. 허위 정보
                입력으로 인한 불이익의 책임은 이용자에게 있습니다.
              </li>
              <li>
                <span className="font-medium text-foreground">약관 동의:</span>{" "}
                본 약관 및 개인정보처리방침에 동의한 자
              </li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              서비스는 다음에 해당하는 경우 이용 신청을 거절하거나 사후에
              이용을 제한할 수 있습니다: 타인의 정보 도용, 이전 약관 위반으로
              인한 이용 제한 이력, 부정한 목적의 이용이 확인된 경우.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold">제3조 (계정 및 보안)</h2>
            <p className="text-muted-foreground">
              이용자는 자신의 계정 보안에 대한 책임을 집니다.
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-muted-foreground">
              <li>
                이용자는 비밀번호를 제3자에게 공유하거나 양도해서는 안 됩니다.
              </li>
              <li>
                계정 도용 또는 무단 사용이 의심되는 경우 즉시 서비스에
                신고해야 합니다.
              </li>
              <li>
                이용자의 관리 소홀로 인한 계정 도용 피해에 대해 서비스는 책임을
                지지 않습니다.
              </li>
              <li>
                1인 1계정 원칙을 준수해야 합니다. 동일인의 다수 계정 운영은
                금지됩니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold">제4조 (금지 행위)</h2>
            <p className="text-muted-foreground">
              이용자는 서비스 이용 시 다음 행위를 해서는 안 됩니다.
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">
                  무단 복제·배포:
                </span>{" "}
                서비스 내 학습 콘텐츠, 이미지, 문제 데이터 등을 운영자의 사전
                서면 동의 없이 복제하거나 제3자에게 배포하는 행위
              </li>
              <li>
                <span className="font-medium text-foreground">역공학:</span>{" "}
                서비스의 소스코드, 알고리즘, 데이터 구조 등을 역분석하거나
                이를 통해 파생 서비스를 만드는 행위
              </li>
              <li>
                <span className="font-medium text-foreground">
                  자동화 스크래핑:
                </span>{" "}
                크롤러, 봇, 스크립트 등 자동화된 수단을 사용해 서비스 데이터를
                수집하거나 서비스에 과부하를 주는 행위
              </li>
              <li>
                <span className="font-medium text-foreground">
                  시스템 침해:
                </span>{" "}
                서비스 서버·네트워크에 대한 해킹 시도, 악성코드 배포, 서비스
                장애 유발 행위
              </li>
              <li>
                <span className="font-medium text-foreground">
                  타인 권리 침해:
                </span>{" "}
                다른 이용자의 정보를 도용하거나 명예를 훼손하는 행위
              </li>
              <li>
                <span className="font-medium text-foreground">상업적 이용:</span>{" "}
                운영자의 사전 동의 없이 서비스를 상업적 목적으로 이용하는 행위
              </li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              금지 행위 적발 시 사전 통지 없이 계정을 정지하거나 영구 탈퇴
              처리할 수 있으며, 법적 조치를 취할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold">제5조 (지식재산권)</h2>
            <p className="text-muted-foreground">
              서비스가 제공하는 모든 콘텐츠(학습 문제, 텍스트, 이미지, 캐릭터
              디자인, 음원, UI/UX 디자인 등)의 저작권 및 지식재산권은 서비스
              운영자 또는 정당한 권리자에게 귀속됩니다.
            </p>
            <p className="mt-3 text-muted-foreground">
              이용자는 서비스 이용 중 생성한 자신의 학습 기록 데이터에 대한
              접근권을 가집니다. 단, 이 데이터를 서비스 외부에서 상업적으로
              이용하는 것은 금지됩니다.
            </p>
            <p className="mt-3 text-muted-foreground">
              서비스의 특정 코드 또는 라이브러리는 오픈소스 라이선스를 따를 수
              있으며, 해당 라이선스는 별도로 명시됩니다.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold">제6조 (면책조항)</h2>
            <p className="text-muted-foreground">
              서비스는 다음의 경우에 대해 책임을 지지 않습니다.
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">
                  서비스 중단·장애:
                </span>{" "}
                천재지변, 서버 장애, 네트워크 문제, 정기 점검 등 불가피한
                사유로 인한 서비스 중단 또는 데이터 손실에 대해 책임을 지지
                않습니다.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  학습 효과 미보장:
                </span>{" "}
                서비스는 일본어 학습을 보조하는 도구이며, 특정 학습 효과나
                시험 합격을 보장하지 않습니다.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  제3자 서비스:
                </span>{" "}
                Google, Kakao 등 외부 서비스의 장애, 정책 변경으로 인한 소셜
                로그인 불가 등에 대해 책임을 지지 않습니다.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  이용자 과실:
                </span>{" "}
                이용자의 부주의 또는 약관 위반으로 인한 손해에 대해 책임을
                지지 않습니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold">제7조 (서비스 변경·종료)</h2>
            <p className="text-muted-foreground">
              서비스는 운영상·기술상의 이유로 콘텐츠를 수정하거나 서비스 일부
              또는 전부를 변경·종료할 수 있습니다. 서비스 종료 시에는 종료
              30일 전에 서비스 내 공지를 통해 이용자에게 알립니다.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold">제8조 (약관 변경)</h2>
            <p className="text-muted-foreground">
              서비스는 관련 법령 개정이나 서비스 정책 변경에 따라 본 약관을
              수정할 수 있습니다.
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-muted-foreground">
              <li>
                약관 변경 시 시행 7일 전 서비스 내 공지사항을 통해 사전
                고지합니다. 이용자에게 불리한 변경의 경우 30일 전에
                고지합니다.
              </li>
              <li>
                공지 후 이용자가 명시적으로 거부 의사를 밝히지 않으면 변경된
                약관에 동의한 것으로 간주합니다.
              </li>
              <li>
                변경된 약관에 동의하지 않는 이용자는 서비스 이용을 중단하고
                탈퇴할 수 있습니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold">
              제9조 (준거법 및 분쟁 해결)
            </h2>
            <p className="text-muted-foreground">
              본 약관은{" "}
              <span className="font-medium text-foreground">
                대한민국 법률
              </span>
              을 준거법으로 합니다. 서비스 이용과 관련하여 발생하는 분쟁에
              대해 당사자 간 협의를 통해 해결하는 것을 원칙으로 하며, 협의가
              이루어지지 않는 경우 민사소송법에 따른 관할 법원에 소를 제기할
              수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold">제10조 (문의)</h2>
            <p className="text-muted-foreground">
              약관에 관한 문의 사항이 있으시면 아래 연락처로 문의해 주세요.
            </p>
            <div className="mt-3 rounded-xl border border-border bg-card px-5 py-4 text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">서비스명:</span>{" "}
                Konnichiwawawa
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
            </div>
          </section>

          <p className="border-t border-border pt-6 text-xs text-muted-foreground">
            본 약관은 2025년 6월 1일부터 시행됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
