/**
 * Formats a postal code according to the Canadian postal code pattern.
 * @param input - The input string to format.
 * @returns An object containing the formatted postal code and its validity.
 */
const formatPostalCode = (input: string) => {
  // Remove non-alphanumeric characters except spaces and convert to uppercase
  const alphanumericInput = input.replace(/[^a-z0-9 ]/gi, '').toUpperCase();

  // Remove any spaces to correctly position the single space after the third character
  const cleanedInput = alphanumericInput.replace(/\s+/g, '');

  // Initialize formatted postal code
  let formatted = '';
  let valid = false; // Initially assume the input is valid

  // Apply Canadian postal code pattern: Letter, Number, Letter, Space, Number, Letter, Number
  if (cleanedInput.length > 0) {
    // First character must be a letter
    if (cleanedInput.charAt(0).match(/[A-Z]/)) {
      formatted += cleanedInput.charAt(0);
    } else {
      valid = false;
    }
  }
  if (cleanedInput.length > 1) {
    // Second character must be a number
    if (cleanedInput.charAt(1).match(/[0-9]/)) {
      formatted += cleanedInput.charAt(1);
    } else {
      valid = false;
    }
  }
  if (cleanedInput.length > 2) {
    // Third character must be a letter
    if (cleanedInput.charAt(2).match(/[A-Z]/)) {
      formatted += cleanedInput.charAt(2);
    } else {
      valid = false;
    }
  }
  if (cleanedInput.length > 3) {
    // Add space after the third character automatically if the fourth character is being typed
    formatted += ' '; // Add space only if there are more than three characters
  }
  if (cleanedInput.length > 3) {
    // Fourth character must be a number
    if (cleanedInput.charAt(3).match(/[0-9]/)) {
      formatted += cleanedInput.charAt(3);
    } else {
      valid = false;
    }
  }
  if (cleanedInput.length > 4) {
    // Fifth character must be a letter
    if (cleanedInput.charAt(4).match(/[A-Z]/)) {
      formatted += cleanedInput.charAt(4);
    } else {
      valid = false;
    }
  }
  if (cleanedInput.length > 5) {
    // Sixth character must be a number
    if (cleanedInput.charAt(5).match(/[0-9]/)) {
      formatted += cleanedInput.charAt(5);
      valid = true;
    } else {
      valid = false;
    }
  }

  // Return the formatted postal code and its validity
  return { formatted, isValid: valid };
};

export default formatPostalCode;
