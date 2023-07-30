export const makeChart = (score: any, refObject: any, color: any) => {
  let i = 1;
  if (score !== undefined && !isNaN(score)) {
    let chartFn = setInterval(() => {
      if (i <= score) {
        colorfn(i, refObject.current, color);
        i++;
      } else {
        clearInterval(chartFn);
      }
    }, 10);
    return chartFn;
  } else {
    noneValue(refObject.current);
  }
};

const colorfn = (i: number, refObject: HTMLDivElement, color: string) => {
  refObject.style.background = `conic-gradient(${color} 0% ${i}%, #dedede ${i}% 100%`;
};

const noneValue = (refObject: HTMLDivElement) => {
  try {
    refObject.style.background = `conic-gradient(#dedede 0% 100%, #dedede 100% 100%`;
  } catch (err) {
    console.error(err);
  }
};
