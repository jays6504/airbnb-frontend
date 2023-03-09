export const utilService = {
    makeId,
    makeLorem,
    saveToStorage,
    loadFromStorage,
    formatTimeAgo,
    capitalize,
    formatDate,
    deformatDate,
}

export function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function capitalize(string: string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase()
}

function makeLorem(size = 100) {
    var words = [
        'The sky',
        'above',
        'the port',
        'was',
        'the color of television',
        'tuned',
        'to',
        'a dead channel',
        '.',
        'All',
        'this happened',
        'more or less',
        '.',
        'I',
        'had',
        'the story',
        'bit by bit',
        'from various people',
        'and',
        'as generally',
        'happens',
        'in such cases',
        'each time',
        'it',
        'was',
        'a different story',
        '.',
        'It',
        'was',
        'a pleasure',
        'to',
        'burn',
    ]
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

// function getRandomIntInclusive(min, max) {
//     min = Math.ceil(min)
//     max = Math.floor(max)
//     return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
// }

// function randomPastTime() {
//     const HOUR = 1000 * 60 * 60
//     const DAY = 1000 * 60 * 60 * 24
//     const WEEK = 1000 * 60 * 60 * 24 * 7

//     const pastTime = getRandomIntInclusive(HOUR, WEEK)
//     return Date.now() - pastTime
// }

// function debounce(func, timeout = 300) {
//     let timer
//     return (...args) => {
//         clearTimeout(timer)
//         timer = setTimeout(() => {
//             func.apply(this, args)
//         }, timeout)
//     }
// }

function saveToStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key: string) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : undefined
}

function formatTimeAgo(sentAt: number) {
    const timestamp = Date.now()
    const seconds = Math.floor(timestamp / 1000)
    const oldTimestamp = Math.floor(sentAt / 1000)

    const difference = seconds - oldTimestamp
    let output = ``
    if (difference < 60) {
        // Less than a minute has passed:
        output = `Just now`
    } else if (difference < 3600) {
        // Less than an hour has passed:
        output = `${Math.floor(difference / 60)} minutes ago`
    } else if (difference < 86400) {
        // Less than a day has passed:
        output = `${Math.floor(difference / 3600)} hours ago`
    } else if (difference < 2620800) {
        // Less than a month has passed:
        output = `${Math.floor(difference / 86400)} days ago`
    } else if (difference < 31449600) {
        // Less than a year has passed:
        output = `${Math.floor(difference / 2620800)} months ago`
    } else {
        // More than a year has passed:
        output = `${Math.floor(difference / 31449600)} years ago`
    }

    return `${output}`
}

function formatDate(date: Date): string {
    let formatedDate = date
        .toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
        .split('/')
        .join('-')
    console.log('formatedDate:', formatedDate)
    return formatedDate
}

function deformatDate(formattedDateString: string): Date | null {
    if (!formattedDateString) return null
    const formattedDateParts = formattedDateString.split('-')
    const year = parseInt(formattedDateParts[2])
    const month = parseInt(formattedDateParts[1]) - 1 // JS months are 0-indexed
    const day = parseInt(formattedDateParts[0])
    const dateObj = new Date(year, month, day) // creates a new Date object with the given year, month, and day
    return dateObj
}
