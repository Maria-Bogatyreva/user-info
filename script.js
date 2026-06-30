document.addEventListener("DOMContentLoaded", () => {
    const user = {
        name: 'Maria',
        age: '12',
        subscription: 'premium',
        lastLogin: '13'
    }

    // Преобразование типов
    const name = user.name.toString().trim();
    const age = +user.age;
    const subscription =  String(user.subscription);
    const lastLogin = Number(user.lastLogin);

    // Валидация возраста. Function Expression
    const validateAge = function(age) {
        const isNumber = typeof age === 'number' && Number.isFinite(age); // убедились, что перед нами число
        return isNumber && age > 0; // возврат true, если это число и больше 0
    }

    // Валидация имени. Стрелочная функция
    const validateName = name =>  name.trim().length !== 0

    // Валидация типа подписки. Function Declaration
    function validateSubscription (subscription) {
        return ( subscription === 'free' ||
                subscription === 'basic' ||
                subscription === 'premium' );
    }

    // Валидация времени входа
    function getTimeOfDay (lastLogin) {
        if (lastLogin < 0 || lastLogin > 23) {
            return null;
        }

        return (lastLogin >=5 && lastLogin <= 11 ) ?
            'утро' : (lastLogin >=12 && lastLogin <= 17 ) ?
                'день' : (lastLogin >=18 && lastLogin <= 21 ) ?
                    'вечер' : 'ночь'

    }

    // Валидация прав доступа
    function getAccessLevel(subscription) {
        let accessLevel ;
        if (subscription === 'basic') {
            accessLevel = "Ограниченный доступ"
        } else if (subscription === "premium" ) {
            accessLevel = "Полный доступ"
        } else  if (subscription === "free") {
            accessLevel = "Доступ только к бесплатному контенту"
        }

        return accessLevel ?? 'доступ не определен'
    }

    // Вывод итогового сообщения
    const displayUserInfo = (name, age, lastLogin, subscription) => {
        const userName = validateName(name) ? name : "Гость",
              userAge = validateAge(age) ? age : 'не указанное количество',
              timeOfDay = getTimeOfDay(lastLogin) ?? 'неопределенное время суток',
              userAccessLevel = validateSubscription(subscription)
                ? getAccessLevel(subscription)
                : "Доступ не определен";

        let msg = `Привет, ${userName}! Вам ${userAge} лет. Сейчас ${timeOfDay}. Уровень доступа: ${userAccessLevel}.`

        userAge < 18 ? msg += 'Вы несовершеннолетний пользователь' : '';

        const lastEntryMsg = "Позднее время для входа."
        if (lastLogin >=22 || lastLogin <5) {
            msg = `${msg} ${lastEntryMsg}`
        }

        return msg;
    }
    console.log(displayUserInfo(name, age, lastLogin, subscription))

    const userContainer = document.querySelector('#user');
    userContainer.innerText = displayUserInfo(name, age, lastLogin, subscription);
})