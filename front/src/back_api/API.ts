export const API = {
    COLLECTION: HOST() + '/collection',
    TOKEN: HOST() + '/token',
    ORDER: HOST() + '/order',
}

function HOST(){
    console.log("HOST", import.meta.env)
    const domainName = import.meta.env.VITE_BACK_END_DOMAIN_NAME ?? "localhost";
    return import.meta.env.VITE_NODE_ENV === 'prod'
        ? `http://${domainName}/api`
        : `http://${domainName}`
}