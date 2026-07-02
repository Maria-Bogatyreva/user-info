document.addEventListener("DOMContentLoaded", () => {
    const user = {
        name: 'Maria',
        age: '12',
        subscription: 'free1',
        lastLogin: '13'
    }

    const validSubscriptions = ['free', 'basic', 'premium']

    const accessLevelDictionary = {
        basic: 'Ограниченный доступ',
        premium: 'Полный доступ',
        free: 'Доступ только к бесплатному контенту'
    }

    // Преобразование типов
    const name = user.name.toString().trim();
    const age = +user.age;
    const subscription =  String(user.subscription);
    const lastLogin = Number(user.lastLogin);

    // Валидация возраста. Стрелочная функция
    const validateAge = (age) =>  typeof age === 'number' && Number.isFinite(age) && age > 0;

    // Валидация имени. Стрелочная функция
    const validateName = name =>  name.trim().length !== 0

    // Валидация типа подписки. Function Declaration
    function validateSubscription (subscription) {
        return validSubscriptions.includes(subscription);
    }

    // Валидация времени входа
    function getTimeOfDay (lastLogin) {
        if (lastLogin < 0 || lastLogin > 23) {
            return null;
        }

        if (lastLogin >=5 && lastLogin <= 11 ) {
            return 'утро'
        } else if (lastLogin >=12 && lastLogin <= 17 ) {
            return 'день'
        } else if (lastLogin >=18 && lastLogin <= 21 ) {
            return 'вечер'
        } else {
            return 'ночь'
        }
    }

    // Валидация прав доступа
    function getAccessLevel(subscription) {
        return accessLevelDictionary[subscription]
    }

    // Вывод итогового сообщения
    const displayUserInfo = (name, age, lastLogin, subscription) => {
        const userName = validateName(name) ? name : "Гость";
        const userAge = validateAge(age) ? age : 'не указанное количество';
        const timeOfDay = getTimeOfDay(lastLogin) ?? 'неопределенное время суток';
        const userAccessLevel = validateSubscription(subscription)
                ? getAccessLevel(subscription)
                : "Доступ не определен";

        let msg = `Привет, ${userName}! Вам ${userAge} лет. Сейчас ${timeOfDay}. Уровень доступа: ${userAccessLevel}.`

        if (userAge < 18) {
            msg += 'Вы несовершеннолетний пользователь'
        }

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