# mcp-server

Python 기반 MCP 서버 예제

## 주요 기능

- **BMI 계산**: 체중(kg)과 키(m)를 입력받아 BMI(체질량지수)를 계산합니다.
- **날씨 조회**: 도시명을 입력받아 해당 도시의 현재 날씨 정보를 조회합니다.

## 사용 예시

### 1. BMI 계산
```python
@mcp.tool()
def calculate_bmi(weight_kg: float, height_m: float) -> float:
    """ Calculate the BMI given weight in kg and height in meters"""
    return weight_kg / (height_m ** 2)
```

### 2. 날씨 조회
```python
@mcp.tool()
async def fetch_weather(city: str) -> str:
    """ Fetch current weather for a city"""
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://api.weather.com/{city}")
        return response.text
```

## 실행 방법

1. 의존성 설치
   ```bash
   pip install httpx fastmcp
   ```
2. 서버 실행
   ```bash
   python server.py
   ```
