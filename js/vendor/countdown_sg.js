(function($){
    $.fn.countdown_sg = function(dayend){
        var countdownDate = "<li class='day'><span class='timer-value countDaySG'>0</span><span class='timer-legend countDayTimeNameSG'></span></li>";
        var countdownHour = "<li class='hour'><span class='timer-value countHourSG'>0</span><span class='timer-legend countHourTimeNameSG'> час. </span></li>";
        var countdownMin = "<li class='min'><span class='timer-value countMinSG'>0</span><span class='timer-legend countMinTimeNameSG'> мин. </span></li>";
        var countdownSec = "<li class='sec'><span class='timer-value color-yellow countSecSG'>0</span><span class='timer-legend countSecTimeNameSG'> сек. </span></li>";
        var countdownHtml = "<ul class='countdownSG'>" + countdownDate + countdownHour + countdownMin + countdownSec + "</ul>";
        this.append(countdownHtml);
        var cs = this[0];
        var now = new Date();

        var mcD = cs.querySelectorAll('.countDaySG');
        var mcDE = cs.querySelectorAll('.countDayTimeNameSG');
        var mcH = cs.querySelectorAll('.countHourSG');
        var mcM = cs.querySelectorAll('.countMinSG');
        var mcS = cs.querySelectorAll('.countSecSG');

        var end = new Date(now.getFullYear(),now.getMonth(),dayend,0,0,0);

        if(end-now<0){
            end = new Date(now.getFullYear(),now.getMonth()+1,dayend,0,0,0);
        }

        updatespan(end - now);
        var timeInterval = setInterval(update,1000);
        function update(){
            now = new Date();
            leftTime = end-now;
            if(leftTime<=0){
                end = new Date(now.getFullYear(),now.getMonth(),dayend,0,0,0);
                if(end-now<0){
                    end = new Date(now.getFullYear(),now.getMonth()+1,dayend,0,0,0);
                }
                leftTime = end-now;

            }
            updatespan(leftTime);
        }
        function addZero(num){
            if(num<10){
                return '0'+num;
            }
            return num;
        }
        function rightEndNum(num){
            if(num%100>=10&&num%100<=20)
                return 0;
            num = num%10;
            if(num==0||(num>=5&&num<=9))
                return 0;
            if(num==1)
                return 1;
            if(num>=2&&num<=4)
                return 2;
        }

        function rightEnd(num,f){
            var day = [' дней ',' день ',' дня '];
            if(f=='d')
                return day[rightEndNum(num)];
        }

        function updatespan(ms){
            if(ms<0)
                ms=0;
            sec=Math.floor(ms/1000);
            min = Math.floor(sec/60);
            hour = Math.floor(min/60);
            days = Math.floor(hour/24);
            sec = sec%60;
            min = min%60;
            hour = hour%24;

            sec = addZero(sec);
            min = addZero(min);
            hour = addZero(hour);

            daysEnd= rightEnd(days,'d');

            Array.prototype.forEach.call(mcD,function(x){x.innerHTML =days});
            Array.prototype.forEach.call(mcDE,function(x){x.innerText =daysEnd});
            Array.prototype.forEach.call(mcH,function(x){x.innerHTML =hour});
            Array.prototype.forEach.call(mcM,function(x){x.innerHTML =min});
            Array.prototype.forEach.call(mcS,function(x){x.innerHTML =sec});
        }


    }})(jQuery);
