export function getFileNameAndCapitalize(inputString) {
  // Find the index of the dot before the file extension
  const dotIndex = inputString.lastIndexOf(".");

  // Extract the file name without the extension, remove dashes, and capitalize it
  const fileName = inputString
    .substring(0, dotIndex)
    .replace(/-/g, " ") // Replace dashes with spaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return fileName;
}
