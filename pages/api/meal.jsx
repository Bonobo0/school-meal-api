export default async function getServerSideProps(req, res) {
    const schoolname = req.query.schoolname;
    const inputDate = req.query.date;
    async function getSchoolInfo() {
        const response = fetch(`http://${req.rawHeaders[1]}/fetch/schoolID/${schoolname}`);
        const res = await response;
        return await res.json();
    }
    const schoolInfo = await getSchoolInfo();
    const schoolID = schoolInfo.schoolInfo[1].row[0].SD_SCHUL_CODE;
    const officeID = schoolInfo.schoolInfo[1].row[0].ATPT_OFCDC_SC_CODE;
    let type = req.query.type;
    if (type == undefined) {
        type = 2;
    }
    async function getMeal() {
        let currentDate = 0
        if (inputDate == undefined) {
            const date = new Date();
            const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
            const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
            const kr_curr = new Date(utc + KR_TIME_DIFF);
            let month = kr_curr.getMonth() + 1;
            let day = kr_curr.getDate();
            if (month < 10) {
                month = '0' + month;
            }
            if (day < 10) {
                day = '0' + day;
            }
            
            currentDate = `${kr_curr.getFullYear()}${month}${day}`;
        }
        else 
        {
            currentDate = inputDate;
        }
        const response = fetch(`https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&pIndex=1&pSize=100&MLSV_YMD=${currentDate}&ATPT_OFCDC_SC_CODE=${officeID}&SD_SCHUL_CODE=${schoolID}`);
        const res = await response;
        return await res.json();
    }
    
    const meal = await getMeal();
    if (meal.mealServiceDietInfo == undefined) {
        return res.json({menu: 'No Data', calorie:'No Data', nutrient:'No Data'});
    }
    const data = meal.mealServiceDietInfo[1].row;
    for (let i = 0; i < data.length; i++) {
            if (data[i]['MMEAL_SC_CODE'] == type) {
                return res.json({
                    menu: data[i]['DDISH_NM'].replace(/^\s+|<br\/>/g, '').replace(/\([^)]*\)/g, "").replaceAll('*', ''),
                    calorie: data[i]['CAL_INFO'],
                    nutrient: data[i]['NTR_INFO'].replaceAll('<br/>', ' '),
                });
            }
    };
    return res.json({
        meal: null
    })
    

}