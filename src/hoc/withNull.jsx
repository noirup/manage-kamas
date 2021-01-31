/* Method that checks whether a props is empty 
prop can be an object, string or an array */
import React from "react";
import { isEmpty } from '../utils/utils';


  const withNull = (propName, NullComponent) => (NormalComponent) => {
      return function(props)
        {
          const propValue = props[propName];
          if(isEmpty(propValue)){
            return <NullComponent {...props} />
          } 

          return <NormalComponent {...props} />;
        }
  } 

  export default withNull;