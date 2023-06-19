function getDateObjectFromInput(inputValue) {
    let dateObject = null;

    if(inputValue) {
        const inputDate = new Date(inputValue);
        dateObject = {
            day: inputDate.getDate(),
            month: inputDate.getMonth(),
            year: inputDate.getFullYear()
        }
    }

    return dateObject;
}

function getInputValueFromDateObject(dateObject) {
    return `${dateObject.year}-${String(dateObject.month + 1).padStart(2, '0')}-${String(dateObject.day).padStart(2, '0')}`;
}

function elapsedTime(timestamp) {
    let currentTime = Date.now();
    let elapsedMs = currentTime - timestamp;
    let elapsedSeconds = Math.floor(elapsedMs / 1000);

    if (elapsedSeconds < 60) {
        return elapsedSeconds + "s";
    } else if (elapsedSeconds < 3600) {
        return Math.floor(elapsedSeconds / 60) + "min";
    } else if (elapsedSeconds < 86400) {
        return Math.floor(elapsedSeconds / 3600) + "h";
    } else if (elapsedSeconds < 2592000) {
        return Math.floor(elapsedSeconds / 86400) + "d";
    } else if (elapsedSeconds < 31104000) {
        return Math.floor(elapsedSeconds / 2592000) + "m";
    } else {
        return Math.floor(elapsedSeconds / 31104000) + "y";
    }
}

function getDateInStringFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
}

function getMonthYearFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    return `${month} ${year}`;
}

const DateUtils = {
    getDateObjectFromInput,
    getInputValueFromDateObject,
    elapsedTime,
    getDateInStringFromTimestamp,
    getMonthYearFromTimestamp,
};

export default DateUtils;