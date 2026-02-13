# 📟subscription-value-analyzer
사용량 기반 구독 서비스 가치 분석 및 해지 추천 웹애플리케이션입니다.
단순 지출 함계가 아닌, 사용 빈도와 만족도를 반영한 가치기반 의사결정 지원을 목표로 합니다. 


## 1. 문제 정의 
구독하는 서비스가 증가하면서 사용자는 불필요한 월 고정 지출을 인지하지 못한채 유지하는 경우가 많습니다.
실제로 거의 사용하지 않거나 만족도가 낮은 서비스를 계속 구독하게 되는 경우가 많기 때문에, 이 프로젝트에서는 지출 합계 계산 뿐만 아니라 사용량과 만족도를 반영한 가치 기반 의사결정 지원을 목표로 합니다. 

## 2. 해결 전략  
1. 모든 구독을 월 환산 비용으로 통일
2. 사용빈도(주당 횟수)와 만족도(1~5)를 입력받아 가치 점수 산출
3. 가치 대비 비용이 높은 항목을 해지 후보로 추천
4. 해지 시 예상 절감 금액을 시각적으로 제공

## 3. 핵심 기능 
- 구독 CRUD
- 월 환산 비용 계산
- 가치점수 계산
- 해지 후보 Top3 추천
- 월/연 총 지출 계산


# 🚀 로컬 실행 방법
본 프로젝트는 FastAPI 기반 Backend와 Next.js 기반 Frontend로 구성됩니다.
로컬에서 실행 시 터미널을 2개 열어 각각 실행해주세요.

## 1. 사전 준비
- Python 3.11 이상
- Node.js 20 이상
- Git

## 2. 저장소 클론
git clone https://github.com/sennycho/subscription-value-analyzer.git
cd subscription-value-analyzer

## 🖥 Backend 실행 (FastAPI)
### 1) backend 폴더 이동

### 2) 가상환경 생성
python -m venv .venv
.venv\Scripts\activate

### 3) 의존성 설치
pip install -r requirements.txt

### 4) 서버 실행
uvicorn app.main:app --reload

### Backend 확인
- Swagger: http://localhost:8000/docs
- Health Check: http://localhost:8000/api/health

최초 실행 시 backend/app.db 파일이 자동 생성됩니다.

## 🌐 Frontend 실행 (Next.js)
### 1) frontend 폴더 이동

### 2) 환경 변수 설정
frontend/.env.local 파일을 생성하고 아래 내용을 입력합니다.
NEXT_PUBLIC_API_BASE=http://localhost:8000

### 3) 의존성 설치
npm install

### 4) 개발 서버 실행
npm run dev

### 접속 주소
http://localhost:3000

## 🧪 테스트 실행 (Backend)
핵심 계산 로직에 대한 단위 테스트가 포함되어 있습니다.
cd backend
.venv\Scripts\activate
pytest

정상 실행 시:
3 passed

## ✅ 동작 확인 방법
1. http://localhost:3000 접속
2. "구독 추가" 메뉴에서 데이터 입력
3. "구독 목록"에서 저장/삭제 확인
4. 대시보드에서
- 월/연 총 지출
- 해지 후보 Top3
- 예상 절감 금액 확인 가능
