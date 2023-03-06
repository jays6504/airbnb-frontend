export const storageService = {
    query,
}

function query(entityType: string, idx: number, delay = 500) {
    // supports pagination
    const entitiesToDisplay = 24
    const storedEntities = localStorage.getItem(entityType)
    const entities = storedEntities ? JSON.parse(storedEntities) : []

    return new Promise(resolve => setTimeout(() => resolve(entities.splice(idx, idx + entitiesToDisplay)), delay))
}

// function get(entityType:any, entityId) {
//     return query(entityType).then(entities => {
//         const entity = entities.find(entity => entity._id === entityId)
//         if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
//         return entity
//     })
// }

// function post(entityType:any, newEntity) {
//     newEntity = JSON.parse(JSON.stringify(newEntity))
//     newEntity._id = _makeId()
//     return query(entityType).then(entities => {
//         entities.push(newEntity)
//         _save(entityType, entities)
//         return newEntity
//     })
// }

// function put(entityType:any, updatedEntity) {
//     updatedEntity = JSON.parse(JSON.stringify(updatedEntity))
//     return query(entityType).then(entities => {
//         const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
//         if (idx < 0)
//             throw new Error(`Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`)
//         entities.splice(idx, 1, updatedEntity)
//         _save(entityType, entities)
//         return updatedEntity
//     })
// }

// function remove(entityType:any, entityId) {
//     return query(entityType).then(entities => {
//         const idx = entities.findIndex(entity => entity._id === entityId)
//         if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
//         entities.splice(idx, 1)
//         _save(entityType, entities)
//     })
// }

// Private functions

function _save(entityType: any, entities: any) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}
