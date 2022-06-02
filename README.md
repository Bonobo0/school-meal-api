# 한국 초ㆍ중ㆍ고 급식 정보 API Wrapper
***
<h2>사용 방법</h2>
<p style="font-size: 23px">
API Request Method: GET
<br/>
<br/>
API Endpoint: {host}/api/meal?schoolname=학교이름&type=급식타입&date=YYYYMMDD
<br/>
<br/>
급식타입: {1: 조식, 2: 중식, 3: 석식}
</p>
<h2>예시</h2>
<p style="font-size: 23px">
localhost:3000/api/meal?schoolname=개포고등학교&type=2&date=20220602
</p>
<h2>예시 결과</h2>
<p style="font-size:20px;">
{
    "date": 20221231,
    "menu" : "",
    "calorie" : 0,
    "nutrient": "",
    "allergie": []
}
</p>


