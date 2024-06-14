import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
  const index = email.lastIndexOf('@');
  const prefix = email.substring(0, index);
  const postfix = email.substring(index);

  const mask = prefix
    .split('')
    .map(function (o, i) {
      if (i == 0 || i == index - 1) {
        return o;
      } else {
        return '*';
      }
    })
    .join('');

  return mask + postfix;
};

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    if (timer !== null) {
      clearTimeout(timer); // clear any pre-existing timer
    }

    const context = this; // get the current context

    timer = setTimeout(() => {
      fn.apply(context, args); // call the function if time expires
    }, wait);
  };
}

export const currencyConverter = (currency: string, value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value);
};

export const orderStatus = (status: any) => {
  if (status.refunded) {
    return {
      text: 'Refunded',
      color: 'bg-[bg-[#B91010]]',
    };
  }

  if (status.cancelled) {
    return {
      text: 'Cancelled',
      color: 'bg-[#B91010]',
    };
  }

  if (status.rejected) {
    return {
      text: 'Rejected',
      color: 'bg-[#B91010]',
    };
  }

  if (status.completed) {
    return {
      text: 'Completed',
      color: 'bg-[#009260]',
    };
  }

  if (status.driverAssigned) {
    return {
      text: 'Driver assigned',
      color: 'bg-[#009260]',
    };
  }

  if (status.shipped) {
    return {
      text: 'Shipped',
      color: 'bg-[#009260]',
    };
  }

  if (status.accepted) {
    return {
      text: 'Accepted',
      color: 'bg-[#009260]',
    };
  }

  return {
    text: 'Pending',
    color: 'bg-[#B91010]',
  };
};

export const paymentStatus = (status: any) => {
  if (status.paid) {
    return {
      text: 'Paid',
      color: 'bg-[#009260]',
    };
  } else {
    return {
      text: 'Await Cash',
      color: 'bg-[#B91010]',
    };
  }
};
