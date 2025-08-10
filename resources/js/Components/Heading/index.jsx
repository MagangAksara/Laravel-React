import React from "react";

const sizes = {
    text5x1: "text-[24px] font-medium md:text-[22px]",
};

const Heading = ({
    children,
    className = "",
    size = "text5x1",
    as,
    ...restProps
}) => {
    const Component = as || "h6";

    return (
        <Component
            className={`text-white-a700 font-quicksand1 ${className} ${sizes[size]}`}
            {...restProps}
        >
            {children}
        </Component>
    );
};

export { Heading };