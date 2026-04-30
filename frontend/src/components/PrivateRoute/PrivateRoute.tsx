import  {type PropsWithChildren} from "react";
import * as React from "react";

interface Props extends PropsWithChildren {}

const PrivateRoute: React.FC<Props> = ({children}) => {
    return (
        <>
            PrivateRoute
            {children}
        </>
    );
};

export default PrivateRoute;