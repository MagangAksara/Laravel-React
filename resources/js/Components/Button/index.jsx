// import
import React from "react";
import PropTypes from "prop-types";

// const
const shapes = {
    round: "rounded-[14px]"
};

const variants = {
    gradient: {
        indigo_400_blue_gray_800: "bg-gradient2 text-white-a700_01",
    },
};

const sizes = {
    "2x1": "h-[48px] px-3.5 text-[24px]",
};

const Button = ({
    children,
    className,
    leftIcon,
    rightIcon,
    shape,
    variant = "gradient",
    size = "2x1",
    color = "",
    ...restProps
}) => {
    return (
        <button
            className={`${className} flex flex-row items-center justify-center gap-2.5 md:ml-0 text-center cursor-pointer whitespace-nowrap text-white-a700_01 text-[24px] font-bold bg-gradient2 min-w-[240px] rounded-[14px] md:text-[22px] ${shape && shapes[shape]} ${size && sizes[size]} ${variant && variants[variant]?.[color]}`}
            {...restProps}
        >
            {!!leftIcon && leftIcon}
            {children}
            {!!rightIcon && rightIcon}
        </button>
    );
};

Button.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    shape: PropTypes.oneOf(["round"]),
    size: PropTypes.oneOf(["2x1"]),
    variant: PropTypes.oneOf(["gradient"]),
    color: PropTypes.oneOf(["indigo_400_blue_gray_800"]),
};

export { Button };