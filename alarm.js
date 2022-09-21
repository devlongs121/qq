let alarmSound = new Audio();
            alarmSound.src = 'tone2.mp3';
            let alarmTimer;

            const getTimeString = ({ hours, minutes, seconds, zone }) => {
                if (minutes / 10 < 1) {
                    minutes = "0" + minutes
                }
                if (seconds / 10 < 1) {
                    seconds = "0" + seconds;
                }
                return `${hours}:${minutes}:${seconds} ${zone}`;
            };


            function clockTime() {
                let clock = document.getElementById('clock');
                let currentDate = new Date();
                let hours = currentDate.getHours();
                let minutes = currentDate.getMinutes();
                let seconds = currentDate.getSeconds();
                let zone = hours >= 12 ? "PM" : "AM";
                if (hours > 12) {
                    hours = hours % 12;
                }
                let timeStrings = getTimeString({ hours, minutes, seconds, zone });
                clock.innerHTML = timeStrings;

                // console.log(currentDate)
            };
            setInterval(clockTime);

            function setAlarm(button) {
                let ms = document.getElementById('alarmTime').valueAsNumber;
                if (isNaN(ms)) {
                    alert('Invalid Date');
                    return;
                }
                let alarm = new Date(ms);
                let alarmTime = new Date(alarm.getUTCFullYear(), alarm.getUTCMonth(), alarm.getUTCDate(), alarm.getUTCHours(), alarm.getUTCMinutes(), alarm.getUTCSeconds());
                let differenceInMs = alarmTime.getTime() - (new Date()).getTime();

                if (differenceInMs < 0) {
                    alert('Specify time is already passed');
                    return;
                }

                alarmTimer = setTimeout(initAlarm, differenceInMs);

                button.innerText = 'Cancel Alarm';
                button.setAttribute('onclick', 'cancelAlarm(this);');
            };

            function cancelAlarm(button) {
                button.innerText = 'Set Alarm';
                button.setAttribute('onclick', 'setAlarm(this);');
                clearTimeout(alarmTime);
            };

            function initAlarm() {
                alarmSound.play();
                document.getElementById('alarmOption').style.display = '';
            };

            function stopAlarm() {
                alarmSound.pause();
                alarmSound.currentTime = 0;
                document.getElementById('alarmOption').style.display = 'none';
                cancelAlarm(document.getElementById('alarmButton'));
            };

            function snooze() {
                stopAlarm();
                setTimeout(initAlarm, 36000);
            }