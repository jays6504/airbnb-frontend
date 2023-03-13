export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    formatDate,
    deformatDate,
    getRandomItemFromArr,
}

export function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function saveToStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key: string) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : undefined
}

function getRandomItemFromArr(arr: any[]) {
    return arr[Math.floor(Math.random() * arr.length)]
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
