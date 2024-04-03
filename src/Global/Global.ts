const Global = {
    redirect_uri: import.meta.env.VITE_REDIRECT_URI,
    client_id: import.meta.env.VITE_CLIENT_ID,
    client_secret: import.meta.env.VITE_CLIENT_SECRET,
    scopes: import.meta.env.VITE_SCOPES,
    urlBase: import.meta.env.VITE_URL_BASE,
}

export default Global;