import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from 'util';

// Cast TextEncoder and TextDecoder to 'any' to bypass the type mismatch
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;
