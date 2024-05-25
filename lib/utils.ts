import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCookieExpiration(hourValue: number = 1000) {
  const now = new Date();
  var time = now.getTime();
  time += 3600 * hourValue;
  now.setTime(time);
  return now;
}

export const maskEmail = (email: string) => {
  const index = email.lastIndexOf("@");
  const prefix = email.substring(0, index);
  const postfix = email.substring(index);

  const mask = prefix
    .split("")
    .map(function (o, i) {
      if (i == 0 || i == index - 1) {
        return o;
      } else {
        return "*";
      }
    })
    .join("");

  return mask + postfix;
};
