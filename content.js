const dayInSecond = 24 * 60 * 60;
const nightInSecond = dayInSecond * 25 / 100;
const morningInSecond = dayInSecond * 50 / 100;
const afternoonInSecond = dayInSecond * 75 / 100;
const eveningInSecond = dayInSecond;
const stringClassPercent = "percent-"
const startOfDay = new moment().startOf('day');

setup();

// Display time
setInterval(function() {
    setup();
}, 1000);

let flag = false;

window.onresize = function(event) {
    setFullDayWidth();
};

function setup() {
    // Full day
    let currentTime = new moment();
    $(".full-day > .past > span.date").html(currentTime.format("dddd, D MMMM YYYY"));
    $(".full-day > .past > span.time").html(currentTime.format("h:mm A"));

    const dayPastInSecond = currentTime.diff(startOfDay, 'second');
    const dayRemaingInSecond = dayInSecond - dayPastInSecond;
    const percentDayPast = parseInt(dayPastInSecond * 100 / dayInSecond);
    const percentDayRemaining = parseInt(dayRemaingInSecond * 100 / dayInSecond);

    $(".full-day > .label > span").html(secondsToHms(dayRemaingInSecond));
    $(".full-day > .label").addClass(stringClassPercent + percentDayRemaining);

    // Night
    let percentNightPast = 100;
    const nightRemaing = nightInSecond - dayPastInSecond;
    if (nightRemaing > 0) {
        percentNightPast = 100 - parseInt(nightRemaing * 100 / nightInSecond);
        $(".night > .label-center > span").html(secondsToHms(nightRemaing));
    } else {
        // $(".night > .label-center > span").html("night past");
    }
    $(".night > .past").addClass(stringClassPercent + percentNightPast);

    // Morning
    let percentMorningPast = 100;
    const morningRemaing = morningInSecond - dayPastInSecond;
    if (morningRemaing > 0) {
        percentMorningPast = 100 - parseInt(morningRemaing * 100 / (morningInSecond - nightInSecond));
        $(".morning > .label-center > span").html(secondsToHms(morningRemaing));
    } else {
        // $(".morning > .label-center > span").html("morning past");
    }
    $(".morning > .past").addClass(stringClassPercent + percentMorningPast);

    // Afternoon
    let percentAfternoonPast = 100;
    const afternoonRemaing = afternoonInSecond - dayPastInSecond;
    if (afternoonRemaing > 0) {
        percentAfternoonPast = 100 - parseInt(afternoonRemaing * 100 / (afternoonInSecond - morningInSecond));
        $(".afternoon > .label-center > span").html(secondsToHms(afternoonRemaing));
    } else {
        // $(".afternoon > .label-center > span").html("afternoon past");
    }
    $(".afternoon > .past").addClass(stringClassPercent + percentAfternoonPast);

    // Evening
    let percentEveningPast = 100;
    const eveningRemaing = eveningInSecond - dayPastInSecond;
    if (eveningRemaing > 0) {
        percentEveningPast = 100 - parseInt(eveningRemaing * 100 / (eveningInSecond - afternoonInSecond));
        $(".evening > .label-center > span").html(secondsToHms(eveningRemaing));
    }
    $(".evening > .past").addClass(stringClassPercent + percentEveningPast);

    setFullDayWidth();
}

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + ":" : "00";
    var mDisplay = m > 0 ?
        m < 10 ? "0" + m + ":" : m + ":" :
        "00:";
    var sDisplay = s > 0 ?
        s < 10 ? "0" + s : s :
        "00";
    return hDisplay + mDisplay + sDisplay;
}

function flexFont() {
    const timeTextSpan = $("span.time.text");
    timeTextSpan.each(function() {
        const parentWidth = $(this).parent().width();
        const fontSize = parentWidth * 0.13;
        $(this).css("fontSize", fontSize + "px");
    });
    const dateTextSpan = $("span.date.text");
    dateTextSpan.each(function() {
        const parentWidth = $(this).parent().width();
        const fontSize = parentWidth * 0.05;
        $(this).css("fontSize", fontSize + "px");
    });
};

function setFullDayWidth() {
    let pastWidth = $(".night > .past").width();
    pastWidth += $(".morning > .past").width();
    pastWidth += $(".afternoon  > .past").width();
    pastWidth += $(".evening > .past").width();
    $(".full-day > .past").width(pastWidth);

    flexFont();
}