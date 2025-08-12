export enum VideoSourceType {
    CAMERA = 'camera',
    SCREEN = 'screen',
}

const protocol = window.location.protocol;
const host = window.location.host;
// const path = window.location.pathname;
// const path_parts = path.split("/").filter(Boolean); // Remove empty parts
// const base_url_path = path_parts.slice(0, 1).join("/");
export const base_url = `${protocol}//${host}`;
// export const base_url = `https://e194w2zvugwj75uo.ai-plugin.io`