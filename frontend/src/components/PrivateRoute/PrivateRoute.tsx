import  {type PropsWithChildren} from "react";
import React from "react";

interface Props extends PropsWithChildren {}

const PrivateRoute: React.FC<Props> = ({children}) => {
    return (
        <>
            {children}
        </>
    );
};

export default PrivateRoute;