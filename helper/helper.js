export const apiResponse = (objectData) => {
  const { res, data, statusCode = 200,message="Success" } = objectData;
  return res.json({
    statusCode: statusCode,
    data: data,
    message:message
  });
};

export const apiErrorResponse = (objectData) => {
    const { res, error, statusCode = 400 } = objectData;
    console.error(error)
    return res.json({
      statusCode: statusCode,
      message: error?.message,
    });
  };
  
  export const  tryCatch=(fn)=> {
    return function(...args) {
      try {
        return fn(...args); 
    }catch(error){
          console.error('An error occurred:', error); 

      }}
    
  }