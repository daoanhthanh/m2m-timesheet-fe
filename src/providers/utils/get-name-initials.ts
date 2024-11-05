/**
 *
 * @param name
 * @param count
 */
export const getNameInitials = (name: string, count = 2) => {
  const initials = name.split(" ");

  const firstAndLast = [initials[0], initials[initials.length - 1]]
    .map((n) => n[0])
    .join("");
  // const filtered = initials.replace(/[^a-zA-Z]/g, "");
  // return filtered.slice(0, count).toUpperCase();

  return firstAndLast.toUpperCase();
};
