class SpecialCharacterError extends Error {
    constructor(...params) {
      super(...params);
  
      // Maintains proper stack trace for where our error was thrown (only available on V8)
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, SpecialCharacterError);
      }
  
      this.name = "SpecialCharacterError";
      this.message = "Cannot input special characters."
    }
}

export default SpecialCharacterError;