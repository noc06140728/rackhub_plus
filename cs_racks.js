// chek the TRIAL checkbox when loaded new rack page.

jdate_reg = /([0-9]{4}) *年 *([0-9]{1,2}) *月 *([0-9]{1,2}) *日 *([0-9]{1,2}) *時 *([0-9]{1,2}) *分/
function JapaneseDateToDate(jdate) {
    m = jdate.match(jdate_reg);
    return new Date(m[1], m[2], m[3], m[4], m[5]);
}

function getGcalDateStr(date) {
    return (date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate()) + 'T' + ('0' + (date.getHours() * 10000 + date.getMinutes() * 100)).slice(-6);
}

function getGcalUrl(text, details, limit) { 
    limit_str = getGcalDateStr(limit);
    return "https://www.google.com/calendar/render?action=TEMPLATE&text=" + text + "&details=" + details + "&dates=" + limit_str + "/" + limit_str;
}

function getRackInfo() {
    rack = {};
    rack.name = document.querySelector("h1 a");
    dt = document.querySelectorAll("dt");
    for (i in dt) {
        text = dt[i].innerText;
        if (/Rack *の種類/.test(text))
            rack.type = dt[i].nextElementSibling
        else if (/ホスト名/.test(text))
            rack.host = dt[i].nextElementSibling
        else if (/SSH *接続方法/.test(text))
            rack.ssh = dt[i].nextElementSibling
        else if (/有効期限/.test(text))
            rack.limit = dt[i].nextElementSibling;
    }
    return rack;
}

if (document.location.pathname == "/racks/new") {
    checkbox = document.querySelector("#form_rack_create_trial");
    checkbox.checked = true;
    fieldset = checkbox.parentElement;
    fieldset.style.backgroundColor = "#D6E0C0";
    fieldset.title = "rackhub+ によって自動的にチェックが付けられます。"
} else {
    rack = getRackInfo();
    limit = rack.limit;
    limit_date = JapaneseDateToDate(limit.innerText);
    limit.innerHTML += '<br/><div id="gcal_button" class="smallest button green rectangle">Google カレンダーに追加</div>';
    document.querySelector("#gcal_button").addEventListener('click', function() {
        window.open(getGcalUrl("Rack <" + rack.name.innerText + "> の有効期限", "Rack <" + rack.name.innerText + "> の有効期限が切れます。自動課金が発生するので注意してください。／" + rack.host.innerText + '／' + rack.type.innerText + "／" + rack.ssh.innerText, limit_date), "gcal_window", "width=800, height=800, scrollbars=yes");
    });
}

