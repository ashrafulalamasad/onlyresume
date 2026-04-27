import { Font } from "@react-pdf/renderer";

// Font configuration for PDF generation.
// Disable automatic hyphenation to keep URL/user-name wrapping closer to the web preview.
Font.registerHyphenationCallback((word) => [word]);

export default {};
