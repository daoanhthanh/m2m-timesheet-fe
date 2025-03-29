export * from "./get-name-initials";
export * from "./get-random-color";
export * from "./uuid-provider";
export * from "./cn";

export const joinHostAndApi = (host: string, apiPath: string): string => {
  return `${host.replace(/\/+$/, "")}/${apiPath.replace(/^\/+/, "")}`;
};
