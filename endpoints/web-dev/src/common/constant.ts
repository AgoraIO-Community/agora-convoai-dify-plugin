export enum VideoSourceType {
    CAMERA = 'camera',
    SCREEN = 'screen',
}

const protocol = window.location.protocol;
const host = window.location.host;
const path = window.location.pathname;
const path_parts = path.split("/").filter(Boolean); // Remove empty parts
const base_url_path = path_parts.slice(0, 1).join("/");
// export const base_url = `${protocol}//${host}/${base_url_path}`;
export const base_url = `https://daemon-plugin.dify.dev/3VYwPoZmpcGUvTJaGCTHH4FfiwfolK12`