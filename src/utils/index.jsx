export function setMinDateTime() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    } 
    if (mm < 10) {
        mm = '0' + mm
    } 

    return today = yyyy + '-' + mm + '-' + dd + 'T00:00:00';
}
export function setMinDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    } 
    if (mm < 10) {
        mm = '0' + mm
    }

    return today = yyyy + '-' + mm + '-' + dd;
}

export function setDate(date) {
    if (date) {
        let today = new Date();
        if(date.indexOf('T') > 0) {
            const d = date.split('T');
            today = d[0];
            return today;
        }
        else {
            const d = date.split('/');
            let dd = d[0]; let mm = d[1]; let yyyy = d[2];
            today = yyyy + '-' + mm + '-' + dd;
            return today;
        }
    }
    return '';
}

export function ConvertDateDMY(date) {
    if (date) {
        let today = new Date();
        const d = date.split('-');
        let dd = d[2]; let mm = d[1]; let yyyy = d[0];
        today = dd + '/' + mm + '/' + yyyy;
        return today;
    }
    return '';
}

export function showPopup() {
    document.querySelector('[rel="js-popup"]').classList.add('active');
}

export function closePopup() {
    const content = document.querySelector('[rel="js-popup"]');
    content.classList.remove('active');
    if (content.classList.contains('popup-update')) content.classList.remove('popup-update');
    document.querySelectorAll('[rel="js-popup-update-not-change"]').forEach(el => {
        el.classList.remove('popup-update-not-change');
    });
}

export function convertToLocaleDateString(time, lang) {
    const convertDate = new Date(time);
    const locationLang = (lang === 'en') ? 'en-US' : 'vi-VN';
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    return convertDate.toLocaleDateString(locationLang, options)
}

function nonAccentVietnamese(str) {
    str = str.toLowerCase();
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "a");
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "e");
    str = str.replace(/??|??|???|???|??/g, "i");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "o");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "u");
    str = str.replace(/???|??|???|???|???/g, "y");
    str = str.replace(/??/g, "d");
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); 
    str = str.replace(/\u02C6|\u0306|\u031B/g, "");
    return str;
}

export function convertToLinkSEO(str) {
    str = str.trim();
    str = str.toLowerCase();
    str = nonAccentVietnamese(str);
    while (str.includes(" "))
    {
        str = str.replace(" ", "-");
    }
    while (str.includes("--"))
    {
        str = str.replace("--", "-");
    }
    return str;    
}