exports.parseValues = (limit = 10, pag = 1 ) => {

    let limitParse = parseInt(limit)
    let pageParse = parseInt(pag)
    
    if (isNaN(limitParse) || isNaN(pageParse)) {
        throw Error('No se puede pudo convertir los parametros ')
    } 
    else {
        return {
            limit: parseInt(limit),
            pag: parseInt(pag)
        }
    }
}