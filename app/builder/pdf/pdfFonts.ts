import { Font } from "@react-pdf/renderer";

// Disable automatic hyphenation to keep URL/user-name wrapping closer to the web preview.
Font.registerHyphenationCallback((word) => [word]);

export default {};
