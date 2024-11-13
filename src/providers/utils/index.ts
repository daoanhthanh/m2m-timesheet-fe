export * from "./get-name-initials";
export * from "./get-random-color";

export const joinHostAndApi = (host: string, apiPath: string): string => {
  return `${host.replace(/\/+$/, "")}/${apiPath.replace(/^\/+/, "")}`;
};
