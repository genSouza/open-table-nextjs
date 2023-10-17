const ExtractSlugFromURL = (url: string): string | null => {
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];
    return lastPart === '' ? parts[parts.length - 2] : lastPart === url ? null : lastPart;
}

export default ExtractSlugFromURL;