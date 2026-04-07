import React from "react";

type ButtonProps = {
     variant?: "simple" | "action";
     children: React.ReactNode;
     onClick?: () => void;
     type?: "button" | "submit" | "reset";
     disabled?: boolean;
};

export default function Button({
     variant = "simple",
     children,
     onClick,
     type = "button",
     disabled,
}: ButtonProps) {
     return(
          <button
               className={`btn btn--${variant}`}
               onClick={onClick}
               type={type}
               disabled={disabled}
          >
               {children}
          </button>
     );
}