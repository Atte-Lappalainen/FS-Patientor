const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };



export const parseString = (comment: unknown): string => {
    if (!isString(comment)) {
        throw new Error('Incorrect or missing comment');
      }
    
      return comment;
    };
