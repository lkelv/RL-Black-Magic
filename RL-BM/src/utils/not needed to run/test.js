// Same constants as on the CAS
const DH_P = 1000003; // prime modulus
const DH_G = 5;       // base

// Fast modular exponentiation: base^exp mod mod (using BigInt safely)
function modexp(base, exp, mod) {
    let result = 1n;
    let b = BigInt(base % mod);
    let e = BigInt(exp);
    const m = BigInt(mod);

    while (e > 0n) {
        if (e & 1n) {
            result = (result * b) % m;
        }
        e >>= 1n;
        b = (b * b) % m;
    }

    // Return as normal Number (safe because result < mod < 1e6)
    return Number(result);
}

// Build the 6-digit password for one product ("M", "S", "B")
function dhPasswordFromLast6(last6, productChar) {
    // Make sure last6 is an integer 0–999999
    last6 = Number(last6) | 0;

    const ascii = productChar.charCodeAt(0); // 'M'/'S'/'B'

    // XOR mix between last6 and ASCII (matches Lua xor function)
    const mixed = (last6 ^ ascii) >>> 0; // force unsigned 32-bit

    // Diffie–Hellman style mixing
    const shared = modexp(DH_G, mixed, DH_P);

    // Offset to separate the three types
    let offset = 0;
    if (productChar === "M") offset = 100000;
    else if (productChar === "S") offset = 200000;
    else if (productChar === "B") offset = 300000;

    // Final 6-digit password
    let pw = (shared + offset) % 1000000;

    // Pad to 6 digits with leading zeros
    return String(pw).padStart(6, "0");
}

// Convenience helpers (optional)
function passwordMethods(last6) {
    return dhPasswordFromLast6(last6, "M");
}
function passwordSpesh(last6) {
    return dhPasswordFromLast6(last6, "S");
}
function passwordBoth(last6) {
    return dhPasswordFromLast6(last6, "B");
}