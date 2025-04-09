import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Explicitly cast to the correct type without using 'any'
global.TextEncoder = TextEncoder as typeof globalThis.TextEncoder;
global.TextDecoder = TextDecoder as typeof globalThis.TextDecoder;
