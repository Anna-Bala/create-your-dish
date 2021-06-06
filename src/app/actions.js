export const dishName = (text) => ({
    type: 'DISH_NAME',
    text
  });

export const dishTime = (time) => ({
    type: 'DISH_PREPARATION_TIME',
    time
  });

export const dishType = (option) => ({
    type: 'DISH_TYPE',
    option
  }); 

export const dishNoSlices = (number) => ({
    type: 'DISH_NO_SLICES',
    number
  });

export const dishDiameter = (number) => ({
    type: 'DISH_DIAMETER',
    number
  });

export const dishSpiciness = (range) => ({
    type: 'DISH_SPICINESS_SCALE',
    range
  });

export const dishNoBread = (number) => ({
    type: 'DISH_NO_BREAD',
    number
  });
  
export const responseSuccess = (response) => ({
    type: 'RESPONSE_SUCCESS',
    response
  }); 
  
export const responseError = (response) => ({
    type: 'RESPONSE_ERROR',
    response
  });  