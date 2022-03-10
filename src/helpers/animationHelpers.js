
export const slideIn = "slideIn";
export const slideOut = "slideOut";
export const fadeIn = "fadeIn";
export const fadeOut = "fadeOut";
export const popIn = "popIn";
export const popOut = "popOut";

export const dismiss = args => {
  const { targets, onClose, time } = args;

  targets?.forEach(target => {
    manageClass(target, slideIn, slideOut);
    manageClass(target, fadeIn, fadeOut);
    manageClass(target, popIn, popOut);
  });

  if (onClose) {
    setTimeout(() => onClose(), time || 350);
  }
};

function manageClass(target, classIn, classOut) {
  const element = target?.current || target;
  const classes = element?.classList || [];
  classes.remove?.(classIn);
  classes.add?.(classOut);
};