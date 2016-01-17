var startReader = function() {
    console.log('Cron Reader Started \n');
    var timeRegex = /([01]\d|2[0-3]):([0-5]\d)/;

    process.stdin.setEncoding("utf8");
    process.openStdin().on('data',function(res) {
        var time = res.replace(/(\r\n|\n|\r)/gm,"");;
        var validInput = timeRegex.test(time);

        if(validInput) {
            var splitTime = time.split(':');
            var inputHour = splitTime[0], inputMinute = splitTime[1];

            calculateCronTime(time, '1:30', 'daily');
            calculateCronTime(time, (inputHour + ':45'), 'hourly');
            calculateCronTime(time, (inputHour + ':' + inputMinute), 'every_minute');
            calculateCronTime(time, '19:00', 'sixty_times');

        } else {
            console.log('Invalid Input: Expects 00:00 - 23:59 time');
        }
    });
}

function calculateCronTime(inputTime, cronTime, script) {
    var inputTimestamp = convertToDateFormat(inputTime);
    var cronTimestamp = convertToDateFormat(cronTime);
    var day = calculateDay(inputTimestamp, cronTimestamp);

    console.log(cronTime + day + scriptPrintout(script));
}

function convertToDateFormat(time) {
    return '01/01/1970 ' + time + ':00';
}

function calculateDay(inputTime, cronTime) {
    if(Date.parse(inputTime) > Date.parse(cronTime)){
        return ' tomorrow';
    }
    return ' today';
}

function scriptPrintout(file) {
    return ' - /bin/run_me_' + file;
}

startReader();
module.exports = startReader;
